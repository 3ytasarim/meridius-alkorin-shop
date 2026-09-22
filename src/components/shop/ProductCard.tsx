import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { formatPriceChf } from "@/lib/currency";
import { AnimatedPrice } from "@/components/ui/animated-price";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const formatPrice = formatPriceChf;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-card transition-shadow duration-300 hover:shadow-card">
      <Link
        to="/produkt/$slug"
        params={{ slug: product.slug }}
        className="relative block"
        aria-label={product.name}
      >
        <div className="relative bg-soft-green p-6">
          {product.badge ? (
            <span className="absolute left-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-health-yellow px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-navy shadow-[0_6px_16px_-4px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-white/50">
              <span className="size-1.5 rounded-full bg-navy/60" />
              {product.badge}
            </span>
          ) : null}
          <span className="relative mx-auto block aspect-square w-full max-w-[320px]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={1008}
              height={1008}
              className="absolute inset-0 size-full object-contain mix-blend-multiply opacity-100 transition duration-500 ease-in-out group-hover:scale-[1.04] group-hover:opacity-0"
            />
          </span>
        </div>
        {product.gallery[1] ? (
          <img
            src={product.gallery[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1008}
            height={1008}
            className="absolute inset-0 z-10 size-full object-cover opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"
          />
        ) : null}
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
            <AnimatedPrice cents={product.priceCents} className="text-lg font-extrabold text-navy" />
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
            Kauf auf Rechnung
          </p>
        </div>
      </div>
    </article>
  );
}
