import { PRODUCTS, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function Products() {
  const { add } = useCart();

  return (
    <section id="produkte" className="section-y">
      <div className="container-alkorin">
        <div className="max-w-2xl">
          <p className="eyebrow">Für deinen Alltag</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3.25rem]">
            Finde ALKORIN, das zu dir passt.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Dieselbe bewährte Rezeptur – in Formaten, die sich deinem Tag anpassen. Bezahlt wird
            bequem bei der Lieferung.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-shadow duration-300 hover:shadow-card">
                <div className="relative bg-soft-green p-6">
                  {p.badge ? (
                    <span className="absolute left-5 top-5 rounded-md bg-health-yellow px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                      {p.badge}
                    </span>
                  ) : null}
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1008}
                    height={1008}
                    className="mx-auto aspect-square w-full max-w-[320px] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-navy">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.descriptor}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-base font-bold text-navy">
                      {formatPrice(p.priceCents)}
                      <span className="ml-2 text-xs font-medium text-muted-foreground">
                        {p.unit}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => add(p)}
                      className="inline-flex h-11 items-center rounded-[10px] bg-navy px-5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-navy/90 active:scale-[0.98]"
                    >
                      In den Warenkorb
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
