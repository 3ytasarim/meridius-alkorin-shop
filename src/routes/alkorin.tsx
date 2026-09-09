import { createFileRoute, Link } from "@tanstack/react-router";
import expertise from "@/assets/lifestyle/expertise.png.asset.json";
import benefits from "@/assets/lifestyle/benefits.png.asset.json";
import lifestyleVideo from "@/assets/video-lifestyle.mp4.asset.json";

const PILLARS = [
  {
    title: "Mit Cholin",
    text: "Cholin ist ein zentraler Bestandteil der bewährten Rezeptur – unterstützt die Leberfunktion mit Cholin (gemäß Verpackung).",
  },
  {
    title: "Vitamine & Mineralstoffe",
    text: "Ausgewählte Vitamine und Mineralstoffe ergänzen die Formel. Mengenangaben findest du auf dem Etikett.",
  },
  {
    title: "Zitronengeschmack",
    text: "Das Pulver lässt sich einfach in Wasser einrühren – mit frischem Zitronengeschmack.",
  },
  {
    title: "Glutenfrei & laktosefrei",
    text: "Ohne Gluten und ohne Laktose – entsprechend der Angaben auf der Verpackung.",
  },
];

export const Route = createFileRoute("/alkorin")({
  head: () => ({
    meta: [
      { title: "Alkorin kennenlernen | ALKORIN®" },
      {
        name: "description",
        content:
          "ALKORIN® – das bewährte Original mit Cholin, Vitaminen und Mineralstoffen. Vor dem Schlafengehen einnehmen, dem nächsten Tag zuliebe.",
      },
      { property: "og:title", content: "Alkorin kennenlernen | ALKORIN®" },
      {
        property: "og:description",
        content:
          "ALKORIN® – das bewährte Original mit Cholin, Vitaminen und Mineralstoffen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlkorinPage,
});

function AlkorinPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy">
        <img
          src={expertise.url}
          alt="Apothekerin empfiehlt ALKORIN® Original"
          className="absolute inset-0 size-full object-cover"
          loading="eager"
          width={1672}
          height={941}
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="container-alkorin relative z-10 flex min-h-[60svh] flex-col justify-center py-20">
          <p className="inline-flex w-fit items-center gap-3 rounded-full border border-primary-foreground/25 bg-navy/35 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
            <span className="size-2 rounded-full bg-health-yellow" />
            Dem nächsten Tag zuliebe
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.4vw,4.5rem)] font-extrabold leading-[1] text-primary-foreground">
            Das bewährte ALKORIN® Original.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            Eine praktisch dosierbare Formel mit Vitaminen, Mineralstoffen und Cholin – vor dem
            Schlafengehen eingenommen.
          </p>
          <Link
            to="/shop"
            className="mt-9 inline-flex h-13 w-fit items-center rounded-[11px] bg-primary-foreground px-8 text-sm font-bold text-navy transition-colors hover:bg-soft-green"
          >
            Produkte entdecken
          </Link>
        </div>
      </section>

      <section className="section-y">
        <div className="container-alkorin grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden rounded-[22px] bg-soft-green/50">
            <video
              src={lifestyleVideo.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="ALKORIN® Markenvideo"
              className="mx-auto aspect-square w-full max-w-[560px] object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Die Marke</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
              Seit über 10 Jahren bewährt.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              ALKORIN® begleitet Menschen seit über einem Jahrzehnt – mit einer Rezeptur, die sich
              im Alltag bewährt hat. Kein kurzfristiger Trend, sondern ein ruhiger Schritt am Abend.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              Eine Portion in Wasser einrühren, vor dem Schlafengehen trinken – fertig.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex h-12 items-center rounded-[11px] bg-navy px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Zur Produktübersicht
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-soft-blue">
        <div className="container-alkorin">
          <div className="max-w-2xl">
            <p className="eyebrow">Was ALKORIN® ausmacht</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              Klar aufgebaut. Ohne Effekthascherei.
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.title} className="rounded-[18px] border border-border bg-card p-7">
                <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 overflow-hidden rounded-[22px]">
            <img
              src={benefits.url}
              alt="ALKORIN® Original Pulver mit Hinweisen glutenfrei und laktosefrei"
              loading="lazy"
              width={1672}
              height={941}
              className="h-[280px] w-full object-cover sm:h-[420px]"
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Nahrungsergänzungsmittel sind kein Ersatz für eine abwechslungsreiche und ausgewogene
            Ernährung sowie eine gesunde Lebensweise.
          </p>
        </div>
      </section>
    </>
  );
}
