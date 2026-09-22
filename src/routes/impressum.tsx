import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    heading: "Anbieterin und verantwortliche Stelle",
    body: [
      <>
        Meridius Management GmbH
        <br />
        Churerstrasse 158
        <br />
        8808 Pfäffikon SZ
        <br />
        Schweiz
      </>,
    ],
  },
  {
    heading: "Vertretungsberechtigte Person",
    body: ["Thomas Meier, Geschäftsführer"],
  },
  {
    heading: "E-Mail",
    body: ["info@meridius.ch"],
  },
  {
    heading: "Handelsregister",
    body: [
      <>
        Sitz: Freienbach
        <br />
        Kanton: Schwyz
        <br />
        Rechtsform: GmbH
        <br />
        Handelsregistereintrag: Kanton Schwyz
      </>,
    ],
  },
  {
    heading: "Verantwortlichkeit für den Inhalt",
    body: [
      "Für die Inhalte dieser Website ist die Meridius Management GmbH verantwortlich.",
      "Die Meridius Management GmbH bemüht sich um die Richtigkeit und Aktualität der auf dieser Website bereitgestellten Informationen. Eine Gewähr für die Vollständigkeit, Richtigkeit und Aktualität der Inhalte kann jedoch nicht übernommen werden.",
    ],
  },
  {
    heading: "Haftung für externe Links",
    body: [
      "Diese Website kann Links zu externen Websites Dritter enthalten. Für deren Inhalte und deren Betrieb ist ausschliesslich der jeweilige Betreiber verantwortlich.",
    ],
  },
  {
    heading: "Urheberrecht",
    body: [
      "Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem Schweizer Urheberrecht. Jede Verwendung, Vervielfältigung oder Weitergabe ausserhalb der gesetzlichen Schranken bedarf der vorherigen Zustimmung der Meridius Management GmbH, soweit nicht Rechte Dritter betroffen sind.",
    ],
  },
];

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | ALKORIN®" },
      { name: "description", content: "Anbieterkennzeichnung." },
      { property: "og:title", content: "Impressum | ALKORIN®" },
      { property: "og:description", content: "Anbieterkennzeichnung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage title="Impressum" sections={SECTIONS} footer="Stand: September 2026" />
  ),
});
