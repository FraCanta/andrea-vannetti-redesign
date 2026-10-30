import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./HomeChapters.module.css";

export async function HomeAbout() {
  const t = await getTranslations("About");
  const h = await getTranslations("HomeRedesign.about");
  return (
    <section
      className={`${styles.chapter} ${styles.about}`}
      aria-labelledby="home-about-title"
    >
      <p className={styles.eyebrow}>03 / {h("eyebrow")}</p>
      <p className={styles.aboutStatement} id="home-about-title">
        {h("statement")}
      </p>
      <div className={styles.aboutText}>
        <p>{t("bio.p1")}</p>
        <p>{t("bio.p2")}</p>
        <Link href="/chi-sono" className={styles.textLink}>
          {h("cta")} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
