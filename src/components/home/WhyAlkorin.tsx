"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { WhyAlkorinVisual } from "@/components/home/WhyAlkorinVisual";
import { AnimatedFeatureCard } from "@/components/ui/feature-card-1";
import { TypingAnimation } from "@/components/ui/typing-animation";

const BENEFITS = [
  {
    no: "01",
    title: "Bewährte Rezeptur",
    text: "Eine über Jahre etablierte Kombination aus ausgewählten Vitaminen, Mineralstoffen und Cholin.",
  },
  {
    no: "02",
    title: "Einfach in den Alltag integrierbar",
    text: "Abmessen, in Wasser einrühren, fertig – ohne Aufwand und ohne komplizierte Regeln.",
  },
  {
    no: "03",
    title: "Praktische Formate",
    text: "Pulver für zuhause, Sachets für unterwegs – du wählst, was zu deinem Tag passt.",
  },
];

const STEPS = [
  {
    no: "01",
    icon: "/icon1.png",
    color: "green" as const,
    title: "Dosieren",
    text: "Die vorgesehene Menge ALKORIN® mit dem beiliegenden Dosierlöffel abmessen – oder ein Sachet öffnen.",
  },
  {
    no: "02",
    icon: "/icon2.png",
    color: "blue" as const,
    title: "Mit Wasser einnehmen",
    text: "In ein Glas Wasser einrühren und trinken. Einfach und unkompliziert als Teil deiner Abendroutine.",
  },
  {
    no: "03",
    icon: "/icon3.png",
    color: "yellow" as const,
    title: "Routine abschließen",
    text: "Vor dem Schlafengehen einnehmen. Einfach und unkompliziert als letzter Schritt deiner Abendroutine.",
  },
];

export function WhyAlkorin() {
  const reduce = useReducedMotion();

  const list: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.32, delayChildren: 0.1 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="section-y overflow-x-clip bg-soft-green">
      <div className="container-alkorin grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <WhyAlkorinVisual />

        <div>
          <p className="eyebrow">Warum Alkorin?</p>
          <h2 className="mt-4 max-w-lg text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Eine einfache Routine für lange Abende und den nächsten Tag.
          </h2>

          <div className="relative isolate mt-10">
            {/* helle Health-Blue-Aura – rund, exakt mittig, zu den Seiten transparent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-12 -inset-y-16 -z-10"
              style={{
                background:
                  "radial-gradient(closest-side at 50% 50%, oklch(0.617 0.076 225.5 / 0.26) 0%, oklch(0.617 0.076 225.5 / 0.12) 40%, transparent 78%)",
              }}
            />
            <motion.ol
              className="space-y-8"
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
            {BENEFITS.map((b) => (
              <motion.li
                key={b.no}
                variants={item}
                className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-border pt-6"
              >
                <span className="text-lg font-bold leading-tight tabular-nums text-navy/70">
                  {b.no}
                </span>
                <h3 className="text-lg font-bold leading-tight text-navy">
                  {b.title}
                </h3>
                <p className="col-start-2 mt-2 max-w-md leading-relaxed text-navy/75">
                  {b.text}
                </p>
              </motion.li>
            ))}
            </motion.ol>
          </div>
        </div>

        <ol className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
          {STEPS.map((s) => (
            <li key={s.no}>
              <AnimatedFeatureCard
                index={s.no}
                tag={s.title}
                title={s.text}
                imageSrc={s.icon}
                color={s.color}
                className="max-w-none"
              />
            </li>
          ))}
        </ol>

        <TypingAnimation
          text="Bitte beachte die Verzehrempfehlung auf der Verpackung."
          duration={35}
          startOnView
          className="text-xl font-bold leading-snug tracking-normal text-navy drop-shadow-none lg:col-span-2 sm:text-2xl"
        />
      </div>
    </section>
  );
}
