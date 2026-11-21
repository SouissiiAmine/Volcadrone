"use client";

import { useEffect } from "react";

// Souris : position du curseur pour les aperçus [data-follow].
// Tactile : les effets de survol se déclenchent quand l'élément passe au centre de l'écran (data-live).
export default function Fx() {
  useEffect(() => {
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element).closest<HTMLElement>("[data-follow]");
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      addEventListener("pointermove", onMove, { passive: true });
      return () => removeEventListener("pointermove", onMove);
    }
    // Bande centrale de l'écran ; dans un carrousel, la carte doit aussi être visible à plus de 60 % en largeur.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const wide = e.intersectionRect.width / e.boundingClientRect.width > 0.6;
        const on = e.isIntersecting && wide;
        e.target.toggleAttribute("data-live", on);
        if (on) e.target.setAttribute("data-seen", "");
      }),
      { rootMargin: "-32% 0px -32% 0px", threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    document.querySelectorAll(".svc, .frame, .kit, .stamp").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
