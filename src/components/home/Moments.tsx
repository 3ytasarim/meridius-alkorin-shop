import { ShuffleGrid } from "@/components/ui/shuffle-grid";

export const MOMENT_IMAGES = [
  "/fotolar (1).png",
  "/fotolar (2).png",
  "/fotolar (3).png",
  "/fotolar (4).png",
  "/fotolar (5).png",
  "/ElevenLabs_image_gpt-image-2_Create a comple_2026-09-13T12_15_39.png",
  "/ElevenLabs_image_gpt-image-2_Create a comple_2026-09-13T12_16_59.png",
  "/ElevenLabs_image_gpt-image-2_Create a comple_2026-09-13T12_19_26.png",
  "/ElevenLabs_image_recraft-v4_Create a high-e_2026-09-13T12_06_58.webp",
  "/ElevenLabs_image_recraft-v4_Create a premiu_2026-09-13T12_04_32.webp",
  "/ElevenLabs_image_recraft-v4_Create a premiu_2026-09-13T12_05_53.webp",
  "/ElevenLabs_image_recraft-v4_Create a premiu_2026-09-13T12_09_10.webp",
  "/ElevenLabs_image_recraft-v4_Create ONE ultr_2026-09-11T19_05_12.webp",
  "/ElevenLabs_image_recraft-v4_Create a high-e_2026-09-13T14_04_21.webp",
  "/ElevenLabs_image_recraft-v4_Create a high-e_2026-09-13T14_05_20.webp",
  "/ElevenLabs_image_recraft-v4_Create a high-e_2026-09-13T14_07_46.webp",
];

export function Moments() {
  return (
    <section className="section-y">
      <div className="container-alkorin grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Echte Momente</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            ALKORIN® im Alltag.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Ein kleiner Schritt am Abend – eingepasst in deinen Rhythmus. Hier siehst du, wie
            Kundinnen ALKORIN® ganz unverkrampft nutzen.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Nahrungsergänzungsmittel sind kein Ersatz für eine abwechslungsreiche und ausgewogene
            Ernährung sowie eine gesunde Lebensweise.
          </p>
        </div>

        <ShuffleGrid images={MOMENT_IMAGES} />
      </div>
    </section>
  );
}
