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
    E-Mail: info@meridius.ch
  </>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Geltungsbereich",
    body: [
      "1.1 Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Bestellungen und Kaufverträge, die über den Onlineshop der Meridius Management GmbH (nachfolgend «Meridius») abgeschlossen werden.",
      "1.2 Der Onlineshop richtet sich an natürliche und juristische Personen mit Wohnsitz bzw. Sitz in der Schweiz, sofern beim jeweiligen Angebot nichts anderes angegeben ist.",
      "1.3 Abweichende Bedingungen des Kunden gelten nur, wenn Meridius ihnen ausdrücklich schriftlich zugestimmt hat.",
      "1.4 Mit der Aufgabe einer Bestellung bestätigt der Kunde, diese AGB gelesen, verstanden und akzeptiert zu haben.",
    ],
  },
  {
    heading: "2. Anbieterin und Vertragspartnerin",
    body: ["Vertragspartnerin für sämtliche Bestellungen ist:", ADDRESS],
  },
  {
    heading: "3. Angebot und Produktdarstellung",
    body: [
      "3.1 Die Darstellung der Produkte im Onlineshop stellt, sofern nicht ausdrücklich anders bezeichnet, ein Angebot zum Abschluss eines Kaufvertrags dar.",
      "3.2 Produktabbildungen, Farben, Masse und sonstige Darstellungen können geringfügig vom tatsächlich gelieferten Produkt abweichen, sofern dies technisch oder produktspezifisch bedingt ist.",
      "3.3 Meridius ist berechtigt, Produkte jederzeit aus dem Sortiment zu nehmen sowie deren Beschreibung, Preise und Verfügbarkeit anzupassen.",
      "3.4 Für den Kaufvertrag sind die Produktinformationen und Preise massgebend, die zum Zeitpunkt der Bestellung im Onlineshop angegeben sind.",
    ],
  },
  {
    heading: "4. Bestellung und Vertragsabschluss",
    body: [
      "4.1 Der Kunde kann die gewünschten Produkte auswählen und in den Warenkorb legen.",
      "4.2 Vor Abschluss der Bestellung erhält der Kunde eine Übersicht über die bestellten Produkte, Mengen, Preise sowie Liefer- und Rechnungsangaben. Eingabefehler können vor dem Absenden der Bestellung korrigiert werden.",
      "4.3 Mit dem Anklicken der entsprechend bezeichneten Schaltfläche, insbesondere «Zahlungspflichtig bestellen», gibt der Kunde eine verbindliche Bestellung ab.",
      "4.4 Der Eingang der Bestellung wird dem Kunden unverzüglich elektronisch bestätigt. Sofern in der Bestätigung nichts anderes angegeben ist, gilt sie zugleich als Annahme der Bestellung durch Meridius.",
      "4.5 Meridius kann eine Bestellung insbesondere ablehnen, wenn ein Produkt nicht verfügbar ist, Angaben offensichtlich fehlerhaft sind oder begründete Zweifel an der Zahlungsfähigkeit oder Identität des Kunden bestehen.",
      "4.6 Bereits bezahlte Beträge werden im Fall einer Nichtannahme oder Stornierung der Bestellung zurückerstattet.",
    ],
  },
  {
    heading: "5. Preise",
    body: [
      "5.1 Es gelten die im Zeitpunkt der Bestellung im Onlineshop angegebenen Preise in Schweizer Franken (CHF).",
      "5.2 Soweit gesetzlich vorgeschrieben, verstehen sich die Preise inklusive der gesetzlichen Mehrwertsteuer.",
      "5.3 Versandkosten werden im Bestellprozess separat ausgewiesen, sofern sie nicht bereits im Produktpreis enthalten sind.",
      "5.4 Der für den Kunden verbindliche Gesamtbetrag wird vor Abschluss der Bestellung angezeigt.",
      "5.5 Preisänderungen nach Abschluss eines Kaufvertrags haben keinen Einfluss auf den vereinbarten Kaufpreis.",
    ],
  },
  {
    heading: "6. Zahlungsbedingungen – ausschliesslich Rechnung",
    body: [
      "6.1 Die Bezahlung der über den Onlineshop bestellten Waren erfolgt ausschliesslich auf Rechnung.",
      "6.2 Die Rechnung wird dem Kunden grundsätzlich elektronisch oder zusammen mit der Lieferung zugestellt.",
      "6.3 Die Zahlungsfrist beträgt 14 Tage ab Rechnungsdatum, sofern auf der Rechnung keine abweichende Zahlungsfrist angegeben ist.",
      "6.4 Der Rechnungsbetrag ist innerhalb der angegebenen Zahlungsfrist vollständig und ohne Abzug zu bezahlen.",
      "6.5 Eine Zahlung gilt erst mit vollständiger Gutschrift auf dem von Meridius angegebenen Konto als erfolgt.",
      "6.6 Bei offenen Forderungen ist Meridius berechtigt, weitere Bestellungen bis zur vollständigen Begleichung der ausstehenden Beträge zurückzuhalten oder abzulehnen.",
    ],
  },
  {
    heading: "7. Zahlungsverzug",
    body: [
      "7.1 Der Kunde gerät nach Ablauf der auf der Rechnung angegebenen Zahlungsfrist in Verzug, sofern gesetzlich keine andere Regelung gilt.",
      "7.2 Ab Eintritt des Verzugs schuldet der Kunde den gesetzlichen Verzugszins.",
      "7.3 Meridius ist berechtigt, nach Eintritt des Verzugs angemessene Mahn- und Inkassokosten zu verlangen, soweit diese gesetzlich zulässig und tatsächlich angefallen bzw. angemessen sind.",
      "7.4 Nach erfolgloser Mahnung kann Meridius die Forderung einem Inkassounternehmen oder einem Rechtsvertreter übergeben und die gesetzlich zulässigen Kosten der Forderungsdurchsetzung geltend machen.",
      "7.5 Bei Zahlungsverzug kann Meridius zukünftige Bestellungen nur noch gegen Vorauszahlung oder zu anderen angemessenen Zahlungsbedingungen akzeptieren.",
    ],
  },
  {
    heading: "8. Lieferung – Liefergebiet Schweiz",
    body: [
      "8.1 Die Lieferung erfolgt ausschliesslich an Lieferadressen in der Schweiz.",
      "8.2 Die Lieferung erfolgt an die vom Kunden angegebene Lieferadresse.",
      "8.3 Meridius bemüht sich um eine möglichst zeitnahe Lieferung. Die voraussichtliche Lieferzeit wird beim jeweiligen Produkt oder im Bestellprozess angegeben.",
      "8.4 Angegebene Lieferfristen sind Richtwerte, sofern sie nicht ausdrücklich als verbindlich bezeichnet werden.",
      "8.5 Ist ein bestelltes Produkt vorübergehend nicht verfügbar, informiert Meridius den Kunden nach Möglichkeit.",
      "8.6 Ist ein Produkt dauerhaft nicht verfügbar, kann Meridius vom entsprechenden Vertrag zurücktreten. Bereits bezahlte Beträge werden zurückerstattet.",
      "8.7 Teillieferungen sind zulässig, sofern sie für den Kunden zumutbar sind. Für Teillieferungen werden dem Kunden keine zusätzlichen Versandkosten berechnet, sofern nichts anderes vereinbart wurde.",
    ],
  },
  {
    heading: "9. Prüfung der Lieferung",
    body: [
      "9.1 Der Kunde hat die Lieferung nach Erhalt möglichst zeitnah auf Vollständigkeit und offensichtliche Transportschäden zu prüfen.",
      "9.2 Offensichtliche Transportschäden sind dem Zustelldienst und Meridius möglichst unverzüglich zu melden.",
      "9.3 Die gesetzlichen Rechte des Kunden bei Mängeln bleiben vorbehalten.",
    ],
  },
  {
    heading: "10. Eigentumsvorbehalt",
    body: [
      "10.1 Die gelieferten Waren bleiben bis zur vollständigen Bezahlung des gesamten Rechnungsbetrags Eigentum von Meridius, soweit ein Eigentumsvorbehalt gesetzlich zulässig ist.",
      "10.2 Der Kunde verpflichtet sich, die unter Eigentumsvorbehalt stehenden Waren bis zur vollständigen Bezahlung sorgfältig zu behandeln.",
    ],
  },
  {
    heading: "11. Gewährleistung und Mängelrechte",
    body: [
      "11.1 Meridius gewährleistet, dass die gelieferten Waren grundsätzlich die vertraglich zugesicherten Eigenschaften aufweisen und keine Mängel besitzen, welche ihre Tauglichkeit zum vorausgesetzten Gebrauch erheblich beeinträchtigen.",
      "11.2 Bei mangelhaften Waren stehen dem Kunden die gesetzlichen Gewährleistungsrechte zu, soweit diese im Rahmen der gesetzlichen Möglichkeiten durch diese AGB angepasst werden.",
      "11.3 Für neue Waren, die an Konsumenten verkauft werden, gelten die zwingenden gesetzlichen Bestimmungen zur Gewährleistungsfrist.",
      "11.4 Bei berechtigten Mängeln kann Meridius im Rahmen der gesetzlichen Möglichkeiten zunächst eine angemessene Nachbesserung oder Ersatzlieferung anbieten.",
      "11.5 Der Kunde hat Meridius den festgestellten Mangel möglichst konkret zu beschreiben und auf Verlangen geeignete Nachweise, insbesondere Fotos, zur Verfügung zu stellen.",
      "11.6 Keine Gewährleistung besteht für Schäden, die durch unsachgemässe Verwendung, übermässige Beanspruchung, normale Abnutzung oder andere vom Kunden zu vertretende Umstände verursacht wurden, soweit gesetzlich zulässig.",
    ],
  },
  {
    heading: "12. Kein Widerrufs- oder Rückgaberecht",
    body: [
      "12.1 Für die über den Onlineshop bestellten Waren besteht kein freiwilliges Widerrufs- oder Rückgaberecht.",
      "12.2 Der Kunde kann bestellte Waren nicht ohne gesetzlichen oder vertraglich anerkannten Grund zurückgeben oder vom Kaufvertrag zurücktreten.",
      "12.3 Die gesetzlichen Rechte des Kunden bei mangelhafter oder vertragswidriger Lieferung bleiben vollständig vorbehalten.",
    ],
  },
  {
    heading: "13. Haftung",
    body: [
      "13.1 Meridius haftet für Schäden nach den zwingenden gesetzlichen Bestimmungen.",
      "13.2 Soweit gesetzlich zulässig, wird die Haftung für leichte Fahrlässigkeit ausgeschlossen.",
      "13.3 Meridius haftet nicht für Schäden, die auf Umständen beruhen, die Meridius nicht zu vertreten hat. Dazu gehören insbesondere höhere Gewalt, Betriebsstörungen, Streiks, behördliche Massnahmen sowie Störungen von Transport- oder Kommunikationssystemen.",
      "13.4 Die Haftungsbeschränkungen gelten nicht, soweit zwingendes Recht eine Haftung vorschreibt.",
    ],
  },
  {
    heading: "14. Datenschutz",
    body: [
      "14.1 Meridius bearbeitet Personendaten im Zusammenhang mit dem Betrieb des Onlineshops, der Bestellabwicklung, der Lieferung, der Rechnungsstellung und der Kundenbetreuung.",
      "14.2 Einzelheiten zur Bearbeitung von Personendaten, insbesondere zu deren Zwecken, Empfängern, Aufbewahrungsdauer und den Rechten der betroffenen Personen, ergeben sich aus der separaten Datenschutzerklärung von Meridius.",
      "14.3 Die Datenschutzerklärung ist Bestandteil der rechtlichen Informationen des Onlineshops, soweit sie auf die jeweilige Bearbeitung Anwendung findet.",
    ],
  },
  {
    heading: "15. Geistiges Eigentum",
    body: [
      "15.1 Sämtliche Inhalte des Onlineshops, insbesondere Texte, Bilder, Grafiken, Logos und sonstige geschützte Inhalte, sind Eigentum von Meridius oder der jeweiligen Rechteinhaber.",
      "15.2 Die Verwendung, Vervielfältigung oder Weiterverbreitung von Inhalten des Onlineshops ist ohne vorherige Zustimmung von Meridius nur im gesetzlich zulässigen Umfang gestattet.",
    ],
  },
  {
    heading: "16. Verfügbarkeit des Onlineshops",
    body: [
      "16.1 Meridius bemüht sich um einen möglichst störungsfreien Betrieb des Onlineshops.",
      "16.2 Es besteht kein Anspruch auf eine jederzeitige und ununterbrochene Verfügbarkeit des Onlineshops.",
      "16.3 Meridius kann den Onlineshop vorübergehend unterbrechen, insbesondere für Wartungsarbeiten, technische Anpassungen oder Sicherheitsmassnahmen.",
    ],
  },
  {
    heading: "17. Änderung der AGB",
    body: [
      "17.1 Meridius kann diese AGB für zukünftige Bestellungen ändern.",
      "17.2 Für bereits abgeschlossene Kaufverträge gelten grundsätzlich die AGB, die bei Abschluss des jeweiligen Vertrags akzeptiert wurden.",
    ],
  },
  {
    heading: "18. Anwendbares Recht",
    body: [
      "18.1 Auf sämtliche Vertragsverhältnisse zwischen Meridius und dem Kunden ist Schweizer Recht anwendbar.",
      "18.2 Die Anwendung des Wiener Übereinkommens über Verträge über den internationalen Warenkauf (CISG) wird ausgeschlossen, soweit gesetzlich zulässig.",
      "18.3 Zwingende gesetzliche Bestimmungen, insbesondere zwingende Konsumentenschutzbestimmungen, bleiben vorbehalten.",
    ],
  },
  {
    heading: "19. Gerichtsstand",
    body: [
      "19.1 Für Streitigkeiten mit Geschäftskunden gilt, soweit gesetzlich zulässig, der Sitz von Meridius als Gerichtsstand.",
      "19.2 Bei Konsumentenverträgen gelten die zwingenden gesetzlichen Gerichtsstände. Ein Konsument kann insbesondere nicht durch diese AGB im Voraus auf gesetzlich zustehende Gerichtsstände verzichten.",
    ],
  },
  {
    heading: "20. Salvatorische Bestimmung",
    body: [
      "20.1 Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam oder undurchsetzbar sein oder werden, bleibt die Gültigkeit der übrigen Bestimmungen unberührt.",
      "20.2 Anstelle der unwirksamen oder undurchsetzbaren Bestimmung gilt diejenige gesetzlich zulässige Regelung als vereinbart, die dem wirtschaftlichen Zweck der ursprünglichen Bestimmung möglichst nahekommt.",
    ],
  },
  {
    heading: "21. Schlussbestimmungen",
    body: [
      "21.1 Diese AGB bilden zusammen mit der Bestellung, der Bestellbestätigung und den jeweils verbindlichen Produktinformationen die Grundlage des Kaufvertrags.",
      "21.2 Bei Widersprüchen zwischen den einzelnen Vertragsbestandteilen gilt folgende Reihenfolge: 1. zwingendes Schweizer Recht; 2. individuelle schriftliche Vereinbarungen; 3. Bestellbestätigung; 4. Produkt- und Preisangaben zum Zeitpunkt der Bestellung; 5. diese AGB.",
    ],
  },
];

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "AGB | ALKORIN®" },
      { name: "description", content: "Allgemeine Geschäftsbedingungen." },
      { property: "og:title", content: "AGB | ALKORIN®" },
      { property: "og:description", content: "Allgemeine Geschäftsbedingungen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen (AGB)"
      subtitle="Meridius Management GmbH · Stand: 15.09.2026"
      sections={SECTIONS}
      footer={
        <>
          {ADDRESS}
          <p className="mt-4">AGB-Version: 15.09.2026</p>
        </>
      }
    />
  ),
});
