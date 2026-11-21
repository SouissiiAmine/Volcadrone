"use client";

import { useEffect, useRef } from "react";
import { puys } from "../lib/geo";

// Relief réel de la Chaîne des Puys en courbes de niveau (WebGL2, aucune dépendance).
// Le scroll fait basculer la caméra de la vue carte (zénithale) au survol 3D.
const VERT = `#version 300 es
in vec3 a;
uniform mat4 uVP;
out vec3 vP;
void main(){ vP = a; gl_Position = uVP * vec4(a, 1.); }`;

const FRAG = `#version 300 es
precision highp float;
in vec3 vP;
uniform vec3 uBg, uFg, uHi;
uniform float uExag, uHalf;
out vec4 o;
float iso(float h, float step){
  float k = h / step, w = fwidth(k);
  return (1. - smoothstep(.0, w * 1.3, abs(fract(k - .5) - .5))) * (1. - smoothstep(.3, .7, w));
}
void main(){
  float h = vP.y / uExag * 1000.;
  vec3 n = normalize(cross(dFdx(vP), dFdy(vP)));
  float shade = clamp(dot(n, normalize(vec3(-.6, .7, -.4))), 0., 1.);
  float minor = iso(h, 20.) * .28, major = iso(h, 100.);
  float l = max(minor, major);
  vec3 ink = mix(uFg, uHi, smoothstep(1250., 1380., h));
  vec3 c = mix(uBg, uFg, (1. - shade) * .10);
  c = mix(c, ink, l);
  vec2 e = abs(vP.xz) / uHalf;
  float fade = 1. - smoothstep(.72, 1., max(e.x, e.y));
  o = vec4(c * fade, fade);
}`;

const N = 200;
const EXAG = 2.2;
const HALF = puys.km / 2;

