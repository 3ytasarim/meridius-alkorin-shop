"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
];

const MANUFACTURING = {
  q: "Wie wird ALKORIN® hergestellt?",
  a: "ALKORIN® wird als Pulver und in Einzelportionen abgefüllt und ist so konzipiert, dass es sich schnell in Wasser einrühren lässt.",
};

/** PNG als Maske + Markenfarbe → randloses, eingefärbtes Icon. */
const maskIcon = (src: string, color: string): CSSProperties => ({
  backgroundColor: color,
  WebkitMaskImage: `url(${src})`,
  maskImage: `url(${src})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
});

const SIZE_SM = "absolute size-5 shrink-0 sm:size-6 lg:size-7";
const SIZE_MD = "absolute size-7 shrink-0 sm:size-9 lg:size-10";
const SIZE_LG = "absolute size-9 shrink-0 sm:size-11 lg:size-12";

/**
 * Aufsteigende Icon-Partikel: kein Chip/Hintergrund, nur das eingefärbte
 * Icon selbst (grün/blau/gelb) – verstreut über die ganze Section im
 * Hintergrund-Layer, steigt einzeln endlos von unten nach oben auf und
 * blendet dabei aus (siehe @keyframes rise-fade in styles.css). Jedes
 * Icon mehrfach mit unterschiedlicher Position/Größe/Timing für ein
 * dichteres, verstreutes Bild über die ganze Section.
 */
const FLOATING_ICONS = [
  { src: "/b1.png", color: "var(--health-blue)", size: SIZE_MD, left: "2%", bottom: "-4%", duration: 7, delay: -0.5, rise: 460 },
  { src: "/vitamin-c.png", color: "var(--health-yellow)", size: SIZE_LG, left: "12%", bottom: "40%", duration: 9, delay: -3.6, rise: 520 },
  { src: "/element.png", color: "var(--health-green)", size: SIZE_SM, left: "22%", bottom: "10%", duration: 6.5, delay: -1.4, rise: 400 },
  { src: "/magnesium.png", color: "var(--health-blue)", size: SIZE_LG, left: "32%", bottom: "60%", duration: 8, delay: -4.8, rise: 480 },
  { src: "/chemical.png", color: "var(--health-green)", size: SIZE_MD, left: "42%", bottom: "-8%", duration: 7.5, delay: -2.1, rise: 440 },
  { src: "/b5.png", color: "var(--health-yellow)", size: SIZE_SM, left: "52%", bottom: "26%", duration: 8.5, delay: -6.2, rise: 500 },
  { src: "/b1.png", color: "var(--health-green)", size: SIZE_SM, left: "60%", bottom: "48%", duration: 6.8, delay: -0.2, rise: 420 },
  { src: "/vitamin-c.png", color: "var(--health-blue)", size: SIZE_MD, left: "68%", bottom: "4%", duration: 9.5, delay: -5, rise: 500 },
  { src: "/element.png", color: "var(--health-yellow)", size: SIZE_LG, left: "76%", bottom: "34%", duration: 7.2, delay: -2.8, rise: 440 },
  { src: "/magnesium.png", color: "var(--health-green)", size: SIZE_SM, left: "84%", bottom: "-6%", duration: 8.2, delay: -7.4, rise: 460 },
  { src: "/chemical.png", color: "var(--health-blue)", size: SIZE_MD, left: "92%", bottom: "44%", duration: 6.2, delay: -3.9, rise: 400 },
  { src: "/b5.png", color: "var(--health-green)", size: SIZE_LG, left: "97%", bottom: "14%", duration: 9.2, delay: -1.1, rise: 520 },
  { src: "/b1.png", color: "var(--health-yellow)", size: SIZE_SM, left: "8%", bottom: "72%", duration: 7.8, delay: -8.1, rise: 440 },
  { src: "/magnesium.png", color: "var(--health-yellow)", size: SIZE_MD, left: "27%", bottom: "82%", duration: 8.6, delay: -4.3, rise: 480 },
  { src: "/element.png", color: "var(--health-blue)", size: SIZE_SM, left: "56%", bottom: "76%", duration: 6.4, delay: -6.9, rise: 400 },
  { src: "/vitamin-c.png", color: "var(--health-green)", size: SIZE_SM, left: "88%", bottom: "68%", duration: 9.8, delay: -2.4, rise: 500 },
] as const;

export function Ingredients() {
  const reduce = useReducedMotion();

  const list: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.32, delayChildren: 0.1 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="wissen" className="relative section-y overflow-hidden bg-soft-blue">
      <div className="container-alkorin relative grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Hintergrund-Layer: verstreute Icons. Muss ein Kind von
            .container-alkorin sein (nicht davor als Section-Sibling) – sonst
            rendert der Browser hier nichts sichtbar (negative wie auch
            z-0-Geschwister der Grid-Box blieben unsichtbar; als Kind mit z-0
            funktioniert es zuverlässig). Volle Viewport-Breite (full-bleed),
            damit die Icons bis an den echten Seitenrand reichen, nicht nur
            innerhalb des Container-Innenabstands. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2"
        >
          {/* verstreute Vitamin-/Mineralstoff-Icons – nur Farbe, kein Chip,
              steigen einzeln endlos von unten durch die ganze Section auf */}
          {FLOATING_ICONS.map((f, i) => (
            <span
              key={`${f.src}-${i}`}
              className={`${f.size} motion-safe:animate-[rise-fade_var(--rise-duration)_linear_infinite]`}
              style={
                {
                  left: f.left,
                  bottom: f.bottom,
                  "--rise-duration": `${f.duration}s`,
                  "--rise-distance": `-${f.rise}px`,
                  animationDelay: `${f.delay}s`,
                  ...maskIcon(f.src, f.color),
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative z-10">
          <p className="eyebrow">Inhaltsstoffe</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Was steckt in ALKORIN?
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Eine klar aufgebaute Rezeptur ohne Effekthascherei. Hier findest du die wichtigsten
            Bestandteile im Überblick.
          </p>

          <div className="relative isolate mt-8">
            <Accordion type="single" collapsible className="border-t border-border">
              <motion.div variants={list} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
                {ITEMS.map((entry) => (
                  <motion.div key={entry.q} variants={item}>
                    <AccordionItem value={entry.q} className="border-border">
                      <AccordionTrigger className="py-5 text-left text-base font-bold text-navy hover:no-underline">
                        {entry.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                        {entry.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </motion.div>

              <AccordionItem value={MANUFACTURING.q} className="border-border">
                <AccordionTrigger className="py-5 text-left text-base font-bold text-navy hover:no-underline">
                  {MANUFACTURING.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {MANUFACTURING.a}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche
            Ernährung sowie eine gesunde Lebensweise.
          </p>
        </div>

        <div className="relative z-10">
          <video
            ref={(el) => {
              if (el) el.muted = true;
            }}
            src="/vitamin_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="ALKORIN® – Wirkung im Körper und Anwendung im Alltag"
            className="relative h-[320px] w-full rounded-[22px] object-cover shadow-[0_30px_70px_-32px_rgba(18,38,76,0.35)] sm:h-[460px] lg:h-[620px]"
          />
        </div>
      </div>
    </section>
  );
}
