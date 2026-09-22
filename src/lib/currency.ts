/** EUR → CHF Referenzkurs. Stand: 09/2026 – bei Bedarf manuell nachpflegen. */
export const EUR_CHF_RATE = 0.94;

/** Rechnet einen EUR-Cent-Betrag (Originalpreis) in CHF-Cent um. */
export function toChfCents(eurCents: number) {
  return Math.round(eurCents * EUR_CHF_RATE);
}

/** Formatiert bereits in CHF-Cent umgerechnete Beträge (z.B. für Animationen). */
export function formatChf(chfCents: number) {
  return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" }).format(
    chfCents / 100,
  );
}

/** Rechnet einen EUR-Cent-Preis um und formatiert ihn direkt als CHF-Preis-String. */
export function formatPriceChf(eurCents: number) {
  return formatChf(toChfCents(eurCents));
}
