const originalMain = "/product-original-main.jpg";
const original3 = "/product-original-3.jpg";
const original4 = "/product-original-4.jpg";
const sachet10_3 = "/product-sachet10-3.jpg";
const sachet10_4 = "/product-sachet10-4.jpg";
const sachet10_5 = "/product-sachet10-5.jpg";
const sachet40_3 = "/product-sachet40-3.jpg";
const sachet40_4 = "/product-sachet40-4.jpg";
const sachet40_5 = "/product-sachet40-5.jpg";
const kapselnMain = "/product-kapseln-main.jpg";
const kapseln3 = "/product-kapseln-3.jpg";
const kapseln4 = "/product-kapseln-4.jpg";
const videoOriginal = "/product-video-original.mp4";
const videoSachets = "/product-video-sachets.mp4";
const videoKapseln = "/product-video-kapseln.mp4";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  descriptor: string;
  priceCents: number;
  compareAtCents: number | null;
  unit: string;
  servings: string;
  badge: string | null;
  image: string;
  gallery: string[];
  video: string | null;
  benefits: string[];
  usage: string;
  ingredients: string;
};

/**
 * Produktvarianten gemäß realer ALKORIN®-Verpackungen.
 * Preise, Portionsgrößen und Nährwerte sind PLACEHOLDER – bitte anhand der
 * tatsächlichen Etiketten-/Shopdaten von alkorin.com final prüfen.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "original",
    name: "ALKORIN® Original",
    tagline: "Das bewährte Pulver",
    descriptor:
      "Pulver, 100 g Dose – die klassische Rezeptur mit Zitronengeschmack. Vor dem Schlafengehen einnehmen.",
    priceCents: 2990,
    compareAtCents: null,
    unit: "100 g",
    servings: "ca. 25 Portionen",
    badge: "Bestseller",
    image: originalMain,
    gallery: [
      originalMain,
      "/ElevenLabs_image_recraft-v4_Create ONE ultr_2026-09-11T19_05_12.webp",
      original3,
      original4,
      "/ChatGPT Image 11 Eyl 2026 23_34_48.png",
      "/inhaltsstoffe-tabelle.png",
    ],
    video: videoOriginal,
    benefits: [
      "Bewährte Rezeptur mit Cholin, Vitaminen und Mineralstoffen",
      "Mit Zitronengeschmack – einfach in Wasser einrühren",
      "Glutenfrei und laktosefrei (siehe Verpackung)",
    ],
    usage:
      "1 Portion (4 g) in ca. 250 ml Wasser einrühren und vor dem Schlafengehen trinken. Bitte beachte die Verzehrempfehlung auf der Verpackung.",
    ingredients:
      "Ausgewählte Vitamine, Mineralstoffe und Cholin. Vollständige Zutaten- und Nährwertliste gemäß Verpackung – PLACEHOLDER: bitte mit echtem Etikett abgleichen.",
  },
  {
    slug: "sachets-10",
    name: "ALKORIN® 10er Sachets",
    tagline: "Für unterwegs",
    descriptor:
      "10 Einzelportionen Pulver – vorportioniert für unterwegs, ohne Abmessen.",
    priceCents: 1990,
    compareAtCents: null,
    unit: "10 Portionen",
    servings: "10 Einzelportionen",
    badge: null,
    image: "/B00RXZVVSA.MAIN.jpg",
    gallery: [
      "/B00RXZVVSA.MAIN.jpg",
      "/ElevenLabs_image_recraft-v4_Create ONE ultr_2026-09-11T19_22_17.webp",
      sachet10_3,
      sachet10_4,
      sachet10_5,
      "/inhaltsstoffe-tabelle.png",
    ],
    video: videoSachets,
    benefits: [
      "Vorportioniert – kein Abmessen nötig",
      "Passt in Tasche und Handschuhfach",
      "Gleiche bewährte Rezeptur wie Original",
    ],
    usage:
      "Inhalt eines Sachets in ca. 250 ml Wasser einrühren und vor dem Schlafengehen trinken. Bitte beachte die Verzehrempfehlung auf der Verpackung.",
    ingredients:
      "Ausgewählte Vitamine, Mineralstoffe und Cholin. Vollständige Zutaten- und Nährwertliste gemäß Verpackung – PLACEHOLDER: bitte mit echtem Etikett abgleichen.",
  },
  {
    slug: "sachets-40",
    name: "ALKORIN® 40er Sachets",
    tagline: "Vorratspackung",
    descriptor:
      "40 Einzelportionen Pulver – die Vorratsgröße für deine durchgehende Routine.",
    priceCents: 6490,
    compareAtCents: null,
    unit: "40 Portionen",
    servings: "40 Einzelportionen",
    badge: "Vorratsgröße",
    image: "/B082RWG1J6.MAIN.jpg",
    gallery: [
      "/B082RWG1J6.MAIN.jpg",
      "/ElevenLabs_image_recraft-v4_Create ONE extr_2026-09-11T19_38_54.webp",
      sachet40_3,
      sachet40_4,
      sachet40_5,
      "/inhaltsstoffe-tabelle.png",
    ],
    video: videoSachets,
    benefits: [
      "Vorratsgröße – seltener nachbestellen",
      "Vorportioniert – kein Abmessen nötig",
      "Gleiche bewährte Rezeptur wie Original",
    ],
    usage:
      "Inhalt eines Sachets in ca. 250 ml Wasser einrühren und vor dem Schlafengehen trinken. Bitte beachte die Verzehrempfehlung auf der Verpackung.",
    ingredients:
      "Ausgewählte Vitamine, Mineralstoffe und Cholin. Vollständige Zutaten- und Nährwertliste gemäß Verpackung – PLACEHOLDER: bitte mit echtem Etikett abgleichen.",
  },
  {
    slug: "kapseln",
    name: "ALKORIN® Kapseln",
    tagline: "Kompakt & unkompliziert",
    descriptor:
      "60 Kapseln (45 g) – die kompakte Alternative, wenn es ohne Anrühren sein soll.",
    priceCents: 2790,
    compareAtCents: null,
    unit: "60 Kapseln",
    servings: "ca. 30 Tage",
    badge: null,
    image: kapselnMain,
    gallery: [
      kapselnMain,
      "/ElevenLabs_image_recraft-v4_Create ONE ultr_2026-09-11T19_16_03.webp",
      kapseln3,
      kapseln4,
    ],
    video: videoKapseln,
    benefits: [
      "Geschmacksneutral – ideal auf Reisen",
      "Klare Tagesdosierung",
      "Gleiche bewährte Rezeptur wie Original",
    ],
    usage:
      "Tagesportion gemäß Verzehrempfehlung auf der Verpackung mit ausreichend Wasser einnehmen.",
    ingredients:
      "Magnesium, Calcium und weitere Vitamine sowie Cholin. Vollständige Zutaten- und Nährwertliste gemäß Verpackung – PLACEHOLDER: bitte mit echtem Etikett abgleichen.",
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
}
