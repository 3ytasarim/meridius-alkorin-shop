import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { BlurredStagger } from "@/components/ui/text-reveal-faqs";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const list: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="faq" className="section-y bg-soft-blue">
      <div className="container-alkorin flex flex-col gap-10 md:flex-row md:items-stretch md:gap-14 lg:gap-20">
        <img
          src="/ChatGPT Image 12 Eyl 2026 00_04_51.png"
          alt="ALKORIN® Produktfamilie auf einer Küchentheke"
          loading="lazy"
          className="aspect-[4/5] w-full shrink-0 rounded-[22px] object-cover shadow-card md:aspect-auto md:max-w-md md:self-stretch"
        />

        <div className="w-full">
          <h2 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            Häufige Fragen
          </h2>
          <p className="mt-3 max-w-md text-lg font-bold leading-relaxed text-navy">
            Alles, was du zur Anwendung, den Inhaltsstoffen und dem Kauf von ALKORIN® wissen
            musst.
          </p>

          <motion.div
            className="mt-6 border-t border-border"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {FAQS.map((f, i) => {
              const open = openIndex === i;
              return (
                <motion.div
                  key={f.q}
                  variants={item}
                  className="cursor-pointer border-b border-border py-5"
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold text-navy">{f.q}</h3>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className={`shrink-0 text-navy transition-transform duration-500 ease-in-out ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      open ? "mt-3 max-h-[300px] translate-y-0" : "max-h-0 -translate-y-2"
                    }`}
                  >
                    <BlurredStagger text={f.a} show={open} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
