import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/home/Faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Häufige Fragen | ALKORIN®" },
      { name: "description", content: "Antworten rund um ALKORIN®." },
      { property: "og:title", content: "Häufige Fragen | ALKORIN®" },
      { property: "og:description", content: "Antworten rund um ALKORIN®." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Faq />,
});
