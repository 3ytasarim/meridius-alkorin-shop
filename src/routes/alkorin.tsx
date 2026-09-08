import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/alkorin")({
  head: () => ({
    meta: [
      { title: "Alkorin | ALKORIN®" },
      { name: "description", content: "Die Marke ALKORIN® und die bewährte Rezeptur." },
      { property: "og:title", content: "Alkorin | ALKORIN®" },
      { property: "og:description", content: "Die Marke ALKORIN® und die bewährte Rezeptur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Alkorin" description="Die Marke ALKORIN® und die bewährte Rezeptur." />,
});
