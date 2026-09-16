import { useId } from "react";
import { cn } from "@/lib/utils";

export interface BestsellerBadgeProps {
  /** Kantenlänge in px (Authoring-Raster 420). Default 420. */
  size?: number;
  /** Rand-Text, der um das Siegel rotiert. */
  label?: string;
  /** Zahl in der Mitte. */
  number?: string;
  /** Dauer einer Umdrehung des Rand-Texts in Sekunden. */
  spinSeconds?: number;
  /** Dreht die Rotationsrichtung um. */
  reverse?: boolean;
  className?: string;
}

/**
 * "UNSER BESTSELLER #1" – animiertes Produkt-Siegel.
 * Wortgetreuer Port des Design-Handoffs (Styles in src/styles.css als .bsb*).
 * Jede Instanz bekommt über useId eine eigene SVG-Pfad-ID, damit mehrere
 * Siegel auf einer Seite nicht kollidieren.
 */
export function BestsellerBadge({
  size = 420,
  label = "UNSER BESTSELLER",
  number = "#1",
  spinSeconds = 26,
  reverse = false,
  className,
}: BestsellerBadgeProps) {
  const id = useId().replace(/:/g, "");
  const text = ` ${label}   ★   ${label}   ★   `;
  return (
    <div className={cn("bsb", className)} style={{ width: size, height: size }}>
      <div className="bsb__disc">
        <div className="bsb__gloss" />
      </div>
      <svg
        className="bsb__svg"
        viewBox="0 0 420 420"
        role="img"
        aria-label={`${label} ${number}`}
      >
        <defs>
          <path id={`bsb-${id}`} d="M 210,42 a 168,168 0 1,1 -0.1,0" />
        </defs>
        <circle
          cx="210"
          cy="210"
          r="150"
          fill="none"
          stroke="#A8E6C5"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <circle
          cx="210"
          cy="210"
          r="143"
          fill="none"
          stroke="#A8E6C5"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
        <g
          className="bsb__ring"
          style={{
            animationDuration: `${spinSeconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          <text
            fontFamily="Manrope, Helvetica, sans-serif"
            fontSize="25"
            fontWeight="600"
            letterSpacing="4.2"
            fill="#A8E6C5"
          >
            <textPath
              href={`#bsb-${id}`}
              startOffset="0"
              textLength="1055"
              lengthAdjust="spacing"
            >
              {text}
            </textPath>
          </text>
        </g>
      </svg>
      <div className="bsb__center">
        <div className="bsb__beat">
          <div className="bsb__num">{number}</div>
        </div>
      </div>
    </div>
  );
}

export default BestsellerBadge;
