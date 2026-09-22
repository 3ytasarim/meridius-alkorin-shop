import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "motion/react";
import { formatChf, toChfCents } from "@/lib/currency";

export function AnimatedPrice({
  cents,
  className,
}: {
  /** Originalpreis in EUR-Cent – wird intern in CHF umgerechnet. */
  cents: number;
  className?: string;
}) {
  const format = formatChf;
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const displayCents = toChfCents(cents);
  const startCents = displayCents + 1500;
  const value = useMotionValue(startCents);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = format(startCents);
  }, [startCents, format]);

  useEffect(() => {
    if (!started) return;
    const controls = animate(value, displayCents, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [started, displayCents, format, value]);

  return <span ref={ref} className={className} />;
}
