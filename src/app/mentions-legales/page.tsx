import type { Metadata } from "next";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Mentions légales et confidentialité",
  description: "Mentions légales, hébergement et politique de confidentialité du site Volcadrone Auvergne.",
  alternates: { canonical: "/mentions-legales" },
};

const L = site.legal;
const missing = Object.entries(L).filter(([, v]) => !v).map(([k]) => k);

function Block({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 grid gap-2 leading-relaxed text-mute">{children}</div>
    </section>
  );
}

export default function Legal() {
  return (
    <div className="wrap max-w-3xl pb-24 pt-32">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Mentions légales</h1>
      {process.env.NODE_ENV !== "production" && missing.length > 0 && (
        <p className="mt-6 rounded-xl border border-[#e5484d] p-4 text-sm">
          Visible en développement uniquement — champs à compléter dans <code>src/lib/site.ts</code> : {missing.join(", ")}.
        </p>
      )}
      <div className="mt-10">
        <Block title="Éditeur du site">
          <p>{L.owner || site.name}{L.status && ` — ${L.status}`}</p>
          {L.siret && <p>SIRET : {L.siret}</p>}
          <p>{L.address || `${site.city}, France`}</p>
          {L.director && <p>Directeur de la publication : {L.director}</p>}
          <p>Contact : <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
        </Block>
        {L.hostName && (
          <Block title="Hébergement">
            <p>{L.hostName}</p>
            {L.hostAddress && <p>{L.hostAddress}</p>}
          </Block>
        )}
        <Block title="Propriété intellectuelle">
          <p>Les textes, images, vidéos et logos de ce site sont la propriété de {site.name}, sauf mention contraire. Toute reproduction sans autorisation écrite préalable est interdite.</p>
        </Block>
        <Block id="donnees" title="Données personnelles">
          <p>Le formulaire de contact collecte votre nom, votre e-mail, votre téléphone (facultatif) et votre message, dans le seul but de répondre à votre demande. Base légale : votre consentement.</p>
          <p>Ces données ne sont ni revendues ni utilisées à des fins publicitaires. Elles sont conservées au maximum trois ans après le dernier échange.</p>
          <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition. Pour l&apos;exercer, écrivez à <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez aussi saisir la CNIL (cnil.fr).</p>
        </Block>
        <Block title="Cookies">
          <p>Ce site n&apos;utilise aucun cookie de mesure d&apos;audience ou publicitaire. Seul votre choix de thème clair ou sombre est mémorisé dans votre navigateur.</p>
        </Block>
        <Block title="Réglementation drone">
          <p>Les vols sont réalisés dans le respect de la réglementation européenne (AESA) et française (DGAC) applicable aux aéronefs sans équipage à bord.</p>
        </Block>
      </div>
    </div>
  );
}
