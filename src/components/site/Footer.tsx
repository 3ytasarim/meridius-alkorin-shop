import { Link } from "@tanstack/react-router";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Alle Produkte", to: "/shop" },
      { label: "ALKORIN® Original", to: "/produkt/$slug", params: { slug: "original-100g" } },
      { label: "ALKORIN® Sachets", to: "/produkt/$slug", params: { slug: "sachets" } },
      { label: "Warenkorb", to: "/warenkorb" },
    ],
  },
  {
    title: "Alkorin",
    links: [
      { label: "Über Alkorin", to: "/alkorin" },
      { label: "Wissen", to: "/wissen" },
      { label: "Über uns", to: "/ueber-uns" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Kontakt", to: "/kontakt" },
      { label: "Versand", to: "/kontakt" },
      { label: "Zahlung", to: "/kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", to: "/impressum" },
      { label: "Datenschutz", to: "/datenschutz" },
      { label: "AGB", to: "/agb" },
      { label: "Widerruf", to: "/widerruf" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container-alkorin py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <p className="text-xl font-extrabold tracking-tight">
              ALKORIN<span className="align-super text-[10px]">®</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Eine bewährte Rezeptur mit ausgewählten Vitaminen, Mineralstoffen und Cholin – für
              bewusste Menschen und ihren Alltag.
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold">Neuigkeiten von ALKORIN</p>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter"
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  E-Mail-Adresse
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="E-Mail-Adresse"
                  className="h-12 w-full rounded-[10px] border border-primary-foreground/20 bg-primary-foreground/5 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-[10px] bg-primary-foreground px-5 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
                >
                  Anmelden
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/60">
                  {col.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        // @ts-expect-error optional route params for dynamic product links
                        params={"params" in link ? link.params : undefined}
                        className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ALKORIN®. Alle Rechte vorbehalten.</p>
          <p>Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene Ernährung.</p>
        </div>
      </div>
    </footer>
  );
}
