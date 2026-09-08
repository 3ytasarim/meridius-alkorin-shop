import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/warenkorb")({
  head: () => ({
    meta: [
      { title: "Warenkorb | ALKORIN®" },
      { name: "description", content: "Deine Auswahl im Überblick." },
      { property: "og:title", content: "Warenkorb | ALKORIN®" },
      { property: "og:description", content: "Deine Auswahl im Überblick." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Warenkorb" description="Deine Auswahl im Überblick." />,
});
