import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/reklam-videosu.mp4.asset.json";

export function Hero() {
  return (
    <section className="bg-background">
      <div className="container-alkorin grid items-center gap-10 py-14 lg:grid-cols-[40fr_60fr] lg:gap-16 lg:py-20">
        <div className="fade-up max-w-xl">
          <p className="eyebrow">ALKORIN® Original</p>
          <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.08] text-navy sm:text-5xl lg:text-[3.5rem]">
            Bereit für morgen.
            <br />
            Gemacht für heute.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Die bewährte ALKORIN® Rezeptur verbindet ausgewählte Vitamine, Mineralstoffe und Cholin
            in einer unkomplizierten Routine – für Menschen, die bewusst durch ihren Alltag gehen.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex h-13 items-center rounded-[11px] bg-navy px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-navy/90 active:scale-[0.98]"
            >
              Produkte entdecken
            </Link>
            <Link
              to="/alkorin"
              className="group inline-flex items-center gap-2 px-1 py-4 text-sm font-semibold text-navy"
            >
              Alkorin kennenlernen
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <li>Seit über 10 Jahren</li>
            <li>Praktisch dosierbar</li>
            <li>Versand aus Deutschland</li>
          </ul>
        </div>

        <div className="fade-up relative overflow-hidden rounded-[22px] bg-soft-blue shadow-[0_1px_2px_oklch(0.28_0.038_242.3/0.04),0_24px_60px_oklch(0.28_0.038_242.3/0.10)]">
          <video
            className="block h-[340px] w-full object-cover object-center sm:h-[440px] lg:h-[560px]"
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="ALKORIN® Produkt- und Lifestyle-Video"
          />
        </div>
      </div>
    </section>
  );
}
