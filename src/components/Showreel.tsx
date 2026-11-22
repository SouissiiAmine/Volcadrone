"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

const tc = (s: number) => {
  const f = Math.floor((s % 1) * 24);
  const p = (n: number) => String(n).padStart(2, "0");
  return `00:${p(Math.floor(s / 60))}:${p(Math.floor(s % 60))}:${p(f)}`;
};

// Showreel vu à travers l'écran de contrôle du pilote.
export default function Showreel({ poster }: { poster: StaticImageData }) {
  const ref = useRef<HTMLVideoElement>(null);
  const time = useRef<HTMLSpanElement>(null);
  const paused = useRef(false);
  const [playing, setPlaying] = useState(false);

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

  return (
    <div className="relative aspect-square overflow-hidden bg-ink text-[#ece8de] sm:aspect-video">
      <Image src={poster} alt="" fill placeholder="blur" sizes="100vw" className="object-contain sm:object-cover" />
      <video ref={ref} muted loop playsInline preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-contain sm:object-cover"
        aria-label="Showreel Volcadrone : poursuite aérienne en drone FPV">
        <source src="/media/showreel.webm" type="video/webm" />
        <source src="/media/showreel.mp4" type="video/mp4" />
      </video>
      {/* Interface du viseur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 p-4 sm:p-8">
        <div className="absolute inset-4 border border-white/25 sm:inset-8" />
        <div className="absolute inset-x-[12%] inset-y-[12%] hidden border border-dashed sm:block border-white/20" />
        <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-1/2 top-0 h-full w-px bg-white/60" /><span className="absolute left-0 top-1/2 h-px w-full bg-white/60" />
        </div>
        <div className="mono relative flex justify-between gap-4 p-3 text-[#ece8de] [text-shadow:0_1px_2px_#000]">
          <span><span className={playing ? "rec text-signal" : "text-signal"}>●</span> {playing ? "REC" : "STBY"} · <span ref={time}>00:00:00:00</span></span>
          <span className="hidden sm:inline">4K · 24 IPS · FPV</span>
          <span>▮▮▮▯ 74 %</span>
        </div>
        <div className="mono absolute inset-x-4 bottom-4 flex justify-between p-3 [text-shadow:0_1px_2px_#000] sm:inset-x-8 sm:bottom-8">
          <span>ALT 38 M</span><span>VIT 54 KM/H</span>
        </div>
      </div>
      <button type="button" onClick={toggle} aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
        className="absolute bottom-6 left-1/2 grid size-12 -translate-x-1/2 place-items-center bg-brand text-ink transition-transform hover:scale-110 sm:bottom-20 sm:size-14">
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>
    </div>
  );
}
