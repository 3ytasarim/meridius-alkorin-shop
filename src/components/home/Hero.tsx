import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/reklam-videosu.mp4.asset.json";

const TRUST = ["Seit über 10 Jahren", "Praktisch dosierbar", "Versand aus Deutschland"];

export function Hero() {
  return (
    <section className="relative isolate min-h-[86svh] overflow-hidden bg-navy lg:min-h-[92svh]">
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
      <div className="absolute inset-0 bg-navy/55" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: "linear-gradient(to top, oklch(0.325 0.079 257 / 0.75), transparent)" }}
      />

      <div className="container-alkorin relative z-10 flex min-h-[86svh] flex-col justify-center py-20 lg:min-h-[92svh]">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 rounded-full border border-primary-foreground/25 bg-navy/35 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground backdrop-blur-sm">
            <span className="size-2 rounded-full bg-health-yellow" />
            Dem nächsten Tag zuliebe · ALKORIN® Original
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6.4vw,5.5rem)] font-extrabold leading-[0.98] text-primary-foreground">
            Bereit für morgen.
            <span className="mt-1 block text-health-green">Gemacht für heute.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Ausgewählte Vitamine, Mineralstoffe und Cholin – als unkomplizierte Routine für
            Menschen, die bewusst durch ihren Alltag gehen.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex min-h-13 items-center justify-center rounded-[11px] bg-primary-foreground px-8 text-sm font-bold text-navy transition-colors hover:bg-soft-green"
            >
              Jetzt entdecken
            </Link>
            <Link
              to="/alkorin"
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-[11px] border border-primary-foreground/35 px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Alkorin kennenlernen
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <ul className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-primary-foreground/15 bg-navy/40 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/80 backdrop-blur-sm sm:text-xs">
        {TRUST.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
