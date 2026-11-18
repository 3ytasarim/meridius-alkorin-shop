import { formatChf } from "./currency";
import { calcTotals } from "./pricing";

const FROM = "Meridius <bestellung@meridius.ch>";
const CC = "bestellung@meridius.ch";
const SUPPORT = "info@meridius.ch";
const SITE_URL = (process.env["SITE_URL"] ?? "https://meridius.ch").replace(/\/$/, "");
const NAVY = "#415a78";
const INK = "#1d2b3f";
const MUTED = "#66758a";
const LINE = "#e3e8ef";

export type OrderMailData = {
  orderNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  zip: string;
  city: string;
  items: { name: string; qty: number; priceCents: number }[];
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function buildOrderMail(o: OrderMailData) {
  const subtotal = o.items.reduce((n, i) => n + i.qty * i.priceCents, 0);
  const t = calcTotals(subtotal);
  const shipping = t.shippingCents === 0 ? "kostenlos" : formatChf(t.shippingCents);
  const fullName = `${esc(o.firstName)} ${esc(o.lastName)}`;
  const font = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;";

  const rows = o.items
    .map(
      (i) => `<tr>
        <td style="padding:14px 0;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};${font}">${esc(i.name)}<br><span style="font-size:12px;color:${MUTED};">${formatChf(i.priceCents)} pro Stück</span></td>
        <td align="center" style="padding:14px 8px;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};${font}">${i.qty}</td>
        <td align="right" style="padding:14px 0;border-bottom:1px solid ${LINE};font-size:14px;font-weight:600;color:${INK};white-space:nowrap;${font}">${formatChf(i.qty * i.priceCents)}</td>
      </tr>`,
    )
    .join("");

  const sumRow = (label: string, value: string, opts?: { strong?: boolean; small?: boolean }) => {
    const size = opts?.strong ? "17px" : opts?.small ? "12px" : "14px";
    const weight = opts?.strong ? "700" : "400";
    const color = opts?.strong ? INK : MUTED;
    return `<tr>
      <td colspan="2" align="right" style="padding:${opts?.strong ? "12px" : "4px"} 8px ${opts?.strong ? "0" : "4px"} 0;font-size:${size};font-weight:${weight};color:${color};${font}">${label}</td>
      <td align="right" style="padding:${opts?.strong ? "12px" : "4px"} 0 ${opts?.strong ? "0" : "4px"};font-size:${size};font-weight:${weight};color:${color};white-space:nowrap;${font}">${value}</td>
    </tr>`;
  };

  const html = `<!doctype html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ihre Bestellung bei Meridius</title></head>
<body style="margin:0;padding:0;background:#eef2f6;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eef2f6;">Vielen Dank für Ihre Bestellung! Bestellnummer ${esc(o.orderNo)} – Gesamtbetrag ${formatChf(t.grandTotalCents)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef2f6;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        <tr><td align="center" bgcolor="${NAVY}" style="background:${NAVY};border-radius:14px 14px 0 0;padding:26px 24px;">
          <a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_URL}/email-logo.png" width="280" height="52" alt="Meridius" style="display:block;border:0;outline:none;width:280px;height:auto;max-width:100%;"></a>
        </td></tr>
        <tr><td bgcolor="#ffffff" style="background:#ffffff;padding:34px 32px 30px;border-radius:0 0 14px 14px;${font}color:${INK};">
          <h1 style="margin:0 0 14px;font-size:24px;line-height:1.25;font-weight:700;color:${INK};${font}">Vielen Dank für Ihre Bestellung!</h1>
          <p style="margin:0 0 6px;font-size:15px;line-height:1.6;">Guten Tag ${fullName}</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#33445c;">wir haben Ihre Bestellung erhalten und bearbeiten sie schnellstmöglich. Nachfolgend finden Sie Ihre Bestellübersicht.</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px;"><tr>
            <td bgcolor="#eef3f8" style="background:#eef3f8;border-radius:10px;padding:14px 18px;${font}">
              <span style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};">Bestellnummer</span><br>
              <span style="font-size:18px;font-weight:700;color:${NAVY};">${esc(o.orderNo)}</span>
            </td>
          </tr></table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <thead><tr>
              <th align="left" style="padding:0 0 8px;border-bottom:2px solid ${NAVY};font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${MUTED};${font}">Produkt</th>
              <th align="center" style="padding:0 8px 8px;border-bottom:2px solid ${NAVY};font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${MUTED};${font}">Menge</th>
              <th align="right" style="padding:0 0 8px;border-bottom:2px solid ${NAVY};font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${MUTED};${font}">Summe</th>
            </tr></thead>
            <tbody>${rows}</tbody>
            <tfoot>
              ${sumRow("Zwischensumme", formatChf(t.subtotalCents))}
              ${sumRow("Porto &amp; Verpackung", shipping)}
              ${sumRow("Gesamtbetrag", formatChf(t.grandTotalCents), { strong: true })}
              ${sumRow(`inkl. 8.1% MWST (Netto ${formatChf(t.nettoCents)} + MWST ${formatChf(t.vatCents)})`, "", { small: true })}
            </tfoot>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0 0;"><tr>
            <td valign="top" width="50%" style="padding-right:12px;${font}font-size:14px;line-height:1.6;">
              <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};margin-bottom:6px;">Lieferadresse</div>
              ${fullName}<br>${esc(o.street)}<br>${esc(o.zip)} ${esc(o.city)}<br>Schweiz<br>Tel. ${esc(o.phone)}
            </td>
            <td valign="top" width="50%" style="padding-left:12px;${font}font-size:14px;line-height:1.6;">
              <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};margin-bottom:6px;">Zahlung</div>
              Auf Rechnung, Zahlungsfrist 14 Tage. Die Rechnung erhalten Sie elektronisch oder zusammen mit der Lieferung.
            </td>
          </tr></table>

          <hr style="border:0;border-top:1px solid ${LINE};margin:30px 0 20px;">
          <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#33445c;">Bei Fragen zu Ihrer Bestellung erreichen Sie uns jederzeit unter <a href="mailto:${SUPPORT}" style="color:${NAVY};font-weight:600;">${SUPPORT}</a>.</p>
          <p style="margin:0;font-size:14px;line-height:1.6;">Freundliche Grüsse<br><strong>Ihr Meridius-Team</strong></p>
        </td></tr>
        <tr><td align="center" style="padding:20px 12px 0;${font}font-size:12px;line-height:1.7;color:${MUTED};">
          Meridius Management GmbH · Churerstrasse 158 · 8808 Pfäffikon SZ · Schweiz<br>
          <a href="${SITE_URL}/agb" style="color:${MUTED};">AGB</a> · <a href="${SITE_URL}/datenschutz" style="color:${MUTED};">Datenschutz</a> · <a href="${SITE_URL}/impressum" style="color:${MUTED};">Impressum</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    "Vielen Dank für Ihre Bestellung!",
    "",
    `Guten Tag ${o.firstName} ${o.lastName}`,
    "",
    `Bestellnummer: ${o.orderNo}`,
    "",
    ...o.items.map(
      (i) => `${i.qty} x ${i.name} – ${formatChf(i.priceCents)} = ${formatChf(i.qty * i.priceCents)}`,
    ),
    "",
    `Zwischensumme: ${formatChf(t.subtotalCents)}`,
    `Porto & Verpackung: ${shipping}`,
    `Gesamtbetrag: ${formatChf(t.grandTotalCents)}`,
    `(inkl. 8.1% MWST: Netto ${formatChf(t.nettoCents)} + MWST ${formatChf(t.vatCents)})`,
    "",
    "Lieferadresse:",
    `${o.firstName} ${o.lastName}`,
    o.street,
    `${o.zip} ${o.city}`,
    "Schweiz",
    "",
    "Zahlung auf Rechnung (Zahlungsfrist 14 Tage).",
    "",
    `Bei Fragen: ${SUPPORT}`,
    "",
    "Freundliche Grüsse",
    "Ihr Meridius-Team",
    "Meridius Management GmbH, Churerstrasse 158, 8808 Pfäffikon SZ",
  ].join("\n");

  return { html, text };
}

/**
 * Sendet die Bestellbestätigung (Absender bestellung@meridius.ch, Kopie an dieselbe Adresse)
 * per SMTP (Standard: IONOS). Schlägt der Versand fehl, wird nur geloggt – die Bestellung
 * selbst bleibt gültig.
 *
 * Env: SMTP_USER, SMTP_PASS (Pflicht); optional SMTP_HOST (smtp.ionos.com), SMTP_PORT (465),
 * SITE_URL (https://meridius.ch – für Logo und Links in der E-Mail).
 */
export async function sendOrderConfirmation(o: OrderMailData) {
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  if (!user || !pass) {
    console.error("[mail] SMTP_USER/SMTP_PASS fehlen – Bestätigung für", o.orderNo, "nicht gesendet");
    return;
  }
  try {
    const { default: nodemailer } = await import("nodemailer");
    const port = Number(process.env["SMTP_PORT"] ?? 465);
    const transporter = nodemailer.createTransport({
      host: process.env["SMTP_HOST"] ?? "smtp.ionos.com",
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    const { html, text } = buildOrderMail(o);
    await transporter.sendMail({
      from: FROM,
      to: o.email,
      cc: CC,
      subject: `Ihre Bestellung bei Meridius – ${o.orderNo}`,
      html,
      text,
    });
  } catch (err) {
    console.error("[mail] Versand fehlgeschlagen", err);
  }
}
