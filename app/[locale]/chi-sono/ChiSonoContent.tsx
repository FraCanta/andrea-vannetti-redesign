"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Code, Users, Compass, Rocket } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { SocialIcons } from "@/components/SocialIcons";
import { useTranslations } from "next-intl";

const principles = [
  { icon: Code, key: "code" },
  { icon: Users, key: "communication" },
  { icon: Compass, key: "local" },
  { icon: Rocket, key: "support" },
] as const;

export function ChiSonoContent() {
  const t = useTranslations("About");

  return (
    <>
      {/* Hero split section */}
      <section className="pt-44 pb-section section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left — Bio */}
            <SectionReveal>
              <div className="space-y-8">
                <div>
                  <span className="text-xl uppercase tracking-[0.2em]">
                    <span className="text-typography-muted">
                      {t("eyebrow")}
                    </span>
                  </span>
                  <h1 className="font-display font-bold text-display-md mt-4">
                    Andrea <span className="text-primary">Vannetti</span>
                  </h1>
                </div>

                <div className="space-y-5 text-typography/80 leading-relaxed">
                  <p>{t("bio.p1")}</p>
                  <p>{t("bio.p2")}</p>
                  <p>{t("bio.p3")}</p>
                </div>

                <SocialIcons className="pt-2" />
              </div>
            </SectionReveal>

            {/* Right — Photo */}
            <SectionReveal delay={0.15}>
              <div className="relative max-w-md mx-auto lg:max-w-md">
                {/* <div className="relative max-w-md mx-auto lg:max-w-md"> */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/ritratto.png"
                    alt={t("photoAlt")}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Fade to background at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Principles section */}
      <section className="py-section section-padding border-border">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xl uppercase tracking-[0.2em]">
                <span className="text-typography-muted">
                  {t("principles.eyebrow")}
                </span>
              </span>
              <h2 className="font-display font-bold text-display-md mt-4">
                {t.rich("principles.title", {
                  highlight: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, i) => (
              <SectionReveal key={principle.key} delay={i * 0.1}>
                <div className="h-full p-8 md:p-10 bg-background-card border border-border rounded-2xl group hover:border-primary/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <principle.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3 text-typography">
                    {t(`principles.items.${principle.key}.title`)}
                  </h3>
                  <p className="text-typography-muted leading-relaxed">
                    {t(`principles.items.${principle.key}.description`)}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Motto section */}
      <section className="py-section section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="relative text-center py-16">
              {/* Watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <span className="font-display font-black text-[clamp(5rem,20vw,18rem)] uppercase text-typography/[0.03] whitespace-nowrap">
                  Motto
                </span>
              </div>

              <div className="relative z-10">
                <motion.blockquote
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display font-bold text-display-lg italic">
                    &ldquo;Do or do not,
                    <br />
                    <span className="text-primary">there is no try</span>&rdquo;
                  </p>
                  <footer className="mt-6 text-typography-muted text-sm uppercase tracking-widest">
                    — Yoda
                  </footer>
                </motion.blockquote>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* CTA */}
      <section className="py-section section-padding  border-border">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h2 className="font-display font-bold text-display-sm">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-typography-muted text-lg">
              {t("cta.text")}
            </p>
            <Link
              href="/contatti"
              className="group inline-flex items-center gap-3 mt-8 px-10 py-5 bg-primary text-background font-display font-bold uppercase tracking-wider text-sm rounded-full hover:gap-5 transition-all duration-300"
            >
              {t("cta.button")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </SectionReveal>
        </div>
      </section>
      {/* Divider */}
      <div className="section-divider" />
    </>
  );
}
