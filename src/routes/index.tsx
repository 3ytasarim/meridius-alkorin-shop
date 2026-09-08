import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Products } from "@/components/home/Products";
import { WhyAlkorin } from "@/components/home/WhyAlkorin";
import { Routine } from "@/components/home/Routine";
import { Ingredients } from "@/components/home/Ingredients";
import { LifestyleStory } from "@/components/home/LifestyleStory";
import { Reviews } from "@/components/home/Reviews";
import { Quality } from "@/components/home/Quality";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

const TITLE = "ALKORIN® – Bewährte Rezeptur für deine Routine";
const DESCRIPTION =
  "ALKORIN® verbindet ausgewählte Vitamine, Mineralstoffe und Cholin in einer unkomplizierten Routine. Als Pulver oder Sachets – versandkostenfrei in Deutschland.";

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
      <TrustStrip />
      <Products />
      <WhyAlkorin />
      <Routine />
      <Ingredients />
      <LifestyleStory />
      <Reviews />
      <Quality />
      <Faq />
      <FinalCta />
    </>
  );
}
