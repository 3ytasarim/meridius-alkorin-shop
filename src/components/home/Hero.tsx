import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

export function Hero() {
  return (
    <section className="bg-background">
      <div className="container-alkorin grid items-center gap-10 py-14 lg:grid-cols-[42fr_58fr] lg:gap-16 lg:py-20">
        <div className="fade-up max-w-xl">
          <p className="eyebrow">ALKORIN® Original</p>
          <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.08] text-navy sm:text-5xl lg:text-[4rem]">
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

        <div className="fade-up overflow-hidden rounded-[22px] bg-soft-blue">
          <img
            src={heroProduct}
            alt="ALKORIN® Dose auf hellem Podest im Tageslicht"
            width={1200}
            height={1408}
            className="h-[420px] w-full object-cover object-center sm:h-[520px] lg:h-[700px]"
          />
        </div>
      </div>
    </section>
  );
}
