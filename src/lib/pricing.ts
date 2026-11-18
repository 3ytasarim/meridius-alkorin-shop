/** Porto & Verpackung: CHF 6.-, gratis ab CHF 100.- Warenwert. Lieferung nur in die Schweiz. */
export const SHIPPING_FEE_CENTS = 600;
export const FREE_SHIPPING_THRESHOLD_CENTS = 10000;

/** Schweizer MWST-Satz (Stand 2026). Preise sind inkl. MWST ausgezeichnet. */
export const VAT_RATE = 0.081;

export function calcTotals(subtotalCents: number) {
  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FEE_CENTS;
  // MWST wird nur auf den Warenwert (Zwischensumme) berechnet, nicht auf den Versand.
  const vatCents = Math.round(subtotalCents - subtotalCents / (1 + VAT_RATE));
  return {
    subtotalCents,
    shippingCents,
    grandTotalCents: subtotalCents + shippingCents,
    vatCents,
    nettoCents: subtotalCents - vatCents,
  };
}
