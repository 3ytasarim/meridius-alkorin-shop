import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/components/home/Products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | ALKORIN®" },
      { name: "description", content: "Alle ALKORIN® Produkte im Überblick – Zahlung bei Lieferung." },
      { property: "og:title", content: "Shop | ALKORIN®" },
      { property: "og:description", content: "Alle ALKORIN® Produkte im Überblick – Zahlung bei Lieferung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Products />,
});
