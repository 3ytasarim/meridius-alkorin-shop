import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function Products() {
  return (
    <section id="produkte" className="section-y">
      <div className="container-alkorin">
        <div className="max-w-2xl">
          <p className="eyebrow">Für deinen Alltag</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3.25rem]">
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
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
