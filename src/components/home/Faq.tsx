import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { BlurredStagger } from "@/components/ui/text-reveal-faqs";

const FAQS = [
  {
    q: "Wie wurde ALKORIN® entwickelt?",
    a: "ALKORIN® wurde von Ärzten und Pharmakologen in jahrelanger Forschungsarbeit entwickelt – die Rezeptur wird dabei kontinuierlich verbessert, um den bestmöglichen Support für den Körper zu bieten.",
  },
  {
    q: "Wo wird ALKORIN® hergestellt?",
    a: "Das Produkt ist ein österreichisches Qualitätsprodukt und wird in einem HACCP-zertifizierten Pharmaunternehmen in Österreich produziert und kontrolliert.",
  },
  {
    q: "In welchen Darreichungsformen ist ALKORIN® erhältlich?",
    a: "Derzeit können Sie ALKORIN® im 100 g Beutel als praktisches Sachet oder in Kapselform erwerben. Unser Forschungsteam arbeitet aktuell an einer neuen Darreichungsform, die bald erhältlich sein wird.",
  },
  {
    q: "Was enthält eine Portion ALKORIN® (4 g)?",
    a: "Eine Portion (4 g) enthält: Magnesium 375 mg, Cholin 200 mg, Vitamin C 80 mg, Natrium 100 mg, Vitamin B6 4,2 mg, Thiamin 3,3 mg, Riboflavin 5,3 mg, Niacin 14,4 mg, Pantothensäure 5,4 mg, Zink 10 mg, Folsäure 240 µg, Vitamin B12 9 µg. Die genauen Dosierungen sind sorgfältig auf die Bedürfnisse des Körpers abgestimmt.",
  },
  {
    q: "Wie wird ALKORIN® eingenommen?",
    a: "Lösen Sie eine Portion (4 g) in ¼ Liter Wasser auf und nehmen Sie das Getränk vor dem Schlafengehen ein. Bitte überschreiten Sie dabei nicht die empfohlene Tagesdosis.",
  },
  {
    q: "Wo kann ich ALKORIN® erwerben?",
    a: "Direkt hier in unserem Onlineshop – Versand innerhalb der Schweiz, Kauf bequem auf Rechnung mit 14 Tagen Zahlungsfrist.",
  },
  {
    q: "Kann ich ALKORIN® auch in größeren Mengen als Unternehmen oder Wiederverkäufer bestellen?",
    a: "Ja – bei Interesse an größeren Bestellungen für Firmen oder Wiederverkäufer wenden Sie sich bitte direkt an unser Team über unsere Kontaktseite.",
  },
  {
    q: "Sind die Inhaltsstoffe und die Rezeptur wissenschaftlich fundiert?",
    a: "Ja, ALKORIN® wurde von Experten entwickelt und basiert auf langjähriger Forschungsarbeit. Die Rezeptur wird ständig weiter optimiert, um die Wirksamkeit und Verträglichkeit der Inhaltsstoffe zu gewährleisten.",
  },
  {
    q: "Gibt es Hinweise zur Verträglichkeit oder mögliche Nebenwirkungen?",
    a: "ALKORIN® ist als Nahrungsergänzungsmittel konzipiert und unterstützt den Körper in Zeiten erhöhter Belastung. Dennoch empfehlen wir, die angegebene Tagesdosis nicht zu überschreiten. Magnesium kann bei übermäßigem Konsum abführend wirken. Bei bestehenden gesundheitlichen Bedenken oder Vorerkrankungen sollten Sie vor der Einnahme Ihren Arzt konsultieren.",
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
          className="aspect-[4/5] w-full shrink-0 rounded-[22px] object-cover object-[30%_center] shadow-card md:aspect-auto md:max-w-md md:self-stretch"
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
                      open ? "mt-3 max-h-[420px] translate-y-0" : "max-h-0 -translate-y-2"
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
