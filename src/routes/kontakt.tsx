import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | ALKORIN®" },
      { name: "description", content: "So erreichst du das ALKORIN® Team." },
      { property: "og:title", content: "Kontakt | ALKORIN®" },
      { property: "og:description", content: "So erreichst du das ALKORIN® Team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Kontakt" description="So erreichst du das ALKORIN® Team." />,
});
