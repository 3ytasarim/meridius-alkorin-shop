import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { AvailableAt } from "@/components/home/AvailableAt";
import { Products } from "@/components/home/Products";
import { WhyAlkorin } from "@/components/home/WhyAlkorin";
import { Ingredients } from "@/components/home/Ingredients";
import { LifestyleStory } from "@/components/home/LifestyleStory";
import { Reviews } from "@/components/home/Reviews";
import { Quality } from "@/components/home/Quality";
import { Faq } from "@/components/home/Faq";

const TITLE = "ALKORIN® – Bewährte Rezeptur für deine Abendroutine";
const DESCRIPTION =
  "ALKORIN® verbindet ausgewählte Vitamine, Mineralstoffe und Cholin in einer unkomplizierten Routine. Als Pulver oder Sachets – Zahlung bei Lieferung, Versand aus Deutschland.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Products />
      <AvailableAt />
      <WhyAlkorin />
      <Ingredients />
      <Quality />
      <Reviews />
      <LifestyleStory />
      <Faq />
    </>
  );
}
