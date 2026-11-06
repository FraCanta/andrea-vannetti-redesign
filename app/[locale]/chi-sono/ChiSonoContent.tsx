"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { HomeReveal } from "@/components/redesign/HomeReveal";
import { HomeBridgeMarquee } from "@/components/redesign/HomeBridgeMarquee";
import editorialStyles from "@/components/redesign/EditorialHome.module.css";
import homeStyles from "@/components/redesign/HomeChapters.module.css";
import styles from "./ChiSonoContent.module.css";

const principles = [
  { key: "code", number: "01" },
  { key: "communication", number: "02" },
  { key: "local", number: "03" },
  { key: "support", number: "04" },
] as const;

export function ChiSonoContent() {
  const t = useTranslations("About");
  const contact = useTranslations("HomeRedesign.contact");
  const featuredProject = useTranslations("Home.featured");
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const portraitSrc =
    isMounted && resolvedTheme === "dark"
      ? "/images/chi-sono-andrea-dark-v2.png"
      : "/images/chi-sono-andrea-light.png";

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <HomeReveal as="p" className={styles.eyebrow}>
              <span className={styles.eyebrowNumber}>01</span>
              <span>{t("eyebrow")}</span>
            </HomeReveal>

            <HomeReveal className={styles.heroTitleReveal} delay={0.06}>
              <h1 id="about-title" className={styles.heroTitle}>
                {t("hero.headline")}
              </h1>
            </HomeReveal>

            <HomeReveal className={styles.portraitReveal} delay={0.12}>
              <figure className={styles.portraitArtwork}>
                <Image
                  src={portraitSrc}
                  alt={t("photoAlt")}
                  fill
                  priority
                  sizes="(max-width: 760px) 100vw, 44vw"
                  className={styles.portrait}
                />
              </figure>
            </HomeReveal>

            <HomeReveal className={styles.heroIntro} delay={0.16}>
              <p>{t("bio.p1")}</p>
            </HomeReveal>

            <HomeReveal
              className={`${styles.heroActions} ${editorialStyles.actions}`}
              delay={0.22}
            >
              <Link href="/contatti" className={editorialStyles.primaryCta}>
                {t("hero.contactCta")}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/servizi" className={editorialStyles.secondaryCta}>
                {t("hero.servicesCta")}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </HomeReveal>
          </div>
        </div>
      </section>

      <section className={styles.story} aria-labelledby="about-story-title">
        <div className={styles.container}>
          <HomeReveal as="p" className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>02</span>
            <span>{t("story.eyebrow")}</span>
          </HomeReveal>

          <div className={styles.storyGrid}>
            <HomeReveal className={styles.storyCopy} delay={0.06}>
              <h2 id="about-story-title">{t("story.title")}</h2>
              <p>{t("bio.p2")}</p>
            </HomeReveal>

            <HomeReveal className={styles.mottoReveal} delay={0.16}>
              <aside className={styles.motto}>
                <p className={styles.mottoLabel}>{t("motto.label")}</p>
                <blockquote>
                  <p>&ldquo;{t("motto.quote")}&rdquo;</p>
                  <cite>— {t("motto.attribution")}</cite>
                </blockquote>
              </aside>
            </HomeReveal>
          </div>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.container}>
          <div className={styles.principlesHeading}>
            <HomeReveal as="div" className={styles.principlesTitle}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowNumber}>03</span>
                <span>{t("principles.eyebrow")}</span>
              </p>
              <h2 id="principles-title">
                {t.rich("principles.title", {
                  highlight: (chunks) => (
                    <span className={styles.titleAccent}>{chunks}</span>
                  ),
                })}
              </h2>
            </HomeReveal>
            <HomeReveal as="p" className={styles.principlesNote} delay={0.1}>
              {t("story.principlesIntro")}
            </HomeReveal>
          </div>

          <ol className={styles.principleList}>
            {principles.map((principle, index) => (
              <li className={styles.principle} key={principle.key}>
                <HomeReveal
                  className={styles.principleReveal}
                  delay={0.06 + index * 0.08}
                  y={20}
                >
                  <span className={styles.principleNumber} aria-hidden="true">
                    {principle.number}
                  </span>
                  <h3>{t(`principles.items.${principle.key}.title`)}</h3>
                  <p>{t(`principles.items.${principle.key}.description`)}</p>
                </HomeReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.territory} aria-labelledby="territory-title">
        <div className={styles.container}>
          <div className={styles.territoryGrid}>
            <HomeReveal className={styles.territoryCopy}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowNumber}>04</span>
                <span>{t("territory.eyebrow")}</span>
              </p>
              <h2 id="territory-title">{t("territory.title")}</h2>
              <p className={styles.territoryDescription}>{t("bio.p3")}</p>
              <Link
                href="/progetti"
                className={`${editorialStyles.primaryCta} ${styles.territoryCta}`}
              >
                {t("territory.projectsCta")}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </HomeReveal>

            <HomeReveal className={styles.projectVisual} delay={0.12}>
              <figure>
                <div className={styles.projectImageFrame}>
                  <Image
                    src="/images/radici.webp"
                    alt={featuredProject("imageAlt")}
                    fill
                    sizes="(max-width: 760px) 100vw, 52vw"
                    loading="lazy"
                    className={styles.projectImage}
                  />
                  <span className={styles.projectCode} aria-hidden="true">
                    &lt;/&gt;
                  </span>
                </div>
                <figcaption>
                  <span>{featuredProject("eyebrow")}</span>
                  <span className={styles.projectRule} aria-hidden="true" />
                </figcaption>
              </figure>
            </HomeReveal>
          </div>
        </div>
      </section>

      <HomeBridgeMarquee />

      <section
        className={`${homeStyles.chapter} ${homeStyles.contact}`}
        aria-labelledby="about-contact-title"
      >
        <HomeReveal as="p" className={homeStyles.eyebrow}>
          <span className={homeStyles.eyebrowNumber}>05</span>
          <span>{contact("eyebrow")}</span>
        </HomeReveal>
        <HomeReveal as="h2" id="about-contact-title" delay={0.06}>
          {contact("title")}
        </HomeReveal>
        <HomeReveal as="p" className={homeStyles.lede} delay={0.14}>
          {contact("intro")}
        </HomeReveal>
        <HomeReveal
          as="div"
          className={homeStyles.contactPaths}
          delay={0.2}
          y={18}
        >
          <Link href="/contatti" className={homeStyles.contactPath}>
            <span>01</span>
            <strong>{contact("project")}</strong>
            <small>{contact("projectText")}</small>
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link href="/collaboriamo" className={homeStyles.contactPath}>
            <span>02</span>
            <strong>{contact("collaboration")}</strong>
            <small>{contact("collaborationText")}</small>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </HomeReveal>
      </section>
    </div>
  );
}
