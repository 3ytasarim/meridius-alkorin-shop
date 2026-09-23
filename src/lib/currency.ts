/**
 * Keine Wechselkurs-Umrechnung mehr: Die bisherigen Preiszahlen bleiben exakt
 * gleich, es wird nur "CHF" statt "€" angezeigt.
 */
export function toChfCents(cents: number) {
  return cents;
}

/** Formatiert einen Cent-Betrag als CHF-Preis-String. */
export function formatChf(cents: number) {
  return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" }).format(
    cents / 100,
  );
}

/** Formatiert einen Cent-Betrag direkt als CHF-Preis-String (gleiche Zahl, nur CHF-Label). */
export function formatPriceChf(cents: number) {
  return formatChf(toChfCents(cents));
}
