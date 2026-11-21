"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { region } from "../lib/geo";
import { pricing } from "../lib/site";

/* ---------- Avant / après : glisser pour comparer ---------- */
export function Compare({ src, alt }: { src: StaticImageData; alt: string }) {
  const [x, setX] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const touched = useRef(false);

  // Premier passage à l'écran : le curseur fait un aller-retour pour montrer qu'il se glisse.
  useEffect(() => {
    const el = box.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min((t - t0) / 1800, 1);
        if (touched.current) return;
        setX(50 - Math.sin(k * Math.PI * 2) * 22 * (1 - k * 0.3));
        if (k < 1) raf = requestAnimationFrame(tick);
        else setX(50);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const at = (cx: number) => {
    touched.current = true;
    const r = box.current!.getBoundingClientRect();
    setX(Math.min(Math.max(((cx - r.left) / r.width) * 100, 0), 100));
  };
  return (
    <div ref={box} className="cmp relative aspect-[4/3] touch-pan-y select-none overflow-hidden bg-bg2 sm:aspect-[16/9]"
      style={{ "--x": `${x}%` } as React.CSSProperties}
      onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); at(e.clientX); }}
      onPointerMove={(e) => drag.current && at(e.clientX)}
      onPointerUp={() => { drag.current = false; }}>
      <Image src={src} alt={alt} fill placeholder="blur" sizes="(min-width: 1472px) 1376px, 100vw" className="object-cover" />
      <div className="raw absolute inset-0">
        <Image src={src} alt="" fill sizes="(min-width: 1472px) 1376px, 100vw" className="object-cover" />
      </div>
      <span className="mono absolute left-3 top-3 bg-ink/80 px-2 py-1 text-[#ece8de]">Brut · profil plat</span>
      <span className="mono absolute right-3 top-3 bg-brand px-2 py-1 text-ink">Étalonné</span>
      <div className="bar pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-brand">
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center bg-brand text-ink">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
        </span>
      </div>
      <input type="range" min={0} max={100} value={Math.round(x)} onChange={(e) => { touched.current = true; setX(+e.target.value); }}
        aria-label="Comparer l'image brute et l'image étalonnée" className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
    </div>
  );
}

