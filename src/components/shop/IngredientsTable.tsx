import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

type Nutrient = {
  name: string;
  sub?: string;
  value: number;
  decimals: number;
  unit: string;
  cat: "vit" | "min" | "etc";
};

const NUTRIENTS: Nutrient[] = [
  { name: "Cholin", value: 200, decimals: 0, unit: "mg", cat: "etc" },
  { name: "Vitamin C", value: 80, decimals: 0, unit: "mg", cat: "vit" },
  { name: "Vitamin B1", sub: "Thiamin", value: 3.3, decimals: 1, unit: "mg", cat: "vit" },
  { name: "Vitamin B2", sub: "Riboflavin", value: 5.3, decimals: 1, unit: "mg", cat: "vit" },
  { name: "Vitamin B3", sub: "Niacin", value: 14.4, decimals: 1, unit: "mg", cat: "vit" },
  { name: "Vitamin B5", sub: "Pantothensäure", value: 5.4, decimals: 1, unit: "mg", cat: "vit" },
  { name: "Vitamin B6", value: 4.2, decimals: 1, unit: "mg", cat: "vit" },
  { name: "Vitamin B9", sub: "Folsäure", value: 240, decimals: 0, unit: "µg", cat: "vit" },
  { name: "Vitamin B12", value: 9, decimals: 0, unit: "µg", cat: "vit" },
  { name: "Magnesium", value: 375, decimals: 0, unit: "mg", cat: "min" },
  { name: "Natrium", value: 100, decimals: 0, unit: "mg", cat: "min" },
  { name: "Zink", value: 10, decimals: 0, unit: "mg", cat: "min" },
];

function fmt(n: number, decimals: number) {
  return n.toFixed(decimals).replace(".", ",");
}

