import { Link } from "@tanstack/react-router";
import lifestyle from "@/assets/routine.jpg";

export function FinalCta() {
  return (
    <section className="section-y">
      <div className="container-alkorin">
        <div className="grid overflow-hidden rounded-[22px] border border-border bg-card lg:grid-cols-2">
          <img
            src={lifestyle}
            alt="Ruhiger Moment in der Küche mit einem Glas Wasser"
            loading="lazy"
            width={1408}
            height={1008}
            className="h-[280px] w-full object-cover lg:h-full"
          />
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <h2 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              Deine Routine. Dein ALKORIN.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Finde das Format, das zu deinem Alltag passt – als Dose für zuhause oder als Sachet
              für unterwegs.
            </p>
            <div>
              <Link
                to="/shop"
                className="mt-8 inline-flex h-13 items-center rounded-[11px] bg-navy px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-navy/90 active:scale-[0.98]"
              >
                Produkte entdecken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
