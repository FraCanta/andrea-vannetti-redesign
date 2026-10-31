import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./HomeChapters.module.css";
import { HomeReveal } from "./HomeReveal";

export async function HomeContact() {
  const h = await getTranslations("HomeRedesign.contact");
  return (
    <section
      className={`${styles.chapter} ${styles.contact}`}
      aria-labelledby="home-contact-title"
    >
      <HomeReveal as="p" className={styles.eyebrow}>
        <span className={styles.eyebrowNumber}>05</span>
        <span>{h("eyebrow")}</span>
      </HomeReveal>
      <HomeReveal as="h2" id="home-contact-title" delay={0.06}>
        {h("title")}
      </HomeReveal>
      <HomeReveal as="p" className={styles.lede} delay={0.14}>
        {h("intro")}
      </HomeReveal>
      <HomeReveal as="div" className={styles.contactPaths} delay={0.2} y={18}>
        <Link href="/contatti" className={styles.contactPath}>
          <span>01</span>
          <strong>{h("project")}</strong>
          <small>{h("projectText")}</small>
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <Link
          href={{ pathname: "/contatti", query: { subject: "collaboration" } }}
          className={styles.contactPath}
        >
          <span>02</span>
          <strong>{h("collaboration")}</strong>
          <small>{h("collaborationText")}</small>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </HomeReveal>
    </section>
  );
}
