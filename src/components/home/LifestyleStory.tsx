import AlkorinOrbit from "@/components/home/AlkorinOrbit";

export function LifestyleStory() {
  return (
    <section className="section-y overflow-x-clip">
      <div className="container-alkorin grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Lifestyle</p>
          <h2 className="mt-4 max-w-lg text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Für Abende, die länger werden.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Ob Dinner, Hochzeit, Geburtstag oder ein besonderer Abend mit Freunden – ALKORIN® lässt
            sich unkompliziert in deine persönliche Routine einfügen. Ohne großes Ritual, ohne
            Aufwand.
          </p>
        </div>

        <AlkorinOrbit productSrc="/alkorin-pack.png" productAlt="ALKORIN® Original Verpackung" />
      </div>
    </section>
  );
}
