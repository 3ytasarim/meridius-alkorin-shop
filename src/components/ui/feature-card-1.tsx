// components/ui/feature-card-1.tsx

import * as React from "react";
import { type HTMLMotionProps, type MotionStyle, motion } from "motion/react";
import { cn } from "@/lib/utils";

// Define the props for the component
interface AnimatedFeatureCardProps
  extends Omit<HTMLMotionProps<"div">, "ref" | "title" | "style"> {
  /** The numerical index to display, e.g., "001" */
  index: string;
  /** The tag or category label */
  tag: string;
  /** The main title or description */
  title: React.ReactNode;
  /** The URL for the central image */
  imageSrc: string;
  /** The color variant which determines the gradient and tag color */
  color: "green" | "blue" | "yellow";
}

// Alkorin-Palette statt der Original-HSL-Werte (orange/purple/blue) – die
// Variablen greifen direkt auf die Site-Tokens aus src/styles.css zu, damit
// Tag/Verlauf immer mit dem Marken-Farbschema mitgehen.
const colorVariants = {
  green: {
    "--feature-color": "var(--health-green)",
    "--feature-color-light": "color-mix(in oklab, var(--health-green) 45%, transparent)",
    "--feature-color-dark": "var(--soft-green)",
  },
  blue: {
    "--feature-color": "var(--health-blue)",
    "--feature-color-light": "color-mix(in oklab, var(--health-blue) 45%, transparent)",
    "--feature-color-dark": "var(--soft-blue)",
  },
  yellow: {
    "--feature-color": "var(--health-yellow)",
    "--feature-color-light": "color-mix(in oklab, var(--health-yellow) 45%, transparent)",
    "--feature-color-dark": "color-mix(in oklab, var(--health-yellow) 14%, white)",
  },
};

const AnimatedFeatureCard = React.forwardRef<HTMLDivElement, AnimatedFeatureCardProps>(
  ({ className, index, tag, title, imageSrc, color, ...props }, ref) => {
    const cardStyle = colorVariants[color] as MotionStyle;

    return (
      <motion.div
        ref={ref}
        style={cardStyle}
        className={cn(
          "relative flex h-[430px] w-full max-w-sm flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm",
          className,
        )}
        whileHover="hover"
        initial="initial"
        variants={{
          initial: { y: 0 },
          hover: {
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(18,38,76,0.12), 0 10px 10px -5px rgba(18,38,76,0.06)",
          },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        {...props}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, var(--feature-color-light) 0%, transparent 70%)",
          }}
        />

        {/* Index Number */}
        <div className="absolute left-6 top-6 font-mono text-lg font-bold text-muted-foreground">
          {index}
        </div>

        {/* Main Image */}
        <motion.div
          className="absolute inset-0 z-100 flex items-center justify-center"
          variants={{
            initial: { scale: 1, y: -24 },
            hover: { scale: 1.2, y: -40 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <img src={imageSrc} alt={tag} className="h-44 w-44 object-contain" />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 rounded-lg border border-border bg-background/80 p-4 backdrop-blur-sm dark:bg-background/60">
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: "var(--feature-color-dark)",
              color: "var(--feature-color)",
            }}
          >
            {tag}
          </span>
          <p className="text-base text-card-foreground">{title}</p>
        </div>
      </motion.div>
    );
  },
);
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
export default AnimatedFeatureCard;
