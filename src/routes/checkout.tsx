import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | ALKORIN®" },
      { name: "description", content: "Bestellung abschließen." },
      { property: "og:title", content: "Checkout | ALKORIN®" },
      { property: "og:description", content: "Bestellung abschließen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PagePlaceholder title="Checkout" description="Bestellung abschließen." />,
});
