"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Globe,
  Search,
  ShoppingCart,
  Layout,
  Palette,
  BarChart3,
  MessageSquare,
  FileSearch,
  Pencil,
  Code,
  Rocket,
  Headphones,
} from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { highlight } from "@/components/highlight";

/* ───────────────────── DATA ───────────────────── */

const services = [
  { id: "web-dev", icon: Globe, number: "01" },
  { id: "wordpress", icon: Layout, number: "02" },
  { id: "ecommerce", icon: ShoppingCart, number: "03" },
  { id: "seo", icon: Search, number: "04" },
  { id: "design", icon: Palette, number: "05" },
  { id: "consulenza", icon: BarChart3, number: "06" },
] as const;

const workflowSteps = [
  { icon: MessageSquare, number: "01", key: "contact" },
  { icon: FileSearch, number: "02", key: "analysis" },
  { icon: Pencil, number: "03", key: "design" },
  { icon: Code, number: "04", key: "development" },
  { icon: Rocket, number: "05", key: "launch" },
  { icon: Headphones, number: "06", key: "support" },
] as const;

const problems = [
  { emoji: "🔍", key: "seo" },
  { emoji: "📱", key: "mobile" },
  { emoji: "🐌", key: "speed" },
  { emoji: "🤷", key: "start" },
  { emoji: "🔒", key: "security" },
  { emoji: "🛒", key: "ecommerce" },
] as const;

