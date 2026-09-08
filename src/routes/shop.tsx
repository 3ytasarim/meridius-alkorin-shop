import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | ALKORIN®" },
      { name: "description", content: "Alle ALKORIN® Produkte im Überblick." },
      { property: "og:title", content: "Shop | ALKORIN®" },
      { property: "og:description", content: "Alle ALKORIN® Produkte im Überblick." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Shop" description="Alle ALKORIN® Produkte im Überblick." />,
});
