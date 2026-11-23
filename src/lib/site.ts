export const site = {
  name: "Volcadrone Auvergne",
  url: "https://volcadrone-auvergne.fr",
  title: "Volcadrone Auvergne — Vidéos drone FPV prêtes à poster, Clermont-Ferrand",
  description:
    "Vidéos verticales prêtes à poster pour Instagram, TikTok, YouTube et Facebook : script, drone FPV intérieur et extérieur, images au sol, montage, voix off et sous-titres. Basé à Clermont-Ferrand, interventions dans toute l'Auvergne.",
  email: "volcadrone@gmail.com",
  // Renseignez le numéro (format international, ex. "+33612345678") pour
  // activer les boutons Appeler et WhatsApp. Vide = boutons masqués.
  phone: "",
  city: "Clermont-Ferrand",
  region: "Auvergne-Rhône-Alpes",
  hours: "Lun–Ven 9h–18h · Sam 9h–12h",
  calendly: "https://calendly.com/volcadrone/30min",
  // Showreel vertical (9:16) : déposez la vidéo dans public/media/ et
  // renseignez son chemin, ex. "/media/reel.mp4". Vide = ancien showreel 16:9.
  reel: "",
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/volcadrone.auvergne/" },
    { name: "YouTube", url: "https://www.youtube.com/@VolcadroneAuvergne" },
    { name: "TikTok", url: "https://www.tiktok.com/@volcadrone_auvergne" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61582387393093" },
  ],
  // Mentions légales : à compléter avant la mise en ligne (obligation LCEN).
  // Les lignes vides ne sont pas affichées ; un avertissement apparaît en dev.
  legal: {
    owner: "", // Nom et prénom de l'exploitant ou raison sociale
    status: "", // ex. "Entrepreneur individuel"
    siret: "",
    address: "", // Adresse postale complète
    director: "", // Directeur de la publication
    hostName: "", // ex. "Vercel Inc."
    hostAddress: "", // Adresse postale de l'hébergeur
  },
};

export type ContactState = {
  status: "idle" | "ok" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "subject" | "message" | "consent", string>>;
  values?: Record<string, string>;
};

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#showreel", label: "Showreel" },
  { href: "/#secteurs", label: "Secteurs" },
  { href: "/#zone", label: "Zone" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
];

export const services = [
  {
    title: "Vidéos prêtes à poster",
    target: "Format 9:16 · Instagram, TikTok, YouTube, Facebook, LinkedIn",
    text: "Script et scénario, tournage en drone FPV intérieur et extérieur, images au sol, puis montage dynamique avec voix off et sous-titres. Vous recevez des vidéos prêtes à publier.",
  },
  {
    title: "Visite immobilière en FPV",
    target: "Agences, propriétaires, hébergements",
    text: "Le drone entre par la porte et traverse chaque pièce en un seul plan fluide, de la façade jusqu'au jardin. Une visite qui retient l'attention dès la première seconde.",
  },
  {
    title: "Entreprises locales",
    target: "Commerces, artisans, restaurants, PME",
    text: "Mettre en avant votre savoir-faire avec de la vraie vidéo : vos lieux, vos équipes, vos produits. Nous écrivons, tournons, montons et vous accompagnons sur la stratégie de diffusion.",
  },
  {
    title: "En supplément",
    target: "Inspection, événementiel, photo aérienne",
    text: "Inspection de toitures et de bâtiments, captation d'événements, photos aériennes HD : sur demande, en complément de vos vidéos.",
  },
];

export const sectors = [
  { key: "commerces", title: "Commerces & entreprises locales", text: "Boutiques, restaurants, artisans, créateurs, PME" },
  { key: "immobilier", title: "Immobilier & Construction", text: "Visites FPV, agences, promoteurs, suivi de chantier" },
  { key: "automobile", title: "Automobile & Transport", text: "Concessions, poursuites en FPV, spots publicitaires" },
  { key: "tourisme", title: "Tourisme & Loisirs", text: "Offices de tourisme, hôtels, campings, stations" },
  { key: "agriculture", title: "Agriculture & Environnement", text: "Exploitations, domaines viticoles, collectivités" },
  { key: "industrie", title: "Industrie & Énergie", text: "Parcs solaires et éoliens, usines, sites industriels" },
  { key: "institutions", title: "Institutions & Collectivités", text: "Mairies, patrimoine, écoles, associations" },
  { key: "sport", title: "Sports & Événements", text: "Clubs, festivals, concerts, team building" },
  { key: "nautisme", title: "Marinas & Nautisme", text: "Ports de plaisance, clubs nautiques, bateaux" },
] as const;

export const steps = [
  { title: "Script", text: "Échange gratuit sur vos objectifs, puis script et scénario pensés pour votre audience et la plateforme visée." },
  { title: "Tournage", text: "Drone FPV intérieur et extérieur, caméra au sol pour combiner les deux points de vue. Autorisations de vol gérées." },
  { title: "Montage", text: "Montage dynamique sur DaVinci Resolve : rythme, étalonnage, voix off, sous-titres et musique." },
  { title: "Publication", text: "Vidéos 9:16 prêtes à poster, livrées sous 24 h à 72 h, avec la stratégie pour faire décoller vos comptes." },
];

