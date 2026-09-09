import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-card transition-shadow duration-300 hover:shadow-card">
      <Link
        to="/produkt/$slug"
        params={{ slug: product.slug }}
        className="relative block bg-soft-green p-6"
        aria-label={product.name}
      >
        {product.badge ? (
          <span className="absolute left-5 top-5 z-10 rounded-md bg-health-yellow px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
            {product.badge}
          </span>
        ) : null}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1008}
          height={1008}
          className="mx-auto aspect-square w-full max-w-[320px] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-health-blue">
          {product.tagline}
        </p>
        <h3 className="mt-2 text-lg font-bold text-navy">
          <Link to="/produkt/$slug" params={{ slug: product.slug }} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.descriptor}</p>

        <ul className="mt-4 space-y-1.5">
          {product.benefits.slice(0, 2).map((b) => (
            <li key={b} className="flex gap-2 text-sm text-foreground/80">
              <Check className="mt-0.5 size-4 shrink-0 text-health-green" strokeWidth={2.4} />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-extrabold text-navy">{formatPrice(product.priceCents)}</p>
            {product.compareAtCents ? (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtCents)}
              </span>
            ) : null}
            <span className="text-xs font-medium text-muted-foreground">{product.unit}</span>
          </div>
          <button
            type="button"
            onClick={() => add(product)}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-[11px] bg-navy px-5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-navy/90 active:scale-[0.99]"
          >
            In den Warenkorb
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Zahlung bequem bei Lieferung
          </p>
        </div>
      </div>
    </article>
  );
}
