"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  /** Erst zu tippen beginnen, sobald das Element in den Viewport scrollt
   *  (statt sofort beim Mount). */
  startOnView?: boolean;
}

export function TypingAnimation({
  text,
  duration = 200,
  className,
  startOnView = false,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const [started, setStarted] = useState(!startOnView);
  const elementRef = useRef<HTMLHeadingElement>(null);

  // Beobachtet den Viewport-Eintritt, falls startOnView aktiv ist.
  useEffect(() => {
    if (!startOnView || started) return;
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView, started]);

  useEffect(() => {
    if (!started) return;

    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, started]);

  return (
    <h1
      ref={elementRef}
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {started ? (displayedText ? displayedText : text) : " "}
    </h1>
  );
}
