import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Ripple } from "@/components/ui/ripple";
import { GradientText } from "@/components/ui/gradient-text";
import { BestsellerBadge } from "@/components/ui/bestseller-badge";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/* Foto als Vollflächen-Hintergrund – eigenes Hochformat-Motiv für Mobile */}
      <img
        src="/ChatGPT Image 11 Eyl 2026 23_46_39.png"
        alt="ALKORIN® Original mit Zitronenlimonade und Kapseln in heller Küche"
        className="absolute inset-0 -z-20 h-full w-full object-cover sm:hidden"
      />
      <img
        src="/ChatGPT Image 11 Eyl 2026 19_05_17.png"
        alt="ALKORIN® Original mit Zitronenlimonade und Kapseln in heller Küche"
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover sm:block"
      />
      {/* Schatten-Verlauf links → rechts, damit der Text über dem Foto lesbar bleibt */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/10"
      />

      <div className="container-alkorin relative z-10 flex min-h-[560px] items-center py-20 sm:min-h-[620px] lg:min-h-[calc(100svh-2rem)] lg:py-28">
        <div className="pointer-events-none absolute right-0 top-24 z-20 hidden sm:right-2 sm:top-28 sm:block lg:right-6 lg:top-32">
          <BestsellerBadge size={205} label="UNSER BESTSELLER" number="#1" />
        </div>

        <div className="min-w-0 max-w-xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-navy/80 shadow-sm">
            <span className="size-2 rounded-full bg-health-yellow" />
            Dem nächsten Tag zuliebe · ALKORIN® Original
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-extrabold leading-[1.03] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.25)]">
            Bereit für morgen.
            <GradientText className="mt-1 block">Gemacht für heute.</GradientText>
          </h1>

          <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.2)] sm:text-lg">
            Ausgewählte Vitamine, Mineralstoffe und Cholin – als unkomplizierte Routine für
            Menschen, die bewusst durch ihren Alltag gehen.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="relative isolate inline-flex min-h-13 items-center justify-center overflow-hidden rounded-[11px] bg-navy px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-navy/30 transition-colors hover:bg-navy/90"
            >
              <Ripple color="rgba(255,255,255,0.4)" />
              <span className="relative z-10">Jetzt entdecken</span>
            </Link>
            <Link
              to="/alkorin"
              className="group relative isolate inline-flex min-h-13 items-center justify-center gap-2 overflow-hidden rounded-[11px] border border-white/40 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              <Ripple color="rgba(255,255,255,0.25)" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Alkorin kennenlernen
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
