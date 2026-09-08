import { Star } from "lucide-react";

/**
 * CONTENT-PLATZHALTER: Diese Bewertungen sind Beispieltexte und müssen vor dem
 * Livegang durch echte, verifizierte Kundenstimmen ersetzt werden.
 */
const REVIEWS = [
  {
    name: "Julia K.",
    text: "Die Anwendung ist wirklich unkompliziert – abmessen, einrühren, fertig. Genau das habe ich gesucht.",
  },
  {
    name: "Markus T.",
    text: "Die Sachets nehme ich unterwegs mit. Praktisch, sauber verpackt und schnell zur Hand.",
  },
  {
    name: "Sarah B.",
    text: "Klare Angaben, seriöser Auftritt, schnelle Lieferung. Das wirkt insgesamt sehr durchdacht.",
  },
];

export function Reviews() {
  return (
    <section className="section-y bg-soft-green">
      <div className="container-alkorin">
        <div className="max-w-2xl">
          <p className="eyebrow">Kundenstimmen</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Was unsere Kundinnen und Kunden sagen
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.name}>
              <figure className="flex h-full flex-col rounded-[20px] border border-border bg-card p-7">
                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-health-yellow text-health-yellow" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 leading-relaxed text-foreground">
                  „{r.text}“
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-muted-foreground">
                  {r.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
