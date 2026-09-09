import { createFileRoute, Link } from "@tanstack/react-router";
import pharmacist from "@/assets/lifestyle/pharmacist.png.asset.json";
import usage from "@/assets/lifestyle/usage-infographic.png.asset.json";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns | ALKORIN®" },
      {
        name: "description",
        content:
          "Menschen und Haltung hinter ALKORIN®: eine bewährte Rezeptur aus Cholin, Vitaminen und Mineralstoffen – seit über 10 Jahren.",
      },
      { property: "og:title", content: "Über uns | ALKORIN®" },
      {
        property: "og:description",
        content: "Menschen und Haltung hinter ALKORIN®.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UeberUnsPage,
});

const VALUES = [
  { title: "Bewährte Rezeptur", text: "Eine über Jahre gewachsene Formel mit Cholin, Vitaminen und Mineralstoffen." },
  { title: "Klare Informationen", text: "Sachliche Angaben statt übertriebener Versprechen." },
  { title: "Aus Deutschland", text: "Versand aus Deutschland, Zahlung bequem bei der Lieferung." },
];

function UeberUnsPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-alkorin grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden rounded-[22px]">
            <img
              src={pharmacist.url}
              alt="Apothekerin hält ein ALKORIN® Original in der Apotheke"
              loading="eager"
              width={1448}
              height={1086}
              className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[600px]"
            />
          </div>
          <div>
            <p className="eyebrow">Über uns</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3.25rem]">
              Gesundheit in besten Händen.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              ALKORIN® steht für eine durchdachte Nahrungsergänzung, die sich ohne Aufwand in den
              Alltag einfügt. Seit über 10 Jahren begleitet die bewährte Rezeptur Menschen mit einer
              klaren Haltung: ehrliche Informationen, praktische Formate und kein leeres Versprechen.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex h-12 items-center rounded-[11px] bg-navy px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Produkte ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-soft-blue">
        <div className="container-alkorin">
          <div className="max-w-2xl">
            <p className="eyebrow">Unsere Haltung</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              Was uns leitet.
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <li key={v.title} className="rounded-[18px] border border-border bg-card p-7">
                <h3 className="text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-alkorin grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">So funktioniert es</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              Drei Schritte am Abend.
            </h2>
            <ol className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="text-sm font-bold tabular-nums text-health-green">01</span>
                <div>
                  <h3 className="font-bold text-navy">Feiern gehen</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">
                    Den Abend genießen – ganz ohne Druck.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-sm font-bold tabular-nums text-health-green">02</span>
                <div>
                  <h3 className="font-bold text-navy">Nach Hause kommen</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">
                    Einen ruhigen Moment für dich nehmen.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-sm font-bold tabular-nums text-health-green">03</span>
                <div>
                  <h3 className="font-bold text-navy">ALKORIN einnehmen</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">
                    Eine Portion in 250 ml Wasser einrühren – vor dem Schlafengehen.
                  </p>
                </div>
              </li>
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Bitte beachte die Verzehrempfehlung auf der Verpackung.
            </p>
          </div>
          <div className="overflow-hidden rounded-[22px]">
            <img
              src={usage.url}
              alt="Anleitung: ALKORIN® in Wasser einrühren"
              loading="lazy"
              width={1254}
              height={1254}
              className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[560px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
