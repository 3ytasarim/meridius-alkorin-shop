import { useState } from "react";
import {
  AlertCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  Wallet,
  X,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatChf, toChfCents } from "@/lib/currency";
import { createOrder } from "@/lib/orders.functions";

type Country = "CH" | "DE";
const COUNTRY_LABEL: Record<Country, string> = { CH: "Schweiz", DE: "Deutschland" };
const EUR_FORMATTER = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

/** Porto & Verpackung: 6.- (CHF bzw. EUR je nach Land), gratis ab 100.- Warenwert. */
const SHIPPING_FEE_CENTS = 600;
const FREE_SHIPPING_THRESHOLD_CENTS = 10000;

type Fields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  note: string;
};

const EMPTY: Fields = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  street: "",
  zip: "",
  city: "",
  note: "",
};

const REQUIRED_FIELDS: { key: keyof Fields; label: string }[] = [
  { key: "firstName", label: "Vorname" },
  { key: "lastName", label: "Nachname" },
  { key: "phone", label: "Telefon" },
  { key: "street", label: "Straße und Hausnummer" },
  { key: "zip", label: "PLZ" },
  { key: "city", label: "Ort" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CartDrawer() {
  const { items, count, totalCents, open, setOpen, setQty, remove, clear } = useCart();
  const [country, setCountry] = useState<Country>("CH");
  const countryLabel = COUNTRY_LABEL[country];
  const formatPrice = (eurCents: number) =>
    country === "CH" ? formatChf(toChfCents(eurCents)) : EUR_FORMATTER.format(eurCents / 100);
  const formatDisplay = (displayCents: number) =>
    country === "CH" ? formatChf(displayCents) : EUR_FORMATTER.format(displayCents / 100);

  const subtotalCents = country === "CH" ? toChfCents(totalCents) : totalCents;
  const shippingCents =
    subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FEE_CENTS;
  const grandTotalCents = subtotalCents + shippingCents;

  const [step, setStep] = useState<"cart" | "form">("cart");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setFieldErrors((f) => ({ ...f, [k]: undefined }));
  };

  const close = () => {
    setOpen(false);
    setError(null);
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    for (const { key, label } of REQUIRED_FIELDS) {
      if (!fields[key].trim()) next[key] = `${label} ist erforderlich.`;
    }
    if (fields.email.trim() && !EMAIL_PATTERN.test(fields.email.trim())) {
      next.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setBusy(true);
    try {
      const shippingLabel =
        shippingCents === 0 ? "kostenlos" : `${formatDisplay(shippingCents)} Versandkosten`;
      const currencyNote = `Land: ${countryLabel} – Zwischensumme ${formatDisplay(subtotalCents)}, Versand ${shippingLabel}, Gesamt ${formatDisplay(grandTotalCents)}`;
      const note = [currencyNote, fields.note.trim()].filter(Boolean).join(" · ");
      const res = await createOrder({
        data: {
          ...fields,
          note,
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        },
      });
      setSuccess(res.orderNo);
      clear();
      setFields(EMPTY);
      setFieldErrors({});
      setStep("cart");
      setOpen(false);
    } catch {
      setError(
        "Die Bestellung konnte nicht gesendet werden. Bitte versuche es in ein paar Minuten erneut.",
      );
    } finally {
      setBusy(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `h-11 w-full rounded-[10px] border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 ${
      hasError
        ? "border-destructive focus:border-destructive"
        : "border-border focus:border-navy"
    }`;

  const fieldError = (key: keyof Fields) =>
    fieldErrors[key] ? (
      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-destructive">
        <AlertCircle className="size-3.5 shrink-0" />
        {fieldErrors[key]}
      </p>
    ) : null;

  return (
    <>
      {/* Overlay + Drawer */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] bg-navy/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />
      <aside
        aria-label="Warenkorb"
        className={`fixed right-0 top-0 z-[71] flex h-dvh w-full max-w-[440px] flex-col bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="flex items-center gap-2 text-base font-bold text-navy">
            <ShoppingBag className="size-5" strokeWidth={1.8} />
            {step === "cart" ? `Warenkorb (${count})` : "Bestellung per Rechnung"}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Schließen"
            className="grid size-10 place-items-center rounded-md text-foreground/70 transition-colors hover:bg-soft-blue hover:text-navy"
          >
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" strokeWidth={1.4} />
            <p className="text-sm text-muted-foreground">Dein Warenkorb ist noch leer.</p>
          </div>
        ) : step === "cart" ? (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map((i) => (
                <li key={i.slug} className="flex gap-4 rounded-[16px] border border-border p-3">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="size-20 rounded-[12px] bg-soft-green object-contain"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-bold text-navy">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.unit}</p>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 rounded-[10px] border border-border">
                        <button
                          type="button"
                          aria-label="Weniger"
                          onClick={() => setQty(i.slug, i.qty - 1)}
                          className="grid size-8 place-items-center text-navy"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                        <button
                          type="button"
                          aria-label="Mehr"
                          onClick={() => setQty(i.slug, i.qty + 1)}
                          className="grid size-8 place-items-center text-navy"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-navy">
                        {formatPrice(i.priceCents * i.qty)}
                      </span>
                      <button
                        type="button"
                        aria-label="Entfernen"
                        onClick={() => remove(i.slug)}
                        className="text-muted-foreground transition-colors hover:text-navy"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-5 py-5">
              <p className="flex items-center gap-2 rounded-[10px] bg-soft-green px-3 py-2 text-xs font-semibold text-navy">
                <Truck className="size-4" strokeWidth={1.8} /> Versand nach {countryLabel}
              </p>
              <p className="mt-2 flex items-center gap-2 rounded-[10px] bg-soft-blue px-3 py-2 text-xs font-semibold text-navy">
                <Wallet className="size-4" strokeWidth={1.8} /> Kauf auf Rechnung – 14 Tage
                Zahlungsfrist
              </p>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Lieferland
                </span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as Country)}
                  className="h-11 w-full rounded-[10px] border border-border bg-background px-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-navy"
                >
                  <option value="CH">Schweiz (CHF)</option>
                  <option value="DE">Deutschland (EUR)</option>
                </select>
              </label>
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Zwischensumme</span>
                  <span>{formatDisplay(subtotalCents)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Truck className="size-4" strokeWidth={1.8} /> Porto &amp; Verpackung
                  </span>
                  <span className={shippingCents === 0 ? "font-semibold text-health-green" : ""}>
                    {shippingCents === 0 ? "Kostenlos" : formatDisplay(shippingCents)}
                  </span>
                </div>
                {shippingCents > 0 ? (
                  <p className="text-[11px] text-muted-foreground">
                    Gratis Versand ab {formatDisplay(FREE_SHIPPING_THRESHOLD_CENTS)} Bestellwert.
                  </p>
                ) : null}
              </div>
              <div className="mt-3 flex items-center justify-between text-base font-bold text-navy">
                <span>Gesamt</span>
                <span>{formatDisplay(grandTotalCents)}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="mt-4 h-12 w-full rounded-[12px] bg-navy text-sm font-bold text-primary-foreground transition-all hover:bg-navy/90 active:scale-[0.99]"
              >
                Jetzt bestellen
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    placeholder="Vorname"
                    className={inputClass(!!fieldErrors.firstName)}
                    value={fields.firstName}
                    onChange={set("firstName")}
                  />
                  {fieldError("firstName")}
                </div>
                <div>
                  <input
                    placeholder="Nachname"
                    className={inputClass(!!fieldErrors.lastName)}
                    value={fields.lastName}
                    onChange={set("lastName")}
                  />
                  {fieldError("lastName")}
                </div>
              </div>
              <div>
                <input
                  placeholder="Telefon"
                  className={inputClass(!!fieldErrors.phone)}
                  value={fields.phone}
                  onChange={set("phone")}
                />
                {fieldError("phone")}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-Mail (optional)"
                  className={inputClass(!!fieldErrors.email)}
                  value={fields.email}
                  onChange={set("email")}
                />
                {fieldError("email")}
              </div>
              <div>
                <input
                  placeholder="Straße und Hausnummer"
                  className={inputClass(!!fieldErrors.street)}
                  value={fields.street}
                  onChange={set("street")}
                />
                {fieldError("street")}
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <div>
                  <input
                    placeholder="PLZ"
                    className={inputClass(!!fieldErrors.zip)}
                    value={fields.zip}
                    onChange={set("zip")}
                  />
                  {fieldError("zip")}
                </div>
                <div>
                  <input
                    placeholder="Ort"
                    className={inputClass(!!fieldErrors.city)}
                    value={fields.city}
                    onChange={set("city")}
                  />
                  {fieldError("city")}
                </div>
              </div>
              <input
                placeholder="Anmerkung (optional)"
                className={inputClass(false)}
                value={fields.note}
                onChange={set("note")}
              />
              {error ? (
                <p className="flex items-start gap-2 rounded-[10px] bg-destructive/10 px-3 py-2.5 text-sm font-medium text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              ) : null}
            </div>
            <div className="border-t border-border px-5 py-5">
              <p className="mb-2 text-xs text-muted-foreground">
                Versand: {countryLabel} · Zahlung per Rechnung (14 Tage)
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Zwischensumme</span>
                  <span>{formatDisplay(subtotalCents)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Truck className="size-4" strokeWidth={1.8} /> Porto &amp; Verpackung
                  </span>
                  <span className={shippingCents === 0 ? "font-semibold text-health-green" : ""}>
                    {shippingCents === 0 ? "Kostenlos" : formatDisplay(shippingCents)}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-base font-bold text-navy">
                <span>Rechnungsbetrag</span>
                <span>{formatDisplay(grandTotalCents)}</span>
              </div>
              <button
                type="submit"
                disabled={busy}
                className="mt-4 h-12 w-full rounded-[12px] bg-navy text-sm font-bold text-primary-foreground transition-all hover:bg-navy/90 active:scale-[0.99] disabled:opacity-60"
              >
                {busy ? "Wird gesendet …" : "Kaufen – Bestellung abschließen"}
              </button>
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="mt-2 h-10 w-full rounded-[10px] text-sm font-semibold text-muted-foreground transition-colors hover:text-navy"
              >
                Zurück zum Warenkorb
              </button>
            </div>
          </form>
        )}
      </aside>

      {/* Erfolgs-Popup */}
      {success ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-navy/50 px-4">
          <div className="w-full max-w-md rounded-[22px] bg-card p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto size-14 text-health-green" strokeWidth={1.6} />
            <h2 className="mt-4 text-2xl font-extrabold text-navy">Bestellung erhalten!</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Vielen Dank – deine Bestellung <strong className="text-navy">{success}</strong> ist bei
              uns eingegangen. Wir liefern nach {countryLabel} und stellen dir die Rechnung mit
              14 Tagen Zahlungsfrist zu.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(null)}
              className="mt-6 h-12 w-full rounded-[12px] bg-navy text-sm font-bold text-primary-foreground transition-all hover:bg-navy/90"
            >
              Schließen
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
