import productOriginal from "@/assets/product-original.jpg";
import productSachets from "@/assets/product-sachets.jpg";
import productKapseln from "@/assets/product-kapseln.jpg";

export type Product = {
  slug: string;
  name: string;
  descriptor: string;
  priceCents: number;
  unit: string;
  badge: string | null;
  image: string;
};

/**
 * CONTENT-PLATZHALTER: Produktnamen, Kurzbeschreibungen und Preise bitte durch
 * die realen Shop-Daten von alkorin.com ersetzen.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "original",
    name: "ALKORIN® Original",
    descriptor: "Pulver, 100 g Dose – die klassische Rezeptur für zuhause.",
    priceCents: 2990,
    unit: "100 g",
    badge: "Bestseller",
    image: productOriginal,
  },
  {
    slug: "sachets",
    name: "ALKORIN® Sachets",
    descriptor: "Einzelportionen für unterwegs – ohne Abmessen, einfach dabei.",
    priceCents: 2490,
    unit: "10 Portionen",
    badge: null,
    image: productSachets,
  },
  {
    slug: "kapseln",
    name: "ALKORIN® Kapseln",
    descriptor: "Die kompakte Alternative, wenn es besonders unkompliziert sein soll.",
    priceCents: 2790,
    unit: "60 Kapseln",
    badge: null,
    image: productKapseln,
  },
];

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
}
