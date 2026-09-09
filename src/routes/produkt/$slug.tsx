import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, ShieldCheck, Truck, Wallet } from "lucide-react";
import { PRODUCTS, formatPrice, getProduct } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/produkt/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug, name: product.name, descriptor: product.descriptor };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} | ALKORIN®` : "Produkt | ALKORIN®";
    const description = loaderData?.descriptor ?? "Produktdetails zu ALKORIN®.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

const USPS = [
  { icon: Truck, label: "Versand aus Deutschland" },
  { icon: Wallet, label: "Zahlung bei Lieferung" },
  { icon: ShieldCheck, label: "Bewährte Rezeptur" },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug)!;
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const related = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="pb-14 pt-8 lg:pb-20 lg:pt-12">
        <div className="container-alkorin">
          <nav aria-label="Brotkrumen" className="text-xs font-semibold text-muted-foreground">
            <Link to="/" className="hover:text-navy">
              Start
            </Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-navy">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-navy">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="relative overflow-hidden rounded-[22px] bg-soft-green p-8">
                {product.badge ? (
                  <span className="absolute left-6 top-6 rounded-md bg-health-yellow px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                    {product.badge}
                  </span>
                ) : null}
                <img
                  src={product.gallery[active]}
                  alt={product.name}
                  width={1008}
                  height={1008}
                  className="mx-auto aspect-square w-full max-w-[520px] object-contain"
                />
              </div>
              <ul className="mt-4 grid grid-cols-3 gap-4">
                {product.gallery.map((src, i) => (
                  <li key={src}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Bild ${i + 1} anzeigen`}
                      aria-current={i === active}
                      className={`block w-full overflow-hidden rounded-[14px] border bg-soft-blue transition-colors ${
                        i === active ? "border-navy" : "border-border hover:border-health-blue"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pt-4">
              <p className="eyebrow">{product.tagline}</p>
              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {product.descriptor}
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <p className="text-3xl font-extrabold text-navy">
                  {formatPrice(product.priceCents)}
                </p>
                {product.compareAtCents ? (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.compareAtCents)}
                  </span>
                ) : null}
                <span className="text-sm text-muted-foreground">
                  {product.unit} · {product.servings}
                </span>
              </div>

              <ul className="mt-7 space-y-2.5 border-y border-border py-6">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] text-foreground/85">
                    <Check className="mt-0.5 size-5 shrink-0 text-health-green" strokeWidth={2.4} />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <div className="flex h-13 items-center justify-between rounded-[11px] border border-border px-2 sm:w-36">
                  <button
                    type="button"
                    aria-label="Menge verringern"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid size-10 place-items-center rounded-md text-navy transition-colors hover:bg-soft-blue"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-6 text-center text-base font-bold text-navy">{qty}</span>
                  <button
                    type="button"
                    aria-label="Menge erhöhen"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="grid size-10 place-items-center rounded-md text-navy transition-colors hover:bg-soft-blue"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => add(product, qty)}
                  className="inline-flex h-14 flex-1 items-center justify-center rounded-[11px] bg-navy px-6 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-navy/90 active:scale-[0.99]"
                >
                  In den Warenkorb – {formatPrice(product.priceCents * qty)}
                </button>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {USPS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-[12px] bg-soft-blue px-3 py-3 text-xs font-semibold text-navy"
                  >
                    <Icon className="size-4 shrink-0 text-health-blue" strokeWidth={1.8} />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 divide-y divide-border border-y border-border">
                {[
                  { title: "Anwendung", body: product.usage },
                  { title: "Inhaltsstoffe", body: product.ingredients },
                  {
                    title: "Versand & Zahlung",
                    body: "Versand aus Deutschland. Die Zahlung erfolgt bequem bei der Lieferung (Nachnahme).",
                  },
                ].map((row) => (
                  <details key={row.title} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-navy">
                      {row.title}
                      <Plus className="size-4 transition-transform group-open:rotate-45" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                  </details>
                ))}
              </div>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Nahrungsergänzungsmittel sind kein Ersatz für eine abwechslungsreiche und
                ausgewogene Ernährung sowie eine gesunde Lebensweise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {product.video ? (
        <section className="pb-4">
          <div className="container-alkorin">
            <div className="overflow-hidden rounded-[22px] bg-soft-green/50">
              <video
                src={product.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${product.name} im Video`}
                className="mx-auto aspect-square w-full max-w-[640px] object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-y bg-soft-green/60">
        <div className="container-alkorin">
          <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
            Passt ebenfalls zu deiner Routine
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
