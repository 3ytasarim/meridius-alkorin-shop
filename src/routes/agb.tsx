import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "AGB | ALKORIN®" },
      { name: "description", content: "Allgemeine Geschäftsbedingungen." },
      { property: "og:title", content: "AGB | ALKORIN®" },
      { property: "og:description", content: "Allgemeine Geschäftsbedingungen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="AGB" description="Allgemeine Geschäftsbedingungen." />,
});