const hex = (v: string) => {
  const n = parseInt(v.trim().replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

function perspective(fov: number, asp: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
  return [f / asp, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
}
function lookAt(e: number[], t: number[]) {
  let z = [e[0] - t[0], e[1] - t[1], e[2] - t[2]];
  const zl = Math.hypot(...z); z = z.map((v) => v / zl);
  let x = [z[2], 0, -z[0]]; // up = (0,1,0) × z
  const xl = Math.hypot(...x) || 1; x = x.map((v) => v / xl);
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  const d = (a: number[]) => -(a[0] * e[0] + a[1] * e[1] + a[2] * e[2]);
  return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, d(x), d(y), d(z), 1];
}
function mul(a: number[], b: number[]) {
  const r = new Array(16).fill(0);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) r[j * 4 + i] += a[k * 4 + i] * b[j * 4 + k];
  return r;
}
const ease = (t: number) => t * t * (3 - 2 * t);

export default function Terrain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const hero = cv.closest<HTMLElement>(".hero")!;
    const gl = cv.getContext("webgl2", { antialias: true, alpha: true, powerPreference: "low-power" });
    if (!gl) return;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const pg = gl.createProgram()!;
    gl.attachShader(pg, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pg, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pg);
    if (!gl.getProgramParameter(pg, gl.LINK_STATUS)) return;
    gl.useProgram(pg);
    const u = (n: string) => gl.getUniformLocation(pg, n);
    const uVP = u("uVP"), uBg = u("uBg"), uFg = u("uFg"), uHi = u("uHi");
    gl.uniform1f(u("uExag"), EXAG);
    gl.uniform1f(u("uHalf"), HALF);
    gl.enable(gl.DEPTH_TEST);

    const marks = puys.marks.map((m) => ({ ...m, el: hero.querySelector<HTMLElement>(`[data-mark="${m.id}"]`), p: [0, 0, 0] }));
    const tele = hero.querySelector<HTMLElement>("[data-tele]");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true, ready = false, t = 0, last = 0, count = 0, w = 1, h = 1;
    const m = { x: 0, y: 0, tx: 0, ty: 0 };

    const colors = () => {
      const cs = getComputedStyle(document.documentElement);
      gl.uniform3fv(uBg, hex(cs.getPropertyValue("--bg")));
      gl.uniform3fv(uFg, hex(cs.getPropertyValue("--fg")));
      gl.uniform3fv(uHi, hex(cs.getPropertyValue("--accent")));
    };

    const img = new Image();
    img.decoding = "async";
    img.src = "/media/puys.png";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = N;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0, N, N);
      const px = ctx.getImageData(0, 0, N, N).data;
      const H = new Float32Array(N * N);
      for (let i = 0; i < N * N; i++) H[i] = puys.lo + (px[i * 4] / 255) * (puys.hi - puys.lo);
      const S = new Float32Array(N * N); // lissage 3×3 contre l'effet d'escalier 8 bits
      for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) {
          let s = 0, n = 0;
          for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
            const X = x + i, Y = y + j;
            if (X >= 0 && Y >= 0 && X < N && Y < N) { s += H[Y * N + X]; n++; }
          }
          S[y * N + x] = s / n;
        }
      const v = new Float32Array(N * N * 3);
      for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) {
          const k = (y * N + x) * 3;
          v[k] = (x / (N - 1) - 0.5) * puys.km;
          v[k + 1] = (S[y * N + x] / 1000) * EXAG;
          v[k + 2] = (y / (N - 1) - 0.5) * puys.km;
        }
      const idx = new Uint16Array((N - 1) * (N - 1) * 6);
      let q = 0;
      for (let y = 0; y < N - 1; y++)
        for (let x = 0; x < N - 1; x++) {
          const a = y * N + x;
          idx.set([a, a + N, a + 1, a + 1, a + N, a + N + 1], q); q += 6;
        }
      count = idx.length;
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pg, "a");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
      for (const mk of marks) {
        const X = Math.round(mk.u * (N - 1)), Y = Math.round(mk.v * (N - 1));
        mk.p = [(mk.u - 0.5) * puys.km, (S[Y * N + X] / 1000) * EXAG + 0.15, (mk.v - 0.5) * puys.km];
      }
      ready = true;
      colors();
      draw();
      cv.dataset.ready = "";
      start();
    };

    const progress = () => {
      const r = hero.getBoundingClientRect();
      return Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
    };

    const draw = () => {
      if (!ready) return;
      const p = progress();
      hero.style.setProperty("--p", p.toFixed(4));
      m.x += (m.tx - m.x) * 0.06; m.y += (m.ty - m.y) * 0.06;
      const e = ease(p), asp = w / h;
      // Vue carte : hauteur calée pour que la carte remplisse l'écran ; vue survol : oblique basse
      const top = Math.max(HALF * 1.05 / (Math.tan(0.35) * Math.min(asp, 1.6)), 12);
      const pitch = (1 - e) * 1.5699 + e * 0.42 - m.y * 0.06 * e;
      const dist = top * (1 - e) + 9.5 * e;
      const yaw = -0.15 + e * 0.9 + t * 0.018 + m.x * 0.12;
      const tgt = [0, 0.9 * e, 0.6 * e];
      const eye = [
        tgt[0] + Math.cos(pitch) * Math.sin(yaw) * dist,
        tgt[1] + Math.sin(pitch) * dist,
        tgt[2] + Math.cos(pitch) * Math.cos(yaw) * dist,
      ];
      const vp = mul(perspective(0.7, asp, 0.1, 200), lookAt(eye, tgt));
      gl.uniformMatrix4fv(uVP, false, vp);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);

      const cw = cv.clientWidth, ch = cv.clientHeight;
      for (const mk of marks) {
        if (!mk.el) continue;
        const [x, y, z] = mk.p;
        const cx = vp[0] * x + vp[4] * y + vp[8] * z + vp[12];
        const cy = vp[1] * x + vp[5] * y + vp[9] * z + vp[13];
        const cw4 = vp[3] * x + vp[7] * y + vp[11] * z + vp[15];
        const sx = (cx / cw4 * 0.5 + 0.5) * cw, sy = (0.5 - cy / cw4 * 0.5) * ch;
        const on = cw4 > 0 && sx > 40 && sx < cw - 40 && sy > 90 && sy < ch - 40;
        mk.el.style.transform = `translate3d(${sx.toFixed(1)}px,${sy.toFixed(1)}px,0)`;
        mk.el.toggleAttribute("data-on", on);
      }
      if (tele) {
        const deg = ((yaw * 180) / Math.PI + 360) % 360;
        tele.textContent = `INCL ${String(Math.round((pitch * 180) / Math.PI)).padStart(2, "0")}° · CAP ${String(Math.round(deg)).padStart(3, "0")}° · ÉCH ${p < 0.5 ? "1:25 000" : "3D ×2,2"}`;
      }
    };

    const loop = (now: number) => {
      t += Math.min((now - last) / 1000, 0.05); last = now;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (still || !visible || document.hidden || !ready) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, innerWidth < 768 ? 1.5 : 2);
      w = cv.width = Math.round(cv.clientWidth * dpr);
      h = cv.height = Math.round(cv.clientHeight * dpr);
      gl.viewport(0, 0, w, h);
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; start(); });
    io.observe(hero);
    const mo = new MutationObserver(() => { colors(); draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = matchMedia("(prefers-color-scheme: light)");
    const onScheme = () => { colors(); draw(); };
    scheme.addEventListener("change", onScheme);
    const onMove = (ev: PointerEvent) => { m.tx = ev.clientX / innerWidth - 0.5; m.ty = ev.clientY / innerHeight - 0.5; };
    const onScroll = () => { if (still) draw(); };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); mo.disconnect();
      scheme.removeEventListener("change", onScheme);
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="terrain" />;
}
