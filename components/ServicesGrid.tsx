"use client";

import { Link } from "@/i18n/navigation";
import {
  ArrowUpRight,
  Globe,
  Search,
  ShoppingCart,
  Layout,
} from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { useTranslations } from "next-intl";

const services = [
  {
    icon: Globe,
    key: "webDev",
    href: { pathname: "/servizi", hash: "web-dev" },
  },
  { icon: Search, key: "seo", href: { pathname: "/servizi", hash: "seo" } },
  {
    icon: ShoppingCart,
    key: "ecommerce",
    href: { pathname: "/servizi", hash: "ecommerce" },
  },
  {
    icon: Layout,
    key: "wordpress",
    href: { pathname: "/servizi", hash: "wordpress" },
  },
] as const;

export function ServicesGrid() {
  const t = useTranslations("Home.services");

  return (
    <section className="py-section section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-xl uppercase tracking-[0.2em]">
                <span className="font-mono text-primary">01.</span>
                <span className="text-typography-muted">
                  {" "}
                  {t("eyebrow")} /&gt;
                </span>
              </span>
              <h2 className="font-display font-bold text-display-md mt-4">
                {t("title")}
              </h2>
            </div>
            <Link
              href="/servizi"
              className="group flex items-center gap-2 text-typography-muted hover:text-primary transition-colors text-sm uppercase tracking-wider"
            >
              {t("all")}
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <SectionReveal key={service.key} delay={i * 0.1}>
              <Link href={service.href} className="group block h-full">
                <div className="relative h-full p-8 md:p-10 bg-background-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-3 text-typography group-hover:text-primary transition-colors duration-300">
                      {t(`items.${service.key}.title`)}
                    </h3>
                    <p className="text-typography-muted leading-relaxed text-sm">
                      {t(`items.${service.key}.description`)}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>{t("more")}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