/* ---------- Carte de couverture ---------- */
export function Coverage() {
  const [sel, setSel] = useState(4);
  const c = region.cities[sel];
  const rings = [25, 50, 100];
  const pct = (km: number) => (km / region.kmPerPct) * 2;
  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
      <div className="relative mx-auto w-full max-w-[40rem] [perspective:1400px]">
        <div className="map3d relative" style={{ aspectRatio: region.ratio }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/auvergne.webp" alt="" loading="lazy" decoding="async" className="relief absolute inset-0 size-full" />
          <div className="absolute inset-0 border border-line2" />
          {rings.map((r) => (
            <div key={r} className="ring absolute" style={{ left: `${region.home.x}%`, top: `${region.home.y}%`, width: `${pct(r)}%`, aspectRatio: 1 }}>
              <span className="mono absolute -top-2 left-1/2 -translate-x-1/2 bg-bg px-1 text-[10px] text-mute">{r} km</span>
            </div>
          ))}
          <div className="ring ring-pulse absolute border-brand" style={{ left: `${region.home.x}%`, top: `${region.home.y}%`, aspectRatio: 1 }} />
          <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1={region.home.x} y1={region.home.y} x2={c.x} y2={c.y} stroke="#5ceb0f" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>
          {region.peaks.map((p) => (
            <span key={p.name} className="pin mono absolute whitespace-nowrap text-[10px] text-mute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>▲ {p.alt}</span>
          ))}
          {region.cities.map((ct, i) => (
            <button key={ct.name} type="button" onClick={() => setSel(i)} aria-label={`${ct.name}, ${ct.km} km`}
              className="pin absolute grid size-8 place-items-center" style={{ left: `${ct.x}%`, top: `${ct.y}%` }}>
              <span className={`block size-2.5 rotate-45 ${i === 0 ? "bg-brand" : i === sel ? "bg-brand outline outline-2 outline-offset-2 outline-brand" : "bg-fg"}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mono text-mute">Destination</p>
        <p className="display mt-2 text-6xl sm:text-7xl">{c.name}</p>
        <p className="mt-4 flex items-baseline gap-3">
          <span className="display text-[7rem] leading-none text-accent sm:text-[9rem]">{c.km}</span>
          <span className="serif text-3xl">km à vol d&apos;oiseau</span>
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {region.cities.slice(1).map((ct, i) => (
            <li key={ct.name}>
              <button type="button" onClick={() => setSel(i + 1)} aria-pressed={sel === i + 1}
                className={`mono min-h-11 border px-3 transition-colors ${sel === i + 1 ? "border-brand bg-brand text-ink" : "border-line2 hover:border-fg"}`}>
                {ct.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Estimateur ---------- */
const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n / 10) * 10);

export function Estimator() {
  const [type, setType] = useState(pricing.types[1].id);
  const [dur, setDur] = useState(pricing.durations[0].id);
  const [opts, setOpts] = useState<string[]>([]);
  const [city, setCity] = useState(0);
  const total = useMemo(() => {
    const t = pricing.types.find((x) => x.id === type)!;
    const d = pricing.durations.find((x) => x.id === dur)!;
    const km = region.cities[city].km;
    const travel = Math.max(km - pricing.travel.freeKm, 0) * 2 * pricing.travel.perKm;
    return t.base * d.mult + opts.reduce((s, o) => s + pricing.options.find((x) => x.id === o)!.price, 0) + travel;
  }, [type, dur, opts, city]);
  const [shown, setShown] = useState(total);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setShown((s) => {
        const n = s + (total - s) * 0.18;
        if (Math.abs(total - n) > 1) raf = requestAnimationFrame(tick);
        return Math.abs(total - n) > 1 ? n : total;
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  const send = () => {
    const t = pricing.types.find((x) => x.id === type)!.label;
    const d = pricing.durations.find((x) => x.id === dur)!.label;
    const o = opts.map((id) => pricing.options.find((x) => x.id === id)!.label).join(", ") || "aucune";
    const msg = `Estimation en ligne : ${t}, ${d}, lieu : ${region.cities[city].name}. Options : ${o}. Fourchette : ${fmt(total * 0.9)} – ${fmt(total * 1.15)} € ${pricing.tax}.\n\n`;
    window.dispatchEvent(new CustomEvent("estimate", { detail: { msg, subject: type === "inspection" ? "inspection" : "commercial" } }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const Seg = <T extends { id: string; label: string }>({ name, items, value, set }: { name: string; items: readonly T[]; value: string; set: (v: string) => void }) => (
    <fieldset>
      <legend className="mono mb-3 text-mute">{name}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <button key={it.id} type="button" aria-pressed={value === it.id} onClick={() => set(it.id)}
            className={`min-h-12 border px-4 text-lg transition-colors ${value === it.id ? "border-fg bg-fg text-bg" : "border-line2 hover:border-fg"}`}>{it.label}</button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid border border-line2 lg:grid-cols-[1.4fr_1fr]">
      <div className="grid gap-8 p-6 sm:p-10">
        {Seg({ name: "01 · Prestation", items: pricing.types, value: type, set: setType })}
        {Seg({ name: "02 · Durée sur site", items: pricing.durations, value: dur, set: setDur })}
        <div>
          <label htmlFor="est-city" className="mono mb-3 block text-mute">03 · Lieu du tournage</label>
          <select id="est-city" value={city} onChange={(e) => setCity(+e.target.value)} className="field">
            {region.cities.map((c, i) => <option key={c.name} value={i}>{c.name} ({c.km} km)</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="mono mb-3 text-mute">04 · Options</legend>
          <div className="flex flex-wrap gap-2">
            {pricing.options.map((o) => {
              const on = opts.includes(o.id);
              return (
                <button key={o.id} type="button" aria-pressed={on} onClick={() => setOpts(on ? opts.filter((x) => x !== o.id) : [...opts, o.id])}
                  className={`min-h-12 border px-4 transition-colors ${on ? "border-brand bg-brand text-ink" : "border-line2 hover:border-fg"}`}>
                  {on ? "✓ " : "+ "}{o.label} <span className="mono opacity-70">{o.price} €</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col justify-between gap-8 bg-ink p-6 text-[#ece8de] sm:p-10">
        <div>
          <p className="mono text-[#9c9588]">Estimation indicative</p>
          <p className="display mt-4 text-[clamp(4rem,9vw,7.5rem)] tabular-nums text-brand" aria-live="polite">
            {fmt(shown * 0.9)}<span className="serif text-[0.45em] text-[#ece8de]"> à </span>{fmt(shown * 1.15)}<span className="text-[0.5em]"> €</span>
          </p>
          <p className="mono mt-3 text-[#9c9588]">{pricing.tax} · déplacement inclus · devis définitif après échange</p>
        </div>
        <button type="button" onClick={send} className="btn btn-solid w-full">
          Envoyer cette estimation
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
