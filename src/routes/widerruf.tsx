import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/widerruf")({
  head: () => ({
    meta: [
      { title: "Widerruf | ALKORIN®" },
      { name: "description", content: "Widerrufsbelehrung." },
      { property: "og:title", content: "Widerruf | ALKORIN®" },
      { property: "og:description", content: "Widerrufsbelehrung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Widerruf" description="Widerrufsbelehrung." />,
});
