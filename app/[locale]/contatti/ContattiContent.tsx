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
import styles from "./ContattiContent.module.css";

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

export function ContattiContent({
  requestSubject,
}: {
  requestSubject: "collaboration" | null;
}) {
  const t = useTranslations("Contact");

  return (
    <main>
      <section className={`${styles.hero} section-padding`} aria-labelledby="contact-title">
        <div className={styles.shell}>
          <SectionReveal>
            <p className={styles.heroEyebrow}><span>01</span>{t("hero.eyebrow")}</p>
            <div className={styles.heroGrid}>
              <h1 id="contact-title" className={styles.heroTitle}>
                <span className={styles.heroTitleAccent}>{t("hero.titleHighlight")}</span>
                <span>{t("hero.titleRest")}</span>
              </h1>
              <p className={styles.heroText}>{t("hero.text")}</p>
            </div>
            <div className={styles.heroRule} aria-hidden="true">
              <span>01</span><i /><span>{t("hero.ruleLabel")}</span>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className={`${styles.contactBody} section-padding`}>
        <div className={styles.shell}>
          <div className={styles.contactGrid}>
            <SectionReveal>
              <aside className={styles.contactAside} aria-label={t("informationLabel")}>
                <p className={styles.sectionEyebrow}><span>02</span>{t("informationLabel")}</p>
                <div className={styles.contactLinks}>
                  {contactLinks.map((contact, index) => (
                    <a
                      key={contact.key}
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={styles.contactLink}
                    >
                      <span className={styles.contactIndex}>0{index + 1}</span>
                      <contact.icon size={18} aria-hidden="true" className={styles.contactIcon} />
                      <span className={styles.contactLinkCopy}>
                        <span className={styles.contactLabel}>{t(`links.${contact.key}`)}</span>
                        <span className={styles.contactValue}>{contact.value ?? t("whatsappValue")}</span>
                      </span>
                      <ArrowUpRight size={16} aria-hidden="true" className={styles.contactArrow} />
                    </a>
                  ))}
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.infoBlockHeading}>
                    <Calendar size={18} aria-hidden="true" />
                    <h2>{t("call.title")}</h2>
                  </div>
                  <p>{t("call.text")}</p>
                  <a className={styles.outlineCta} href="https://calendly.com/andreavannetti-dev/30min" target="_blank" rel="noopener noreferrer">
                    {t("call.button")}<ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>

                <div className={styles.socialBlock}>
                  <h2 className={styles.sectionEyebrow}><span>03</span>{t("follow")}</h2>
                  <SocialIcons className={styles.socialIcons} />
                </div>

                <div className={styles.reviewBlock}>
                  <div>
                    <h2>{t("review.title")}</h2>
                    <p>{t("review.text")}</p>
                  </div>
                  <div className={styles.reviewAction}>
                    <img src="/google-review-qr.png" alt={t("review.qrAlt")} />
                    <div>
                      <p>{t("review.hint")}</p>
                      <a className={styles.outlineCta} href="https://g.page/r/Cay5IXmg_6ixEBM/review" target="_blank" rel="noopener noreferrer">
                        {t("review.button")}<ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className={styles.formPanel}>
                <ContactForm requestSubject={requestSubject} />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="section-divider" />
    </main>
  );
}
