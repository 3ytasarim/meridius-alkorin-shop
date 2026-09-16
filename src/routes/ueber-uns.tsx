import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, Info, Truck } from "lucide-react";
import { InfoCard } from "@/components/ui/info-card";

const pharmacist = "/pharmacist.png";

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
  {
    title: "Bewährte Rezeptur",
    text: "Eine über Jahre gewachsene Formel mit Cholin, Vitaminen und Mineralstoffen.",
    icon: FlaskConical,
    accent: "var(--health-green)",
    iconBg: "var(--soft-green)",
  },
  {
    title: "Klare Informationen",
    text: "Sachliche Angaben statt übertriebener Versprechen.",
    icon: Info,
    accent: "var(--health-blue)",
    iconBg: "var(--soft-blue)",
  },
  {
    title: "Aus Deutschland",
    text: "Versand aus Deutschland, Zahlung bequem bei der Lieferung.",
    icon: Truck,
    accent: "var(--health-yellow)",
    iconBg: "color-mix(in oklab, var(--health-yellow) 16%, white)",
  },
];

function UeberUnsPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-alkorin grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="overflow-hidden rounded-[22px]">
              <img
                src={pharmacist}
                alt="Apothekerin hält ein ALKORIN® Original in der Apotheke"
                loading="eager"
                width={1448}
                height={1086}
                className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[600px]"
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
              <li key={v.title}>
                <InfoCard
                  icon={<v.icon className="size-6" strokeWidth={1.8} />}
                  title={v.title}
                  description={v.text}
                  accent={v.accent}
                  iconBg={v.iconBg}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
