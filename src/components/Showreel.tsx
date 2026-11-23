"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

const tc = (s: number) => {
  const f = Math.floor((s % 1) * 24);
  const p = (n: number) => String(n).padStart(2, "0");
  return `00:${p(Math.floor(s / 60))}:${p(Math.floor(s % 60))}:${p(f)}`;
};

// Showreel vertical (9:16) vu à travers l'écran de contrôle du pilote.
// Sans `src`, l'ancien showreel 16:9 s'affiche en entier au centre du cadre.
export default function Showreel({ src, poster }: { src?: string; poster: StaticImageData }) {
  const ref = useRef<HTMLVideoElement>(null);
  const time = useRef<HTMLSpanElement>(null);
  const paused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const fit = src ? "object-cover" : "object-contain";

  useEffect(() => {
    const v = ref.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => { if (time.current) time.current.textContent = tc(v.currentTime); raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!still && !paused.current) v.play().catch(() => {});
    }, { threshold: 0.4 });
    io.observe(v);
    v.addEventListener("play", () => { raf = requestAnimationFrame(tick); });
    v.addEventListener("pause", () => cancelAnimationFrame(raf));
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const toggle = () => {
    const v = ref.current!;
    if (v.paused) { paused.current = false; v.play().catch(() => {}); }
    else { paused.current = true; v.pause(); }
  };
  const sound = () => {
    const v = ref.current!;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) { paused.current = false; v.play().catch(() => {}); }
  };

  const btn = "grid size-12 place-items-center transition-transform hover:scale-110";
  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border-[6px] border-[#0b0a09] bg-ink text-[#ece8de] shadow-2xl">
      <Image src={poster} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 384px, 90vw" className={fit} />
      <video ref={ref} muted loop playsInline preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        className={`absolute inset-0 size-full ${fit}`}
        aria-label="Showreel Volcadrone : vidéo verticale tournée en drone FPV et au sol">
        {src ? <source src={src} type="video/mp4" /> : <>
          <source src="/media/showreel.webm" type="video/webm" />
          <source src="/media/showreel.mp4" type="video/mp4" />
        </>}
      </video>
      {/* Interface du viseur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 p-3 text-[11px]">
        <div className="absolute inset-3 border border-white/25" />
        <div className="absolute inset-x-[10%] inset-y-[14%] border border-dashed border-white/20" />
        <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-1/2 top-0 h-full w-px bg-white/60" /><span className="absolute left-0 top-1/2 h-px w-full bg-white/60" />
        </div>
        <div className="mono relative flex justify-between gap-2 p-3 [text-shadow:0_1px_2px_#000]">
          <span><span className={playing ? "rec text-signal" : "text-signal"}>●</span> {playing ? "REC" : "STBY"} · <span ref={time}>00:00:00:00</span></span>
          <span>9:16</span>
        </div>
        <div className="mono absolute inset-x-3 bottom-3 flex justify-between p-3 [text-shadow:0_1px_2px_#000]">
          <span>ALT 38 M</span><span>VIT 54 KM/H</span>
        </div>
      </div>
      <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-2">
        <button type="button" onClick={toggle} aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"} className={`${btn} bg-brand text-ink`}>
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
            {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
        <button type="button" onClick={sound} aria-label={muted ? "Activer le son" : "Couper le son"} aria-pressed={!muted} className={`${btn} border border-white/40 bg-black/50 backdrop-blur`}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
            {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M17 8.5a5 5 0 010 7M19.5 6a8.5 8.5 0 010 12" />}
          </svg>
        </button>
      </div>
    </div>
  );
}
