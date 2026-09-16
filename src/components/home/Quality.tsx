import { FlaskConical, Info } from "lucide-react";
import { CardsGrid } from "@/components/ui/cards-grid";

const expertise = "/pharmacist.png";

const TRUST_CARDS = [
  {
    icon: FlaskConical,
    title: "Etablierte Rezeptur",
    description: "Über Jahre gewachsen und konsequent beibehalten.",
    color: "green" as const,
  },
  {
    icon: Info,
    title: "Klare Informationen",
    description: "Sachliche Angaben statt übertriebener Versprechen.",
    color: "blue" as const,
  },
];

export function Quality() {
  return (
    <section className="section-y">
      <div className="container-alkorin grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div className="order-2">
          <p className="eyebrow">Qualität &amp; Vertrauen</p>
          <h2 className="mt-4 max-w-lg text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Bewährt. Durchdacht. Seit über 10 Jahren.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            ALKORIN® begleitet Menschen seit über einem Jahrzehnt – mit einer Rezeptur, die sich im
            Alltag bewährt hat, und einem Anspruch, der sich nicht an kurzfristigen Trends
            orientiert.
          </p>
          <CardsGrid items={TRUST_CARDS} className="mt-10" />
        </div>

        <div className="relative order-1">
          <div className="overflow-hidden rounded-[22px]">
            {/* MEDIEN-PLATZHALTER: hier später das echte Apotheker-/Expertenmotiv einsetzen. */}
            <img
              src={expertise}
              alt="Apothekerin empfiehlt ALKORIN® in einer hellen Apotheke"
              loading="lazy"
              width={1448}
              height={1086}
              className="h-[340px] w-full object-cover sm:h-[460px] lg:h-[620px]"
            />
          </div>
          <img
            src="/cross.png"
            alt=""
            aria-hidden="true"
            className="absolute -left-4 -top-4 size-16 drop-shadow-lg motion-safe:animate-[badge-float_3.4s_ease-in-out_infinite] sm:size-20"
          />
          <img
            src="/health-care.png"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 size-16 drop-shadow-lg motion-safe:animate-[badge-float_3.8s_ease-in-out_infinite] [animation-delay:-1.5s] sm:size-20"
          />
        </div>
      </div>
    </section>
  );
}
