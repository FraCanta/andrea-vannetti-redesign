import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import ConfirmationEmail, { getConfirmationSubject } from "@/emails/ConfirmationEmail";

const allowedSubjects = new Set([
  "web-development",
  "wordpress",
  "ecommerce",
  "seo-performance",
  "ui-ux-design",
  "digital-consulting",
  "collaboration",
  "general",
  "undecided",
]);
const projectSubjects = new Set([
  "web-development",
  "wordpress",
  "ecommerce",
  "seo-performance",
  "ui-ux-design",
]);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeUrl(value: string) {
  if (!value) return "";
  try {
    const normalized = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!["http:", "https:"].includes(normalized.protocol) || !normalized.hostname.includes(".")) return null;
    return normalized.toString();
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
    }

    // Honeypot: bots that fill the visually hidden field receive a success-shaped response.
    if (cleanText(raw.website, 500)) return NextResponse.json({ success: true });

    const nome = cleanText(raw.nome, 120);
    const email = cleanText(raw.email, 254).toLowerCase();
    const azienda = cleanText(raw.azienda, 160);
    const rawSite = cleanText(raw.sitoUrl, 500);
    const rawBriefUrl = cleanText(raw.briefUrl, 500);
    const rawFigmaUrl = cleanText(raw.figmaUrl, 500);
    const rawRepositoryUrl = cleanText(raw.repositoryUrl, 500);
    const rawCollaborationSkills: string[] = Array.isArray(raw.collaborationSkills)
      ? raw.collaborationSkills.filter((skill: unknown): skill is string => typeof skill === "string").slice(0, 4)
      : [];
    const messaggio = cleanText(raw.messaggio, 5000);
    const subject = cleanText(raw.subject, 40);
    const collaborationMode = cleanText(raw.collaborationMode, 40);
    const projectStage = cleanText(raw.projectStage, 40);
    const timeline = cleanText(raw.timeline, 40);
    const budget = cleanText(raw.budget, 40);
    const locale = raw.locale === "en" ? "en" : "it";
    const privacy = raw.privacy === true;

    if (!nome || !email || !messaggio || !privacy || !allowedSubjects.has(subject)) {
      return NextResponse.json({ error: "Controlla i campi obbligatori." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Indirizzo email non valido." }, { status: 400 });
    }
    const siteUrl = normalizeUrl(rawSite);
    const briefUrl = normalizeUrl(rawBriefUrl);
    const figmaUrl = normalizeUrl(rawFigmaUrl);
    const repositoryUrl = normalizeUrl(rawRepositoryUrl);
    if (siteUrl === null || briefUrl === null || figmaUrl === null || repositoryUrl === null) {
      return NextResponse.json({ error: "Indirizzo web non valido." }, { status: 400 });
    }

    const collaboration = subject === "collaboration";
    const allowedCollaborationSkills = new Set(["ux", "ui-system", "frontend", "accessibility-qa"]);
    if (collaboration && rawCollaborationSkills.some((skill) => !allowedCollaborationSkills.has(skill))) {
      return NextResponse.json({ error: "Controlla le competenze selezionate." }, { status: 400 });
    }
    const collaborationSkillLabels = locale === "en"
      ? { ux: "UX / experience", "ui-system": "UI / design system", frontend: "Frontend development", "accessibility-qa": "Accessibility and QA" }
      : { ux: "UX / esperienza", "ui-system": "UI / design system", frontend: "Sviluppo frontend", "accessibility-qa": "Accessibilità e QA" };
    const selectedCollaborationSkills = collaboration
      ? rawCollaborationSkills.map((skill) => collaborationSkillLabels[skill as keyof typeof collaborationSkillLabels])
      : [];
    const projectDetails = projectSubjects.has(subject);
    const allowedProjectStages = new Set(["idea", "defining", "existing", "development", "online"]);
    const allowedTimelines = new Set(["asap", "1-3-months", "3-6-months", "flexible"]);
    const allowedBudgets = new Set(["under-3000", "3000-6000", "6000-10000", "over-10000", "undecided"]);
    if (projectDetails && (
      (projectStage && !allowedProjectStages.has(projectStage)) ||
      (timeline && !allowedTimelines.has(timeline)) ||
      (budget && !allowedBudgets.has(budget))
    )) {
      return NextResponse.json({ error: "Controlla i dettagli del progetto." }, { status: 400 });
    }
    const allowedCollaborationModes = new Set(["project-support", "proposal", "other"]);
    if (collaboration && !allowedCollaborationModes.has(collaborationMode)) {
      return NextResponse.json({ error: "Seleziona come vuoi collaborare." }, { status: 400 });
    }
    const collaborationModeLabel = locale === "en"
      ? {
          "project-support": "I have a project and need support",
          proposal: "I'd like to propose a collaboration",
          other: "Other",
        }[collaborationMode]
      : {
          "project-support": "Ho un progetto e cerco supporto",
          proposal: "Vorrei propormi per una collaborazione",
          other: "Altro",
        }[collaborationMode];
    const requestTypeLabel = locale === "en"
      ? collaboration ? "Collaboration proposal" : `Project request: ${subject}`
      : collaboration ? "Proposta di collaborazione" : `Richiesta progetto: ${subject}`;
    const projectLabels = locale === "en"
      ? {
          stage: { idea: "It's still an idea", defining: "I'm defining the project", existing: "There is already something to rebuild or improve", development: "It's already in development", online: "It's already online" },
          timeline: { asap: "As soon as possible", "1-3-months": "Within 1–3 months", "3-6-months": "Within 3–6 months", flexible: "I'm flexible" },
          budget: { "under-3000": "Less than €3,000", "3000-6000": "€3,000–€6,000", "6000-10000": "€6,000–€10,000", "over-10000": "Over €10,000", undecided: "I haven't set a budget yet" },
        }
      : {
          stage: { idea: "È ancora un’idea", defining: "Sto definendo il progetto", existing: "Esiste già qualcosa da rifare o migliorare", development: "È già in sviluppo", online: "È già online" },
          timeline: { asap: "Appena possibile", "1-3-months": "Entro 1–3 mesi", "3-6-months": "Entro 3–6 mesi", flexible: "Sono flessibile" },
          budget: { "under-3000": "Meno di €3.000", "3000-6000": "€3.000–€6.000", "6000-10000": "€6.000–€10.000", "over-10000": "Oltre €10.000", undecided: "Non ho ancora definito un budget" },
        };
    const detailRow = (label: string, value: string) => `<tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${label}</td><td style="padding: 10px 12px;">${escapeHtml(value)}</td></tr>`;
    const projectDetailRows = projectDetails
      ? [
          projectStage && detailRow(locale === "en" ? "Project stage" : "Stato del progetto", projectLabels.stage[projectStage as keyof typeof projectLabels.stage]),
          timeline && detailRow(locale === "en" ? "Indicative timeline" : "Tempistica indicativa", projectLabels.timeline[timeline as keyof typeof projectLabels.timeline]),
          budget && detailRow(locale === "en" ? "Indicative budget" : "Budget indicativo", projectLabels.budget[budget as keyof typeof projectLabels.budget]),
        ].filter(Boolean).join("")
      : "";
    const safeName = escapeHtml(nome);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(azienda);
    const safeSite = escapeHtml(siteUrl);
    const safeBriefUrl = escapeHtml(briefUrl);
    const safeFigmaUrl = escapeHtml(figmaUrl);
    const safeRepositoryUrl = escapeHtml(repositoryUrl);
    const safeMessage = escapeHtml(messaggio);
    const projectLinkRow = (label: string, url: string) => url
      ? `<tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${label}</td><td style="padding: 10px 12px;"><a href="${url}">${url}</a></td></tr>`
      : "";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sito Web <noreply@andreavannetti.dev>",
        to: process.env.CONTACT_EMAIL,
        reply_to: email,
        subject: `${requestTypeLabel}${locale === "en" ? " [EN]" : ""}: ${nome}${azienda ? ` — ${azienda}` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #95e600; border-bottom: 2px solid #95e600; padding-bottom: 8px;">${locale === "en" ? "New website enquiry" : "Nuova richiesta dal sito"}</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${locale === "en" ? "Request type" : "Tipologia richiesta"}</td><td style="padding: 10px 12px;">${escapeHtml(requestTypeLabel)}</td></tr>
              <tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${locale === "en" ? "Name" : "Nome e cognome"}</td><td style="padding: 10px 12px;">${safeName}</td></tr>
              <tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">Email</td><td style="padding: 10px 12px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
              ${azienda ? `<tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${locale === "en" ? "Company / business" : "Azienda / attività"}</td><td style="padding: 10px 12px;">${safeCompany}</td></tr>` : ""}
              ${siteUrl ? `<tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${locale === "en" ? "Website / portfolio" : "Sito / portfolio"}</td><td style="padding: 10px 12px;"><a href="${safeSite}">${safeSite}</a></td></tr>` : ""}
              ${!collaboration ? `<tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${locale === "en" ? "Service" : "Servizio"}</td><td style="padding: 10px 12px;">${escapeHtml(subject)}</td></tr>` : ""}
              ${projectDetailRows}
              ${collaboration ? `<tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${locale === "en" ? "Collaboration type" : "Tipo di collaborazione"}</td><td style="padding: 10px 12px;">${escapeHtml(collaborationModeLabel ?? "")}</td></tr>` : ""}
              ${collaboration && selectedCollaborationSkills.length ? `<tr><td style="padding: 10px 12px; font-weight: bold; color: #666;">${locale === "en" ? "Skills requested" : "Competenze richieste"}</td><td style="padding: 10px 12px;">${escapeHtml(selectedCollaborationSkills.join(", "))}</td></tr>` : ""}
              ${collaboration ? projectLinkRow(locale === "en" ? "Brief / documentation" : "Brief / documentazione", safeBriefUrl) : ""}
              ${collaboration ? projectLinkRow(locale === "en" ? "Figma / presentation" : "Figma / presentazione", safeFigmaUrl) : ""}
              ${collaboration ? projectLinkRow(locale === "en" ? "Public repository" : "Repository pubblico", safeRepositoryUrl) : ""}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f5f5f5;">
              <p style="font-weight: bold; color: #666; margin: 0 0 8px 0;">${collaboration ? (locale === "en" ? "Proposal" : "Proposta") : (locale === "en" ? "Request details" : "Informazioni sulla richiesta")}</p>
              <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Errore nell'invio. Riprova più tardi." }, { status: 500 });
    }

    const emailHtml = await render(ConfirmationEmail({
      locale,
      name: nome,
      channel: "Email",
      contact: email,
      siteUrl: siteUrl || undefined,
      message: messaggio,
    }));
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Andrea Vannetti <noreply@andreavannetti.dev>",
        to: email,
        reply_to: "info@andreavannetti.dev",
        subject: getConfirmationSubject(locale),
        html: emailHtml,
      }),
    }).catch((error) => console.error("Contact confirmation email error:", error));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Errore del server. Riprova più tardi." }, { status: 500 });
  }
}
