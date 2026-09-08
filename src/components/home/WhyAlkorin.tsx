import lifestyle from "@/assets/lifestyle-evening.jpg";

const BENEFITS = [
  {
    no: "01",
    title: "Bewährte Rezeptur",
    text: "Eine über Jahre etablierte Kombination aus ausgewählten Vitaminen, Mineralstoffen und Cholin.",
  },
  {
    no: "02",
    title: "Einfach in den Alltag integrierbar",
    text: "Abmessen, in Wasser einrühren, fertig – ohne Aufwand und ohne komplizierte Regeln.",
  },
  {
    no: "03",
    title: "Praktische Formate",
    text: "Dose für zuhause, Sachets für unterwegs – du wählst, was zu deinem Tag passt.",
  },
];

export function WhyAlkorin() {
  return (
    <section className="section-y bg-soft-green">
      <div className="container-alkorin grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden rounded-[22px]">
          <img
            src={lifestyle}
            alt="Freunde an einem Abendtisch im warmen Licht"
            loading="lazy"
            width={1408}
            height={1008}
            className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[600px]"
          />
        </div>

        <div>
          <p className="eyebrow">Warum Alkorin?</p>
          <h2 className="mt-4 max-w-lg text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Eine einfache Routine für lange Abende und den nächsten Tag.
          </h2>
          <ol className="mt-10 space-y-8">
            {BENEFITS.map((b) => (
              <li key={b.no} className="flex gap-5 border-t border-border pt-6">
                <span className="text-sm font-bold tabular-nums text-health-blue">{b.no}</span>
                <div>
                  <h3 className="text-lg font-bold text-navy">{b.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
