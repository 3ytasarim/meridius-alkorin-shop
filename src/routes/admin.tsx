import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ORDER_STATUSES,
  STATUS_LABEL,
  adminLogin,
  listOrders,
  updateOrderStatus,
  type OrderRow,
  type OrderStatus,
} from "@/lib/orders.functions";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin | ALKORIN®" },
      { name: "description", content: "Bestellverwaltung für ALKORIN®." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin | ALKORIN®" },
      { property: "og:description", content: "Bestellverwaltung für ALKORIN®." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

const KEY = "alkorin-admin";

function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"alle" | OrderStatus>("alle");

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY);
    if (saved) setPassword(saved);
  }, []);

  const load = async (pw: string) => {
    setLoading(true);
    try {
      const rows = await listOrders({ data: { password: pw } });
      setOrders(rows);
    } catch {
      setError("Bestellungen konnten nicht geladen werden.");
      sessionStorage.removeItem(KEY);
      setPassword(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) void load(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await adminLogin({ data: { password: input } });
      sessionStorage.setItem(KEY, input);
      setPassword(input);
      setInput("");
    } catch {
      setError("Falsches Passwort.");
    }
  };

  const changeStatus = async (id: number, status: OrderStatus) => {
    if (!password) return;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      await updateOrderStatus({ data: { password, id, status } });
    } catch {
      void load(password);
    }
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "alle" && o.status !== filter) return false;
      if (!q) return true;
      return [o.order_no, o.first_name, o.last_name, o.phone, o.city, o.street]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orders, query, filter]);

  const revenue = orders
    .filter((o) => o.status !== "storniert")
    .reduce((n, o) => n + o.total_cents, 0);

  if (!password) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-[22px] border border-border bg-card p-8"
        >
          <h1 className="text-2xl font-extrabold text-navy">Admin-Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Bitte Passwort eingeben.</p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Passwort"
            className="mt-5 h-11 w-full rounded-[10px] border border-border bg-background px-3 text-sm outline-none focus:border-navy"
          />
          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
          <button className="mt-5 h-12 w-full rounded-[12px] bg-navy text-sm font-bold text-primary-foreground hover:bg-navy/90">
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container-alkorin py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-navy">Bestellungen</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kapıda ödeme – alle eingegangenen Bestellungen.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(KEY);
            setPassword(null);
          }}
          className="h-10 rounded-[10px] border border-border px-4 text-sm font-semibold text-navy hover:bg-soft-blue"
        >
          Abmelden
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Bestellungen", value: String(orders.length) },
          {
            label: "Offen (in Bearbeitung)",
            value: String(orders.filter((o) => o.status === "in_bearbeitung").length),
          },
          { label: "Umsatz", value: formatPrice(revenue) },
        ].map((s) => (
          <div key={s.label} className="rounded-[16px] border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-extrabold text-navy">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche nach Name, Telefon, Ort, Bestellnr."
          className="h-11 w-full max-w-xs rounded-[10px] border border-border bg-background px-3 text-sm outline-none focus:border-navy"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "alle" | OrderStatus)}
          className="h-11 rounded-[10px] border border-border bg-background px-3 text-sm text-navy outline-none focus:border-navy"
        >
          <option value="alle">Alle Status</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void load(password)}
          className="h-11 rounded-[10px] border border-border px-4 text-sm font-semibold text-navy hover:bg-soft-blue"
        >
          Aktualisieren
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[16px] border border-border bg-card">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-soft-blue text-xs uppercase tracking-wide text-navy">
            <tr>
              <th className="px-4 py-3">Bestellnr.</th>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Kunde</th>
              <th className="px-4 py-3">Kontakt</th>
              <th className="px-4 py-3">Adresse</th>
              <th className="px-4 py-3">Artikel</th>
              <th className="px-4 py-3">Summe</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  Lädt …
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  Keine Bestellungen gefunden.
                </td>
              </tr>
            ) : (
              rows.map((o) => (
                <tr key={o.id} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-semibold text-navy">{o.order_no}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("de-DE")}
                  </td>
                  <td className="px-4 py-3">
                    {o.first_name} {o.last_name}
                  </td>
                  <td className="px-4 py-3">
                    <div>{o.phone}</div>
                    <div className="text-xs text-muted-foreground">{o.email ?? "—"}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.street}, {o.zip} {o.city}
                    {o.note ? <div className="text-xs italic">„{o.note}"</div> : null}
                  </td>
                  <td className="px-4 py-3">
                    {o.items.map((i) => (
                      <div key={i.slug}>
                        {i.qty}× {i.name}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 font-bold text-navy">{formatPrice(o.total_cents)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => void changeStatus(o.id, e.target.value as OrderStatus)}
                      className="h-9 rounded-[8px] border border-border bg-background px-2 text-xs font-semibold text-navy outline-none focus:border-navy"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
