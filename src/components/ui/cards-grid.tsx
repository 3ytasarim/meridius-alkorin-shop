// components/ui/cards-grid.tsx
// Angepasster Port von 21st.dev (kavikatiyar/cards-grid, dort als
// "ResourceCardsGrid" für externe Link-Karten). Gleiche Karten-Optik +
// Stagger-Einblendung, hier aber als statische Feature-Karten (kein Link,
// kein "Last updated", Icon statt <img> für einfärbbare Icons in Site-Farben).

import * as React from "react";
import { motion, type Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardsGridItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: "green" | "blue" | "yellow";
}

interface CardsGridProps {
  items: CardsGridItem[];
  className?: string;
}

const ICON_STYLES: Record<NonNullable<CardsGridItem["color"]>, string> = {
  green: "bg-soft-green text-health-green",
  blue: "bg-soft-blue text-health-blue",
  yellow: "bg-health-yellow/15 text-health-yellow",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CardsGrid({ items, className }: CardsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const color = item.color ?? "green";
        return (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <span className={cn("grid size-11 place-items-center rounded-full", ICON_STYLES[color])}>
              <Icon className="size-5" strokeWidth={2.2} />
            </span>
            <h3 className="mt-4 text-base font-bold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