export function IngredientsTable() {
  const cardRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (reduce) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    NUTRIENTS.forEach((n, i) => {
      const el = valueRefs.current[i];
      if (!el) return;
      const duration = 1100;
      const delay = 300 + i * 55;
      let start: number | null = null;
      el.textContent = `${fmt(0, n.decimals)} ${n.unit}`;
      timeouts.push(
        setTimeout(() => {
          const step = (t: number) => {
            if (start === null) start = t;
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${fmt(n.value * eased, n.decimals)} ${n.unit}`;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }, delay),
      );
    });
    return () => timeouts.forEach(clearTimeout);
  }, [inView, reduce]);

  return (
    <section
      ref={cardRef}
      aria-labelledby="inhaltsstoffe-titel"
      className={`nt-card ${inView ? "nt-in" : ""}`}
    >
      <style>{`
        .nt-card{
          --nt-mint:#2FB38A; --nt-mint-deep:#0F6B50; --nt-mint-soft:#E6F6EF; --nt-mint-line:#CFEDE0;
          --nt-lemon:#F3DC3A; --nt-lemon-soft:#FFF8CF; --nt-ink:#12332A; --nt-muted:#5B7169;
          position:relative; overflow:hidden; box-sizing:border-box;
          width:100%; margin:0; padding:32px 28px 24px;
          background:transparent; border:1px solid var(--nt-mint-line); border-radius:22px;
          font-family:'Manrope',system-ui,-apple-system,'Segoe UI',sans-serif; color:var(--nt-ink);
        }
        .nt-card *,.nt-card *::before,.nt-card *::after{box-sizing:border-box}
        .nt-glow{position:absolute; inset:-40% -30% auto auto; width:320px; height:320px; border-radius:50%;
          background:radial-gradient(circle,var(--nt-lemon-soft) 0%,rgba(255,248,207,0) 70%); pointer-events:none;
          animation:nt-float 9s ease-in-out infinite}
        .nt-head{position:relative; display:flex; align-items:center; gap:14px; margin-bottom:14px}
        .nt-title{margin:0; font-size:clamp(20px,4.2vw,26px); line-height:1.15; font-weight:800; letter-spacing:-.01em; color:var(--nt-ink)}
        .nt-legend{position:relative; display:flex; flex-wrap:wrap; gap:6px 16px; margin:0 0 18px; font-size:12.5px; font-weight:600; color:var(--nt-muted)}
        .nt-legend span{display:inline-flex; align-items:center; gap:6px}

        .nt-table{position:relative}
        .nt-list{list-style:none; margin:0; padding:0}
        .nt-row{display:flex; justify-content:space-between; align-items:center; gap:16px;
          padding:11px 14px; border-radius:12px; font-size:15px; transition:background-color .25s, transform .25s}
        .nt-row--head{padding:10px 14px; margin-bottom:6px; background:var(--nt-mint-soft);
          font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--nt-mint-deep)}
        .nt-badge{padding:5px 12px; border-radius:999px; background:var(--nt-lemon); color:var(--nt-ink); letter-spacing:.04em}
        .nt-list .nt-row + .nt-row{box-shadow:inset 0 1px 0 #EEF4F1}
        .nt-list .nt-row:hover{background:var(--nt-lemon-soft); transform:translateX(3px)}
        .nt-name{display:inline-flex; align-items:center; gap:10px; font-weight:600}
        .nt-name small{font-size:13px; font-weight:500; color:var(--nt-muted)}
        .nt-val{font-weight:800; font-variant-numeric:tabular-nums; color:var(--nt-mint-deep); white-space:nowrap}

        .nt-dot{display:inline-block; width:9px; height:9px; flex:none; border-radius:50%; background:var(--nt-mint)}
        .nt-dot--vit,.nt-row[data-cat="vit"] .nt-dot{background:var(--nt-mint)}
        .nt-dot--min,.nt-row[data-cat="min"] .nt-dot{background:var(--nt-lemon); box-shadow:0 0 0 2px #E6C92A inset}
        .nt-dot--etc,.nt-row[data-cat="etc"] .nt-dot{background:#fff; box-shadow:0 0 0 2px var(--nt-mint) inset}

        .nt-card .nt-head,.nt-card .nt-legend,.nt-card .nt-row{opacity:0; transform:translateY(14px)}
        .nt-card.nt-in .nt-head,.nt-card.nt-in .nt-legend,.nt-card.nt-in .nt-row{animation:nt-rise .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--i,0) * 55ms)}
        .nt-card.nt-in .nt-row .nt-dot{animation:nt-pop .5s cubic-bezier(.3,1.6,.5,1) both; animation-delay:calc(var(--i,0) * 55ms + 250ms)}
        .nt-card.nt-in .nt-badge{animation:nt-shine 2.8s ease-in-out 1.2s infinite}

        @keyframes nt-rise{to{opacity:1; transform:none}}
        @keyframes nt-pop{from{transform:scale(0)}to{transform:scale(1)}}
        @keyframes nt-float{0%,100%{transform:translate(0,0)}50%{transform:translate(-18px,14px)}}
        @keyframes nt-shine{0%,100%{box-shadow:0 0 0 0 rgba(243,220,58,0)}50%{box-shadow:0 0 0 6px rgba(243,220,58,.35)}}

        @media (max-width:480px){
          .nt-card{padding:24px 16px 16px; border-radius:18px}
          .nt-legend{margin-left:0}
          .nt-row{padding:10px; font-size:14px}
          .nt-name small{display:block; font-size:12px}
          .nt-name{align-items:flex-start}
          .nt-name .nt-dot{margin-top:5px}
        }
        @media (prefers-reduced-motion:reduce){
          .nt-card *,.nt-glow{animation:none!important; transition:none!important}
          .nt-card .nt-head,.nt-card .nt-legend,.nt-card .nt-row{opacity:1; transform:none}
        }
      `}</style>

      <div className="nt-glow" aria-hidden="true" />

      <header className="nt-head" style={{ "--i": 0 } as CSSProperties}>
        <h3 id="inhaltsstoffe-titel" className="nt-title">
          Inhaltsstoffe auf einen Blick
        </h3>
      </header>

      <div className="nt-legend" aria-hidden="true" style={{ "--i": 1 } as CSSProperties}>
        <span>
          <i className="nt-dot nt-dot--vit" />
          Vitamine
        </span>
        <span>
          <i className="nt-dot nt-dot--min" />
          Mineralstoffe
        </span>
        <span>
          <i className="nt-dot nt-dot--etc" />
          Weitere
        </span>
      </div>

      <div className="nt-table" role="table" aria-label="Inhaltsstoffe pro Portion">
        <div className="nt-row nt-row--head" role="row" style={{ "--i": 2 } as CSSProperties}>
          <span role="columnheader">Nährstoff</span>
          <span role="columnheader" className="nt-badge">
            pro Portion (4 g)
          </span>
        </div>

        <ul className="nt-list" role="rowgroup">
          {NUTRIENTS.map((n, i) => (
            <li
              key={n.name}
              role="row"
              data-cat={n.cat}
              className="nt-row"
              style={{ "--i": i + 3 } as CSSProperties}
            >
              <span role="cell" className="nt-name">
                <i className="nt-dot" />
                {n.name}
                {n.sub ? <small> ({n.sub})</small> : null}
              </span>
              <span
                role="cell"
                className="nt-val"
                ref={(el) => {
                  valueRefs.current[i] = el;
                }}
              >
                {fmt(n.value, n.decimals)} {n.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
