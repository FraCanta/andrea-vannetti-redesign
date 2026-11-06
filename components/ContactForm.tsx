"use client";

import { useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { SEND_TO } from "@/components/ContactConversionTracker";
import { usePageTransition } from "@/components/PageTransition";
import styles from "./ContactForm.module.css";

type Service =
  | "web-development"
  | "wordpress"
  | "ecommerce"
  | "seo-performance"
  | "ui-ux-design"
  | "digital-consulting"
  | "collaboration"
  | "general"
  | "undecided";

type CollaborationSkill = "ux" | "ui-system" | "frontend" | "accessibility-qa";

const projectServices: Service[] = [
  "web-development",
  "wordpress",
  "ecommerce",
  "seo-performance",
  "ui-ux-design",
];

const services: Service[] = [
  "web-development",
  "wordpress",
  "ecommerce",
  "seo-performance",
  "ui-ux-design",
  "digital-consulting",
  "collaboration",
  "general",
  "undecided",
];

type FormValues = {
  nome: string;
  email: string;
  azienda: string;
  sitoUrl: string;
  briefUrl: string;
  figmaUrl: string;
  repositoryUrl: string;
  collaborationSkills: CollaborationSkill[];
  subject: Service | "";
  projectStage: "idea" | "defining" | "existing" | "development" | "online" | "";
  timeline: "asap" | "1-3-months" | "3-6-months" | "flexible" | "";
  budget: "under-3000" | "3000-6000" | "6000-10000" | "over-10000" | "undecided" | "";
  collaborationMode: "project-support" | "proposal" | "other" | "";
  messaggio: string;
  privacy: boolean;
  website: string;
};

const initialForm: FormValues = {
  nome: "",
  email: "",
  azienda: "",
  sitoUrl: "",
  briefUrl: "",
  figmaUrl: "",
  repositoryUrl: "",
  collaborationSkills: [],
  subject: "",
  projectStage: "",
  timeline: "",
  budget: "",
  collaborationMode: "",
  messaggio: "",
  privacy: false,
  website: "",
};

export function ContactForm({
  requestSubject,
}: {
  requestSubject: "collaboration" | null;
}) {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const router = useRouter();
  const navigate = usePageTransition();
  const [fixedCollaboration, setFixedCollaboration] = useState(
    requestSubject === "collaboration",
  );
  const [form, setForm] = useState<FormValues>(() => ({
    ...initialForm,
    subject: fixedCollaboration ? "collaboration" : "",
  }));
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const collaboration = form.subject === "collaboration";
  const showProjectDetails = projectServices.includes(form.subject as Service);

  const updateField = (name: Exclude<keyof FormValues, "collaborationSkills">, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
    setStatus("idle");
  };

  const toggleCollaborationSkill = (skill: CollaborationSkill) => {
    setForm((current) => ({
      ...current,
      collaborationSkills: current.collaborationSkills.includes(skill)
        ? current.collaborationSkills.filter((item) => item !== skill)
        : [...current.collaborationSkills, skill],
    }));
    setStatus("idle");
  };

  const chooseSubject = (subject: Service) => {
    setForm((current) => ({
      ...current,
      subject,
      ...(projectServices.includes(subject) ? {} : { projectStage: "", timeline: "", budget: "" }),
      ...(subject === "collaboration" ? {} : { collaborationMode: "" }),
      ...(subject === "collaboration" ? {} : { collaborationSkills: [], briefUrl: "", figmaUrl: "", repositoryUrl: "" }),
    }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next.subject;
      delete next.projectStage;
      delete next.timeline;
      delete next.budget;
      delete next.collaborationMode;
      return next;
    });
    setStatus("idle");
    navigate(() => router.replace(
      subject === "collaboration"
        ? { pathname: "/contatti", query: { subject: "collaboration" } }
        : { pathname: "/contatti" },
      { scroll: false },
    ));
  };

  const handleSubjectChange = (value: string) => {
    if (value === "") {
      setForm((current) => ({
        ...current,
        subject: "",
        projectStage: "",
        timeline: "",
        budget: "",
        collaborationMode: "",
        collaborationSkills: [],
        briefUrl: "",
        figmaUrl: "",
        repositoryUrl: "",
      }));
      setFieldErrors((current) => {
        const next = { ...current };
        delete next.subject;
        delete next.collaborationMode;
        return next;
      });
      setStatus("idle");
      navigate(() => router.replace({ pathname: "/contatti" }, { scroll: false }));
      return;
    }
    chooseSubject(value as Service);
  };

  const returnToGeneral = () => {
    setFixedCollaboration(false);
    setForm((current) => ({
      ...current,
      subject: "",
      collaborationMode: "",
      collaborationSkills: [],
      briefUrl: "",
      figmaUrl: "",
      repositoryUrl: "",
    }));
    setStatus("idle");
    navigate(() => router.replace({ pathname: "/contatti" }, { scroll: false }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setErrorMsg("");
    const errors: Record<string, string> = {};
    if (!form.nome.trim()) errors.nome = t("errors.nameRequired");
    if (!form.email.trim()) errors.email = t("errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = t("errors.emailInvalid");
    if (!form.subject) errors.subject = t("errors.subjectRequired");
    if (collaboration && !form.collaborationMode) errors.collaborationMode = t("collaboration.modeRequired");
    if (!form.messaggio.trim()) errors.messaggio = t("errors.messageRequired");
    if (!form.privacy) errors.privacy = t("errors.privacy");
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!response.ok) {
        setErrorMsg(t("errors.send"));
        setStatus("error");
        return;
      }
      setStatus("sent");
      window.gtag?.("event", "conversion", { send_to: SEND_TO });
      window.gtag?.("event", "generate_lead", { method: "form" });
    } catch {
      setErrorMsg(t("errors.network"));
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <CheckCircle size={40} aria-hidden="true" />
        <h3>{t("success.title")}</h3>
        <p>{t("success.text")}</p>
        <button type="button" className={styles.textButton} onClick={() => { setStatus("idle"); setForm({ ...initialForm, subject: fixedCollaboration ? "collaboration" : "" }); }}>
          {t("success.again")}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="contact-name">{t("labels.name")} <span aria-hidden="true">*</span></label>
          <input className={`${styles.control} ${fieldErrors.nome ? styles.invalid : ""}`} id="contact-name" name="nome" type="text" autoComplete="name" maxLength={120} value={form.nome} onChange={(e) => updateField("nome", e.target.value)} aria-invalid={!!fieldErrors.nome} aria-describedby={fieldErrors.nome ? "error-name" : undefined} />
          {fieldErrors.nome && <p className={styles.error} id="error-name">{fieldErrors.nome}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">{t("labels.email")} <span aria-hidden="true">*</span></label>
          <input className={`${styles.control} ${fieldErrors.email ? styles.invalid : ""}`} id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => updateField("email", e.target.value)} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "error-email" : undefined} />
          {fieldErrors.email && <p className={styles.error} id="error-email">{fieldErrors.email}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-company">{t("labels.company")}</label>
          <input className={styles.control} id="contact-company" name="azienda" type="text" autoComplete="organization" maxLength={160} value={form.azienda} onChange={(e) => updateField("azienda", e.target.value)} />
        </div>

        {!collaboration && <div className={styles.field}>
          <label htmlFor="contact-site">{t("labels.site")}</label>
          <input className={`${styles.control} ${fieldErrors.sitoUrl ? styles.invalid : ""}`} id="contact-site" name="sitoUrl" type="url" inputMode="url" autoComplete="url" maxLength={500} placeholder={t("placeholders.site")} value={form.sitoUrl} onChange={(e) => updateField("sitoUrl", e.target.value)} aria-invalid={!!fieldErrors.sitoUrl} aria-describedby={fieldErrors.sitoUrl ? "error-site" : undefined} />
          {fieldErrors.sitoUrl && <p className={styles.error} id="error-site">{fieldErrors.sitoUrl}</p>}
        </div>}

        {fixedCollaboration ? (
          <div className={styles.field}>
            <span className={styles.label}>{t("labels.reason")}</span>
            <div className={styles.fixedValue}>{t("services.collaboration")}</div>
          </div>
        ) : (
          <div className={styles.field}>
            <label htmlFor="contact-subject">{t("labels.subject")} <span aria-hidden="true">*</span></label>
            <select className={styles.control} id="contact-subject" name="subject" value={form.subject} onChange={(e) => handleSubjectChange(e.target.value)} aria-invalid={!!fieldErrors.subject} aria-describedby={fieldErrors.subject ? "error-subject" : undefined}>
              <option value="">{t("placeholders.subject")}</option>
              {services.map((service) => <option key={service} value={service}>{t(`services.${service}`)}</option>)}
            </select>
            {fieldErrors.subject && <p className={styles.error} id="error-subject">{fieldErrors.subject}</p>}
          </div>
        )}

        {showProjectDetails && (
          <div className={styles.projectDetails} role="group" aria-label={t("projectDetails.groupLabel")}>
            <div className={styles.projectDetailField}>
              <label htmlFor="contact-project-stage">{t("projectDetails.stageLabel")}</label>
              <select className={styles.control} id="contact-project-stage" name="projectStage" value={form.projectStage} onChange={(e) => updateField("projectStage", e.target.value as FormValues["projectStage"])}>
                <option value="">{t("projectDetails.selectPlaceholder")}</option>
                {(["idea", "defining", "existing", "development", "online"] as const).map((option) => (
                  <option key={option} value={option}>{t(`projectDetails.stages.${option}`)}</option>
                ))}
              </select>
            </div>
            <div className={styles.projectDetailField}>
              <label htmlFor="contact-timeline">{t("projectDetails.timelineLabel")}</label>
              <select className={styles.control} id="contact-timeline" name="timeline" value={form.timeline} onChange={(e) => updateField("timeline", e.target.value as FormValues["timeline"])}>
                <option value="">{t("projectDetails.selectPlaceholder")}</option>
                {(["asap", "1-3-months", "3-6-months", "flexible"] as const).map((option) => (
                  <option key={option} value={option}>{t(`projectDetails.timelines.${option}`)}</option>
                ))}
              </select>
            </div>
            <div className={styles.projectDetailField}>
              <label htmlFor="contact-budget">{t("projectDetails.budgetLabel")}</label>
              <select className={styles.control} id="contact-budget" name="budget" value={form.budget} onChange={(e) => updateField("budget", e.target.value as FormValues["budget"])}>
                <option value="">{t("projectDetails.selectPlaceholder")}</option>
                {(["under-3000", "3000-6000", "6000-10000", "over-10000", "undecided"] as const).map((option) => (
                  <option key={option} value={option}>{t(`projectDetails.budgets.${option}`)}</option>
                ))}
              </select>
            </div>
            <p className={styles.projectDetailsNote}>{t("projectDetails.budgetNote")}</p>
          </div>
        )}

        {collaboration && (
          <fieldset className={`${styles.field} ${styles.collaborationField}`} aria-describedby={fieldErrors.collaborationMode ? "error-collaboration-mode" : undefined}>
            <legend className={styles.groupLabel}>{t("collaboration.modeLabel")} <span aria-hidden="true">*</span></legend>
            <div className={styles.collaborationOptions}>
              {(["project-support", "proposal", "other"] as const).map((mode) => (
                <label className={styles.collaborationOption} key={mode}>
                  <input
                    type="radio"
                    name="collaborationMode"
                    value={mode}
                    checked={form.collaborationMode === mode}
                    onChange={() => updateField("collaborationMode", mode)}
                    aria-invalid={!!fieldErrors.collaborationMode}
                    aria-describedby={fieldErrors.collaborationMode ? "error-collaboration-mode" : undefined}
                  />
                  <span>{t(`collaboration.modes.${mode}`)}</span>
                </label>
              ))}
            </div>
            {fieldErrors.collaborationMode && <p className={styles.error} id="error-collaboration-mode">{fieldErrors.collaborationMode}</p>}
          </fieldset>
        )}

        {collaboration && (
          <div className={styles.collaborationDetails}>
            <div className={styles.field}>
              <label htmlFor="contact-site">{t("labels.portfolio")}</label>
              <input className={`${styles.control} ${fieldErrors.sitoUrl ? styles.invalid : ""}`} id="contact-site" name="sitoUrl" type="url" inputMode="url" autoComplete="url" maxLength={500} placeholder={t("placeholders.site")} value={form.sitoUrl} onChange={(e) => updateField("sitoUrl", e.target.value)} aria-invalid={!!fieldErrors.sitoUrl} aria-describedby={fieldErrors.sitoUrl ? "error-site" : undefined} />
              {fieldErrors.sitoUrl && <p className={styles.error} id="error-site">{fieldErrors.sitoUrl}</p>}
            </div>

            <fieldset className={styles.collaborationSkills}>
              <legend className={styles.groupLabel}>{t("collaboration.skillsLabel")}</legend>
              <div className={styles.skillOptions}>
                {(["ux", "ui-system", "frontend", "accessibility-qa"] as const).map((skill) => (
                  <label className={styles.skillOption} key={skill}>
                    <input
                      type="checkbox"
                      name="collaborationSkills"
                      value={skill}
                      checked={form.collaborationSkills.includes(skill)}
                      onChange={() => toggleCollaborationSkill(skill)}
                    />
                    <span>{t(`collaboration.skills.${skill}`)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className={styles.materialsHelp}>{t("collaboration.materialsHelp")}</p>
            <div className={styles.materialsGrid}>
              <div className={styles.field}>
                <label htmlFor="contact-brief">{t("collaboration.briefLabel")}</label>
                <input className={styles.control} id="contact-brief" name="briefUrl" type="url" inputMode="url" maxLength={500} placeholder={t("placeholders.site")} value={form.briefUrl} onChange={(e) => updateField("briefUrl", e.target.value)} />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-figma">{t("collaboration.figmaLabel")}</label>
                <input className={styles.control} id="contact-figma" name="figmaUrl" type="url" inputMode="url" maxLength={500} placeholder={t("placeholders.site")} value={form.figmaUrl} onChange={(e) => updateField("figmaUrl", e.target.value)} />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-repository">{t("collaboration.repositoryLabel")}</label>
                <input className={styles.control} id="contact-repository" name="repositoryUrl" type="url" inputMode="url" maxLength={500} placeholder={t("placeholders.site")} value={form.repositoryUrl} onChange={(e) => updateField("repositoryUrl", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        <div className={styles.field}>
          <label htmlFor="contact-message">{collaboration ? t("collaboration.additionalInfo") : t("labels.message")} <span aria-hidden="true">*</span></label>
          <textarea id="contact-message" name="messaggio" rows={6} maxLength={5000} value={form.messaggio} onChange={(e) => updateField("messaggio", e.target.value)} aria-invalid={!!fieldErrors.messaggio} aria-describedby={`message-help${fieldErrors.messaggio ? " error-message" : ""}`} />
          <p className={styles.help} id="message-help">{collaboration ? t("collaboration.messageHelp") : t("messageHelp")}</p>
          {fieldErrors.messaggio && <p className={styles.error} id="error-message">{fieldErrors.messaggio}</p>}
        </div>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => updateField("website", e.target.value)} />
      </div>

      <div className={styles.privacy}>
        <label htmlFor="contact-privacy">
          <input id="contact-privacy" name="privacy" type="checkbox" checked={form.privacy} onChange={(e) => updateField("privacy", e.target.checked)} aria-invalid={!!fieldErrors.privacy} aria-describedby={fieldErrors.privacy ? "error-privacy" : undefined} />
          <span>{t.rich("privacy", { link: (chunks) => <Link href="/privacy-policy" target="_blank" rel="noreferrer">{chunks}</Link> })} <span aria-hidden="true">*</span></span>
        </label>
        {fieldErrors.privacy && <p className={styles.error} id="error-privacy">{fieldErrors.privacy}</p>}
      </div>

      {status === "error" && <p className={styles.errorSummary} role="alert">{errorMsg}</p>}
      <button className={styles.submit} type="submit" disabled={status === "sending"}>
        {status === "sending" ? <><Loader2 size={18} className={styles.spinner} aria-hidden="true" />{t("sending")}</> : <>{collaboration ? t("collaboration.submit") : t("submit")}<Send size={17} aria-hidden="true" /></>}
      </button>
      {collaboration && !fixedCollaboration && <p className={styles.backLink}>{t("collaboration.changeHint")} <button type="button" className={styles.textButton} onClick={() => chooseSubject("general")}>{t("collaboration.generalLink")}</button></p>}
      {fixedCollaboration && <p className={styles.backLink}><button type="button" className={styles.textButton} onClick={returnToGeneral}>{t("collaboration.generalLink")}</button></p>}
    </form>
  );
}
