import { useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accent: string;
  iconBg: string;
  className?: string;
}

export function InfoCard({ icon, title, description, accent, iconBg, className }: InfoCardProps) {
  const [hovered, setHovered] = useState(false);
  const borderRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const border = borderRef.current;
    if (!border) return;
    const rect = border.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    border.style.setProperty("--rotation", `${angle}rad`);
  };

  const borderGradient = `conic-gradient(from var(--rotation, 0deg), ${accent} 0deg, ${accent} 90deg, var(--border) 90deg, var(--border) 360deg)`;

  return (
    <div
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        borderRef.current?.style.setProperty("--rotation", "0deg");
      }}
      className={`h-full rounded-[18px] p-[3px] transition-shadow duration-300 hover:shadow-card ${className ?? ""}`}
      style={
        {
          backgroundImage: `linear-gradient(var(--card), var(--card)), ${borderGradient}`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          border: "3px solid transparent",
        } as CSSProperties
      }
    >
      <div className="flex h-full flex-col rounded-[15px] bg-card p-7">
        <div
          className="mb-5 inline-flex size-12 shrink-0 items-center justify-center self-start rounded-[14px]"
          style={{ background: iconBg, color: accent }}
        >
          {icon}
        </div>

        <h3 className="relative inline-block w-fit text-lg font-bold text-navy">
          <span className="relative z-10 px-1">{title}</span>
          <span
            aria-hidden
            className="absolute -inset-x-1 -inset-y-0.5 z-0 rounded-sm transition-[clip-path] duration-500 ease-[cubic-bezier(0.1,0.5,0.5,1)]"
            style={{
              background: accent,
              clipPath: hovered
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
            }}
          />
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
