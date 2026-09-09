import productOriginal from "@/assets/product-original.jpg";
import productSachets from "@/assets/product-sachets.jpg";
import productKapseln from "@/assets/product-kapseln.jpg";
import lifestyleEvening from "@/assets/lifestyle-evening.jpg";
import ingredientsImg from "@/assets/ingredients.jpg";
import routineImg from "@/assets/routine.jpg";

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
  benefits: string[];
  usage: string;
  ingredients: string;
};

/**
 * CONTENT-PLATZHALTER: Produktnamen, Texte, Inhaltsstoffe und Preise bitte durch
 * die realen Shop-Daten von alkorin.com ersetzen.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "original",
    name: "ALKORIN® Original",
    tagline: "Die klassische Rezeptur",
    descriptor: "Pulver, 100 g Dose – die klassische Rezeptur für zuhause.",
    priceCents: 2990,
    compareAtCents: null,
    unit: "100 g",
    servings: "ca. 30 Portionen",
    badge: "Bestseller",
    image: productOriginal,
    gallery: [productOriginal, routineImg, ingredientsImg],
    benefits: [
      "Ausgewählte Vitamine, Mineralstoffe und Cholin",
      "Einfach dosierbar – ein Messlöffel pro Tag",
      "Ohne künstliche Farbstoffe (Platzhalter – bitte bestätigen)",
    ],
    usage:
      "Einen Messlöffel in ein Glas Wasser einrühren und trinken. Platzhalter – bitte reale Verzehrempfehlung ergänzen.",
    ingredients:
      "Platzhalter: vollständige Zutaten- und Nährwertliste von alkorin.com übernehmen.",
  },
  {
    slug: "sachets",
    name: "ALKORIN® Sachets",
    tagline: "Für unterwegs",
    descriptor: "Einzelportionen für unterwegs – ohne Abmessen, einfach dabei.",
    priceCents: 2490,
    compareAtCents: null,
    unit: "10 Portionen",
    servings: "10 Einzelportionen",
    badge: null,
    image: productSachets,
    gallery: [productSachets, lifestyleEvening, routineImg],
    benefits: [
      "Vorportioniert – kein Abmessen nötig",
      "Passt in Tasche, Rucksack und Handschuhfach",
      "Gleiche bewährte Rezeptur wie Original",
    ],
    usage:
      "Inhalt eines Sachets in Wasser einrühren. Platzhalter – bitte reale Verzehrempfehlung ergänzen.",
    ingredients:
      "Platzhalter: vollständige Zutaten- und Nährwertliste von alkorin.com übernehmen.",
  },
  {
    slug: "kapseln",
    name: "ALKORIN® Kapseln",
    tagline: "Kompakt und unkompliziert",
    descriptor: "Die kompakte Alternative, wenn es besonders unkompliziert sein soll.",
    priceCents: 2790,
    compareAtCents: null,
    unit: "60 Kapseln",
    servings: "ca. 30 Tage",
    badge: null,
    image: productKapseln,
    gallery: [productKapseln, ingredientsImg, lifestyleEvening],
    benefits: [
      "Geschmacksneutral – ideal auf Reisen",
      "Klare Tagesdosierung",
      "Gleiche bewährte Rezeptur wie Original",
    ],
    usage:
      "Zwei Kapseln täglich mit Wasser einnehmen. Platzhalter – bitte reale Verzehrempfehlung ergänzen.",
    ingredients:
      "Platzhalter: vollständige Zutaten- und Nährwertliste von alkorin.com übernehmen.",
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
