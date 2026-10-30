"use client";

import {
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { SocialIcons } from "@/components/SocialIcons";
import { ContactForm } from "@/components/ContactForm";
import { useTranslations } from "next-intl";

const contactLinks = [
  {
    icon: Mail,
    key: "email",
    value: "info@andreavannetti.dev",
    href: "mailto:info@andreavannetti.dev",
  },
  {
    icon: Phone,
    key: "phone",
    value: "+39 347 0587552",
    href: "tel:+393470587552",
  },
  {
    icon: MessageCircle,
    key: "whatsapp",
    value: null,
    href: "https://wa.me/393470587552",
  },
];

export function ContattiContent() {
  const t = useTranslations("Contact");

  return (
    <>
      <section className="pt-52 pb-section section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <SectionReveal>
            <div className="text-center">
              <h1 className="font-display font-bold text-display-xl tracking-[0.08em]">
                <span className="text-primary">{t("hero.titleHighlight")}</span>{" "}
                <br />
                {t("hero.titleRest")}
              </h1>
              <p className="mt-4 text-lg text-typography/80 max-w-xl mx-auto leading-relaxed font-light">
                {t("hero.text")}
              </p>
            </div>
          </SectionReveal>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mt-48">
            {/* Left — Contact info + Calendly + Socials */}
            <SectionReveal>
              <div className="space-y-10">
                {/* Contact links */}
                <div className="space-y-4">
                  {contactLinks.map((contact) => (
                    <a
                      key={contact.key}
                      href={contact.href}
                      target={
                        contact.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        contact.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4 p-4 bg-background-card border border-border rounded-xl hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <contact.icon size={18} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm uppercase tracking-widest text-typography-muted">
                          {t(`links.${contact.key}`)}
                        </p>
                        <p className="text-base text-typography group-hover:text-primary transition-colors">
                          {contact.value ?? t("whatsappValue")}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-typography-dim group-hover:text-primary transition-colors"
                      />
                    </a>
                  ))}
                </div>

                {/* Calendly CTA */}
                <div className="p-6 bg-background-card border border-border rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-typography">
                        {t("call.title")}
                      </p>
                      <p className="text-sm text-typography-muted">
                        {t("call.text")}
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://calendly.com/andreavannetti-dev/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 w-full py-3 border border-primary text-primary text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-primary hover:text-background transition-all duration-300"
                  >
                    {t("call.button")}
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>

                {/* Social icons */}
                <div className="space-y-4">
                  <h4 className="text-sm uppercase tracking-widest text-typography-muted">
                    {t("follow")}
                  </h4>
                  <SocialIcons />
                </div>
                {/* Recensione */}
                <div className="p-6 bg-background-card border border-border rounded-xl space-y-4">
                  <p className="text-base font-semibold text-typography">
                    {t("review.title")}
                  </p>
                  <p className="text-sm text-typography-muted">
                    {t("review.text")}
                  </p>
                  <div className="flex items-center gap-5">
                    <img
                      src="/google-review-qr.png"
                      alt={t("review.qrAlt")}
                      className="w-24 h-24 rounded-lg border border-border"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="text-xs text-typography-dim">
                        {t("review.hint")}
                      </p>
                      <a
                        href="https://g.page/r/Cay5IXmg_6ixEBM/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 w-full py-2.5 border border-border text-typography-muted text-sm font-semibold uppercase tracking-wider rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                      >
                        {t("review.button")}
                        <ArrowUpRight
                          size={14}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Right — Tally form */}
            <SectionReveal delay={0.15}>
              <h3 className="font-display font-semibold text-xl mb-6 text-typography">
                {t.rich("formTitle", {
                  highlight: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </h3>
              <div className="p-6 md:p-8 bg-background-card border border-border rounded-2xl">
                <ContactForm />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="section-divider" />
    </>
  );
}
