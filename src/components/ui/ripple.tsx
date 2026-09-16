import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleProps {
  /** CSS-Farbe der Welle, z.B. "rgba(255,255,255,0.4)". */
  color?: string;
  /** Dauer in ms. */
  duration?: number;
  className?: string;
}

/**
 * Material-Design-Ripple im 21st.dev-Stil, ohne Dependency.
 * Als erstes Kind eines `position: relative; overflow: hidden` Elements ablegen;
 * es hört auf `pointerdown` des Elternelements. Der sichtbare Button-Inhalt
 * sollte darüber liegen (`relative z-10`).
 */
export function Ripple({
  color = "rgba(255,255,255,0.4)",
  duration = 600,
  className,
}: RippleProps) {
  const host = useRef<HTMLSpanElement>(null);
  const [items, setItems] = useState<RippleItem[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const parent = host.current?.parentElement;
    if (!parent) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPointerDown = (e: PointerEvent) => {
      if (reduce || e.button !== 0) return;
      const rect = parent.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const id = idRef.current++;
      setItems((prev) => [
        ...prev,
        {
          id,
          size,
          x: e.clientX - rect.left - size / 2,
          y: e.clientY - rect.top - size / 2,
        },
      ]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((it) => it.id !== id));
      }, duration + 60);
    };

    parent.addEventListener("pointerdown", onPointerDown);
    return () => parent.removeEventListener("pointerdown", onPointerDown);
  }, [duration]);

  return (
    <span
      ref={host}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute rounded-full"
          style={{
            left: it.x,
            top: it.y,
            width: it.size,
            height: it.size,
            backgroundColor: color,
            animation: `ripple ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`,
          }}
        />
      ))}
    </span>
  );
}

export default Ripple;
