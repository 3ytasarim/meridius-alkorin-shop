import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { eachDayOfInterval, endOfMonth, format, parseISO, startOfMonth } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
import { AdminLoginBackground } from "@/components/site/AdminLoginBackground";

const ymd = (d: Date) => format(d, "yyyy-MM-dd");

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

type Credentials = { username: string; password: string };

function AdminPage() {
  const [creds, setCreds] = useState<Credentials | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"alle" | OrderStatus>("alle");
  const [rangeStart, setRangeStart] = useState(() => ymd(startOfMonth(new Date())));
  const [rangeEnd, setRangeEnd] = useState(() => ymd(endOfMonth(new Date())));

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY);
    if (saved) setCreds(JSON.parse(saved) as Credentials);
  }, []);

  const load = async (c: Credentials) => {
    setLoading(true);
    try {
      const rows = await listOrders({ data: c });
      setOrders(rows);
    } catch {
      setError("Bestellungen konnten nicht geladen werden.");
      sessionStorage.removeItem(KEY);
      setCreds(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (creds) void load(creds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creds]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const c = { username: usernameInput, password: passwordInput };
    try {
      await adminLogin({ data: c });
      sessionStorage.setItem(KEY, JSON.stringify(c));
      setCreds(c);
      setUsernameInput("");
      setPasswordInput("");
    } catch {
      setError("Falscher Benutzername oder Passwort.");
    }
  };

  const changeStatus = async (id: number, status: OrderStatus) => {
    if (!creds) return;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      await updateOrderStatus({ data: { ...creds, id, status } });
    } catch {
      void load(creds);
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

  const dailyStats = useMemo(() => {
    const start = parseISO(rangeStart);
    const end = parseISO(rangeEnd);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) return [];

    const byDay = new Map<string, { orders: number; units: number }>();
    for (const o of orders) {
      if (o.status === "storniert") continue;
      const day = ymd(new Date(o.created_at));
      if (day < rangeStart || day > rangeEnd) continue;
      const entry = byDay.get(day) ?? { orders: 0, units: 0 };
      entry.orders += 1;
      entry.units += o.items.reduce((n, i) => n + i.qty, 0);
      byDay.set(day, entry);
    }

    return eachDayOfInterval({ start, end }).map((d) => {
      const key = ymd(d);
      const entry = byDay.get(key);
      return {
        day: key,
        label: format(d, "dd.MM."),
        Bestellungen: entry?.orders ?? 0,
        "Verkaufte Einheiten": entry?.units ?? 0,
      };
    });
  }, [orders, rangeStart, rangeEnd]);

  const resetToThisMonth = () => {
    setRangeStart(ymd(startOfMonth(new Date())));
    setRangeEnd(ymd(endOfMonth(new Date())));
  };

  if (!creds) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-soft-blue via-background to-soft-green px-4 py-16">
        <div className="pointer-events-none absolute inset-0 -z-20 select-none">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-health-yellow/50 blur-3xl" />
          <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-health-green/45 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-health-blue/40 blur-3xl" />
        </div>
        <div className="absolute inset-0 -z-10">
          <AdminLoginBackground />
        </div>

        <div className="relative z-10 flex w-full max-w-[400px] flex-col items-center rounded-xl bg-[#415a78] p-8 text-center shadow-2xl">
          <img
            src="/Meridius_Logo_Dark_Header.png"
            alt="Meridius"
            width={2008}
            height={378}
            className="mb-5 h-12 w-auto"
          />
          <h1 className="text-[1.35rem] font-bold tracking-tight text-white">Admin-Anmeldung</h1>
          <p className="mb-4 mt-1 text-[0.85rem] leading-relaxed text-white/80">
            Bitte melde dich mit deinem Benutzernamen an.
          </p>

          <form onSubmit={login} className="flex w-full flex-col gap-2.5">
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Benutzername"
              autoComplete="username"
              className="h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-navy"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Passwort"
                autoComplete="current-password"
                className="h-11 w-full rounded-md border border-border bg-background px-3.5 pr-11 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-navy"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted-foreground transition-colors hover:text-navy"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {error ? <p className="text-sm font-medium text-red-200">{error}</p> : null}
            <button className="h-11 w-full rounded-md bg-gradient-to-r from-health-green to-health-yellow text-sm font-semibold text-navy transition-transform hover:scale-[1.02] active:scale-[0.99]">
              Anmelden
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container-alkorin py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-navy">Bestellungen</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Alle eingegangenen Bestellungen.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(KEY);
            setCreds(null);
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
          onClick={() => void load(creds)}
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

      <div className="mt-6 rounded-[16px] border border-border bg-card p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-navy">Verkäufe pro Tag</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Bestellungen und verkaufte Einheiten je Tag im gewählten Zeitraum.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              Von
              <input
                type="date"
                value={rangeStart}
                max={rangeEnd}
                onChange={(e) => setRangeStart(e.target.value)}
                className="h-9 rounded-[8px] border border-border bg-background px-2 text-xs text-navy outline-none focus:border-navy"
              />
            </label>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              Bis
              <input
                type="date"
                value={rangeEnd}
                min={rangeStart}
                onChange={(e) => setRangeEnd(e.target.value)}
                className="h-9 rounded-[8px] border border-border bg-background px-2 text-xs text-navy outline-none focus:border-navy"
              />
            </label>
            <button
              type="button"
              onClick={resetToThisMonth}
              className="h-9 rounded-[8px] border border-border px-3 text-xs font-semibold text-navy hover:bg-soft-blue"
            >
              Dieser Monat
            </button>
          </div>
        </div>

        <div className="mt-6 h-[320px] w-full">
          {dailyStats.length === 0 ? (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">
              Kein gültiger Zeitraum ausgewählt.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyStats} margin={{ top: 4, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    borderColor: "var(--border)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="Bestellungen"
                  stroke="var(--health-blue)"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Verkaufte Einheiten"
                  stroke="var(--health-green)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
