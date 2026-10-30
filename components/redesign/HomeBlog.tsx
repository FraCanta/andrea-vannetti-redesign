import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import styles from "./HomeChapters.module.css";

const articles = [
  {
    id: "article-01",
    category: "article1.category",
    title: "article1.title",
    excerpt: "article1.excerpt",
    image: "/images/blog/articolo1.webp",
    imageAlt: "article1.imageAlt",
    slug: null,
    published: false,
  },
  {
    id: "article-02",
    category: "article2.category",
    title: "article2.title",
    excerpt: "article2.excerpt",
    image: "/images/blog/articolo2.webp",
    imageAlt: "article2.imageAlt",
    slug: null,
    published: false,
  },
  {
    id: "article-03",
    category: "article3.category",
    title: "article3.title",
    excerpt: "article3.excerpt",
    image: "/images/blog/articolo3.webp",
    imageAlt: "article3.imageAlt",
    slug: null,
    published: false,
  },
  {
    id: "article-04",
    category: "article4.category",
    title: "article4.title",
    excerpt: "article4.excerpt",
    image: "/images/blog/articolo4.webp",
    imageAlt: "article4.imageAlt",
    slug: null,
    published: false,
  },
] as const;

export async function HomeBlog() {
  const t = await getTranslations("HomeRedesign.blog");
  const locale = await getLocale();

  return (
    <section
      className={`${styles.chapter} ${styles.blog}`}
      aria-labelledby="home-blog-title"
    >
      <p className={styles.eyebrow}>04 / {t("eyebrow")}</p>
      <span className={styles.blogRule} aria-hidden="true" />
      <div className={styles.blogIntro}>
        <h2 className={styles.aboutStatement} id="home-blog-title">
          {t("title")}
        </h2>
        <div className={styles.aboutText}>
          <p>{t("intro")}</p>
          <p className={styles.blogStatus}>{t("status")}</p>
        </div>
      </div>
      <div className={styles.blogGrid}>
        {articles.map((article) => {
          const content = (
            <>
              <Image
                className={styles.blogImage}
                src={article.image}
                alt={t(article.imageAlt)}
                width={1448}
                height={1086}
                sizes="(min-width: 1280px) 22vw, (min-width: 761px) 43vw, calc(100vw - 2.5rem)"
                loading="lazy"
              />
              <div className={styles.blogArticleBody}>
                <p className={styles.blogCategory}>{t(article.category)}</p>
                <h3>{t(article.title)}</h3>
                <p className={styles.blogExcerpt}>{t(article.excerpt)}</p>
                <p className={styles.blogArticleStatus}>
                  <span aria-hidden="true" />
                  {article.published ? t("published") : t("status")}
                </p>
              </div>
            </>
          );
          const href =
            article.published && article.slug
              ? `${locale === "it" ? "" : `/${locale}`}/blog/${article.slug}`
              : null;

          return (
            <article className={styles.blogArticle} key={article.id}>
              {href ? (
                <a className={styles.blogArticleLink} href={href}>
                  {content}
                </a>
              ) : (
                content
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
