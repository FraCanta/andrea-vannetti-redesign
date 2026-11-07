"use client";

import { useLayoutEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  useMotionValueEvent,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  Code,
  FileSearch,
  Globe,
  Headphones,
  Layout,
  MessageSquare,
  Palette,
  Pencil,
  Rocket,
  Search,
  ShoppingCart,
} from "lucide-react";
import { HomeReveal } from "@/components/redesign/HomeReveal";
import styles from "./ServiziContent.module.css";

const highlight = (chunks: ReactNode) => (
  <span className={styles.accent}>{chunks}</span>
);

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
  "seo",
  "mobile",
  "speed",
  "start",
  "security",
  "ecommerce",
] as const;

function HorizontalServices() {
  const t = useTranslations("Services.details");
  const homeServices = useTranslations("HomeRedesign.services");
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.round(progress * 100);
    setScrollPercent((current) => (current === next ? current : next));
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const isCompact =
        window.matchMedia("(max-width: 1023px)").matches || Boolean(reduceMotion);
      const nextRange = isCompact
        ? 0
        : Math.max(0, track.scrollWidth - container.clientWidth);
      setScrollRange((current) => (current === nextRange ? current : nextRange));
    };

    measure();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);
    observer?.observe(container);
    observer?.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduceMotion]);

  const sectionStyle = {
    "--service-scroll-range": `${scrollRange}px`,
  } as CSSProperties;

  return (
    <section
      ref={containerRef}
      className={styles.carouselSection}
      style={sectionStyle}
      aria-labelledby="services-details-title"
    >
      <div className={styles.carouselViewport}>
        <div className={styles.carouselHeading}>
          <HomeReveal className={styles.carouselHeadingText}>
            <p className={styles.sectionLabel}>
              <span className={styles.labelNumber}>03</span>
              <span>{homeServices("eyebrow")}</span>
            </p>
            <h2 id="services-details-title">
              {t.rich("title", { highlight })}
            </h2>
          </HomeReveal>
          <p className={styles.carouselNote}>{t("includes")}</p>
        </div>

        <motion.div
          ref={trackRef}
          className={styles.carouselTrack}
          style={{ x: reduceMotion ? 0 : x }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const features = t.raw(`items.${service.id}.features`) as string[];

            return (
              <HomeReveal
                as="article"
                id={service.id}
                aria-labelledby={`service-title-${service.id}`}
                className={styles.serviceSlide}
                key={service.id}
                delay={index * 0.035}
                y={16}
              >
                <div className={styles.serviceCard}>
                  <div className={styles.serviceCardTop}>
                    <span className={styles.serviceNumber}>
                      {service.number} / {String(services.length).padStart(2, "0")}
                    </span>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 id={`service-title-${service.id}`}>
                    {t(`items.${service.id}.title`)}
                  </h3>
                  <p className={styles.serviceSubtitle}>
                    {t(`items.${service.id}.subtitle`)}
                  </p>
                  <p className={styles.serviceDescription}>
                    {t(`items.${service.id}.description`)}
                  </p>
                  <div className={styles.serviceFeatures}>
                    <p className={styles.featuresLabel}>{t("includes")}</p>
                    <ul>
                      {features.map((feature, featureIndex) => (
                        <li key={feature}>
                          <span aria-hidden="true">
                            {String(featureIndex + 1).padStart(2, "0")}
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HomeReveal>
            );
          })}
        </motion.div>

        <div className={styles.carouselProgress}>
          <span>{homeServices("indexLabel")}</span>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={homeServices("indexLabel")}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={scrollPercent}
          >
            <motion.span
              className={styles.progressValue}
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <span className={styles.progressCount}>
            {String(Math.min(services.length, Math.max(1, Math.ceil((scrollPercent / 100) * services.length)))).padStart(2, "0")}
            <span aria-hidden="true"> / {String(services.length).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export function ServiziContent() {
  const t = useTranslations("Services");
  const homeServices = useTranslations("HomeRedesign.services");
  const faqs = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="services-title">
        <div className={styles.shell}>
          <HomeReveal as="p" className={styles.sectionLabel}>
            <span className={styles.labelNumber}>01</span>
            <span>{homeServices("eyebrow")}</span>
          </HomeReveal>
          <div className={styles.heroGrid}>
            <HomeReveal className={styles.heroTitleBlock} delay={0.06}>
              <h1 id="services-title">
                {t.rich("hero.title", { highlight })}
              </h1>
            </HomeReveal>
            <HomeReveal className={styles.heroIntro} delay={0.14} y={18}>
              <p>{t("hero.text")}</p>
            </HomeReveal>
          </div>
        </div>
      </section>

      <section className={styles.problems} aria-labelledby="problems-title">
        <div className={styles.shell}>
          <HomeReveal className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>
              <span className={styles.labelNumber}>02</span>
            </p>
            <h2 id="problems-title">
              {t.rich("problems.title", { highlight })}
            </h2>
          </HomeReveal>

          <div className={styles.problemGrid}>
            {problems.map((key, index) => (
              <HomeReveal
                as="article"
                className={styles.problemItem}
                key={key}
                delay={index * 0.055}
                y={16}
              >
                <span className={styles.problemNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{t(`problems.items.${key}.problem`)}</h3>
                  <p>{t(`problems.items.${key}.solution`)}</p>
                </div>
              </HomeReveal>
            ))}
          </div>
        </div>
      </section>

      <HorizontalServices />

      <section className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.shell}>
          <HomeReveal className={styles.workflowHeading}>
            <p className={styles.sectionLabel}>
              <span className={styles.labelNumber}>04</span>
              <span>{t("workflow.eyebrow")}</span>
            </p>
            <h2 id="workflow-title">
              {t.rich("workflow.title", { highlight })}
            </h2>
            <p className={styles.workflowIntro}>{t("workflow.text")}</p>
          </HomeReveal>

          <ol className={styles.workflowList}>
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li key={step.number}>
                  <HomeReveal
                    className={styles.workflowStep}
                    delay={index * 0.07}
                    y={16}
                  >
                    <span className={styles.workflowNumber}>{step.number}</span>
                    <Icon
                      className={styles.workflowIcon}
                      size={21}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3>{t(`workflow.items.${step.key}.title`)}</h3>
                    <p>{t(`workflow.items.${step.key}.description`)}</p>
                  </HomeReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.shell}>
          <HomeReveal className={styles.faqHeading}>
            <p className={styles.sectionLabel}>
              <span className={styles.labelNumber}>05</span>
              <span>FAQ</span>
            </p>
            <h2 id="faq-title">{t.rich("faq.title", { highlight })}</h2>
          </HomeReveal>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <HomeReveal
                className={styles.faqReveal}
                key={faq.q}
                delay={index * 0.035}
                y={14}
              >
                <details className={styles.faqItem}>
                  <summary>
                    <span className={styles.faqNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.faqQuestion}>{faq.q}</span>
                    <span className={styles.faqToggle} aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                </details>
              </HomeReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="services-cta-title">
        <div className={`${styles.shell} ${styles.ctaGrid}`}>
          <HomeReveal className={styles.ctaTitleBlock}>
            <p className={styles.sectionLabel}>
              <span className={styles.labelNumber}>06</span>
            </p>
            <h2 id="services-cta-title">{t("cta.title")}</h2>
          </HomeReveal>
          <HomeReveal className={styles.ctaAction} delay={0.1} y={18}>
            <p>{t("cta.text")}</p>
            <Link href="/contatti" className={styles.ctaLink}>
              <span>{t("cta.button")}</span>
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </HomeReveal>
        </div>
      </section>
    </main>
  );
}
