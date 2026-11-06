import { ArrowUpRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HomeReveal } from "@/components/redesign/HomeReveal";
import { CompetenceField, type CompetenceItem } from "./CompetenceField";
import styles from "./Collaboriamo.module.css";

type NumberedCopy = { number: string; title: string; body: string };
type StartingPoint = NumberedCopy & { tag: string };

export async function CollaboriamoContent() {
  const t = await getTranslations("Collaborate");
  const startingPoints = t.raw("ways.items") as StartingPoint[];
  const skills = t.raw("skills.items") as CompetenceItem[];
  const roles = t.raw("roles.items") as NumberedCopy[];
  const principles = t.raw("principles.items") as NumberedCopy[];
  const contextItems = t.raw("next.items") as string[];

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="collaborate-title">
        <div className={styles.shell}>
          <p className={styles.heroEyebrow}>
            <span>01</span> / {t("eyebrow")}
          </p>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="collaborate-title" className={styles.heroTitle}>
                <span>{t("hero.titleFirst")}</span>
                <span className={styles.heroTitleAccent}>{t("hero.titleSecond")}</span>
              </h1>
              <p className={styles.heroText}>{t("hero.text")}</p>
              <Link
                className={styles.primaryCta}
                href={{ pathname: "/contatti", query: { subject: "collaboration" } }}
              >
                {t("hero.cta")} <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div
              className={styles.projectDiagram}
              role="img"
              aria-label={t("hero.diagramLabel")}
            />
          </div>
          <div className={styles.heroRule} aria-hidden="true">
            <span>01</span><i /><span>COLLABORATION / WEB</span>
          </div>
        </div>
      </section>

      <section className={styles.ways} aria-labelledby="ways-title">
        <div className={styles.shell}>
          <HomeReveal className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{t("ways.eyebrow")}</p>
            <h2 id="ways-title">{t("ways.title")}</h2>
          </HomeReveal>
          <div className={styles.waysGrid}>
            {startingPoints.map((item, index) => (
              <HomeReveal
                as="article"
                className={styles.way}
                key={item.number}
                delay={index * 0.08}
                y={18}
              >
                <div className={styles.wayTop}>
                  <span className={styles.largeIndex}>{item.number}</span>
                  <span className={styles.wayTag}>{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </HomeReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.skills} aria-labelledby="skills-title">
        <div className={styles.shell}>
          <HomeReveal className={styles.skillsIntro}>
            <p className={styles.eyebrow}>{t("skills.eyebrow")}</p>
            <h2 id="skills-title">{t("skills.title")}</h2>
            <p>{t("skills.intro")}</p>
          </HomeReveal>
          <CompetenceField
            items={skills}
            diagramLabel={t("skills.diagramLabel")}
          />
        </div>
      </section>

      <section className={styles.roles} aria-labelledby="roles-title">
        <div className={styles.shell}>
          <HomeReveal className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{t("roles.eyebrow")}</p>
            <h2 id="roles-title">{t("roles.title")}</h2>
          </HomeReveal>
          <div className={styles.roleDiagram} role="group" aria-label={t("roles.diagramLabel")}>
            {roles.map((role, index) => (
              <HomeReveal
                as="article"
                className={`${styles.roleNode} ${index === 2 ? styles.roleOutcome : ""}`}
                key={role.number}
                delay={index * 0.1}
                y={16}
              >
                <span className={styles.roleNumber}>{role.number}</span>
                <h3>{role.title}</h3>
                <p>{role.body}</p>
              </HomeReveal>
            ))}
          </div>
          <p className={styles.rolesNote}>{t("roles.note")}</p>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.shell}>
          <HomeReveal className={styles.principlesHeading}>
            <p className={styles.eyebrow}>{t("principles.eyebrow")}</p>
            <h2 id="principles-title">{t("principles.title")}</h2>
            <p>{t("principles.intro")}</p>
          </HomeReveal>
          <div className={styles.principlesList}>
            {principles.map((item) => (
              <article className={styles.principle} key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <Check size={17} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.next} aria-labelledby="next-title">
        <div className={`${styles.shell} ${styles.nextGrid}`}>
          <div className={styles.nextCopy}>
            <p className={styles.eyebrow}>{t("next.eyebrow")}</p>
            <h2 id="next-title">{t("next.title")}</h2>
            <p>{t("next.text")}</p>
          </div>
          <div className={styles.nextDetails}>
            <p className={styles.nextLabel}>{t("next.itemsLabel")}</p>
            <ul>
              {contextItems.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
              ))}
            </ul>
            <Link
              className={styles.primaryCta}
              href={{ pathname: "/contatti", query: { subject: "collaboration" } }}
            >
              {t("next.cta")} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <p className={styles.ctaHint}>{t("next.ctaHint")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
