import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import heroVideo from "@/assets/reklam-videosu.mp4.asset.json";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const available = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(Math.min(Math.max(-rect.top / available, 0), 1));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const progressStyle = { "--hero-progress": progress } as CSSProperties;

  return (
    <section ref={sectionRef} className="hero-expand relative h-[150svh] bg-navy" style={progressStyle}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-navy px-4 py-5 sm:px-6 sm:py-7">
        <div className="hero-expand__media relative overflow-hidden rounded-[18px] shadow-[0_28px_80px_oklch(0.12_0.04_255/0.38)]">
          <video
            className="absolute inset-0 size-full object-cover object-center"
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="ALKORIN® Produkt- und Lifestyle-Video"
          />
          <div className="hero-expand__veil absolute inset-0 bg-navy" />
          <div className="absolute inset-x-0 top-0 h-1 bg-health-blue">
            <span className="block h-full w-16 bg-health-yellow" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-10">
            <div className="hero-expand__copy max-w-4xl">
              <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-primary-foreground/25 bg-navy/35 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground backdrop-blur-sm">
                <span className="size-2 rounded-full bg-health-yellow" />
                ALKORIN® Original
              </p>
              <h1 className="font-display text-[clamp(2.7rem,7vw,6.75rem)] font-extrabold leading-[0.95] tracking-normal text-primary-foreground">
                Bereit für morgen.
                <span className="mt-1 block text-health-green">Gemacht für heute.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-lg">
                Ausgewählte Vitamine, Mineralstoffe und Cholin – als unkomplizierte Routine für
                Menschen, die bewusst durch ihren Alltag gehen.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/shop"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-[11px] bg-primary-foreground px-7 text-sm font-bold text-navy transition-colors hover:bg-soft-green sm:w-auto"
                >
                  Produkte entdecken
                </Link>
                <Link
                  to="/alkorin"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[11px] border border-primary-foreground/35 px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
                >
                  Alkorin kennenlernen
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <ul className="hero-expand__trust absolute inset-x-4 bottom-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-semibold text-primary-foreground/70 sm:bottom-7 sm:text-xs">
              <li>Seit über 10 Jahren</li>
              <li>Praktisch dosierbar</li>
              <li>Versand aus Deutschland</li>
            </ul>
          </div>
        </div>

        <div className="hero-expand__cue pointer-events-none absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-primary-foreground/70">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Scrollen zum Entdecken</span>
          <ArrowDown className="size-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
