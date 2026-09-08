const ITEMS = [
  "Seit über 10 Jahren",
  "Bewährte Rezeptur",
  "Praktisch dosierbar",
  "Entwickelt mit Expertise",
];

export function TrustStrip() {
  return (
    <section aria-label="Vertrauen" className="border-y border-border bg-soft-blue">
      <ul className="container-alkorin grid grid-cols-2 gap-y-6 py-8 text-center lg:grid-cols-4 lg:py-7">
        {ITEMS.map((item) => (
          <li
            key={item}
            className="text-xs font-bold uppercase tracking-[0.14em] text-navy/80 sm:text-[13px]"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
