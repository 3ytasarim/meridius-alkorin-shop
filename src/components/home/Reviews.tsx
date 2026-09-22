import { Star } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

/**
 * CONTENT-PLATZHALTER: Diese Bewertungen (Namen, Zitate, Avatare) sind
 * fiktive Beispieltexte für den Lauftext/Animation-Aufbau und müssen vor dem
 * Livegang durch echte, verifizierte Kundenstimmen ersetzt werden. Avatare
 * sind generische Platzhalter-Fotos (Pravatar), keine echten Personen.
 */
const REVIEWS = [
  {
    name: "Julia Krämer",
    text: "Die Anwendung ist wirklich unkompliziert – abmessen, einrühren, fertig. Genau das habe ich gesucht.",
    avatar: 47,
  },
  {
    name: "Markus Thalmann",
    text: "Die Sachets nehme ich unterwegs mit. Praktisch, sauber verpackt und schnell zur Hand.",
    avatar: 12,
  },
  {
    name: "Sarah Bergmann",
    text: "Klare Angaben, seriöser Auftritt, schnelle Lieferung. Das wirkt insgesamt sehr durchdacht.",
    avatar: 5,
  },
  {
    name: "Nina Vogel",
    text: "Der Zitronengeschmack ist angenehm, nicht zu süß. Lässt sich schnell in Wasser einrühren.",
    avatar: 23,
  },
  {
    name: "Thomas Weidner",
    text: "Ein kleiner fester Punkt am Abend, ohne großen Aufwand. Genau das, was ich mir erhofft hatte.",
    avatar: 8,
  },
  {
    name: "Laura Fischer",
    text: "Die Verpackung wirkt hochwertig und der Zippverschluss hält wirklich dicht.",
    avatar: 31,
  },
  {
    name: "Daniel Brandt",
    text: "Bestellung war unkompliziert, Lieferung kam schnell. Der Kauf auf Rechnung ist ein großes Plus.",
    avatar: 44,
  },
  {
    name: "Christina Lehmann",
    text: "Keine komplizierten Regeln, keine Wartezeiten – einfach abends einrühren und fertig.",
    avatar: 15,
  },
  {
    name: "Felix Hartmann",
    text: "Die Sachets passen locker in die Jackentasche. Ideal für unterwegs oder auf Reisen.",
    avatar: 52,
  },
  {
    name: "Anna-Lena Schuster",
    text: "Ist inzwischen ein fester Teil meines Abends geworden, ganz ohne großes Ritual.",
    avatar: 19,
  },
  {
    name: "Michael Straub",
    text: "Die Kapseln nehme ich auf Reisen, das Pulver zuhause. Beides unkompliziert in der Handhabung.",
    avatar: 36,
  },
  {
    name: "Sophie Reuter",
    text: "Geschmacklich neutral genug, dass es sich gut in den Abend einfügt, ohne aufzufallen.",
    avatar: 9,
  },
  {
    name: "Jonas Kellner",
    text: "Übersichtliche Website, klare Produktbeschreibung – man weiß genau, was man bekommt.",
    avatar: 27,
  },
  {
    name: "Vanessa Moser",
    text: "Die Angaben zu den Inhaltsstoffen sind nachvollziehbar aufgeführt, ohne große Versprechen.",
    avatar: 60,
  },
  {
    name: "Patrick Ebner",
    text: "Lässt sich gut in eine bestehende Abendroutine einbauen, ohne dass es nach Aufwand aussieht.",
    avatar: 3,
  },
  {
    name: "Melanie Sander",
    text: "Für die Menge an Sachets im 40er-Paket finde ich den Preis absolut in Ordnung.",
    avatar: 41,
  },
  {
    name: "Simon Achterberg",
    text: "Ich mag, dass es kein großes Ritual braucht – einfach kurz vor dem Schlafengehen einrühren.",
    avatar: 17,
  },
  {
    name: "Katharina Peters",
    text: "Lässt sich unkompliziert in den Alltag integrieren, ohne dass ich etwas umstellen musste.",
    avatar: 55,
  },
] as const;

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <figure className="flex h-full w-[340px] shrink-0 flex-col rounded-[20px] border border-border bg-card p-7 shadow-sm">
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-health-yellow text-health-yellow" />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 leading-relaxed text-foreground">
        „{review.text}“
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <img
          src={`https://i.pravatar.cc/96?img=${review.avatar}`}
          alt=""
          loading="lazy"
          className="size-10 rounded-full object-cover"
        />
        <span className="text-sm font-semibold text-navy">{review.name}</span>
      </figcaption>
    </figure>
  );
}

// Drei Reihen à 6 Bewertungen, abwechselnde Laufrichtung – Animation im Stil
// von 21st.dev "community-testimonial" (Mehrreihen-Endlosband), umgesetzt mit
// dem projekteigenen InfiniteSlider statt einer zweiten Marquee-Implementierung.
const ROWS = [REVIEWS.slice(0, 6), REVIEWS.slice(6, 12), REVIEWS.slice(12, 18)];

export function Reviews() {
  return (
    <section className="relative section-y overflow-hidden bg-soft-green">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-2/3"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, oklch(0.617 0.076 225.5 / 0.22) 0%, transparent 70%)",
        }}
      />

      <div className="container-alkorin relative z-10 max-w-2xl fade-up">
        <p className="eyebrow">Kundenstimmen</p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
          Was unsere Kundinnen und Kunden sagen
        </h2>
      </div>

      <div className="relative z-10 mt-12 flex flex-col gap-6">
        {ROWS.map((row, i) => (
          <InfiniteSlider
            key={i}
            gap={24}
            speed={32}
            speedOnHover={10}
            reverse={i % 2 === 1}
            className="[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
          >
            {row.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </InfiniteSlider>
        ))}
      </div>
    </section>
  );
}
