// Single source of truth for La Mona business data. Edit here, not in pages.
export const SITE = {
  name: "La Mona Cafetería",
  tagline: "Café, sabor y calma en el corazón de Iquitos.",
  address: "Jirón Fitzcarrald 516-520",
  city: "Iquitos 16000, Loreto, Perú",
  plusCode: "7Q35+Q7 Iquitos",
  phoneDisplay: "+51 993 841 823",
  phone: "51993841823",
  facebook: "https://www.facebook.com/LaMona.Cafeteria",
  catalog: "https://wa.me/p/25914075854952243/51993841823",
  // Reference figures supplied by the owner — verify before treating as current.
  rating: { score: "4,6", count: "Más de 2.000 opiniones", source: "Google Maps" },
};

export const MAPS_QUERY = encodeURIComponent(
  `La Mona Cafetería, ${SITE.address}, Iquitos, Perú`,
);
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export const DEFAULT_WA_MESSAGE =
  "Hola, La Mona Cafetería. Quisiera consultar por el menú y la disponibilidad de sus productos.";

export function waLink(message: string = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${SITE.phone}?text=${encodeURIComponent(message)}`;
}

export function productWaLink(product: string) {
  return waLink(`Hola, La Mona Cafetería. Quisiera consultar por ${product} y su disponibilidad.`);
}

/* ---------- Hours ---------- */
// Minutes since midnight. Index 0 = Sunday (JS getUTCDay convention).
type Range = [number, number];
const t = (h: number, m = 0) => h * 60 + m;
const WEEKDAY: Range[] = [[t(7, 30), t(23)]];

export const HOURS: Range[][] = [
  [[t(8), t(12, 30)], [t(17), t(23)]], // Domingo
  WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY,
];
export const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const IQUITOS_UTC_OFFSET_MIN = -5 * 60; // Peru has no DST

export const fmt = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

export function formatDay(day: number) {
  return HOURS[day]!.map(([a, b]) => `${fmt(a)}–${fmt(b)}`).join(" y ");
}

export type OpenStatus = { open: boolean; label: string; day: number };

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const local = new Date(now.getTime() + IQUITOS_UTC_OFFSET_MIN * 60_000);
  const day = local.getUTCDay();
  const mins = local.getUTCHours() * 60 + local.getUTCMinutes();
  const today = HOURS[day]!;

  const current = today.find(([a, b]) => mins >= a && mins < b);
  if (current) return { open: true, label: `Abierto ahora · hasta las ${fmt(current[1])}`, day };

  const later = today.find(([a]) => mins < a);
  if (later) return { open: false, label: `Cerrado ahora · abre hoy a las ${fmt(later[0])}`, day };

  const next = (day + 1) % 7;
  return { open: false, label: `Cerrado ahora · abre mañana a las ${fmt(HOURS[next]![0]![0])}`, day };
}

/* ---------- Menu ---------- */
export type MenuItem = {
  name: string;
  category: string;
  description?: string;
  price?: number | null; // null = not confirmed; never invent
  image?: string;
};

export const CATEGORIES = [
  "Café y té",
  "Desayunos y brunch",
  "Jugos y smoothies",
  "Sándwiches",
  "Hamburguesas",
  "Pastas",
  "Ensaladas",
  "Antojitos",
  "Postres",
  "Cervezas artesanales",
  "Vinos",
  "Cócteles",
] as const;

// Only products confirmed by the brief. Prices pending from the official menu.
export const MENU: MenuItem[] = [
  { name: "Café americano", category: "Café y té", price: null },
  { name: "Capuchino", category: "Café y té", price: null },
  { name: "Frappé de coco", category: "Jugos y smoothies", price: null },
  { name: "Jugos naturales", category: "Jugos y smoothies", price: null },
  { name: "Sánguche de lomo", category: "Sándwiches", price: null },
  { name: "Hamburguesa Loretana", category: "Hamburguesas", price: null },
  { name: "Hamburguesa gaucha", category: "Hamburguesas", price: null },
  { name: "Torta de chocolate", category: "Postres", price: null },
  { name: "Cervezas artesanales", category: "Cervezas artesanales", price: null },
  { name: "Pisco Sour", category: "Cócteles", price: null },
];
