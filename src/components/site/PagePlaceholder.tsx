import { Link } from "@tanstack/react-router";

export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="section-y">
      <div className="container-alkorin max-w-2xl text-center">
        <p className="eyebrow">Alkorin</p>
        <h1 className="mt-4 text-4xl font-extrabold text-navy lg:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Diese Seite ist vorbereitet und wird im nächsten Schritt mit Inhalten gefüllt.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center rounded-[10px] bg-navy px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
