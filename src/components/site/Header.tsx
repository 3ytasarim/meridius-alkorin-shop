import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatPriceChf } from "@/lib/currency";
import { PRODUCTS } from "@/lib/products";

// Struktur 1:1 nach 21st.dev shadcnblocks-com-navbar1 (NavigationMenu-Trigger/
// Content für Dropdowns, Sheet+Accordion mobil) – Inhalte & Auth-Slot durch
// unsere echten Routen/Warenkorb ersetzt, "Produkt" bekommt ein Mega-Menü mit
// den echten Produktkarten statt Blog-Icon-Links.
const NAV = [
  { title: "Shop", to: "/shop" },
  { title: "Alkorin", to: "/alkorin" },
  // "Über uns" vorerst archiviert/ausgeblendet (auf Wunsch) – Seite existiert
  // weiterhin unter /ueber-uns, nur der Menüpunkt ist entfernt. Zum
  // Wiederherstellen einfach die Zeile zurückholen:
  // { title: "Über uns", to: "/ueber-uns" },
  { title: "FAQ", to: "/faq" },
] as const;

const iconBtnBase =
  "grid size-12 place-items-center rounded-md transition-colors hover:bg-soft-blue hover:text-navy";

export function Header() {
  const cart = useCart();
  const formatPrice = formatPriceChf;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  // Transparent über dem dunklen Hero-Foto auf Start- und Alkorin-Seite;
  // überall sonst sofort die helle Leiste (Text sonst nicht lesbar).
  // Kein sticky/fixed mehr – die Leiste liegt in normalem Textfluss ganz oben
  // und scrollt mit der Seite weg; per negativem Margin schiebt sie sich beim
  // ersten Laden trotzdem über das Hero-Bild (siehe -mb-* unten).
  const transparentHero = (pathname === "/" || pathname === "/alkorin") && !open;
  const navLinkColor = transparentHero ? "text-navy" : "text-white";
  const iconBtn = `${iconBtnBase} ${transparentHero ? "text-foreground/80" : "text-white"}`;

  return (
    <header
      className={`relative z-50 ${
        pathname === "/" || pathname === "/alkorin" ? "-mb-20 lg:-mb-24" : ""
      }`}
    >
      <div
        className={`relative transition-colors duration-300 ${
          transparentHero ? "bg-transparent" : "bg-[#415a78]"
        }`}
      >
        <div className="container-alkorin flex h-20 items-center gap-6 lg:h-24">
          {/* Logo — left, bündig mit dem Container-Inhalt (z.B. "Bereit für morgen.") */}
          <Link to="/" aria-label="Alkorin – zur Startseite" className="shrink-0">
            <img
              src="/Meridius_Logo_Dark_Header.png"
              alt="Meridius"
              width={2008}
              height={378}
              className="h-12 w-auto lg:h-16"
            />
          </Link>

          {/* Nav — rechtsbündig, direkt vor den Icons */}
          <div className="hidden lg:ml-auto lg:flex lg:items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {NAV.map((item) =>
                  item.to === "/shop" ? (
                    <NavigationMenuItem key={item.to}>
                      <NavigationMenuTrigger
                        className={`h-11 bg-transparent text-[1.25rem] font-bold hover:bg-soft-blue hover:text-navy data-[state=open]:bg-soft-blue data-[state=open]:text-navy ${navLinkColor}`}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[560px] grid-cols-2 gap-3 p-4">
                          {PRODUCTS.map((p) => (
                            <li key={p.slug}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to="/produkt/$slug"
                                  params={{ slug: p.slug }}
                                  className="flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-soft-blue"
                                >
                                  <span className="grid size-16 shrink-0 place-items-center rounded-md bg-soft-green">
                                    <img
                                      src={p.image}
                                      alt=""
                                      className="size-14 object-contain mix-blend-multiply"
                                    />
                                  </span>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-navy">{p.name}</div>
                                    <p className="text-sm leading-snug text-muted-foreground">
                                      {p.tagline}
                                    </p>
                                    <p className="mt-1 text-sm font-bold text-navy">
                                      {formatPrice(p.priceCents)}
                                    </p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.to}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.to}
                          className={`relative inline-flex h-11 w-max items-center justify-center whitespace-nowrap rounded-md px-4 text-[1.25rem] font-bold transition-colors after:absolute after:-bottom-1 after:left-4 after:right-4 after:h-[2px] after:rounded-full after:bg-current after:opacity-0 after:transition-opacity hover:bg-soft-blue hover:text-navy ${navLinkColor}`}
                          activeProps={{ className: transparentHero ? "text-navy" : "text-white" }}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions — auf Mobile (Nav ausgeblendet) selbst nach rechts geschoben;
              ab lg übernimmt das bereits die Nav mit ml-auto. */}
          <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:-mr-3">
            <button type="button" aria-label="Suche" className={iconBtn}>
              <Search className="size-6" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => cart.setOpen(true)}
              aria-label="Warenkorb öffnen"
              className={`relative ${iconBtn}`}
            >
              <ShoppingBag className="size-6" strokeWidth={1.6} />
              {cart.count > 0 ? (
                <span className="absolute right-1 top-1 grid min-w-[18px] place-items-center rounded-full bg-health-yellow px-1 text-[10px] font-bold leading-[18px] text-navy">
                  {cart.count}
                </span>
              ) : null}
            </button>

            {/* Mobile: Sheet (1:1 navbar1) statt Inline-Dropdown */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={open ? "Menü schließen" : "Menü öffnen"}
                  aria-expanded={open}
                  className={`${iconBtn} lg:hidden`}
                >
                  {open ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                      <img src="/Meridius_Logo_Dark_Header.png" alt="Meridius" className="h-10 w-auto" />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-1">
                    <AccordionItem value="shop" className="border-b-0">
                      <AccordionTrigger className="py-3 text-base font-bold text-navy hover:no-underline">
                        Shop
                      </AccordionTrigger>
                      <AccordionContent className="mt-1">
                        <div className="flex flex-col gap-1">
                          {PRODUCTS.map((p) => (
                            <Link
                              key={p.slug}
                              to="/produkt/$slug"
                              params={{ slug: p.slug }}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-md p-2 outline-none transition-colors hover:bg-soft-blue"
                            >
                              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-soft-green">
                                <img
                                  src={p.image}
                                  alt=""
                                  className="size-9 object-contain mix-blend-multiply"
                                />
                              </span>
                              <span className="text-sm font-semibold text-navy">{p.name}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {NAV.filter((item) => item.to !== "/shop").map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="border-b border-border/70 py-3 text-base font-bold text-foreground last:border-0"
                      activeProps={{ className: "text-navy" }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
