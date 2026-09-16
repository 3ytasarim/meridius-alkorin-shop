import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Nach oben scrollen"
      className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center overflow-hidden rounded-full border-2 border-health-yellow bg-card shadow-lg transition-transform hover:scale-105"
    >
      <div className="scroll-water-mask pointer-events-none">
        <div className="scroll-water-wave" style={{ top: `${100 - progress}%` }} />
      </div>
      <ArrowUp className="relative z-10 size-6 text-navy" strokeWidth={2.4} />
    </button>
  );
}