export const faq = [
  { q: "Quels formats livrez-vous ?", a: "Des vidéos verticales 9:16 prêtes à poster sur Instagram, TikTok, YouTube Shorts et Facebook, et sur demande en 16:9 ou 1:1." },
  { q: "Faites-vous la voix off et les sous-titres ?", a: "Oui. Nous écrivons le script, enregistrons la voix off et ajoutons les sous-titres : vous n'avez rien à préparer." },
  { q: "Gérez-vous aussi la stratégie sur les réseaux ?", a: "Oui. Nous vous conseillons sur les formats, le rythme de publication et les idées de contenus pour faire décoller vos comptes." },
  { q: "Pouvez-vous filmer en intérieur ?", a: "Oui. Nos drones FPV compacts, assemblés par nos soins, passent les portes et traversent les pièces en toute sécurité : idéal pour l'immobilier et les commerces." },
  { q: "Quels sont vos délais de livraison ?", a: "Entre 24 h et 72 h selon la complexité du projet et la formule choisie." },
  { q: "Intervenez-vous en dehors de Clermont-Ferrand ?", a: "Oui : dans toute la région Auvergne-Rhône-Alpes, et partout en France sur demande." },
  { q: "Qui gère les autorisations de vol ?", a: "Nous prenons en charge toutes les démarches administratives nécessaires avant le tournage." },
  { q: "Proposez-vous des formules sur mesure ?", a: "Oui. Chaque devis est adapté à votre besoin : durée, lieux, formats de livraison et droits d'utilisation." },
];

export const projectTypes = [
  ["social", "Vidéo réseaux sociaux (9:16)"],
  ["corporate", "Vidéo d'entreprise / commerce"],
  ["wedding", "Mariage / Événement"],
  ["real-estate", "Visite immobilière FPV"],
  ["inspection", "Inspection / Diagnostic"],
  ["commercial", "Publicité / Réseaux sociaux"],
  ["other", "Autre"],
] as const;

// Garanties affichées en bandeau. Les références (n° d'exploitant, police
// d'assurance…) s'affichent dès qu'elles sont renseignées.
export const credentials = [
  { title: "Exploitant déclaré", sub: "Enregistrement DGAC (AlphaTango)", ref: "" },
  { title: "Télépilote certifié", sub: "Formation et examen DGAC", ref: "" },
  { title: "Assurance RC Pro", sub: "Vols et prises de vues couverts", ref: "" },
  { title: "Autorisations gérées", sub: "Préfecture, zones réglementées", ref: "" },
];

// Matériel : drones assemblés par Volcadrone. Pour afficher une vraie photo à
// la place du dessin, déposez-la dans public/media/ et renseignez "photo".
export const fleet = [
  { kind: "whoop", name: "Cinewhoop intérieur", role: "Visites et lieux fermés", photo: "",
    specs: [["Vol", "Passe les portes, traverse les pièces"], ["Sécurité", "Hélices protégées"], ["Pour", "Immobilier, commerces, restaurants"]] },
  { kind: "fpv", name: "FPV de poursuite", role: "Vitesse et trajectoires libres", photo: "",
    specs: [["Vol", "Suit voitures et personnes au plus près"], ["Image", "Vidéo 4K stabilisée"], ["Pour", "Automobile, sport, extérieurs"]] },
  { kind: "ground", name: "Caméra au sol", role: "Le second point de vue", photo: "",
    specs: [["Rôle", "Plans au sol combinés à l'aérien"], ["Stabilisation", "Nacelle motorisée"], ["Pour", "Portraits, produits, détails"]] },
  { kind: "post", name: "Montage DaVinci", role: "Prêt à poster", photo: "",
    specs: [["Formats", "9:16, et 16:9 ou 1:1 sur demande"], ["Finition", "Voix off, sous-titres, étalonnage"], ["Délai", "24 h à 72 h"]] },
] as const;

// ⚠ Tarifs indicatifs à valider avec Volcadrone avant la mise en ligne :
// ils alimentent à la fois les formules et l'estimateur.
export const pricing = {
  tax: "HT",
  packs: [
    { code: "PHO", name: "Essentiel", kind: "Photo aérienne", from: 290, featured: false,
      items: ["15 photos HD retouchées", "1 lieu, jusqu'à 1 h sur site", "Livraison sous 72 h"] },
    { code: "VID", name: "Signature", kind: "Film drone", from: 590, featured: true,
      items: ["Film monté de 60 à 90 s", "Étalonnage et musique libre de droits", "Formats 16:9 et 9:16", "10 photos HD"] },
    { code: "FPV", name: "Immersion", kind: "FPV + drone stabilisé", from: 890, featured: false,
      items: ["Plans-séquences FPV", "Plans stabilisés complémentaires", "Montage dynamique de 60 s", "Déclinaisons réseaux sociaux"] },
  ],
  types: [
    { id: "photo", label: "Photo", base: 290 },
    { id: "video", label: "Film", base: 590 },
    { id: "fpv", label: "FPV", base: 890 },
    { id: "inspection", label: "Inspection", base: 350 },
  ],
  durations: [
    { id: "short", label: "≤ 1 h", mult: 1 },
    { id: "half", label: "½ journée", mult: 1.6 },
    { id: "day", label: "Journée", mult: 2.6 },
  ],
  options: [
    { id: "social", label: "Déclinaisons réseaux", price: 120 },
    { id: "photos", label: "+20 photos HD", price: 150 },
    { id: "ground", label: "Images au sol", price: 180 },
    { id: "express", label: "Livraison 24 h", price: 90 },
  ],
  travel: { freeKm: 30, perKm: 0.6 }, // déplacement facturé au-delà de freeKm (aller-retour)
};
