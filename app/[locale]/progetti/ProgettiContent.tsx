"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HomeReveal } from "@/components/redesign/HomeReveal";
import { getProjectPath, projects } from "@/lib/projects";
import styles from "./ProjectsEditorial.module.css";

export function ProgettiContent() {
  const t = useTranslations("Projects");

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="projects-title">
        <div className={styles.shell}>
          <HomeReveal as="p" className={styles.eyebrow}>
            <span className={styles.number}>01</span>
            <span>{t("featuredLabel")}</span>
          </HomeReveal>
          <HomeReveal delay={0.06}>
            <h1 id="projects-title" className={styles.heroTitle}>
              {t.rich("hero.title", {
                highlight: (chunks) => <span className={styles.accent}>{chunks}</span>,
              })}
            </h1>
          </HomeReveal>
          <div className={styles.heroBottom}>
            <HomeReveal className={styles.heroText} delay={0.12} y={16}>
              {t("hero.text")}
            </HomeReveal>
          </div>
        </div>
      </section>

      <section className={styles.archive} aria-labelledby="project-archive-title">
        <div className={styles.shell}>
          <div className={styles.archiveHeader}>
            <h2 id="project-archive-title" className="font-inherit">
              {t.rich("othersTitle", {
                highlight: (chunks) => <span className={styles.accent}>{chunks}</span>,
              })}
            </h2>
            <span>{String(projects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>

          <div className={styles.projectGrid}>
            {projects.map((project, index) => {
              const item = `items.${project.translationKey}`;
              const isFeatured = Boolean(project.featured);

              return (
                <HomeReveal
                  as="article"
                  key={project.id}
                  className={isFeatured ? styles.featuredProject : undefined}
                  delay={Math.min(index * 0.055, 0.28)}
                  y={18}
                >
                  <Link
                    href={getProjectPath(project.slug)}
                    className={styles.projectLink}
                    aria-label={`${project.title} — ${t("openCaseStudy")}`}
                  >
                    <span className={styles.projectVisual}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={t("screenshotAlt", { title: project.title })}
                          fill
                          sizes={isFeatured
                            ? "(max-width: 640px) 100vw, (max-width: 900px) 90vw, 65vw"
                            : "(max-width: 640px) 100vw, (max-width: 900px) 45vw, 42vw"}
                        />
                      ) : (
                        <span className={styles.placeholderVisual}>
                          {t("comingSoon")}
                        </span>
                      )}
                    </span>
                    <span className={styles.projectMeta}>
                      <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                      <span>
                        {project.status === "live" ? t("status.live") : t("status.inProgress")}
                        {project.label ? ` · ${t(`items.${project.translationKey}.label`)}` : ""}
                      </span>
                    </span>
                    <span className={styles.projectTitle}>{project.title}</span>
                    <span className={styles.projectSubtitle}>{t(`${item}.subtitle`)}</span>
                    <span className={styles.projectDescription}>{t(`${item}.description`)}</span>
                    {project.technologies.length > 0 && (
                      <span className={styles.projectTech}>
                        {project.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </span>
                    )}
                    <span className={styles.projectAction}>
                      {t("openCaseStudy")}
                      <ArrowDownRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </HomeReveal>
              );
            })}
          </div>

          <div className={styles.archiveCta}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.number}>02</span>
                <span>{t("cta.titleLine1")}</span>
              </p>
              <h2>{t("cta.titleLine1")} {t.rich("cta.titleLine2", {
                highlight: (chunks) => <span className={styles.accent}>{chunks}</span>,
              })}</h2>
              <p className={styles.ctaText}>{t("cta.text")}</p>
            </div>
            <Link href="/contatti" className={styles.ctaLink}>
              {t("cta.button")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
