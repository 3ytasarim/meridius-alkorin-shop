"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/** Klein gehaltener ResizeObserver-Hook (ersetzt react-use-measure). */
function useMeasure() {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setRect({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, rect] as const;
}

export interface InfiniteSliderProps {
  children: ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

/**
 * Endlos-Laufband (21st.dev / motion-primitives "infinite-slider").
 * Dupliziert die Kinder und verschiebt den Track kontinuierlich; optional
 * langsamer bei Hover.
 */
export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | undefined;
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      const remaining = Math.abs(translation.get() - to);
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: remaining / currentSpeed,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((k) => k + 1);
        },
      });
    } else {
      const distance = Math.abs(to - from);
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: distance / currentSpeed,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps =
    speedOnHover != null
      ? {
          onHoverStart: () => {
            setIsTransitioning(true);
            setCurrentSpeed(speedOnHover);
          },
          onHoverEnd: () => {
            setIsTransitioning(true);
            setCurrentSpeed(speed);
          },
        }
      : {};

  const isHorizontal = direction === "horizontal";

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className={cn("flex w-max", isHorizontal ? "flex-row" : "flex-col")}
        style={
          isHorizontal
            ? { x: translation, gap: `${gap}px` }
            : { y: translation, gap: `${gap}px` }
        }
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default InfiniteSlider;
