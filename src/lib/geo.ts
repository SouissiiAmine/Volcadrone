// Données géographiques précalculées depuis les Terrain Tiles (Mapzen / AWS Open Data,
// sources SRTM & EU-DEM). Hero : carré de 21,3 km centré sur le puy de Dôme.
export const puys = {
  lo: 349, // altitude min (m) du relief encodé dans /media/puys.png
  hi: 1431, // altitude max (m)
  km: 21.33,
  center: [45.7722, 2.9644] as const,
  // u, v dans [0, 1] sur la carte ; alt = altitude officielle affichée
  marks: [
    { id: "dome", label: "Puy de Dôme", alt: 1465, u: 0.4988, v: 0.5 },
    { id: "pariou", label: "Puy de Pariou", alt: 1209, u: 0.525, v: 0.3787 },
    { id: "clermont", label: "Clermont-Ferrand", alt: 0, u: 0.9469, v: 0.4745 },
  ],
};

// Carte régionale : positions en % de /media/auvergne.webp (Mercator),
// distances à vol d'oiseau depuis Clermont-Ferrand.
export const region = {
  ratio: 0.9324,
  kmPerPct: 2.182,
  home: { x: 44.31, y: 42.13 },
  cities: [
    { name: "Clermont-Ferrand", x: 44.31, y: 42.13, km: 0 },
    { name: "Riom", x: 45.22, y: 36.57, km: 13 },
    { name: "Issoire", x: 50.09, y: 53.23, km: 29 },
    { name: "Le Mont-Dore", x: 34.4, y: 51.7, km: 31 },
    { name: "Thiers", x: 60.75, y: 38.35, km: 37 },
    { name: "Vichy", x: 56.39, y: 25.36, km: 47 },
    { name: "Ambert", x: 67.68, y: 52.97, km: 57 },
    { name: "Brioude", x: 54.92, y: 65.09, km: 58 },
    { name: "Montluçon", x: 27.05, y: 15.14, km: 73 },
    { name: "Saint-Flour", x: 44.52, y: 77.38, km: 83 },
    { name: "Moulins", x: 53.07, y: 4.29, km: 90 },
    { name: "Le Puy-en-Velay", x: 72.82, y: 76.92, km: 103 },
    { name: "Aurillac", x: 21.2, y: 82.43, km: 107 },
    { name: "Saint-Étienne", x: 90.72, y: 58.19, km: 108 },
  ],
  peaks: [
    { name: "Puy de Dôme", alt: 1465, x: 39.93, y: 42.37 },
    { name: "Puy de Sancy", alt: 1886, x: 34.57, y: 53.99 },
    { name: "Plomb du Cantal", alt: 1855, x: 32.63, y: 76.15 },
  ],
};
