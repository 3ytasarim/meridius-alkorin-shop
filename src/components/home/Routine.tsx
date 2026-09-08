import routine from "@/assets/routine.jpg";

const STEPS = [
  {
    no: "01",
    title: "Dosieren",
    text: "Die vorgesehene Menge ALKORIN® mit dem beiliegenden Dosierlöffel abmessen – oder ein Sachet öffnen.",
  },
  {
    no: "02",
    title: "Mit Wasser einnehmen",
    text: "In ein Glas Wasser einrühren und trinken. Ohne besonderen Aufwand, ohne Umstellung deines Abends.",
  },
  {
    no: "03",
    title: "Routine abschließen",
    text: "Fertig. ALKORIN® bleibt ein kleiner, ruhiger Schritt in deinem Tag.",
  },
];

export function Routine() {
  return (
    <section className="section-y">
      <div className="container-alkorin">
        <div className="max-w-2xl">
          <p className="eyebrow">So funktioniert es</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            So einfach wird ALKORIN Teil deiner Routine.
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div className="overflow-hidden rounded-[22px]">
            <img
              src={routine}
              alt="Ein Glas Wasser wird in einer hellen Küche umgerührt"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[540px]"
            />
          </div>

          <ol className="space-y-8">
            {STEPS.map((s) => (
              <li key={s.no} className="rounded-[18px] border border-border bg-card p-7">
                <span className="text-sm font-bold tabular-nums text-health-green">{s.no}</span>
                <h3 className="mt-3 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Bitte beachte die Verzehrempfehlung auf der Verpackung.
        </p>
      </div>
    </section>
  );
}
