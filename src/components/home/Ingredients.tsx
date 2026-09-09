import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ingredients from "@/assets/lifestyle/benefits.png.asset.json";

/**
 * CONTENT-PLATZHALTER: Inhaltsstoffe und Mengenangaben bitte anhand der realen
 * Etiketten-/Produktdaten von alkorin.com final prüfen und ergänzen.
 */
const ITEMS = [
  {
    q: "Cholin",
    a: "Cholin ist ein zentraler Bestandteil der ALKORIN® Rezeptur. Angaben zur Menge findest du auf der Verpackung.",
  },
  {
    q: "Vitamine",
    a: "Die Rezeptur enthält ausgewählte Vitamine. Die vollständige Zusammensetzung mit Mengen pro Portion ist auf dem Etikett angegeben.",
  },
  {
    q: "Mineralstoffe",
    a: "Ergänzend enthält ALKORIN® ausgewählte Mineralstoffe, die die Rezeptur abrunden.",
  },
  {
    q: "Wie wird ALKORIN® hergestellt?",
    a: "ALKORIN® wird als Pulver und in Einzelportionen abgefüllt und ist so konzipiert, dass es sich schnell in Wasser einrühren lässt.",
  },
];

export function Ingredients() {
  return (
    <section id="wissen" className="section-y bg-soft-blue">
      <div className="container-alkorin grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="overflow-hidden rounded-[22px]">
          <img
            src={ingredients.url}
            alt="ALKORIN® Pulverbeutel mit Hinweis glutenfrei und laktosefrei"
            loading="lazy"
            width={1672}
            height={941}
            className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[620px]"
          />
        </div>

        <div>
          <p className="eyebrow">Inhaltsstoffe</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Was steckt in ALKORIN?
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Eine klar aufgebaute Rezeptur ohne Effekthascherei. Hier findest du die wichtigsten
            Bestandteile im Überblick.
          </p>

          <Accordion type="single" collapsible className="mt-8 border-t border-border">
            {ITEMS.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-border">
                <AccordionTrigger className="py-5 text-left text-base font-bold text-navy hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-6 text-sm text-muted-foreground">
            Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche
            Ernährung sowie eine gesunde Lebensweise.
          </p>
        </div>
      </div>
    </section>
  );
}
