import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Shop", to: "/shop" },
  { label: "Alkorin", to: "/alkorin" },
  { label: "Wissen", to: "/wissen" },
  { label: "Über uns", to: "/ueber-uns" },
  { label: "FAQ", to: "/faq" },
] as const;

export function Header() {
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy text-center text-[13px] leading-none text-primary-foreground">
        <p className="container-alkorin py-2.5">Kostenloser Versand innerhalb Deutschlands</p>
      </div>

      <div
        className={`border-b transition-colors duration-300 ${
          scrolled ? "border-border bg-card/95 backdrop-blur" : "border-transparent bg-background"
        }`}
      >
        <div className="container-alkorin flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-navy">
            ALKORIN<span className="align-super text-[10px]">®</span>
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-navy"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Suche"
              className="grid size-11 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-soft-blue hover:text-navy"
            >
              <Search className="size-5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => cart.setOpen(true)}
              aria-label="Warenkorb öffnen"
              className="relative grid size-11 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-soft-blue hover:text-navy"
            >
              <ShoppingBag className="size-5" strokeWidth={1.6} />
              {cart.count > 0 ? (
                <span className="absolute right-1 top-1 grid min-w-[18px] place-items-center rounded-full bg-navy px-1 text-[10px] font-bold leading-[18px] text-primary-foreground">
                  {cart.count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-soft-blue hover:text-navy lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav aria-label="Mobile Navigation" className="border-t border-border bg-card lg:hidden">
            <ul className="container-alkorin py-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/70 py-4 text-base font-semibold text-foreground last:border-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