function HorizontalServices() {
  const t = useTranslations("Services.details");
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    const calc = () => {
      if (innerRef.current) {
        setScrollRange(innerRef.current.scrollWidth - window.innerWidth);
      }
    };

    const onResize = () => {
      checkMobile();
      calc();
    };

    checkMobile();
    requestAnimationFrame(() => requestAnimationFrame(calc));

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Mobile: vertical stack
  if (isMobile) {
    return (
      <section className="pb-section section-padding">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-display-md">
            {t.rich("title", { highlight })}
          </h2>
        </div>
        <div className="space-y-6">
          {services.map((service) => (
            <SectionReveal key={service.id}>
              <div
                id={service.id}
                className="p-6 bg-background-card border border-border rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <service.icon size={24} className="text-primary" />
                  </div>
                  <span className="font-mono text-primary text-xs">
                    {service.number} /{" "}
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="font-display font-bold text-xl">
                  {t(`items.${service.id}.title`)}
                </h2>
                <p className="text-primary text-xs uppercase tracking-widest font-semibold">
                  {t(`items.${service.id}.subtitle`)}
                </p>
                <p className="text-typography/80 leading-relaxed text-sm">
                  {t(`items.${service.id}.description`)}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs uppercase tracking-widest text-typography-muted mb-3">
                    {t("includes")}
                  </p>
                  <ul className="space-y-2">
                    {(t.raw(`items.${service.id}.features`) as string[]).map(
                      (feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-sm text-typography leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    );
  }

  // Desktop: horizontal scroll
  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${services.length * 120}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="section-padding pt-10 pb-4 shrink-0 text-center">
          <h2 className="font-display font-bold text-display-md">
            {t.rich("title", { highlight })}
          </h2>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            ref={innerRef}
            style={{ x }}
            className="flex gap-10 pl-6 md:pl-12 lg:pl-20 xl:pl-28 pr-[20vw] will-change-transform [backface-visibility:hidden]"
          >
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="w-[42vw] shrink-0"
              >
                <div className="h-full p-8 md:p-10 bg-background-card border border-border rounded-2xl space-y-6 hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <service.icon size={28} className="text-primary" />
                    </div>
                    <span className="font-mono text-primary text-sm">
                      {service.number} /{" "}
                      {String(services.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-display-sm">
                    {t(`items.${service.id}.title`)}
                  </h2>
                  <p className="text-primary text-sm uppercase tracking-widest font-semibold">
                    {t(`items.${service.id}.subtitle`)}
                  </p>
                  <p className="text-typography/80 leading-relaxed">
                    {t(`items.${service.id}.description`)}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs uppercase tracking-widest text-typography-muted mb-4">
                      {t("includes")}
                    </p>
                    <ul className="space-y-3">
                      {(t.raw(`items.${service.id}.features`) as string[]).map(
                        (feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                            <span className="text-sm text-typography leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="shrink-0 section-padding py-6">
          <div className="max-w-6xl mx-auto">
            <div className="h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-primary origin-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── COMPONENT ───────────────────── */

export function ServiziContent() {
  const t = useTranslations("Services");
  const faqs = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      {/* Hero */}
      <section className="pt-44 md:pt-80 pb-section section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <SectionReveal>
            <h1 className="font-display font-bold text-display-xl mt-4">
              {t.rich("hero.title", { highlight })}
            </h1>
            <p className="mt-6 text-lg text-typography/80 leading-relaxed font-light max-w-xl mx-auto">
              {t("hero.text")}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Problemi che risolvo */}
      <section className="pt-section pb-section section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-display-md">
                {t.rich("problems.title", { highlight })}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="h-full p-8 bg-background-card border border-border rounded-2xl group hover:border-primary/30 transition-all duration-500">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="font-display font-semibold text-lg mt-4 mb-2 text-typography group-hover:text-primary transition-colors">
                    {t(`problems.items.${item.key}.problem`)}
                  </h3>
                  <p className="text-typography-muted text-sm leading-relaxed">
                    {t(`problems.items.${item.key}.solution`)}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed services */}
      <HorizontalServices />

      {/* Workflow */}
      <section className="py-section section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-20">
              <span className="text-xl uppercase tracking-[0.2em]">
                <span className="text-typography-muted">
                  {t("workflow.eyebrow")}
                </span>
              </span>
              <h2 className="font-display font-bold text-display-md mt-4">
                {t.rich("workflow.title", { highlight })}
              </h2>
              <p className="mt-4 text-lg text-typography/80 max-w-lg mx-auto font-light">
                {t("workflow.text")}
              </p>
            </div>
          </SectionReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {workflowSteps.map((step, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <SectionReveal key={step.number} delay={i * 0.1}>
                    <div className="relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-10">
                      {/* Dot on the line */}
                      <div className="absolute left-1/2 top-12 -translate-x-1/2 hidden lg:flex flex-col items-center z-10">
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      </div>

                      {/* Content card */}
                      <div
                        className={`${
                          isLeft
                            ? "lg:col-start-1 lg:text-right lg:pr-12"
                            : "lg:col-start-2 lg:text-left lg:pl-12"
                        }`}
                      >
                        <div
                          className={`p-6 bg-background-card border border-border rounded-2xl group hover:border-primary/30 transition-all duration-500 ${
                            isLeft ? "lg:ml-auto" : ""
                          } max-w-lg`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-4 ${
                              isLeft ? "lg:flex-row-reverse" : ""
                            }`}
                          >
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                              <step.icon size={20} className="text-primary" />
                            </div>
                            <span className="font-mono text-primary text-xs">
                              Step {step.number}
                            </span>
                          </div>
                          <h3 className="font-display font-semibold text-xl mb-2 text-typography">
                            {t(`workflow.items.${step.key}.title`)}
                          </h3>
                          <p className="text-typography-muted leading-relaxed text-sm">
                            {t(`workflow.items.${step.key}.description`)}
                          </p>
                        </div>
                      </div>

                      {/* Empty column for the other side */}
                      {isLeft && (
                        <div className="hidden lg:block lg:col-start-2" />
                      )}
                      {!isLeft && (
                        <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />
                      )}
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <>
        <div className="section-divider" />
        <section className="py-section section-padding">
          <div className="max-w-3xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <span className="text-xl uppercase tracking-[0.2em]">
                  <span className="text-typography-muted">FAQ</span>
                </span>
                <h2 className="font-display font-bold text-display-md mt-4">
                  {t.rich("faq.title", { highlight })}
                </h2>
              </div>
            </SectionReveal>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <details className="group p-6 bg-background-card border border-border rounded-xl hover:border-primary/30 transition-all duration-300">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-display font-semibold text-lg text-typography group-hover:text-primary transition-colors pr-4">
                        {faq.q}
                      </span>
                      <span className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-typography-muted group-hover:border-primary group-hover:text-primary transition-all duration-300">
                        <span className="text-lg leading-none group-open:rotate-45 transition-transform duration-300">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-4 text-typography-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </>

      {/* CTA */}
      <>
        <div className="section-divider" />
        <section className="py-section section-padding">
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
    </>
  );
}
