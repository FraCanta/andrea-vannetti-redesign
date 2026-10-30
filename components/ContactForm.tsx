"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SEND_TO } from "@/components/ContactConversionTracker";

interface FormData {
  nome: string;
  cognome: string;
  azienda: string;
  canaleContatto: string;
  email: string;
  telefono: string;
  haUnSito: string;
  sitoUrl: string;
  haBudget: string;
  budget: string;
  messaggio: string;
  privacy: boolean;
}

const initialForm: FormData = {
  nome: "",
  cognome: "",
  azienda: "",
  canaleContatto: "",
  email: "",
  telefono: "",
  haUnSito: "",
  sitoUrl: "",
  haBudget: "",
  budget: "",
  messaggio: "",
  privacy: false,
};

const channelOptions = [
  { value: "Email", key: "email" },
  { value: "Telefono", key: "phone" },
  { value: "WhatsApp", key: "whatsapp" },
] as const;

const siteOptions = [
  { value: "No", key: "no" },
  { value: "Sì", key: "yes" },
  { value: "Sì, ma va rifatto", key: "redo" },
] as const;

const budgetOptions = [
  { value: "Sì", key: "yes" },
  { value: "No", key: "no" },
] as const;

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Clear field error on change
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });

    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "canaleContatto") {
        updated.telefono = "";
      }
      if (name === "haUnSito" && value === "No") {
        updated.sitoUrl = "";
      }
      if (name === "haBudget" && value === "No") {
        updated.budget = "";
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const errors: Record<string, string> = {};
    if (!form.nome.trim()) errors.nome = t("errors.firstName");
    if (!form.cognome.trim()) errors.cognome = t("errors.lastName");
    if (!form.canaleContatto) errors.canaleContatto = t("errors.channel");
    if (!form.email.trim()) errors.email = t("errors.emailRequired");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = t("errors.emailInvalid");
    if (
      (form.canaleContatto === "Telefono" ||
        form.canaleContatto === "WhatsApp") &&
      !form.telefono.trim()
    )
      errors.telefono = t("errors.phone");
    if (!form.messaggio.trim()) errors.messaggio = t("errors.message");
    if (
      (form.haUnSito === "Sì" || form.haUnSito === "Sì, ma va rifatto") &&
      !form.sitoUrl.trim()
    )
      errors.sitoUrl = t("errors.siteUrl");
    if (form.haBudget === "Sì" && !form.budget)
      errors.budget = t("errors.budget");
    if (!form.privacy) errors.privacy = t("errors.privacy");

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });

      if (!res.ok) {
        setErrorMsg(t("errors.send"));
        setStatus("error");
        return;
      }

      setStatus("sent");
      window.gtag?.("event", "conversion", { send_to: SEND_TO });
      window.gtag?.("event", "generate_lead", { method: "form" });
      setForm(initialForm);
      setFieldErrors({});
    } catch {
      setErrorMsg(t("errors.network"));
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <CheckCircle size={48} className="text-primary" />
        <h3 className="font-display font-bold text-2xl text-typography">
          {t("success.title")}
        </h3>
        <p className="text-typography-muted max-w-sm">{t("success.text")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-primary underline underline-offset-4 hover:text-typography transition-colors"
        >
          {t("success.again")}
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full bg-background border border-border rounded-lg px-4 py-3.5 text-base text-typography placeholder:text-typography-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300";

  const inputClass = (field: string) =>
    `${inputBase} ${fieldErrors[field] ? "border-red-400/50" : ""}`;

  const labelBase =
    "block text-sm uppercase tracking-widest text-typography-muted mb-2.5";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Nome / Cognome */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nome" className={labelBase}>
            {t("labels.firstName")} <span className="text-primary">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            placeholder={t("placeholders.firstName")}
            className={inputClass("nome")}
          />
          {fieldErrors.nome && (
            <p className="mt-1.5 text-sm text-red-400">{fieldErrors.nome}</p>
          )}
        </div>
        <div>
          <label htmlFor="cognome" className={labelBase}>
            {t("labels.lastName")} <span className="text-primary">*</span>
          </label>
          <input
            id="cognome"
            name="cognome"
            type="text"
            value={form.cognome}
            onChange={handleChange}
            placeholder={t("placeholders.lastName")}
            className={inputClass("cognome")}
          />
          {fieldErrors.cognome && (
            <p className="mt-1.5 text-sm text-red-400">{fieldErrors.cognome}</p>
          )}
        </div>
      </div>

      {/* Azienda */}
      <div>
        <label htmlFor="azienda" className={labelBase}>
          {t("labels.company")}
        </label>
        <input
          id="azienda"
          name="azienda"
          type="text"
          value={form.azienda}
          onChange={handleChange}
          placeholder={t("placeholders.company")}
          className={inputBase}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelBase}>
          {t("labels.email")} <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("placeholders.email")}
          className={inputClass("email")}
        />
        {fieldErrors.email && (
          <p className="mt-1.5 text-sm text-red-400">{fieldErrors.email}</p>
        )}
      </div>

      {/* Canale di contatto */}
      <div>
        <p className={labelBase}>
          {t("labels.channel")} <span className="text-primary">*</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {channelOptions.map(({ value: option, key }) => (
            <label
              key={option}
              className={`flex items-center gap-2.5 px-4 py-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                form.canaleContatto === option
                  ? "border-primary bg-primary/10 text-primary"
                  : fieldErrors.canaleContatto
                    ? "border-red-400/50 text-typography-muted"
                    : "border-border text-typography-muted hover:border-typography-dim"
              }`}
            >
              <input
                type="radio"
                name="canaleContatto"
                value={option}
                checked={form.canaleContatto === option}
                onChange={handleChange}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  form.canaleContatto === option
                    ? "border-primary"
                    : "border-typography-dim"
                }`}
              >
                {form.canaleContatto === option && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </span>
              <span className="text-base">{t(`options.${key}`)}</span>
            </label>
          ))}
        </div>
        {fieldErrors.canaleContatto && (
          <p className="mt-1.5 text-sm text-red-400">
            {fieldErrors.canaleContatto}
          </p>
        )}

        {/* Conditional: Phone field */}
        {(form.canaleContatto === "Telefono" ||
          form.canaleContatto === "WhatsApp") && (
          <div className="mt-4">
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              placeholder="+39 ..."
              className={inputClass("telefono")}
            />
            {fieldErrors.telefono && (
              <p className="mt-1.5 text-sm text-red-400">
                {fieldErrors.telefono}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Hai già un sito? */}
      <div>
        <p className={labelBase}>{t("labels.hasSite")}</p>
        <div className="flex flex-wrap gap-3">
          {siteOptions.map(({ value: option, key }) => (
            <label
              key={option}
              className={`flex items-center gap-2.5 px-4 py-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                form.haUnSito === option
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-typography-muted hover:border-typography-dim"
              }`}
            >
              <input
                type="radio"
                name="haUnSito"
                value={option}
                checked={form.haUnSito === option}
                onChange={handleChange}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  form.haUnSito === option
                    ? "border-primary"
                    : "border-typography-dim"
                }`}
              >
                {form.haUnSito === option && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </span>
              <span className="text-base">{t(`options.${key}`)}</span>
            </label>
          ))}
        </div>

        {/* Conditional: Site URL */}
        {(form.haUnSito === "Sì" || form.haUnSito === "Sì, ma va rifatto") && (
          <div className="mt-4">
            <input
              id="sitoUrl"
              name="sitoUrl"
              type="url"
              value={form.sitoUrl}
              onChange={handleChange}
              placeholder={t("placeholders.siteUrl")}
              className={inputClass("sitoUrl")}
            />
            {fieldErrors.sitoUrl && (
              <p className="mt-1.5 text-sm text-red-400">
                {fieldErrors.sitoUrl}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Hai un budget? */}
      <div>
        <p className={labelBase}>{t("labels.hasBudget")}</p>
        <div className="flex flex-wrap gap-3">
          {budgetOptions.map(({ value: option, key }) => (
            <label
              key={option}
              className={`flex items-center gap-2.5 px-4 py-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                form.haBudget === option
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-typography-muted hover:border-typography-dim"
              }`}
            >
              <input
                type="radio"
                name="haBudget"
                value={option}
                checked={form.haBudget === option}
                onChange={handleChange}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  form.haBudget === option
                    ? "border-primary"
                    : "border-typography-dim"
                }`}
              >
                {form.haBudget === option && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </span>
              <span className="text-base">{t(`options.${key}`)}</span>
            </label>
          ))}
        </div>

        {/* Conditional: Budget options */}
        {form.haBudget === "Sì" && (
          <div className="mt-4">
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={`${inputClass("budget")} appearance-none cursor-pointer`}
            >
              <option value="">{t("placeholders.budget")}</option>
              <option value="< 2.000€">{t("options.budgetLow")}</option>
              <option value="2.000€ - 5.000€">{t("options.budgetMid")}</option>
              <option value="> 5.000€">{t("options.budgetHigh")}</option>
            </select>
            {fieldErrors.budget && (
              <p className="mt-1.5 text-sm text-red-400">
                {fieldErrors.budget}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Messaggio */}
      <div>
        <label htmlFor="messaggio" className={labelBase}>
          {t("labels.message")} <span className="text-primary">*</span>
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          rows={5}
          value={form.messaggio}
          onChange={handleChange}
          placeholder={t("placeholders.message")}
          className={`${inputClass("messaggio")} resize-none`}
        />
        {fieldErrors.messaggio && (
          <p className="mt-1.5 text-sm text-red-400">{fieldErrors.messaggio}</p>
        )}
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="text-base text-red-400">{errorMsg}</p>
      )}

      {/* Privacy consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="privacy"
            checked={form.privacy}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, privacy: e.target.checked }));
              setFieldErrors((prev) => {
                const updated = { ...prev };
                delete updated.privacy;
                return updated;
              });
            }}
            className="mt-1 w-4 h-4 accent-primary cursor-pointer"
          />
          <span className="text-sm text-typography-muted leading-relaxed">
            {t.rich("privacy", {
              link: (chunks) => (
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  {chunks}
                </Link>
              ),
            })}{" "}
            <span className="text-primary">*</span>
          </span>
        </label>
        {fieldErrors.privacy && (
          <p className="mt-1.5 text-sm text-red-400">{fieldErrors.privacy}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group w-full flex items-center justify-center gap-3 py-4 bg-primary text-background font-display font-bold uppercase tracking-wider text-base rounded-full hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            {t("submit")}
            <Send
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </>
        )}
      </button>
      <button
        type="button"
        onClick={() => {
          setForm(initialForm);
          setFieldErrors({});
          setErrorMsg("");
          setStatus("idle");
        }}
        className="w-full text-center text-sm text-typography-dim hover:text-typography-muted transition-colors duration-300"
      >
        {t("reset")}
      </button>
    </form>
  );
}
