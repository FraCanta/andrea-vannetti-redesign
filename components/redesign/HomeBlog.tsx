import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/lib/blog";
import styles from "./HomeChapters.module.css";
import { HomeReveal } from "./HomeReveal";

export async function HomeBlog() {
  const t = await getTranslations("HomeRedesign.blog");
  const blogT = await getTranslations("Blog");

  return (
    <section
      className={`${styles.chapter} ${styles.blog}`}
      aria-labelledby="home-blog-title"
    >
      <HomeReveal as="p" className={styles.eyebrow}>
        <span className={styles.eyebrowNumber}>04</span>
        <span>{t("eyebrow")}</span>
      </HomeReveal>
      <span className={styles.blogRule} aria-hidden="true" />
      <div className={styles.blogIntro}>
        <HomeReveal
          as="h2"
          className={styles.aboutStatement}
          id="home-blog-title"
          delay={0.06}
        >
          {t("title")}
        </HomeReveal>
        <HomeReveal as="div" className={styles.aboutText} delay={0.14}>
          <p>{t("intro")}</p>
          <p className={styles.blogStatus}>{t("status")}</p>
        </HomeReveal>
      </div>
      <div className={styles.blogGrid}>
        {blogPosts.map((article, index) => {
          const key = article.translationKey;
          const content = (
            <>
              <Image
                className={styles.blogImage}
                src={article.image}
                alt={t(`${key}.imageAlt`)}
                width={1448}
                height={1086}
                sizes="(min-width: 1280px) 22vw, (min-width: 761px) 43vw, calc(100vw - 2.5rem)"
                loading="lazy"
              />
              <div className={styles.blogArticleBody}>
                <p className={styles.blogCategory}>{t(`${key}.category`)}</p>
                <h3>{t(`${key}.title`)}</h3>
                <p className={styles.blogExcerpt}>{t(`${key}.excerpt`)}</p>
                <p className={styles.blogArticleStatus}>
                  <span aria-hidden="true" />
                  {article.status === "published" ? t("published") : t("status")}
                </p>
              </div>
            </>
          );
          return (
            <HomeReveal
              as="article"
              className={styles.blogArticle}
              key={article.id}
              delay={0.1 + index * 0.09}
              y={18}
            >
              <Link className={styles.blogArticleLink} href={{ pathname: "/blog/[slug]", params: { slug: article.slug } }}>
                {content}
              </Link>
            </HomeReveal>
          );
        })}
      </div>
      <HomeReveal className={styles.blogAllArticles} delay={0.18}>
        <Link href="/blog">{blogT("archive.allArticles")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </HomeReveal>
    </section>
  );
}
