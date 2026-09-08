import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns | ALKORIN®" },
      { name: "description", content: "Menschen und Haltung hinter ALKORIN®." },
      { property: "og:title", content: "Über uns | ALKORIN®" },
      { property: "og:description", content: "Menschen und Haltung hinter ALKORIN®." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Über uns" description="Menschen und Haltung hinter ALKORIN®." />,
});
