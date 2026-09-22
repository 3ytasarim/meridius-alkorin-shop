import { Link } from "@tanstack/react-router";

const NAV = [
  {
    title: "Shop",
    links: [
      { label: "Alle Produkte", to: "/shop" },
      { label: "ALKORIN® Original", to: "/shop" },
      { label: "ALKORIN® Sachets", to: "/shop" },
      { label: "Warenkorb", to: "/warenkorb" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über Alkorin", to: "/alkorin" },
      // "Über uns" vorerst archiviert/ausgeblendet – siehe Header.tsx.
      // { label: "Über uns", to: "/ueber-uns" },
      { label: "FAQ", to: "/faq" },
      { label: "Kontakt", to: "/kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", to: "/impressum" },
      { label: "Datenschutz", to: "/datenschutz" },
      { label: "AGB", to: "/agb" },
    ],
  },
] as const;

/**
 * FooterGlow (21st.dev, mvpblocks demo.tsx) – 1:1 Struktur: Glass-Karte mit
 * zwei verschwommenen Glow-Blobs im Hintergrund, Icon-Badge+Wortmarke,
 * Beschreibung und Social-Icons links, 3 Nav-Spalten rechts, eine zentrierte
 * Copyright-Zeile unten. `<style jsx global>` (Next.js/styled-jsx, hier
 * nicht verfügbar) durch ein normales `<style>` ersetzt; Rose-Palette 1:1
 * durch die Site-Farben (Health-Blue/-Green) getauscht.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden pt-16 pb-8">
      <style>{`
        .footer-glass {
          backdrop-filter: blur(3px) saturate(180%);
          background: radial-gradient(circle, color-mix(in oklab, var(--card) 96%, transparent) 0%, color-mix(in oklab, var(--soft-green) 75%, transparent) 60%, var(--soft-green) 100%);
          border: 1px solid color-mix(in oklab, var(--health-green) 16%, transparent);
        }
      `}</style>

      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-health-yellow/35 blur-3xl" />
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-health-blue/35 blur-3xl" />
      </div>

      <div className="container-alkorin relative">
      <div className="footer-glass relative flex w-full flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="mb-4 flex items-center gap-2">
            <img
              src="/Meridius_Logo_Dark_Header.png"
              alt="Meridius"
              width={2008}
              height={378}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mb-6 max-w-xs text-center text-sm text-navy/70 md:text-left">
            Eine bewährte Rezeptur mit ausgewählten Vitaminen, Mineralstoffen und Cholin – für
            bewusste Menschen und ihren Alltag.
          </p>
          <div className="mt-2 flex gap-3 text-health-blue">
            <a href="#" aria-label="Instagram" className="transition hover:text-navy">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="transition hover:text-navy">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h7v-9h-3v-3h3V9.5C11 6.79 12.57 5.5 15 5.5c1.16 0 2.16.09 2.45.13v2.84h-1.68c-1.32 0-1.57.63-1.57 1.55V12h3.14l-.41 3H14v9h5a5 5 0 005-5V5a5 5 0 00-5-5z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="transition hover:text-navy">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.43 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
          </div>
        </div>

        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          {NAV.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-xs font-semibold tracking-widest text-health-blue uppercase">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-navy/70 transition hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="relative z-10 mt-10 text-center text-xs text-navy/70">
        <span>© {new Date().getFullYear()} ALKORIN®. Alle Rechte vorbehalten.</span>
      </div>
      </div>
    </footer>
  );
}
