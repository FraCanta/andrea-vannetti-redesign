import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./HomeChapters.module.css";

export async function HomeContact() {
  const h = await getTranslations("HomeRedesign.contact");
  return (
    <section
      className={`${styles.chapter} ${styles.contact}`}
      aria-labelledby="home-contact-title"
    >
      <p className={styles.eyebrow}>05 / {h("eyebrow")}</p>
      <h2 id="home-contact-title">{h("title")}</h2>
      <p className={styles.lede}>{h("intro")}</p>
      <div className={styles.contactPaths}>
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
      </div>
    </section>
  );
}
