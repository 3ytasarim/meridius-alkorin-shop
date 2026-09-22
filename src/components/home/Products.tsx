import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function Products() {
  return (
    <section id="produkte" className="section-y overflow-x-clip">
      <div className="container-alkorin">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3.25rem]">
            Finde ALKORIN, das zu dir passt.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Dieselbe bewährte Rezeptur – in Formaten, die sich deinem Tag anpassen. Bequem auf
            Rechnung kaufen, Versand innerhalb der Schweiz.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
