import routineDay from "@/assets/lifestyle/routine-day.png.asset.json";
import duskPowder from "@/assets/lifestyle/dusk-powder.png.asset.json";
import eveningStir from "@/assets/lifestyle/evening-stir.png.asset.json";
import bed1 from "@/assets/lifestyle/bed-1.png.asset.json";
import bed2 from "@/assets/lifestyle/bed-2.png.asset.json";
import portrait1 from "@/assets/lifestyle/portrait-bed-1.png.asset.json";
import portrait2 from "@/assets/lifestyle/portrait-bed-2.png.asset.json";
import portrait3 from "@/assets/lifestyle/portrait-bed-3.png.asset.json";

const MOMENTS = [
  { src: routineDay.url, w: 1448, h: 1086, alt: "Frau gießt Wasser in ein Glas mit ALKORIN® am Tag" },
  { src: portrait1.url, w: 1122, h: 1402, alt: "Frau trinkt ALKORIN® abends im Bett lesend" },
  { src: eveningStir.url, w: 1448, h: 1086, alt: "Frau rührt ALKORIN® in der Dämmerung an" },
  { src: portrait2.url, w: 1122, h: 1402, alt: "Ruhiger Abend mit ALKORIN® am Bett" },
  { src: duskPowder.url, w: 1448, h: 1086, alt: "Pulverportion wird in ein Glas gerührt" },
  { src: bed2.url, w: 1448, h: 1086, alt: "Frau genießt ALKORIN® am Abend im Bett" },
  { src: portrait3.url, w: 1122, h: 1402, alt: "Abendroutine mit einem Glas ALKORIN®" },
];

export function Moments() {
  return (
    <section className="section-y">
      <div className="container-alkorin">
        <div className="max-w-2xl">
          <p className="eyebrow">Echte Momente</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[3rem]">
            ALKORIN® im Alltag.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Ein kleiner Schritt am Abend – eingepasst in deinen Rhythmus. Hier siehst du, wie
            Kundinnen ALKORIN® ganz unverkrampft nutzen.
          </p>
        </div>

        <div className="mt-12 gap-5 [column-fill:_balance] columns-2 lg:columns-3">
          {MOMENTS.map((m) => (
            <figure key={m.alt} className="mb-5 break-inside-avoid">
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                width={m.w}
                height={m.h}
                className="w-full rounded-[18px] object-cover"
              />
            </figure>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Nahrungsergänzungsmittel sind kein Ersatz für eine abwechslungsreiche und ausgewogene
          Ernährung sowie eine gesunde Lebensweise.
        </p>
      </div>
    </section>
  );
}
