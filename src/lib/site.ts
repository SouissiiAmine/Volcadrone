export const site = {
  name: "Volcadrone Auvergne",
  url: "https://volcadrone-auvergne.fr",
  title: "Volcadrone Auvergne — Vidéo & photo par drone à Clermont-Ferrand",
  description:
    "Captation aérienne par drone et drone FPV cinématique, montage vidéo et contenus pour les réseaux sociaux. Basé à Clermont-Ferrand, interventions dans toute l'Auvergne-Rhône-Alpes. Devis gratuit.",
  email: "volcadrone@gmail.com",
  // Renseignez le numéro (format international, ex. "+33612345678") pour
  // activer les boutons Appeler et WhatsApp. Vide = boutons masqués.
  phone: "",
  city: "Clermont-Ferrand",
  region: "Auvergne-Rhône-Alpes",
  hours: "Lun–Ven 9h–18h · Sam 9h–12h",
  calendly: "https://calendly.com/volcadrone/30min",
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
    title: "Drone & vidéo événementielle",
    target: "Mariages, événements privés ou publics",
    text: "Captation aérienne et au sol pour raconter vos moments uniques : vidéos dynamiques et photos qui restituent l'émotion du jour J.",
    icon: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z",
  },
  {
    title: "Inspection & diagnostics aériens",
    target: "Particuliers, entreprises, collectivités",
    text: "Toitures, bâtiments et infrastructures inspectés rapidement et sans risque. Images détaillées pour repérer les anomalies et planifier les interventions.",
    icon: "M3 11l9-7 9 7M5 10v9h14v-9M10 19v-5h4v5",
  },
  {
    title: "Photographie & contenu visuel",
    target: "Projets personnels, institutionnels, commerciaux",
    text: "Photos et vidéos sur mesure pour valoriser vos biens, vos services ou vos initiatives, pensées pour toucher votre audience.",
    icon: "M4 8h3l2-3h6l2 3h3v11H4V8zm8 2.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z",
  },
  {
    title: "Marketing & réseaux sociaux",
    target: "Montage, publicité, stratégie visuelle",
    text: "Montages et formats optimisés pour Instagram, TikTok, YouTube, LinkedIn et vos campagnes Meta Ads, avec un conseil personnalisé.",
    icon: "M4 18V6m0 12h16M8 15v-4m4 4V8m4 7v-6",
  },
];

export const sectors = [
  { key: "immobilier", title: "Immobilier & Construction", text: "Agences, promoteurs, architectes, suivi de chantier BTP" },
  { key: "tourisme", title: "Tourisme & Loisirs", text: "Offices de tourisme, hôtels, campings, stations" },
  { key: "automobile", title: "Automobile & Transport", text: "Concessions, spots publicitaires, logistique" },
  { key: "agriculture", title: "Agriculture & Environnement", text: "Exploitations, domaines viticoles, collectivités" },
  { key: "industrie", title: "Industrie & Énergie", text: "Parcs solaires et éoliens, usines, sites industriels" },
  { key: "institutions", title: "Institutions & Collectivités", text: "Mairies, patrimoine, écoles, associations" },
  { key: "medias", title: "Communication & Médias", text: "Agences, producteurs audiovisuels, créateurs" },
  { key: "sport", title: "Sports & Événements", text: "Clubs, festivals, concerts, team building" },
  { key: "nautisme", title: "Marinas & Nautisme", text: "Ports de plaisance, clubs nautiques, bateaux" },
] as const;

export const steps = [
  { title: "Brief", text: "Échange gratuit sur vos objectifs, le lieu, les délais et le rendu attendu." },
  { title: "Autorisations", text: "Repérage et démarches administratives de vol : nous nous en occupons." },
  { title: "Tournage", text: "Plans aériens stabilisés et vol FPV immersif, complétés au sol si besoin." },
  { title: "Livraison", text: "Montage, étalonnage et formats adaptés, livrés sous 24 h à 72 h selon le projet." },
];

export const faq = [
  { q: "Quels sont vos délais de livraison ?", a: "Entre 24 h et 72 h selon la complexité du projet et la formule choisie." },
  { q: "Intervenez-vous en dehors de Clermont-Ferrand ?", a: "Oui : dans toute la région Auvergne-Rhône-Alpes, et partout en France sur demande." },
  { q: "Qui gère les autorisations de vol ?", a: "Nous prenons en charge toutes les démarches administratives nécessaires avant le tournage." },
  { q: "Proposez-vous des formules sur mesure ?", a: "Oui. Chaque devis est adapté à votre besoin : durée, lieux, formats de livraison et droits d'utilisation." },
];

export const projectTypes = [
  ["corporate", "Vidéo d'entreprise"],
  ["wedding", "Mariage / Événement"],
  ["real-estate", "Immobilier"],
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

// Matériel : à remplacer par les modèles exacts utilisés par Volcadrone.
export const fleet = [
  { kind: "quad", name: "Drone de prise de vue", role: "Plans aériens stabilisés",
    specs: [["Image", "Vidéo 4K, photo haute définition"], ["Stabilisation", "Nacelle motorisée"], ["Pour", "Immobilier, tourisme, inspection"]] },
  { kind: "fpv", name: "Drone FPV cinématique", role: "Vol immersif au plus près",
    specs: [["Image", "Vidéo 4K"], ["Vol", "Pilotage en immersion, trajectoires libres"], ["Pour", "Événements, sport, publicité"]] },
  { kind: "post", name: "Post-production", role: "Montage & étalonnage",
    specs: [["Formats", "16:9, 9:16, 1:1"], ["Finition", "Étalonnage, son, sous-titres"], ["Délai", "24 h à 72 h"]] },
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
