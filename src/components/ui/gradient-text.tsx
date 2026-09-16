import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** Verlaufsfarben (Alkorin: Grün · Gelb · Blau). */
  colors?: string[];
  /** Animationsdauer in Sekunden; 0 = statisch. */
  animationSpeed?: number;
}

/**
 * Animierter Farbverlauf-Text (21st.dev "text-gradient"), auf die Alkorin-
 * Palette abgestimmt. Verlauf wird auf die Glyphen geclippt.
 */
export function GradientText({
  children,
  className,
  colors = ["#79B49B", "#E9CD7F", "#5B9FB5", "#79B49B"],
  animationSpeed = 8,
}: GradientTextProps) {
  const animated = animationSpeed > 0;
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        animated &&
          "motion-safe:animate-[gradient-text_var(--gt-dur)_linear_infinite]",
        className,
      )}
      style={
        {
          backgroundImage: `linear-gradient(100deg, ${colors.join(", ")})`,
          backgroundSize: "200% auto",
          "--gt-dur": `${animationSpeed}s`,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}

export default GradientText;
