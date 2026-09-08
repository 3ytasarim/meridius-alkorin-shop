import expertise from "@/assets/expertise.jpg";

export function Quality() {
  return (
    <section className="section-y">
      <div className="container-alkorin grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Qualität &amp; Vertrauen</p>
          <h2 className="mt-4 max-w-lg text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            Bewährt. Durchdacht. Seit über 10 Jahren.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            ALKORIN® begleitet Menschen seit über einem Jahrzehnt – mit einer Rezeptur, die sich im
            Alltag bewährt hat, und einem Anspruch, der sich nicht an kurzfristigen Trends
            orientiert.
          </p>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-t border-border pt-5">
              <dt className="text-sm font-semibold text-navy">Etablierte Rezeptur</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Über Jahre gewachsen und konsequent beibehalten.
              </dd>
            </div>
            <div className="border-t border-border pt-5">
              <dt className="text-sm font-semibold text-navy">Klare Informationen</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Sachliche Angaben statt übertriebener Versprechen.
              </dd>
            </div>
          </dl>
        </div>

        <div className="order-1 overflow-hidden rounded-[22px] lg:order-2">
          {/* MEDIEN-PLATZHALTER: hier später das echte Apotheker-/Expertenmotiv einsetzen. */}
          <img
            src={expertise}
            alt="Fachkundige Person in heller Apothekenumgebung"
            loading="lazy"
            width={1200}
            height={1312}
            className="h-[340px] w-full object-cover sm:h-[460px] lg:h-[620px]"
          />
        </div>
      </div>
    </section>
  );
}
