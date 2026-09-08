import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { createOrder } from "@/lib/orders.functions";

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

export function CartDrawer() {
  const { items, count, totalCents, open, setOpen, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<"cart" | "form">("cart");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const close = () => {
    setOpen(false);
    setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await createOrder({
        data: {
          ...fields,
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        },
      });
      setSuccess(res.orderNo);
      clear();
      setFields(EMPTY);
      setStep("cart");
      setOpen(false);
    } catch {
      setError(
        "Bitte prüfe deine Angaben (Name, Telefon, Straße, PLZ, Ort). Die Bestellung konnte nicht gesendet werden.",
      );
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-navy";

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
            {step === "cart" ? `Warenkorb (${count})` : "Kapıda ödeme – Bestellung"}
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
                <Truck className="size-4" strokeWidth={1.8} /> Zahlung bei Lieferung (Kapıda ödeme)
              </p>
              <div className="mt-4 flex items-center justify-between text-base font-bold text-navy">
                <span>Gesamt</span>
                <span>{formatPrice(totalCents)}</span>
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
          <form onSubmit={submit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Vorname" className={inputClass} value={fields.firstName} onChange={set("firstName")} />
                <input required placeholder="Nachname" className={inputClass} value={fields.lastName} onChange={set("lastName")} />
              </div>
              <input required placeholder="Telefon" className={inputClass} value={fields.phone} onChange={set("phone")} />
              <input type="email" placeholder="E-Mail (optional)" className={inputClass} value={fields.email} onChange={set("email")} />
              <input required placeholder="Straße und Hausnummer" className={inputClass} value={fields.street} onChange={set("street")} />
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <input required placeholder="PLZ" className={inputClass} value={fields.zip} onChange={set("zip")} />
                <input required placeholder="Ort" className={inputClass} value={fields.city} onChange={set("city")} />
              </div>
              <input placeholder="Anmerkung (optional)" className={inputClass} value={fields.note} onChange={set("note")} />
              {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
            </div>
            <div className="border-t border-border px-5 py-5">
              <div className="flex items-center justify-between text-base font-bold text-navy">
                <span>Zu zahlen bei Lieferung</span>
                <span>{formatPrice(totalCents)}</span>
              </div>
              <button
                type="submit"
                disabled={busy}
                className="mt-4 h-12 w-full rounded-[12px] bg-navy text-sm font-bold text-primary-foreground transition-all hover:bg-navy/90 active:scale-[0.99] disabled:opacity-60"
              >
                {busy ? "Wird gesendet …" : "Satın al – Kauf abschließen"}
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
            <h2 className="mt-4 text-2xl font-extrabold text-navy">İşleminiz alındı!</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Vielen Dank – deine Bestellung <strong className="text-navy">{success}</strong> ist bei
              uns eingegangen. Wir liefern schnellstmöglich, bezahlt wird bequem bei der Lieferung.
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
