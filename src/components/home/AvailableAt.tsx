import LogoCloud from "@/components/ui/logo-cloud-15";

/**
 * "Jetzt erhältlich bei" – Händler-Logo-Marquee direkt unter dem Hero.
 * 1:1 die 21st.dev-Vorlage „logo-cloud-15" (Karte + BorderBeam + Wellen-Text
 * über der Marquee), nur in Alkorin-Farben; die Logos in Originalfarben.
 */
export function AvailableAt() {
  return (
    <section aria-label="Jetzt erhältlich bei" className="bg-background">
      <LogoCloud />
    </section>
  );
}
