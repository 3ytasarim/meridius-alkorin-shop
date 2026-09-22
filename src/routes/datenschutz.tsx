import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const ADDRESS = (
  <>
    Meridius Management GmbH
    <br />
    Churerstrasse 158
    <br />
    8808 Pfäffikon SZ
    <br />
    Schweiz
    <br />
    Verantwortliche Person: Thomas Meier
    <br />
    E-Mail: info@meridius.ch
  </>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Verantwortlicher",
    body: [
      "Verantwortlich für die Bearbeitung von Personendaten im Zusammenhang mit der Website meridius.ch und den damit verbundenen Dienstleistungen ist:",
      ADDRESS,
    ],
  },
  {
    heading: "2. Geltungsbereich",
    body: [
      "Diese Datenschutzerklärung informiert über die Bearbeitung von Personendaten im Zusammenhang mit der Website meridius.ch und den damit verbundenen Dienstleistungen. Die Bearbeitung erfolgt nach dem geltenden schweizerischen Datenschutzrecht, insbesondere dem Bundesgesetz über den Datenschutz (DSG).",
    ],
  },
  {
    heading: "3. Welche Personendaten werden bearbeitet?",
    body: [
      "Je nach Nutzung und Kontaktaufnahme können Vor- und Nachname, Adresse, E-Mail-Adresse, Telefonnummer, Angaben aus Anfragen und Korrespondenz, Vertrags- und Geschäftsdaten, Angaben zu Dienstleistungen sowie technische Daten wie IP-Adresse, Zugriffszeit, Browser- und Gerätedaten bearbeitet werden.",
    ],
  },
  {
    heading: "4. Herkunft der Personendaten",
    body: [
      "Personendaten können von der betroffenen Person selbst oder, soweit für die jeweilige Geschäftsbeziehung erforderlich und rechtmässig, von Geschäftspartnern, Kunden, Dienstleistern, Behörden oder anderen beteiligten Stellen stammen. Werden Daten nicht direkt bei der betroffenen Person beschafft, werden die verfügbaren Angaben über ihre Herkunft im Rahmen des Gesetzes berücksichtigt und auf Anfrage mitgeteilt.",
    ],
  },
  {
    heading: "5. Zwecke der Datenbearbeitung",
    body: [
      "Personendaten werden insbesondere zur Bearbeitung von Anfragen, Kommunikation, Vorbereitung und Abwicklung von Verträgen, Erbringung von Dienstleistungen, Rechnungs- und Zahlungsabwicklung, Administration, Erfüllung gesetzlicher Pflichten, Wahrung und Durchsetzung eigener Rechte und Ansprüche, Betrieb und Sicherheit der Website sowie zur Verhinderung von Missbrauch bearbeitet.",
    ],
  },
  {
    heading: "6. Kontaktaufnahme und Geschäftsbeziehungen",
    body: [
      "Bei Kontaktaufnahme per E-Mail, Formular, Telefon oder auf anderem Weg werden die übermittelten Daten zur Bearbeitung der Anfrage und zur weiteren Kommunikation bearbeitet. Im Rahmen von Geschäftsbeziehungen können Kontakt-, Vertrags-, Rechnungs-, Zahlungs- und Kommunikationsdaten bearbeitet werden.",
    ],
  },
  {
    heading: "7. Empfänger und Bekanntgabe",
    body: [
      "Personendaten können im Rahmen der gesetzlichen Voraussetzungen insbesondere IT-, Hosting-, Kommunikations-, Zahlungs-, Buchhaltungs- und andere Dienstleister sowie Behörden oder weitere Stellen bekanntgegeben werden, soweit dies für den jeweiligen Zweck erforderlich oder gesetzlich zulässig bzw. vorgeschrieben ist.",
    ],
  },
  {
    heading: "8. Auftragsbearbeitung durch Dritte",
    body: [
      "Für bestimmte Tätigkeiten können externe Dienstleister eingesetzt werden. Soweit diese Personendaten im Auftrag bearbeiten, werden die erforderlichen vertraglichen und organisatorischen Massnahmen getroffen.",
    ],
  },
  {
    heading: "9. Bekanntgabe ins Ausland",
    body: [
      "Personendaten können nur unter den Voraussetzungen des Schweizer Datenschutzrechts ins Ausland bekanntgegeben werden. Erfolgt eine solche Bekanntgabe, werden die betroffenen Personen über den Empfängerstaat und, soweit erforderlich, über die eingesetzten Garantien oder gesetzlichen Ausnahmen informiert.",
    ],
  },
  {
    heading: "10. Website, Cookies und Logdaten",
    body: [
      "Beim Besuch der Website können technische Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seiten, Browser, Betriebssystem und Verbindungsdaten bearbeitet werden. Cookies oder vergleichbare Technologien können zur technischen Funktion, Sicherheit, Speicherung von Einstellungen sowie, sofern eingesetzt, Analyse oder Statistik verwendet werden.",
    ],
  },
  {
    heading: "11. Datensicherheit",
    body: [
      "Die Meridius Management GmbH trifft angemessene technische und organisatorische Massnahmen zum Schutz von Personendaten vor Verlust, Missbrauch, unberechtigtem Zugriff, Veränderung oder Offenlegung. Eine absolute Sicherheit der Datenübertragung über das Internet kann nicht garantiert werden.",
    ],
  },
  {
    heading: "12. Aufbewahrung",
    body: [
      "Personendaten werden so lange aufbewahrt, wie dies für den jeweiligen Zweck erforderlich ist. Zusätzlich können gesetzliche Aufbewahrungs- und Dokumentationspflichten oder berechtigte Interessen eine längere Aufbewahrung erfordern. Danach werden Daten gelöscht oder anonymisiert, soweit keine andere rechtliche Grundlage für eine weitere Aufbewahrung besteht.",
    ],
  },
  {
    heading: "13. Automatisierte Einzelentscheidungen und Profiling",
    body: [
      "Es werden grundsätzlich keine automatisierten Einzelentscheidungen getroffen, die ausschliesslich auf automatisierter Bearbeitung beruhen und für die betroffene Person eine rechtliche oder ähnlich erhebliche Wirkung haben. Soweit künftig eine solche Bearbeitung eingesetzt wird, werden die gesetzlich erforderlichen Informationen erteilt und die gesetzlich vorgesehenen Rechte gewährt.",
    ],
  },
  {
    heading: "14. Rechte betroffener Personen",
    body: [
      "Betroffene Personen haben im Rahmen des DSG insbesondere Rechte auf Auskunft sowie, soweit die gesetzlichen Voraussetzungen erfüllt sind, auf Berichtigung, Löschung oder Einschränkung der Bearbeitung und auf Datenherausgabe bzw. Datenübertragung. Die Rechte können gesetzlichen Einschränkungen unterliegen.",
    ],
  },
  {
    heading: "15. Auskunftsbegehren",
    body: [
      "Datenschutzrechtliche Begehren können an die oben genannte Adresse gerichtet werden:",
      ADDRESS,
      "Zur Verhinderung einer unberechtigten Offenlegung kann eine geeignete Identifikation der anfragenden Person verlangt werden.",
    ],
  },
  {
    heading: "16. Datenschutzverletzungen",
    body: [
      "Bei einer Verletzung der Datensicherheit werden die nach dem DSG erforderlichen Massnahmen getroffen. Soweit gesetzlich erforderlich, wird der EDÖB und/oder die betroffene Person informiert.",
    ],
  },
  {
    heading: "17. Links zu Websites Dritter",
    body: [
      "Die Website kann Links zu externen Websites enthalten. Für deren Datenbearbeitungen sind grundsätzlich die jeweiligen Betreiber verantwortlich.",
    ],
  },
  {
    heading: "18. Änderungen",
    body: [
      "Diese Datenschutzerklärung kann angepasst werden, insbesondere bei Änderungen der Dienstleistungen, technischen Systeme oder gesetzlichen Anforderungen. Es gilt die jeweils auf der Website veröffentlichte aktuelle Fassung.",
    ],
  },
];

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz | ALKORIN®" },
      { name: "description", content: "Informationen zum Datenschutz." },
      { property: "og:title", content: "Datenschutz | ALKORIN®" },
      { property: "og:description", content: "Informationen zum Datenschutz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Datenschutzerklärung"
      subtitle="Meridius Management GmbH, meridius.ch"
      sections={SECTIONS}
    />
  ),
});
