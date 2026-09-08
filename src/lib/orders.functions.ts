import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const ORDER_STATUSES = [
  "in_bearbeitung",
  "paketiert",
  "versendet",
  "geliefert",
  "storniert",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  in_bearbeitung: "In Bearbeitung",
  paketiert: "Paketiert",
  versendet: "Versendet",
  geliefert: "Geliefert",
  storniert: "Storniert",
};

export type OrderItem = { slug: string; name: string; qty: number; priceCents: number };

export type OrderRow = {
  id: number;
  order_no: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  street: string;
  zip: string;
  city: string;
  note: string | null;
  items: OrderItem[];
  total_cents: number;
  status: OrderStatus;
  created_at: string;
};

const orderSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(120).optional().or(z.literal("")),
  street: z.string().trim().min(4).max(160),
  zip: z.string().trim().min(3).max(12),
  city: z.string().trim().min(2).max(80),
  note: z.string().trim().max(500).optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        slug: z.string().min(1).max(60),
        qty: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(20),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const { getSql } = await import("./db.server");
    const { PRODUCTS } = await import("./products");
    const sql = getSql();

    const items = data.items.map((i) => {
      const p = PRODUCTS.find((x) => x.slug === i.slug);
      if (!p) throw new Error("Unbekanntes Produkt");
      return { slug: p.slug, name: p.name, qty: i.qty, priceCents: p.priceCents };
    });
    const totalCents = items.reduce((n, i) => n + i.qty * i.priceCents, 0);
    const orderNo = `ALK-${Date.now().toString(36).toUpperCase()}`;

    await sql`
      insert into orders
        (order_no, first_name, last_name, phone, email, street, zip, city, note, items, total_cents, status)
      values
        (${orderNo}, ${data.firstName}, ${data.lastName}, ${data.phone}, ${data.email || null},
         ${data.street}, ${data.zip}, ${data.city}, ${data.note || null},
         ${JSON.stringify(items)}::jsonb, ${totalCents}, 'in_bearbeitung')
    `;

    return { orderNo, totalCents };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ password: z.string().max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./db.server");
    assertAdmin(data.password);
    return { ok: true as const };
  });

export const listOrders = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ password: z.string().max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { getSql, assertAdmin } = await import("./db.server");
    assertAdmin(data.password);
    const sql = getSql();
    const rows = await sql`select * from orders order by created_at desc limit 500`;
    return rows as unknown as OrderRow[];
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        password: z.string().max(200),
        id: z.number().int(),
        status: z.enum(ORDER_STATUSES),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { getSql, assertAdmin } = await import("./db.server");
    assertAdmin(data.password);
    const sql = getSql();
    await sql`update orders set status = ${data.status} where id = ${data.id}`;
    return { ok: true as const };
  });
