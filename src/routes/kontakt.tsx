import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Send } from "lucide-react";

const EMAIL = "info@meridius.ch";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | ALKORIN®" },
      { name: "description", content: "So erreichst du das ALKORIN® Team." },
      { property: "og:title", content: "Kontakt | ALKORIN®" },
      { property: "og:description", content: "So erreichst du das ALKORIN® Team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <section className="section-y">
      <div className="container-alkorin max-w-2xl">
        <p className="eyebrow">Meridius</p>
        <h1 className="mt-4 text-4xl font-extrabold text-navy lg:text-5xl">Kontakt</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Du hast Fragen zu ALKORIN® oder zu deiner Bestellung? Schreib uns – wir melden uns so
          schnell wie möglich.
        </p>

        <div className="mt-10 space-y-6 rounded-[22px] border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-soft-blue text-navy">
              <Mail className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">E-Mail</p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg font-bold text-navy underline-offset-2 hover:underline"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-soft-blue text-navy">
              <MapPin className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Anschrift</p>
              <p className="text-base font-semibold leading-relaxed text-navy">
                Meridius Management GmbH
                <br />
                Churerstrasse 158
                <br />
                8808 Pfäffikon SZ
                <br />
                Schweiz
              </p>
            </div>
          </div>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[11px] bg-navy px-6 text-sm font-bold text-primary-foreground transition-all hover:bg-navy/90 active:scale-[0.99] sm:w-auto"
          >
            <Send className="size-4" strokeWidth={2} />
            Nachricht senden
          </a>
        </div>
      </div>
    </section>
  );
}
