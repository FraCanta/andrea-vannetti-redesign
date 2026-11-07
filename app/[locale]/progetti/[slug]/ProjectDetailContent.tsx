"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HomeReveal } from "@/components/redesign/HomeReveal";
import {
  getProjectPath,
  projects,
  type Project,
  type ProjectLocale,
  type ProjectSection,
} from "@/lib/projects";
import styles from "../ProjectsEditorial.module.css";

type ProjectDetailContentProps = {
  project: Project;
  locale: ProjectLocale;
};

function ProjectSectionView({ section, locale }: { section: ProjectSection; locale: ProjectLocale }) {
  const t = useTranslations("Projects");
  if (section.type === "editorial") {
    return (
      <section className={`${styles.caseSection} ${styles.caseEditorial}`}>
        <HomeReveal><p className={styles.storyLabel}>{section.title[locale]}</p></HomeReveal>
        <HomeReveal className={styles.caseEditorialCopy} delay={0.06}>
          <h2>{section.title[locale]}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph[locale]}>{paragraph[locale]}</p>)}
        </HomeReveal>
      </section>
    );
  }

  if (section.type === "image") {
    const layoutClass = section.layout === "wide"
      ? styles.caseImageWide
      : section.layout === "mobile"
        ? styles.caseImageMobile
        : styles.caseImageSplit;
    return (
      <HomeReveal className={`${styles.caseImage} ${layoutClass}`}>
        <Image src={section.src} alt={section.alt[locale]} fill sizes={section.layout === "wide" ? "(max-width: 640px) 100vw, 92vw" : "(max-width: 640px) 90vw, 48vw"} />
      </HomeReveal>
    );
  }

  if (section.type === "palette-typography") {
    return (
      <section className={`${styles.caseSection} ${styles.caseDirection}`}>
        <HomeReveal>
          <p className={styles.storyLabel}>{section.title[locale]}</p>
          <h2>{section.title[locale]}</h2>
          <p className={styles.caseIntro}>{section.description[locale]}</p>
        </HomeReveal>
        <HomeReveal className={styles.directionSpecimen} delay={0.08}>
          <div className={styles.paletteGrid}>
            {section.colors.map((color) => (
              <div className={styles.paletteItem} key={color.value}>
                <span className={styles.colorSwatch} style={{ backgroundColor: color.value }} aria-hidden="true" />
                <span>{color.name[locale]}</span>
                <code>{color.value}</code>
              </div>
            ))}
          </div>
          <div className={styles.typefaceGrid}>
            {section.typefaces.map((typeface) => (
              <div className={styles.typefaceItem} key={typeface.name}>
                <span aria-hidden="true">Aa</span>
                <strong>{typeface.name}</strong>
                <small>{typeface.use[locale]}</small>
              </div>
            ))}
          </div>
        </HomeReveal>
      </section>
    );
  }

  if (section.type === "interaction") {
    return (
      <section className={`${styles.caseSection} ${styles.caseInteraction}`}>
        <HomeReveal className={styles.caseInteractionCopy}>
          <h2>{section.title[locale]}</h2>
          <p>{section.body[locale]}</p>
        </HomeReveal>
        <HomeReveal className={`${styles.caseImage} ${styles.caseImageSplit}`} delay={0.08}>
          <Image src={section.image} alt={section.alt[locale]} fill sizes="(max-width: 640px) 100vw, 58vw" />
        </HomeReveal>
      </section>
    );
  }

  if (section.type === "principles" || section.type === "technical") {
    return (
      <section className={`${styles.caseSection} ${section.type === "technical" ? styles.caseTechnical : styles.casePrinciples}`}>
        <HomeReveal className={styles.caseSectionHeading}>
          <p className={styles.storyLabel}>{t(section.type === "technical" ? "detail.technicalMarker" : "detail.systemMarker")}</p>
          <h2>{section.title[locale]}</h2>
        </HomeReveal>
        <div className={styles.caseRows}>
          {section.items.map((item, index) => (
            <HomeReveal as="article" className={styles.caseRow} key={item.title[locale]} delay={Math.min(index * 0.035, 0.24)} y={14}>
              <span className={styles.storyLabel}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title[locale]}</h3>
                <p>{item.body[locale]}</p>
              </div>
            </HomeReveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.caseSection} ${styles.caseGallery}`}>
      <HomeReveal><h2>{section.title[locale]}</h2></HomeReveal>
      <div className={styles.mobileGallery}>
        {section.images.map((image, index) => (
          <HomeReveal className={`${styles.caseImage} ${styles.caseImageMobile}`} key={image.src} delay={index * 0.08}>
            <Image src={image.src} alt={image.alt[locale]} fill sizes="(max-width: 640px) 85vw, 34vw" />
          </HomeReveal>
        ))}
      </div>
    </section>
  );
}

export function ProjectDetailContent({ project, locale }: ProjectDetailContentProps) {
  const t = useTranslations("Projects");
  const item = `items.${project.translationKey}`;
  const draft = project.draft[locale];
  const realCaseStudy = project.caseStudy;
  const projectIndex = projects.findIndex(({ id }) => id === project.id);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const features = project.id === "radici"
    ? (t.raw("items.radici.features") as string[])
    : [];

  return (
    <main className={styles.page}>
      <article>
        <header className={`${styles.detailHero} ${styles.shell}`}>
          <nav className={styles.detailNav} aria-label={t("detail.backToArchive")}>
            <Link href="/progetti" className={styles.backLink}>
              <ArrowLeft size={16} aria-hidden="true" />
              {t("detail.backToArchive")}
            </Link>
            <span className={styles.eyebrow}>
              {String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </nav>

          <div className={styles.detailIntro}>
            <HomeReveal>
              <p className={styles.eyebrow}>
                <span className={styles.number}>{String(projectIndex + 1).padStart(2, "0")}</span>
                <span>{t(`${item}.subtitle`)}</span>
              </p>
              <h1 className={`${styles.detailTitle} ${project.id === "tecnochianti" ? styles.detailTitleTecnochianti : ""}`}>
                {project.id === "tecnochianti" ? <>Tecno<wbr />Chianti</> : project.title}
              </h1>
            </HomeReveal>

            <HomeReveal className={styles.detailSummary} delay={0.1} y={18}>
              <p>{realCaseStudy ? realCaseStudy.intro[locale] : t(`${item}.description`)}</p>
              {realCaseStudy && (
                <dl className={styles.projectFacts}>
                  {realCaseStudy.information.map((fact) => (
                    <div key={fact.label[locale]}>
                      <dt>{fact.label[locale]}</dt>
                      <dd>{fact.value[locale]}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {project.technologies.length > 0 && (
                <div className={styles.detailTechnologies} aria-label={t("detail.technologies")}>
                  {project.technologies.map((technology) => (
                    <span className={styles.techTag} key={technology}>{technology}</span>
                  ))}
                </div>
              )}
              {(project.url || project.github) && (
                <div className={styles.detailTechnologies}>
                  {project.url && (
                    <a className={styles.textLink} href={project.url} target="_blank" rel="noreferrer">
                      <ExternalLink size={14} aria-hidden="true" />{t("detail.externalSite")}
                    </a>
                  )}
                  {project.github && (
                    <a className={styles.textLink} href={project.github} target="_blank" rel="noreferrer">
                      <ArrowUpRight size={14} aria-hidden="true" />{t("detail.sourceCode")}
                    </a>
                  )}
                </div>
              )}
            </HomeReveal>
          </div>

          {!realCaseStudy && (
            <HomeReveal className={styles.draftNotice} y={10}>
              {t("detail.draftNotice")}
            </HomeReveal>
          )}
        </header>

        <section className={`${styles.cover} ${styles.shell}`} aria-label={t("screenshotAlt", { title: project.title })}>
          <HomeReveal className={`${styles.coverVisual} ${project.image ? "" : styles.coverMissing}`}>
            {project.image ? (
              <Image src={project.image} alt={t("screenshotAlt", { title: project.title })} fill priority sizes="(max-width: 640px) 100vw, 92vw" />
            ) : (
              <span>{t("detail.coverPending")}</span>
            )}
          </HomeReveal>
        </section>

        {realCaseStudy ? (
          <div className={styles.caseSections}>
            {realCaseStudy.sections.map((section) => (
              <ProjectSectionView key={section.id} section={section} locale={locale} />
            ))}
          </div>
        ) : (
          <>
            <section className={`${styles.story} ${styles.shell}`} aria-label={t("detail.context")}>
              <div className={styles.storyGrid}>
                <HomeReveal><p className={styles.storyLabel}>{t("detail.context")}</p></HomeReveal>
                <HomeReveal as="section" className={styles.storyBlock} delay={0.05}>
                  <h2>{t("detail.context")}</h2><p>{draft.context}</p>
                </HomeReveal>
                <HomeReveal as="section" className={styles.storyBlock} delay={0.1}>
                  <h2>{t("detail.challenge")}</h2><p>{draft.challenge}</p>
                </HomeReveal>
              </div>
            </section>
            <section className={styles.approach} aria-labelledby="project-approach-title">
              <div className={`${styles.shell} ${styles.approachGrid}`}>
                <HomeReveal><p className={styles.storyLabel}>{t("detail.approach")}</p></HomeReveal>
                <HomeReveal className={styles.approachCopy} delay={0.07}>
                  <h2 id="project-approach-title">{t("detail.approach")}</h2><p>{draft.approach}</p>
                </HomeReveal>
              </div>
            </section>
            <section className={`${styles.work} ${styles.shell}`} aria-labelledby="project-work-title">
              <div className={styles.workGrid}>
                <HomeReveal className={styles.workHeading}>
                  <p className={styles.storyLabel}>{t("detail.activities")}</p>
                  <h2 id="project-work-title">{t("detail.activities")}</h2>
                </HomeReveal>
                <HomeReveal as="section" delay={0.06}>
                  <h3 className={styles.storyLabel}>{t("detail.activities")}</h3>
                  <ol className={styles.activityList}>
                    {draft.activities.map((activity, index) => (
                      <li key={activity}><span>{String(index + 1).padStart(2, "0")}</span>{activity}</li>
                    ))}
                  </ol>
                  {features.length > 0 && (
                    <>
                      <h3 className={`${styles.storyLabel} ${styles.featureHeading}`}>{t("keyFeatures")}</h3>
                      <ul className={styles.activityList}>
                        {features.map((feature, index) => (
                          <li key={feature}><span>{String(index + 1).padStart(2, "0")}</span>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </HomeReveal>
                <HomeReveal as="section" delay={0.12}>
                  <h3 className={styles.storyLabel}>{t("detail.technologies")}</h3>
                  {project.technologies.length > 0 ? (
                    <ul className={styles.activityList}>
                      {project.technologies.map((technology, index) => (
                        <li key={technology}><span>{String(index + 1).padStart(2, "0")}</span>{technology}</li>
                      ))}
                    </ul>
                  ) : <p className={styles.ctaText}>{t(`${item}.label`)}</p>}
                </HomeReveal>
              </div>
            </section>
          </>
        )}

        <nav className={`${styles.projectNavigation} ${styles.shell}`} aria-label={t("detail.nextProject")}>
          <Link href={getProjectPath(nextProject.slug)} className={styles.nextLink}>
            <span className={styles.nextImage}>
              {nextProject.image && <Image src={nextProject.image} alt="" fill sizes="(max-width: 640px) 112px, 240px" />}
            </span>
            <span>
              <span className={styles.storyLabel}>{t("detail.nextProject")}</span>
              <span className={styles.nextTitle}>{nextProject.title}</span>
            </span>
            <ArrowRight className={styles.nextArrow} size={22} aria-hidden="true" />
          </Link>
          <Link href="/progetti" className={styles.textLink}>
            {t("detail.backToArchive")}<ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>

        <section className={`${styles.detailCta} ${styles.shell}`} aria-labelledby="project-cta-title">
          <div className={styles.detailCtaInner}>
            <div>
              <p className={styles.eyebrow}><span className={styles.number}>07</span><span>{t("cta.button")}</span></p>
              <h2 id="project-cta-title">
                {t("cta.titleLine1")} {t.rich("cta.titleLine2", { highlight: (chunks) => <span className={styles.accent}>{chunks}</span> })}
              </h2>
              <p className={styles.ctaText}>{t("cta.text")}</p>
            </div>
            <Link href="/contatti" className={styles.ctaLink}>{t("cta.button")}<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
      </article>
    </main>
  );
}
