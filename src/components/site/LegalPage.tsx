import type { ReactNode } from "react";

export type LegalSection = {
  heading: string;
  body: ReactNode[];
};

export function LegalPage({
  title,
  subtitle,
  intro,
  sections,
  footer,
}: {
  title: string;
  subtitle?: string;
  intro?: ReactNode[];
  sections: LegalSection[];
  footer?: ReactNode;
}) {
  return (
    <section className="section-y">
      <div className="container-alkorin max-w-3xl">
        <p className="eyebrow">Meridius</p>
        <h1 className="mt-4 text-4xl font-extrabold text-navy lg:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mt-3 text-sm font-semibold text-muted-foreground">{subtitle}</p>
        ) : null}

        {intro ? (
          <div className="mt-6 space-y-3 text-base leading-relaxed text-foreground/85">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : null}

        <div className="mt-10 divide-y divide-border border-t border-border">
          {sections.map((s, i) => (
            <div key={i} className="py-6">
              <h2 className="text-lg font-bold text-navy">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {footer ? (
          <div className="mt-8 text-sm leading-relaxed text-muted-foreground">{footer}</div>
        ) : null}
      </div>
    </section>
  );
}
