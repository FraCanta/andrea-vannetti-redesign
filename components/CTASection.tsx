"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("Home.cta");

  return (
    <section className="relative py-section section-padding overflow-hidden">
      {/* Bordi gradiente verde */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #95e600, transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #95e600, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[clamp(5rem,20vw,18rem)] uppercase text-typography/[0.03] whitespace-nowrap">
          Let&apos;s Talk
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <SectionReveal>
          <h2 className="font-display font-bold text-display-lg">
            {t("titleLine1")}
            <br />
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <p className="mt-6 text-lg text-typography-muted max-w-lg mx-auto">
            {t("text")}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <Link
            href="/contatti"
            className="group inline-flex items-center gap-3 mt-10 px-10 py-5 bg-primary text-background font-display font-bold uppercase tracking-wider text-sm rounded-full hover:gap-5 transition-all duration-300"
          >
            {t("button")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
