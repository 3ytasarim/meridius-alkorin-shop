import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/wissen")({
  head: () => ({
    meta: [
      { title: "Wissen | ALKORIN®" },
      { name: "description", content: "Hintergründe zu Inhaltsstoffen und Anwendung." },
      { property: "og:title", content: "Wissen | ALKORIN®" },
      { property: "og:description", content: "Hintergründe zu Inhaltsstoffen und Anwendung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Wissen" description="Hintergründe zu Inhaltsstoffen und Anwendung." />,
});
