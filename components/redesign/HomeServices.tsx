"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./HomeChapters.module.css";

const keys = [
  "web-dev",
  "wordpress",
  "ecommerce",
  "seo",
  "design",
  "consulenza",
] as const;

export function HomeServices() {
  const t = useTranslations("Services.details");
  const h = useTranslations("HomeRedesign.services");
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const key = keys[active];
  const selectService = (index: number) =>
    setActive((index + keys.length) % keys.length);
  return (
    <section
      className={`${styles.chapter} ${styles.services}`}
      aria-labelledby="home-services-title"
    >
      <div className={styles.chapterHead}>
        <p className={styles.eyebrow}>02 / {h("eyebrow")}</p>
        <h2 id="home-services-title">{h("title")}</h2>
        <p className={styles.lede}>{h("intro")}</p>
      </div>
      <div className={styles.serviceLayout}>
        <div
          className={styles.serviceIndex}
          role="tablist"
          aria-label={h("indexLabel")}
        >
          {keys.map((service, index) => (
            <button
              key={service}
              type="button"
              role="tab"
              tabIndex={active === index ? 0 : -1}
              aria-selected={active === index}
              aria-controls="home-service-detail"
              id={`home-service-tab-${index}`}
              onClick={() => selectService(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  selectService(index + 1);
                  document
                    .getElementById(
                      `home-service-tab-${(index + 1) % keys.length}`,
                    )
                    ?.focus();
                }
                if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectService(index - 1);
                  document
                    .getElementById(
                      `home-service-tab-${(index - 1 + keys.length) % keys.length}`,
                    )
                    ?.focus();
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  selectService(0);
                  document.getElementById("home-service-tab-0")?.focus();
                }
                if (event.key === "End") {
                  event.preventDefault();
                  selectService(keys.length - 1);
                  document
                    .getElementById(`home-service-tab-${keys.length - 1}`)
                    ?.focus();
                }
              }}
              className={
                active === index ? styles.serviceActive : styles.serviceButton
              }
            >
              <span className={styles.indexNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{t(`items.${service}.title`)}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className={styles.serviceDetail}
          id="home-service-detail"
          role="tabpanel"
          aria-labelledby={`home-service-tab-${active}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={key}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
            >
              <p className={styles.detailKicker}>
                {h("detailLabel")} / {String(active + 1).padStart(2, "0")}
              </p>
              <h3>{t(`items.${key}.subtitle`)}</h3>
              <p>{t(`items.${key}.description`)}</p>
              <Link href="/servizi" className={styles.textLink}>
                {h("cta")} <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
