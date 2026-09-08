import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz | ALKORIN®" },
      { name: "description", content: "Informationen zum Datenschutz." },
      { property: "og:title", content: "Datenschutz | ALKORIN®" },
      { property: "og:description", content: "Informationen zum Datenschutz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Datenschutz" description="Informationen zum Datenschutz." />,
});
