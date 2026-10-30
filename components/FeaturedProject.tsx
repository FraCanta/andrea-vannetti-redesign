"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight, Map, Calendar, Users, Route } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { useTranslations } from "next-intl";

const features = [
  { icon: Map, key: "map" },
  { icon: Calendar, key: "events" },
  { icon: Users, key: "partners" },
  { icon: Route, key: "trails" },
] as const;

export function FeaturedProject() {
  const t = useTranslations("Home.featured");

  return (
    <section className="py-section section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <span className="text-xl uppercase tracking-[0.2em]">
            <span className="font-mono text-primary">02.</span>
            <span className="text-typography-muted"> {t("eyebrow")} /&gt;</span>
          </span>
          <h2 className="font-display uppercase font-bold text-display-md mt-4 mb-16">
            {t("title")}
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <SectionReveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border group">
              <div className="absolute inset-0">
                <Image
                  src="/images/radici.webp"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </SectionReveal>

          {/* Content */}
          <SectionReveal delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                  React + WordPress Headless
                </span>
                <span className="px-3 py-1 text-xs uppercase tracking-wider bg-background-card text-typography-muted rounded-full border border-border">
                  2025
                </span>
              </div>

              <h3 className="font-display font-bold text-display-sm">
                Radici in Chianti
              </h3>

              <p className="text-typography-muted leading-relaxed">
                {t("description")}
              </p>

              <div className="p-4 bg-background-card rounded-xl border border-border">
                <p className="text-sm text-primary font-semibold mb-1">
                  {t("challengeLabel")}
                </p>
                <p className="text-sm text-typography-muted">
                  {t("challenge")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {features.map((f) => (
                  <div key={f.key} className="flex items-center gap-3">
                    <f.icon size={16} className="text-primary shrink-0" />
                    <span className="text-sm text-typography-muted">
                      {t(`features.${f.key}`)}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/progetti"
                className="inline-flex items-center gap-2 mt-4 text-primary font-semibold text-sm uppercase tracking-wider group/link"
              >
                {t("cta")}
                <ArrowUpRight
                  size={16}
                  className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
