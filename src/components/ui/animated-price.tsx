import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "motion/react";
import { formatPrice } from "@/lib/products";

export function AnimatedPrice({
  cents,
  className,
}: {
  cents: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const startCents = cents + 1500;
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
    el.textContent = formatPrice(startCents);
  }, [startCents]);

  useEffect(() => {
    if (!started) return;
    const controls = animate(value, cents, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = formatPrice(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [started, cents, value]);

  return <span ref={ref} className={className} />;
}
