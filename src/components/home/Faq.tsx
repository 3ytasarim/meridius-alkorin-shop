import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Was ist ALKORIN®?",
    a: "ALKORIN® ist ein Nahrungsergänzungsmittel mit einer bewährten Rezeptur aus ausgewählten Vitaminen, Mineralstoffen und Cholin.",
  },
  {
    q: "Wie wird ALKORIN® verwendet?",
    a: "Das Pulver wird abgemessen bzw. als Sachet geöffnet und in ein Glas Wasser eingerührt. Bitte beachte die Verzehrempfehlung auf der Verpackung.",
  },
  {
    q: "Wann wird ALKORIN® eingenommen?",
    a: "ALKORIN® lässt sich flexibel in den Tagesablauf einbauen. Die genaue Empfehlung findest du auf der Produktverpackung.",
  },
  {
    q: "Welche Inhaltsstoffe enthält ALKORIN®?",
    a: "Die Rezeptur enthält unter anderem Cholin sowie ausgewählte Vitamine und Mineralstoffe. Die vollständige Zusammensetzung steht auf dem Etikett.",
  },
  {
    q: "Welche Produktvarianten gibt es?",
    a: "ALKORIN® ist als Pulverdose und als Sachets für unterwegs erhältlich; weitere Formate findest du im Shop.",
  },
  {
    q: "Wo kann ich ALKORIN® kaufen?",
    a: "Direkt hier im Onlineshop. Der Versand innerhalb Deutschlands ist kostenfrei.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-y bg-soft-blue">
      <div className="container-alkorin grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            Häufige Fragen
          </h2>
        </div>
        <Accordion type="single" collapsible className="border-t border-border">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-6 text-left text-base font-bold text-navy hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
