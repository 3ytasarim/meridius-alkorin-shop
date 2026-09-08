import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | ALKORIN®" },
      { name: "description", content: "Anbieterkennzeichnung." },
      { property: "og:title", content: "Impressum | ALKORIN®" },
      { property: "og:description", content: "Anbieterkennzeichnung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Impressum" description="Anbieterkennzeichnung." />,
});
