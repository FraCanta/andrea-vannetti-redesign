"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./EditorialHome.module.css";

export function EditorialOpening() {
  const t = useTranslations("HomeRedesign");
  const reducedMotion = useReducedMotion();
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const methodY = useTransform(scrollYProgress, [0.08, 0.88], ["100%", "0%"]);
  const methodOpacity = useTransform(scrollYProgress, [0.32, 0.58], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.48], [1, 0.9]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24, 0.47], [1, 1, 0]);

  return (
    <section
      ref={storyRef}
      className={styles.story}
      aria-labelledby="home-title"
      data-story="home-method"
    >
      <div className={styles.stage}>
        <div className={styles.grid} aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
          <i className={styles.gridTop} />
          <i className={styles.gridBottom} />
        </div>

        <motion.div
          className={styles.heroScene}
          style={reducedMotion ? undefined : { scale: titleScale, y: titleY, opacity: heroOpacity }}
        >
          <div className={styles.heroContent}>
            <p className={styles.role}><span aria-hidden="true" />{t("role")}</p>
            {/* Il claim in italiano è una firma di brand intenzionale anche su /en. */}
            <h1 id="home-title" className={styles.title}>
              <span className={styles.titleFirst}>{t("titleFirst")}</span>
              <span className={styles.titleSecond}>{t("titleSecond")}<span className={styles.period}>.</span></span>
            </h1>
            <div className={styles.heroLower}>
              <p className={styles.value}>{t("value")}</p>
              <div className={styles.descriptionBlock}>
                <p className={styles.description}>{t("description")}</p>
                <div className={styles.actions}>
                  <Link href="/contatti" className={styles.primaryCta}>
                    {t("projectCta")} <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <Link
                    href={{ pathname: "/contatti", query: { subject: "collaboration" } }}
                    className={styles.secondaryCta}
                  >
                    {t("collaborationCta")} <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.scrollCue} aria-hidden="true"><span>{t("scroll")}</span><ArrowDown size={16} /></p>
        </motion.div>

        <motion.section
          id="method"
          className={styles.methodScene}
          aria-labelledby="method-title"
          style={reducedMotion ? undefined : { y: methodY }}
        >
          <motion.div
            className={styles.methodContent}
            style={reducedMotion ? undefined : { opacity: methodOpacity }}
          >
            <div className={styles.methodHeading}>
              <p className={styles.methodEyebrow}><span>01</span>{t("methodEyebrow")}</p>
              <h2 id="method-title">{t("methodTitle")}</h2>
              <p className={styles.methodIntro}>{t("methodIntro")}</p>
            </div>
            <ol className={styles.methodSteps}>
              {[1, 2, 3, 4, 5].map((step) => (
                <li key={step}>
                  <span className={styles.stepIndex}>{String(step).padStart(2, "0")}</span>
                  <h3>{t(`steps.${step}.title`)}</h3>
                  <p>{t(`steps.${step}.body`)}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
