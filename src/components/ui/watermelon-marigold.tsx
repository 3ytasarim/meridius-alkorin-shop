import { type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * "Watermelon Marigold" – Axis-Blend CSS-Verlaufshintergrund (21st.dev Gradient
 * Builder Stil, zero-dependency). Das Original ist auth-geschützt, daher hier
 * als eigenständiger Nachbau – auf **helle Nane-/Minzgrün-Töne** abgestimmt.
 *
 * Drop-in: `<WatermelonMarigold />` als erstes (absolut positioniertes) Kind
 * eines `relative`/`isolate` Containers.
 */
export interface WatermelonMarigoldProps extends HTMLAttributes<HTMLDivElement> {
  /** Grundfläche (fast weiß, Minze). */
  base?: string;
  /** Heller Akzent (blasse Minze). */
  from?: string;
  /** Etwas kräftigerer Akzent (helles Minzgrün). */
  to?: string;
  /** Weichzeichnung des Blend-Layers. */
  blur?: number;
}

export function WatermelonMarigold({
  base = "#F2FAF6",
  from = "#DCF2E7",
  to = "#BEE6D2",
  blur = 90,
  className,
  style,
  ...props
}: WatermelonMarigoldProps) {
  const blendStyle: CSSProperties = {
    backgroundColor: base,
    backgroundImage: [
      `radial-gradient(at 18% 24%, ${from} 0px, transparent 52%)`,
      `radial-gradient(at 88% 12%, ${to} 0px, transparent 50%)`,
      `radial-gradient(at 62% 8%, ${from} 0px, transparent 48%)`,
      `radial-gradient(at 8% 72%, ${to} 0px, transparent 50%)`,
      `radial-gradient(at 96% 86%, ${from} 0px, transparent 52%)`,
      `radial-gradient(at 44% 96%, ${to} 0px, transparent 50%)`,
      `radial-gradient(at 74% 58%, ${from} 0px, transparent 46%)`,
    ].join(", "),
    filter: `blur(${blur}px)`,
  };

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
      style={style}
      {...props}
    >
      {/* überdimensioniert, damit die Blur-Kanten außerhalb liegen */}
      <div className="absolute -inset-[18%]" style={blendStyle} />
      {/* zarte Aufhellung nach oben, damit Text oben ruhig bleibt */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 42%)",
        }}
      />
    </div>
  );
}

export default WatermelonMarigold;
