import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Logo, LogoSymbol } from "../components/Logo";
import Drone from "../components/Drone";
import ThemeToggle from "../components/ThemeToggle";
import { nav, site } from "../lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Volcadrone Auvergne" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Prise de vue aérienne Volcadrone" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0b" },
    { media: "(prefers-color-scheme: light)", color: "#ebe7dd" },
  ],
};

// Pictos réseaux sociaux (24×24, remplissage).
const icons = {
  Instagram: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z",
  YouTube: "M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
  TikTok: "M12.5 0h3.9c.1 1.5.6 3.1 1.8 4.2 1.1 1.1 2.7 1.6 4.2 1.8V10c-1.4 0-2.9-.4-4.2-1-.6-.3-1.1-.6-1.6-.9v8.7c-.1 1.4-.5 2.8-1.4 3.9a7.2 7.2 0 01-5.9 3.2c-1.4.1-2.9-.3-4.1-1A7.4 7.4 0 011.6 17v-1.5c.2-1.9 1.1-3.7 2.6-5 1.7-1.4 4-2.1 6.2-1.7v4.4c-1-.3-2.2-.2-3 .4-.6.4-1.1 1-1.4 1.7-.2.5-.1 1.1-.1 1.6.2 1.6 1.8 3 3.5 2.9 1.1 0 2.2-.7 2.8-1.6.2-.3.4-.7.4-1.1.1-1.8.1-3.6.1-5.4V0z",
  Facebook: "M24 12a12 12 0 10-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0024 12z",
} as const;

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tel = site.phone ? `tel:${site.phone}` : null;
  return (
    <html lang="fr" className={`${archivo.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="pb-[4.5rem] md:pb-0">
        <LogoSymbol />
        <a href="#contenu" className="btn btn-solid sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]">Aller au contenu</a>
        <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg">
          <div className="wrap flex h-16 items-center justify-between gap-6">
            <Link href="/" aria-label="Volcadrone Auvergne, retour à l'accueil" className="flex min-h-11 items-center">
              <Logo className="h-8 w-auto sm:h-9" />
            </Link>
            <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
              {nav.map((n, i) => (
                <Link key={n.href} href={n.href} className="mono group flex min-h-11 items-center gap-1.5 px-3 text-mute transition-colors hover:text-fg">
                  <span className="text-[10px] text-accent">0{i + 1}</span>{n.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/#contact" className="btn btn-solid hidden min-h-11 sm:inline-flex">Devis gratuit</Link>
            </div>
          </div>
        </header>

        <main id="contenu">{children}</main>

        <footer className="overflow-hidden border-t border-line bg-bg">
          <div className="wrap grid gap-8 py-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-14">
            <div className="relative pt-16 sm:pt-24">
              <Drone className="patrol absolute top-0 z-10 w-24 sm:w-32 lg:w-36" />
              <Logo className="relative block h-auto w-full opacity-95" />
            </div>
            <div className="grid gap-6">
              <p className="display text-4xl sm:text-5xl">On se voit <span className="serif text-accent">là-haut.</span></p>
              <nav aria-label="Pied de page">
                <ul className="mono flex flex-wrap gap-x-5 text-mute">
                  {[...nav, { href: "/#contact", label: "Contact" }, { href: "/mentions-legales", label: "Mentions légales" }].map((n) => (
                    <li key={n.href}><Link href={n.href} className="inline-flex min-h-11 items-center hover:text-fg">{n.label}</Link></li>
                  ))}
                </ul>
              </nav>
              <ul className="flex flex-wrap gap-2">
                <li className="w-full">
                  <a href={`mailto:${site.email}`} className="mono inline-flex min-h-11 items-center gap-2 border border-line2 px-3 transition-colors hover:border-fg">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg>
                    {site.email}
                  </a>
                </li>
                {site.socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (nouvel onglet)`} title={s.name}
                      className="grid size-11 place-items-center border border-line2 transition-colors hover:border-brand hover:bg-brand hover:text-ink">
                      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true"><path d={icons[s.name as keyof typeof icons]} /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="wrap mono flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line py-4 text-[11px] text-mute">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <span>Relief : Terrain Tiles (Mapzen) · SRTM · EU-DEM © Copernicus</span>
          </div>
        </footer>

        <nav aria-label="Actions rapides" className="fixed inset-x-0 bottom-0 z-50 grid auto-cols-fr grid-flow-col border-t border-line bg-bg md:hidden">
          {tel && <a href={tel} className="mono flex min-h-14 items-center justify-center border-r border-line">Appeler</a>}
          {tel && <a href={`https://wa.me/${site.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="mono flex min-h-14 items-center justify-center border-r border-line">WhatsApp</a>}
          {!tel && <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="mono flex min-h-14 items-center justify-center border-r border-line">Prendre RDV</a>}
          <Link href="/#contact" className="mono flex min-h-14 items-center justify-center bg-brand pb-[env(safe-area-inset-bottom)] text-ink">Devis gratuit →</Link>
        </nav>
      </body>
    </html>
  );
}
