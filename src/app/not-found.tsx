import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap grid min-h-svh place-items-center py-32 text-center">
      <div>
        <p className="eyebrow">Erreur 404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">Hors zone de vol</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-mute">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn btn-solid mt-8">Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}
