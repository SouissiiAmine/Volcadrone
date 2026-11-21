import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import Drone from "../components/Drone";
import Fx from "../components/Fx";
import { Compare, Coverage, Estimator } from "../components/Interactive";
import Showreel from "../components/Showreel";
import Terrain from "../components/Terrain";
import { puys } from "../lib/geo";
import { credentials, faq, fleet, pricing, sectors, services, site, steps } from "../lib/site";
import agriculture from "../media/agriculture.webp";
import automobile from "../media/automobile.webp";
import evenement from "../media/evenement.webp";
import immobilier from "../media/immobilier.webp";
import industrie from "../media/industrie.webp";
import inspection from "../media/inspection.webp";
import institutions from "../media/institutions.webp";
import medias from "../media/medias.webp";
import nautisme from "../media/nautisme.webp";
import poster from "../media/poster.webp";
import sport from "../media/sport.webp";
import tourisme from "../media/tourisme.webp";

const photos: Record<(typeof sectors)[number]["key"], StaticImageData> = {
  immobilier, tourisme, automobile, agriculture, industrie, institutions, medias, sport, nautisme,
};
const servicePhotos = [evenement, inspection, immobilier, medias];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      image: `${site.url}/og.jpg`,
      description: site.description,
      email: site.email,
      ...(site.phone ? { telephone: site.phone } : {}),
      priceRange: `${pricing.packs[0].from} € – ${pricing.packs[2].from} €+`,
      address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "FR" },
      areaServed: [{ "@type": "AdministrativeArea", name: site.region }, { "@type": "Country", name: "France" }],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "12:00" },
      ],
      sameAs: site.socials.map((s) => s.url),
    },
    { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const Marks = () => (<><i className="cm" /><i className="cm" /><i className="cm" /><i className="cm" /></>);

function Sec({ n, label, title, accent, text }: { n: string; label: string; title: string; accent?: string; text?: React.ReactNode }) {
  return (
    <header className="mb-12 sm:mb-16">
      <div className="mono flex items-center gap-4 border-t border-line2 pt-3 text-mute">
        <span className="text-accent">§ {n}</span><span>{label}</span>
        <span className="grow" /><span className="hidden sm:inline">45°46′N · 3°05′E</span>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <h2 className="display reveal text-[clamp(3.2rem,9vw,8.5rem)]">
          {title}{accent && <> <span className="serif text-accent">{accent}</span></>}
        </h2>
        {text && <p className="reveal max-w-md text-lg leading-relaxed text-mute lg:justify-self-end">{text}</p>}
      </div>
    </header>
  );
}

function Stamp({ i, title, sub, refNo }: { i: number; title: string; sub: string; refNo: string }) {
  const id = `ring-${i}`;
  return (
    <li className="stamp flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative grid size-20 shrink-0 sm:size-24 place-items-center text-accent" style={{ rotate: `${(i % 2 ? 1 : -1) * (4 + i * 3)}deg` }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
          <defs><path id={id} d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" /></defs>
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" strokeWidth=".8" />
          <text fontSize="8.4" letterSpacing="2.2" fill="currentColor" fontFamily="var(--font-mono)"><textPath href={`#${id}`}>VOLCADRONE · AUVERGNE · CERTIFIÉ · </textPath></text>
        </svg>
        <span className="display text-3xl">0{i + 1}</span>
      </div>
      <div>
        <p className="font-semibold leading-tight sm:text-lg">{title}</p>
        <p className="text-sm text-mute">{sub}</p>
        {refNo && <p className="mono mt-1 text-accent">N° {refNo}</p>}
      </div>
    </li>
  );
}

function Drawing({ kind }: { kind: (typeof fleet)[number]["kind"] }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, vectorEffect: "non-scaling-stroke" as const };
  const layer = "absolute inset-0 size-full";
  if (kind === "post")
    return (
      <div className="explode relative mx-auto size-56">
        <svg viewBox="0 0 100 100" className={layer}><rect x="10" y="10" width="80" height="80" {...s} strokeDasharray="2 3" /></svg>
        <svg viewBox="0 0 100 100" className={layer}><rect x="18" y="22" width="64" height="40" {...s} /><path d="M18 70h64M18 76h40" {...s} /></svg>
        <svg viewBox="0 0 100 100" className={layer}><path d="M24 54l12-14 10 8 14-18 16 24" {...s} stroke="#5ceb0f" /></svg>
        <svg viewBox="0 0 100 100" className={layer}><circle cx="70" cy="30" r="5" {...s} /></svg>
      </div>
    );
  const fpv = kind === "fpv";
  return (
    <div className="explode relative mx-auto size-56">
      <svg viewBox="0 0 100 100" className={layer}><rect x="10" y="10" width="80" height="80" {...s} strokeDasharray="2 3" /></svg>
      <svg viewBox="0 0 100 100" className={layer}>
        <path d={fpv ? "M28 28L72 72M72 28L28 72" : "M30 30l14 14M70 30L56 44M30 70l14-14M70 70L56 56"} {...s} strokeWidth={2} />
        <rect x={fpv ? 40 : 40} y="40" width="20" height="20" {...s} />
      </svg>
      <svg viewBox="0 0 100 100" className={layer}>
        {[[28, 28], [72, 28], [28, 72], [72, 72]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={fpv ? 11 : 15} {...s} strokeDasharray="1 2" />)}
      </svg>
      <svg viewBox="0 0 100 100" className={layer}>
        {fpv ? <path d="M44 36h12v-6H44z" {...s} stroke="#5ceb0f" /> : <><circle cx="50" cy="66" r="5" {...s} stroke="#5ceb0f" /><path d="M50 60v-8" {...s} stroke="#5ceb0f" /></>}
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Fx />

      {/* ---------- Hero : la carte devient territoire ---------- */}
      <section className="hero relative h-[260svh]" aria-label="Accueil">
        <div className="sticky top-0 h-svh overflow-hidden">
          <Terrain />
          {puys.marks.map((m) => (
            <div key={m.id} data-mark={m.id} aria-hidden="true" className="mark pointer-events-none">
              <div className="mono -translate-x-1/2 -translate-y-full whitespace-nowrap pb-1 text-center">
                <span className="bg-bg px-1">{m.label}{m.alt ? ` · ${m.alt} m` : ""}</span>
                <span className="mx-auto mt-1 block h-6 w-px bg-fg" />
                <span className={`mx-auto block size-2 rotate-45 ${m.id === "dome" ? "bg-brand" : "bg-fg"}`} />
              </div>
            </div>
          ))}
          {/* Mobile : le drone du pied de page survole la carte, puis s'efface dès qu'on défile */}
          <div className="hero-drone absolute right-[5%] top-[15svh] z-10 w-36 sm:hidden">
            <Drone className="fade-in [--d:0.5s]" />
          </div>

          <div className="wrap pointer-events-none relative flex h-full flex-col justify-between pb-20 pt-20 sm:pb-10">
            <div className="mono flex justify-between gap-4 text-mute">
              <span className="fade-in" style={{ "--d": "0.2s" } as React.CSSProperties}>Carte 01 — Chaîne des Puys<br />Équidistance 20 m</span>
              <span data-tele className="fade-in hidden text-right sm:block" style={{ "--d": "0.3s" } as React.CSSProperties}>INCL 90° · CAP 351° · ÉCH 1:25 000</span>
            </div>

            <div className="hero-copy grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
              <div>
                <p className="mono fade-in mb-6 hidden text-accent sm:block" style={{ "--d": "0.1s" } as React.CSSProperties}>Captation aérienne par drone · {site.city}</p>
                <h1 className="display line-in text-[clamp(3.4rem,min(12.5vw,15.5svh),13rem)]">
                  <span><span style={{ "--i": 0 } as React.CSSProperties}>Vos projets</span></span>
                  <span><span style={{ "--i": 1 } as React.CSSProperties}>prennent</span></span>
                  <span>
                    <span style={{ "--i": 2 } as React.CSSProperties} className="relative">
                      <span className="serif text-[0.9em] lowercase">de l&apos;altitude.</span>
                      <svg className="scribble absolute -inset-x-[4%] -bottom-[6%] h-[30%] w-[108%] text-brand" viewBox="0 0 300 30" preserveAspectRatio="none" fill="none" aria-hidden="true">
                        <path pathLength={1} d="M4 22C60 8 140 6 296 14M20 27c80-8 170-10 260-6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </span>
                </h1>
              </div>
              <div className="fade-in pointer-events-auto" style={{ "--d": "0.7s" } as React.CSSProperties}>
                <p className="hidden text-lg leading-relaxed sm:block">Prises de vues aériennes et vol FPV cinématique, du tournage au montage final, pour montrer votre projet dans son territoire.</p>
                <div className="grid gap-2 sm:mt-6">
                  <Link href="/#contact" className="btn btn-solid">Demander un devis gratuit <Arrow /></Link>
                  <Link href="/#showreel" className="btn hidden bg-bg sm:flex">Voir le showreel <Arrow /></Link>
                </div>
              </div>
            </div>

            <div className="hero-after absolute inset-x-0 bottom-10 sm:bottom-14">
              <div className="wrap">
                <p className="display text-[clamp(3rem,10vw,9rem)]">La carte <span className="serif text-accent">devient</span><br />territoire.</p>
                <p className="mono mt-4 max-w-md text-mute">Relief réel de la Chaîne des Puys, Patrimoine mondial de l&apos;UNESCO, notre terrain de jeu quotidien.</p>
              </div>
            </div>

            <div className="scroll-cue mono absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mute lg:flex">
              <span>Défiler pour décoller</span><i />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Garanties ---------- */}
      <section aria-label="Garanties" className="border-y border-line bg-bg2">
        <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-8 py-10 lg:grid-cols-4">
          {credentials.map((c, i) => <Stamp key={c.title} i={i} title={c.title} sub={c.sub} refNo={c.ref} />)}
        </ul>
      </section>

      {/* ---------- 01 Services ---------- */}
      <section id="services" className="wrap py-24 sm:py-36">
        <Sec n="01" label="Services" title="Quatre métiers," accent="un pilote." text="De la prise de vue à la publication : captation, montage et formats adaptés à chaque canal." />
        <ol className="border-b border-line2">
          {services.map((s, i) => (
            <li key={s.title} data-follow className="svc relative grid gap-3 border-t border-line2 py-8 sm:grid-cols-[5rem_1.3fr_1fr] sm:gap-8 sm:py-10">
              <span className="mono text-accent">0{i + 1}</span>
              <div className="svc-t">
                <h3 className="display text-[clamp(2.4rem,5vw,4.5rem)]">{s.title}</h3>
                <p className="mono mt-3 text-mute">{s.target}</p>
              </div>
              <p className="max-w-md leading-relaxed text-mute sm:self-end">{s.text}</p>
              <div className="peek overflow-hidden shadow-2xl" aria-hidden="true">
                <Image src={servicePhotos[i]} alt="" fill sizes="(hover: none) 100vw, 288px" className="object-cover" />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- 02 Showreel ---------- */}
      <section id="showreel" className="py-24 sm:py-36">
        <div className="wrap">
          <Sec n="02" label="Showreel" title="Dans le" accent="viseur." text="Le drone FPV suit l'action au plus près : des trajectoires impossibles à obtenir autrement." />
        </div>
        <div className="wrap"><div className="crop"><Marks /><Showreel poster={poster} /></div></div>
      </section>

      {/* ---------- 03 Étalonnage ---------- */}
      <section id="etalonnage" className="wrap py-24 sm:py-36">
        <Sec n="03" label="Avant / après" title="Le brut," accent="puis le fini." text="Nous filmons en profil plat pour garder toute l'information de l'image, puis l'étalonnage révèle couleurs et contrastes. Glissez pour comparer." />
        <div className="crop"><Marks /><Compare src={inspection} alt="Vue aérienne zénithale d'un bâtiment en automne, image étalonnée" /></div>
        <p className="mono mt-3 text-mute">Démonstration : le profil plat est simulé à partir de l&apos;image finale.</p>
      </section>

      {/* ---------- 04 Secteurs : planche contact ---------- */}
      <section id="secteurs" className="sheet py-24 sm:py-36">
        <div className="wrap [--line2:rgb(236_232_222/0.32)] [--mute:#9c9588] [--accent:#5ceb0f]">
          <Sec n="04" label="Secteurs" title="Planche" accent="contact." text={<>De l&apos;immobilier au nautisme, chaque métier a son angle. <span className="hover-only">Survolez une image</span><span className="touch-only">Faites défiler les images</span> pour les entourer au crayon gras.</>} />
        </div>
        <div className="sprockets" aria-hidden="true" />
        <ul className="snapx wrap flex snap-x snap-mandatory gap-3 overflow-x-auto py-3 md:grid md:grid-cols-3 md:overflow-visible">
          {sectors.map((s, i) => (
            <li key={s.key} className="frame w-[80%] shrink-0 snap-center md:w-auto">
              <article className="relative">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={photos[s.key]} alt={`${s.title} : prise de vue aérienne`} fill placeholder="blur" sizes="(min-width: 1472px) 450px, (min-width: 768px) 31vw, 80vw" className="object-cover" />
                </div>
                <svg className="circle pointer-events-none absolute -inset-3 size-[calc(100%+1.5rem)] text-signal" viewBox="0 0 100 66" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path pathLength={1} d="M50 4C80 3 97 14 96 33S78 63 48 62 3 52 4 32 24 4 56 6" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                </svg>
                <div className="mono mt-2 flex justify-between gap-3 text-[#9c9588]">
                  <span className="text-brand">{String(i + 1).padStart(2, "0")}A ▸</span>
                  <span>VOLCADRONE 400</span>
                </div>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-[#9c9588]">{s.text}</p>
              </article>
            </li>
          ))}
        </ul>
        <div className="sprockets" aria-hidden="true" />
      </section>

      {/* ---------- 05 Zone ---------- */}
      <section id="zone" className="wrap overflow-x-clip py-24 sm:py-36">
        <Sec n="05" label="Zone d'intervention" title="Toute l'Auvergne," accent="et au-delà." text="Basés à Clermont-Ferrand, nous intervenons dans toute la région Auvergne-Rhône-Alpes et partout en France sur demande." />
        <Coverage />
      </section>

      {/* ---------- 06 Méthode : journal de vol ---------- */}
      <section id="methode" className="border-y border-line bg-bg2 py-24 sm:py-36">
        <div className="wrap">
          <Sec n="06" label="Méthode" title="Plan de" accent="vol." />
          <div className="relative">
            <svg className="absolute inset-x-0 top-6 hidden h-24 w-full md:block" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path className="wp-line" pathLength={1} d="M10 50C150 0 250 100 340 50S560 0 670 50 880 100 990 50" stroke="#5ceb0f" strokeWidth="2" strokeDasharray="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="reveal">
                  <span className="grid size-14 place-items-center border border-fg bg-bg2 font-mono text-sm">WP{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-6 text-5xl">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-mute">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- 07 Matériel ---------- */}
      <section id="materiel" className="wrap py-24 sm:py-36">
        <Sec n="07" label="Matériel" title="Vue" accent="éclatée." text={<><span className="hover-only">Survolez un équipement</span><span className="touch-only">Faites glisser les équipements</span> pour les démonter. Le bon outil pour chaque plan, du survol stabilisé à l&apos;immersion FPV.</>} />
        <ul className="snapx -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-0 md:overflow-visible md:border-l md:border-t md:border-line2 md:px-0 md:pb-0">
          {fleet.map((f, i) => (
            <li key={f.name} tabIndex={0} className="kit w-[86%] shrink-0 snap-center border border-line2 p-6 outline-none sm:w-[60%] sm:p-8 md:w-auto md:border-l-0 md:border-t-0">
              <div className="mono flex justify-between text-mute"><span>Fig. {i + 1}</span><span>{f.role}</span></div>
              <div className="py-10 [perspective:900px]"><Drawing kind={f.kind} /></div>
              <h3 className="display text-4xl">{f.name}</h3>
              <dl className="mt-5 grid gap-2 border-t border-line pt-4 text-sm">
                {f.specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3"><dt className="mono text-mute">{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- 08 Tarifs ---------- */}
      <section id="tarifs" className="border-t border-line bg-bg2 py-24 sm:py-36">
        <div className="wrap">
          <Sec n="08" label="Tarifs" title="Cartes d'" accent="embarquement." text={`Trois formules pour décoller, ou une estimation sur mesure en 20 secondes. Prix ${pricing.tax}, à partir de.`} />
          <ul className="snapx -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {pricing.packs.map((p) => (
              <li key={p.code} className={`ticket reveal flex w-[86%] shrink-0 snap-center flex-col sm:w-[60%] lg:w-auto ${p.featured ? "bg-brand text-ink [--line2:rgb(17_16_13/0.4)]" : "bg-bg"}`} style={{ "--cut": "68%" } as React.CSSProperties}>
                <div className="flex-1 p-7">
                  <div className="mono flex justify-between"><span>CFE → {p.code}</span><span>{p.featured ? "★ Le plus demandé" : "Classe éco"}</span></div>
                  <p className="display mt-8 text-6xl">{p.name}</p>
                  <p className="serif text-2xl">{p.kind}</p>
                  <ul className="mt-6 grid gap-2">
                    {p.items.map((it) => <li key={it} className="flex gap-3"><span aria-hidden="true">—</span>{it}</li>)}
                  </ul>
                </div>
                <div className="perf mx-5" aria-hidden="true" />
                <div className="flex items-end justify-between gap-4 p-7">
                  <div>
                    <p className="mono opacity-70">À partir de</p>
                    <p className="display text-6xl sm:text-7xl">{p.from} €</p>
                  </div>
                  <span className="barcode h-12 w-16 opacity-80 sm:h-14 sm:w-24" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <p className="mono mb-4 text-mute">Estimateur · plan de vol personnalisé</p>
            <Estimator />
          </div>
        </div>
      </section>

      {/* ---------- 09 FAQ ---------- */}
      <section id="faq" className="wrap py-24 sm:py-36">
        <Sec n="09" label="FAQ" title="Questions" accent="fréquentes." />
        <div className="border-b border-line2">
          {faq.map((f, i) => (
            <details key={f.q} className="group border-t border-line2">
              <summary className="grid min-h-20 grid-cols-[3rem_1fr_auto] items-center gap-4 py-5">
                <span className="mono text-accent">Q{i + 1}</span>
                <span className="text-xl font-medium sm:text-3xl">{f.q}</span>
                <svg viewBox="0 0 24 24" className="chev size-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 4v16M4 12h16" /></svg>
              </summary>
              <p className="serif max-w-3xl pb-8 pl-16 text-2xl leading-snug text-mute sm:text-3xl">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- 10 Contact ---------- */}
      <section id="contact" className="border-t border-line bg-bg2 py-24 sm:py-36">
        <div className="wrap">
          <Sec n="10" label="Contact" title="Parlons de votre" accent="prochain vol." />
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
            <dl className="grid content-start gap-6">
              <div><dt className="mono text-mute">E-mail</dt><dd><a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-2xl underline decoration-1 underline-offset-4 hover:text-accent">{site.email}</a></dd></div>
              {site.phone && <div><dt className="mono text-mute">Téléphone</dt><dd><a href={`tel:${site.phone}`} className="inline-flex min-h-11 items-center text-2xl underline underline-offset-4 hover:text-accent">{site.phone}</a></dd></div>}
              <div><dt className="mono text-mute">Réponse</dt><dd className="text-2xl">Sous 24 h ouvrées</dd></div>
              <div><dt className="mono text-mute">Horaires</dt><dd className="text-lg">{site.hours}</dd></div>
              <dd><a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn mt-2">Réserver un appel de 30 min <Arrow /><span className="sr-only"> (nouvel onglet)</span></a></dd>
            </dl>
            <div className="crop border border-line2 p-6 sm:p-10"><Marks /><ContactForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
