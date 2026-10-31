import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./HomeChapters.module.css";
import { HomeReveal } from "./HomeReveal";

export async function HomeAbout() {
  const t = await getTranslations("About");
  const h = await getTranslations("HomeRedesign.about");
  return (
    <section
      className={`${styles.chapter} ${styles.about}`}
      aria-labelledby="home-about-title"
    >
      <HomeReveal as="p" className={styles.eyebrow}>
        <span className={styles.eyebrowNumber}>03</span>
        <span>{h("eyebrow")}</span>
      </HomeReveal>
      <HomeReveal
        as="p"
        className={styles.aboutStatement}
        id="home-about-title"
        delay={0.08}
      >
        {h("statement")}
      </HomeReveal>
      <HomeReveal as="div" className={styles.aboutText} delay={0.16}>
        <p>{t("bio.p1")}</p>
        <p>{t("bio.p2")}</p>
        <Link href="/chi-sono" className={styles.textLink}>
          {h("cta")} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </HomeReveal>
    </section>
  );
}
