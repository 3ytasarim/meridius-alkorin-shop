"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Geladene Webfont – sauberes Glyph-Outline (u.a. beim "R"). */
const WORDMARK_FONT = "'Manrope', 'Helvetica Neue', Arial, sans-serif";

/**
 * Text-Hover-Effekt (21st.dev "hover-footer") – auf die Alkorin-Palette getönt.
 * Die Kontur zeichnet sich beim Mount, und dort, wo der Cursor über dem Text
 * liegt, wird ein weicher Farbverlauf freigelegt.
 */
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 440 96"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("block cursor-pointer select-none uppercase", className)}
    >
      <defs>
        <linearGradient
          id="mrd-textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#EBCF7A" />
              <stop offset="30%" stopColor="#78B39B" />
              <stop offset="55%" stopColor="#5B9FB5" />
              <stop offset="80%" stopColor="#A7E0CC" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="mrd-revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="mrd-textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#mrd-revealMask)" />
        </mask>
      </defs>

      {/* ruhende Kontur */}
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.7"
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke"
        className="fill-transparent stroke-white/25 text-[84px] font-extrabold"
        style={{ opacity: hovered ? 0.7 : 0, fontFamily: WORDMARK_FONT }}
      >
        {text}
      </text>

      {/* selbstzeichnende Kontur beim Mount */}
      <motion.text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.7"
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke"
        className="fill-transparent stroke-[#8FD3BB] text-[84px] font-extrabold"
        style={{ fontFamily: WORDMARK_FONT }}
        initial={{ strokeDashoffset: 2600, strokeDasharray: 2600 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 2600 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* freigelegter Verlauf unter dem Cursor */}
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#mrd-textGradient)"
        strokeWidth="0.7"
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke"
        mask="url(#mrd-textMask)"
        className="fill-transparent text-[84px] font-extrabold"
        style={{ fontFamily: WORDMARK_FONT }}
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 100%, transparent 45%, rgba(120,179,155,0.16) 100%)",
      }}
    />
  );
};
