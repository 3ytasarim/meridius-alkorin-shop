import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/produkt/$slug")({
  head: () => ({
    meta: [
      { title: "Produkt | ALKORIN®" },
      { name: "description", content: "Produktdetails zu ALKORIN®." },
      { property: "og:title", content: "Produkt | ALKORIN®" },
      { property: "og:description", content: "Produktdetails zu ALKORIN®." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  return (
    <PagePlaceholder
      title="Produktdetailseite"
      description={`Die Detailseite für "${slug}" wird im nächsten Schritt gestaltet.`}
    />
  );
}
