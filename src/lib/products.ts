import originalMain from "@/assets/products/original-main.jpg.asset.json";
import original2 from "@/assets/products/original-2.jpg.asset.json";
import original3 from "@/assets/products/original-3.jpg.asset.json";
import original4 from "@/assets/products/original-4.jpg.asset.json";
import original5 from "@/assets/products/original-5.jpg.asset.json";
import sachet10Main from "@/assets/products/sachet10-main.jpg.asset.json";
import sachet10_2 from "@/assets/products/sachet10-2.jpg.asset.json";
import sachet10_3 from "@/assets/products/sachet10-3.jpg.asset.json";
import sachet10_4 from "@/assets/products/sachet10-4.jpg.asset.json";
import sachet10_5 from "@/assets/products/sachet10-5.jpg.asset.json";
import sachet40Main from "@/assets/products/sachet40-main.jpg.asset.json";
import sachet40_2 from "@/assets/products/sachet40-2.jpg.asset.json";
import sachet40_3 from "@/assets/products/sachet40-3.jpg.asset.json";
import sachet40_4 from "@/assets/products/sachet40-4.jpg.asset.json";
import sachet40_5 from "@/assets/products/sachet40-5.jpg.asset.json";
import kapselnMain from "@/assets/products/kapseln-main.jpg.asset.json";
import kapseln2 from "@/assets/products/kapseln-2.jpg.asset.json";
import kapseln3 from "@/assets/products/kapseln-3.jpg.asset.json";
import kapseln4 from "@/assets/products/kapseln-4.jpg.asset.json";
import videoOriginal from "@/assets/video-original.mp4.asset.json";
import videoSachets from "@/assets/video-sachets.mp4.asset.json";
import videoKapseln from "@/assets/video-kapseln.mp4.asset.json";

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
    image: originalMain.url,
    gallery: [
      originalMain.url,
      original2.url,
      original3.url,
      original4.url,
      original5.url,
    ],
    video: videoOriginal.url,
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
    image: sachet10Main.url,
    gallery: [
      sachet10Main.url,
      sachet10_2.url,
      sachet10_3.url,
      sachet10_4.url,
      sachet10_5.url,
    ],
    video: videoSachets.url,
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
    image: sachet40Main.url,
    gallery: [
      sachet40Main.url,
      sachet40_2.url,
      sachet40_3.url,
      sachet40_4.url,
      sachet40_5.url,
    ],
    video: videoSachets.url,
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
    image: kapselnMain.url,
    gallery: [kapselnMain.url, kapseln2.url, kapseln3.url, kapseln4.url],
    video: videoKapseln.url,
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
