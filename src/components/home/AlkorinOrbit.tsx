import { useEffect, useRef, type CSSProperties } from "react";

interface OrbitNode {
  title: string;
  desc: string;
}

const NODES: OrbitNode[] = [
  { title: "LEBER", desc: "Cholin unterstützt eine gesunde Leberfunktion" },
  { title: "IMMUNSYSTEM", desc: "Zink unterstützt ein gesundes Immunsystem" },
  { title: "ENERGIE", desc: "B-Vitamine unterstützen den Energiestoffwechsel" },
  { title: "ELEKTROLYTE", desc: "Magnesium und Natrium für den Säure-Basen-Haushalt" },
  { title: "ANTIOXIDANTIEN", desc: "Vitamin C schützt die Körperzellen" },
];

const R = 34; // Ring-Radius (% der Box)
const RL = 51; // Label-Radius
const START = 37;

interface AlkorinOrbitProps {
  nodes?: OrbitNode[];
  /** Dauer einer vollen Umdrehung in Sekunden. */
  revolution?: number;
  /** Länge des dunklen Kometen-Bogens in Grad. */
  cometLength?: number;
  accent?: string;
  ringColor?: string;
  dotColor?: string;
  titleColor?: string;
  descColor?: string;
  maxWidth?: number;
  productSrc?: string;
  productAlt?: string;
}

export default function AlkorinOrbit({
  nodes = NODES,
  revolution = 40,
  cometLength = 48,
  accent = "#16307a",
  ringColor = "#a3b3cf",
  dotColor = "#45c9a5",
  titleColor = "#9a9605",
  descColor = "#7d8ca8",
  maxWidth = 1060,
  productSrc,
  productAlt = "",
}: AlkorinOrbitProps) {
  const box = useRef<HTMLDivElement>(null);
  const N = nodes.length;
  const seg = 360 / N;

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const pt = (a: number, r: number): [number, number] => {
      const rad = (a * Math.PI) / 180;
      return [50 + r * Math.sin(rad), 50 - r * Math.cos(rad)];
    };

    const render = (tNorm: number) => {
      const rot = START + 360 * tNorm;
      const headLocal = 360 * tNorm;
      const head = rot + headLocal;
      const active = Math.floor(headLocal / seg) % N;

      for (let k = 0; k < N; k++) {
        const a = rot + seg * k;
        const [x, y] = pt(a, R);
        (["dot", "core", "halo"] as const).forEach((sel) => {
          const c = el.querySelector(`[data-${sel}="${k}"]`);
          if (c) {
            c.setAttribute("cx", String(x));
            c.setAttribute("cy", String(y));
          }
        });
        const halo = el.querySelector(`[data-halo="${k}"]`);
        const core = el.querySelector(`[data-core="${k}"]`);
        const on = k === active;
        if (halo) halo.setAttribute("opacity", on ? "0.08" : "0");
        if (core) core.setAttribute("opacity", on ? "1" : "0");

        const lab = el.querySelector<HTMLElement>(`[data-label="${k}"]`);
        if (lab) {
          const [lx, ly] = pt(a, RL);
          lab.style.left = `${lx}%`;
          lab.style.top = `${ly}%`;
        }
      }

      const [cx1, cy1] = pt(head - cometLength, R);
      const [cx2, cy2] = pt(head, R);
      el.querySelector("[data-comet]")?.setAttribute(
        "d",
        `M${cx1} ${cy1}A${R} ${R} 0 0 1 ${cx2} ${cy2}`,
      );
    };

    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    render(0); // erster Frame sofort – kein Sprung beim Mount
    if (reduce) return;

    let raf = 0;
    const t0 = performance.now();
    const period = revolution * 1000;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      render(((now - t0) % period) / period);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revolution, cometLength, N, seg]);

  const boxStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: 820,
    aspectRatio: "4 / 3",
    containerType: "inline-size",
  };
  const descStyle: CSSProperties = {
    color: descColor,
    fontWeight: 700,
    fontSize: "clamp(10px,1.95cqw,19px)",
    lineHeight: 1.3,
    textWrap: "pretty",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        padding: "5% 0",
      }}
    >
      <div ref={box} style={boxStyle}>
        <svg
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={ringColor}
            strokeWidth="0.22"
          />
          <path
            data-comet=""
            fill="none"
            stroke={accent}
            strokeWidth="0.62"
            strokeLinecap="round"
          />
          {nodes.map((_, k) => (
            <g key={k}>
              <circle data-halo={k} r="5.6" fill={dotColor} opacity="0" />
              <circle data-dot={k} r="2.6" fill={dotColor} />
              <circle data-core={k} r="0.95" fill="#fff" opacity="0" />
            </g>
          ))}
        </svg>

        {nodes.map((n, k) => (
          <div
            key={k}
            data-label={k}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "22cqw",
              transform: "translate(-50%,-50%)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "0.6cqw",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                color: titleColor,
                letterSpacing: "0.03em",
                fontSize: "clamp(12px,2.35cqw,23px)",
                lineHeight: 1.1,
              }}
            >
              {n.title}
            </div>
            <div style={descStyle}>{n.desc}</div>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: "26cqw",
            height: "40cqw",
          }}
        >
          {productSrc ? (
            <img
              src={productSrc}
              alt={productAlt}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
