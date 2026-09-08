import lifestyle from "@/assets/lifestyle-evening.jpg";

export function LifestyleStory() {
  return (
    <section className="section-y">
      <div className="container-alkorin">
        <div className="overflow-hidden rounded-[22px]">
          <img
            src={lifestyle}
            alt="Entspannter Abend mit Freunden bei Kerzenlicht"
            loading="lazy"
            width={1408}
            height={1008}
            className="h-[340px] w-full object-cover sm:h-[460px] lg:h-[560px]"
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="eyebrow">Lifestyle</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Für Abende, die länger werden.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Ob Dinner, Hochzeit, Geburtstag oder ein besonderer Abend mit Freunden – ALKORIN® lässt
            sich unkompliziert in deine persönliche Routine einfügen. Ohne großes Ritual, ohne
            Aufwand.
          </p>
        </div>
      </div>
    </section>
  );
}
