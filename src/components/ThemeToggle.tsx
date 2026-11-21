"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const el = document.documentElement;
    const current = el.dataset.theme ?? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "dark" ? "light" : "dark";
    el.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label="Basculer entre thème clair et sombre"
      className="grid size-11 place-items-center border border-line2 transition-colors hover:border-fg">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
        <path d="M12 7.8a4.2 4.2 0 000 8.4z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
