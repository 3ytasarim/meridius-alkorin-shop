import { type CSSProperties } from "react";

/** PNG als Maske + Markenfarbe → randloses, eingefärbtes Icon. */
const maskIcon = (src: string, color: string): CSSProperties => ({
  backgroundColor: color,
  WebkitMaskImage: `url(${src})`,
  maskImage: `url(${src})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
});

const BADGE =
  "absolute z-10 flex items-center gap-2.5 rounded-[18px] bg-white/95 px-3.5 py-2.5 shadow-[0_18px_44px_rgba(18,38,76,0.18)] backdrop-blur-sm sm:gap-3 sm:px-4";
const LABEL =
  "text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#16386e] sm:text-[13px] lg:text-sm";
const ICON = "block size-[22px] shrink-0 sm:size-6 lg:size-7";

/** Foto2 als Basis + schwebende Frei-von-Rozetten und Zitrone an den Rändern. */
export function WhyAlkorinVisual() {
  return (
    <div className="relative">
      <video
        ref={(el) => {
          if (el) el.muted = true;
        }}
        src="/reklam_videosu.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-label="ALKORIN® Markenvideo"
        className="h-[340px] w-full rounded-[22px] object-cover shadow-[0_30px_70px_-32px_rgba(18,38,76,0.35)] sm:h-[460px] lg:h-[600px]"
      />

      {/* Zitrone – oben links, klar ausserhalb des Bildes */}
      <img
        src="/lemon.png"
        alt=""
        aria-hidden
        className="absolute -left-9 -top-10 size-14 drop-shadow-[0_14px_22px_rgba(20,40,80,0.28)] motion-safe:animate-[om-float_3.2s_ease-in-out_infinite] sm:-left-14 sm:-top-12 sm:size-20 lg:-left-20 lg:-top-14 lg:size-24"
      />

      {/* Laktosefrei – oben rechts */}
      <div
        className={`${BADGE} -right-5 -top-6 motion-safe:animate-[om-float_3.6s_ease-in-out_infinite] sm:-right-9 lg:-right-14`}
      >
        <span className={ICON} style={maskIcon("/dairy-free.png", "#4E8FD1")} />
        <span className={LABEL}>Laktosefrei</span>
      </div>

      {/* Glutenfrei – unten links */}
      <div
        className={`${BADGE} -bottom-6 -left-4 motion-safe:animate-[om-float_4.2s_ease-in-out_infinite_0.5s] sm:-left-9 lg:-left-16`}
      >
        <span className={ICON} style={maskIcon("/gluten-free.png", "#C8912B")} />
        <span className={LABEL}>Glutenfrei</span>
      </div>

      {/* Vegan – unten rechts */}
      <div
        className={`${BADGE} -bottom-6 -right-5 motion-safe:animate-[om-float_3.9s_ease-in-out_infinite_1s] sm:-right-9 lg:-right-14`}
      >
        <span className={ICON} style={maskIcon("/vegan.png", "#7AC943")} />
        <span className={LABEL}>Vegan</span>
      </div>
    </div>
  );
}
