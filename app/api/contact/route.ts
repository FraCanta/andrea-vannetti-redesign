import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import ConfirmationEmail, {
  getConfirmationSubject,
} from "@/emails/ConfirmationEmail";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeUrl(value?: string) {
  const v = (value ?? "").trim();
  if (!v) return undefined;
  const withProtocol = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const url = new URL(withProtocol);
    return url.hostname.includes(".") ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const body = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [
        k,
        typeof v === "string" ? escapeHtml(v.trim()) : v,
      ]),
    ) as Record<string, string | undefined>;
    const {
      nome,
      cognome,
      azienda,
      canaleContatto,
      email,
      telefono,
      haUnSito,
      sitoUrl,
      haBudget,
      budget,
      messaggio,
      locale,
    } = body;

    const siteUrl = normalizeUrl(raw.sitoUrl);
    const safeSitoUrl = siteUrl ? escapeHtml(siteUrl) : "";

    // Validation
    if (!nome || !cognome || !messaggio || !canaleContatto) {
      return NextResponse.json(
        { error: "Compila tutti i campi obbligatori." },
        { status: 400 },
      );
    }

    if (canaleContatto === "Email" && !email) {
      return NextResponse.json(
        { error: "Inserisci la tua email." },
        { status: 400 },
      );
    }

    if (
      (canaleContatto === "Telefono" || canaleContatto === "WhatsApp") &&
      !telefono
    ) {
      return NextResponse.json(
        { error: "Inserisci il tuo numero di telefono." },
        { status: 400 },
      );
    }

    const contatto = (canaleContatto === "Email" ? email : telefono) ?? "";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sito Web <noreply@andreavannetti.dev>",
        to: process.env.CONTACT_EMAIL,
        subject: `Nuovo contatto${locale === "en" ? " [EN]" : ""}: ${raw.nome} ${raw.cognome}${raw.azienda ? ` — ${raw.azienda}` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #95e600; border-bottom: 2px solid #95e600; padding-bottom: 8px;">
              Nuovo messaggio dal sito
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #666; width: 160px;">Nome</td>
                <td style="padding: 10px 12px;">${nome} ${cognome}</td>
              </tr>
              ${
                azienda
                  ? `
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 12px; font-weight: bold; color: #666;">Azienda</td>
                <td style="padding: 10px 12px;">${azienda}</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #666;">Contatto (${canaleContatto})</td>
                <td style="padding: 10px 12px;">
                  ${
                    canaleContatto === "Email"
                      ? `<a href="mailto:${contatto}">${contatto}</a>`
                      : `<a href="tel:${contatto}">${contatto}</a>${canaleContatto === "WhatsApp" ? ` — <a href="https://wa.me/${contatto.replace(/\D/g, "")}">WhatsApp</a>` : ""}`
                  }
                </td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 12px; font-weight: bold; color: #666;">Ha già un sito?</td>
                <td style="padding: 10px 12px;">${haUnSito || "Non specificato"}${safeSitoUrl ? ` — <a href="${safeSitoUrl}">${safeSitoUrl}</a>` : ""}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #666;">Budget</td>
                <td style="padding: 10px 12px;">${haBudget === "Sì" && budget ? budget : haBudget === "No" ? "Non definito" : "Non specificato"}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
              <p style="font-weight: bold; color: #666; margin: 0 0 8px 0;">Messaggio</p>
              <p style="margin: 0; white-space: pre-wrap;">${messaggio}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Errore nell'invio. Riprova più tardi." },
        { status: 500 },
      );
    }

    // Email di conferma al mittente
    if (raw.email) {
      const emailLocale = locale === "en" ? "en" : "it";

      const html = await render(
        ConfirmationEmail({
          locale: emailLocale,
          name: raw.nome,
          channel: raw.canaleContatto,
          contact: raw.canaleContatto === "Email" ? raw.email : raw.telefono,
          site: raw.haUnSito || undefined,
          siteUrl,
          hasBudget: raw.haBudget || undefined,
          budget: raw.budget || undefined,
          message: raw.messaggio,
        }),
      );

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Andrea Vannetti <noreply@andreavannetti.dev>",
          to: raw.email,
          reply_to: "info@andreavannetti.dev",
          subject: getConfirmationSubject(emailLocale),
          html,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Errore del server. Riprova più tardi." },
      { status: 500 },
    );
  }
}
