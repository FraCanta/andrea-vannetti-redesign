import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HomeReveal } from "@/components/redesign/HomeReveal";
import { blogPosts, getBlogReadingMinutes, type BlogBlock, type BlogInline, type BlogLocale, type BlogPost } from "@/lib/blog";
import styles from "./BlogEditorial.module.css";

function InlineContent({ segments }: { segments: BlogInline[] }) {
  return segments.map((segment, index) => {
    if (segment.type === "strong") return <strong key={index}>{segment.value}</strong>;
    if (segment.type === "emphasis") return <em key={index}>{segment.value}</em>;
    if (segment.type === "link") return <a key={index} href={segment.href}>{segment.value}</a>;
    return <span key={index}>{segment.value}</span>;
  });
}

function ArticleBlock({ block }: { block: BlogBlock }) {
  if (block.type === "heading") {
    const Tag = `h${block.level}` as "h2" | "h3" | "h4";
    return <Tag id={block.id}>{block.text}</Tag>;
  }
  if (block.type === "paragraph") return <p><InlineContent segments={block.content} /></p>;
  if (block.type === "quote") return <blockquote><InlineContent segments={block.content} /></blockquote>;
  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul";
    return <List>{block.items.map((item, index) => <li key={index}><InlineContent segments={item} /></li>)}</List>;
  }
  if (block.type === "image") {
    return <figure className={styles.articleFigure}>
      <Image src={block.src} alt={block.alt} width={1448} height={1086} sizes="(max-width: 760px) calc(100vw - 2.5rem), 50rem" />
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>;
  }
  if (block.type === "code") return <pre className={styles.codeBlock}><code data-language={block.language}>{block.code}</code></pre>;
  if (block.type === "table") return <div className={styles.tableWrap} role="region" aria-label="Tabella editoriale" tabIndex={0}><table>
    <thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
    <tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
  return <hr className={styles.separator} />;
}

function readTimeLabel(minutes: number, locale: BlogLocale, labels: { minute: string; minutes: string }) {
  if (locale === "en") return `${minutes} ${minutes === 1 ? labels.minute : labels.minutes}`;
  return `${minutes} ${minutes === 1 ? labels.minute : labels.minutes}`;
}

export async function BlogArchive() {
  const t = await getTranslations("HomeRedesign.blog");
  const labels = await getTranslations("Blog");
  const [featured, ...others] = blogPosts;

  return <main className={styles.page}>
    <header className={`${styles.archiveHero} ${styles.shell}`}>
      <HomeReveal as="p" className={styles.eyebrow}><span className={styles.number}>06</span><span>{t("eyebrow")}</span></HomeReveal>
      <div className={styles.archiveHeading}>
        <HomeReveal className={styles.archiveTitle}><h1>{labels("archive.title")}</h1></HomeReveal>
        <HomeReveal className={styles.archiveIntro} delay={0.1}><p>{t("intro")}</p></HomeReveal>
      </div>
      <div className={styles.rule} aria-hidden="true" />
    </header>

    <section className={`${styles.featured} ${styles.shell}`} aria-label={labels("archive.featured")}>
      <HomeReveal className={styles.featuredImage}>
        <Link href={{ pathname: "/blog/[slug]", params: { slug: featured.slug } }} aria-label={`${t(`${featured.translationKey}.title`)} — ${labels("article.read")}`}>
          <Image src={featured.image} alt={t(`${featured.translationKey}.imageAlt`)} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
        </Link>
      </HomeReveal>
      <HomeReveal className={styles.featuredCopy} delay={0.08}>
        <p className={styles.category}>{t(`${featured.translationKey}.category`)}</p>
        <h2><Link href={{ pathname: "/blog/[slug]", params: { slug: featured.slug } }}>{t(`${featured.translationKey}.title`)}</Link></h2>
        <p className={styles.excerpt}>{t(`${featured.translationKey}.excerpt`)}</p>
        <p className={styles.draftStatus}><span aria-hidden="true" />{t("status")}</p>
        <Link className={styles.textLink} href={{ pathname: "/blog/[slug]", params: { slug: featured.slug } }}>{labels("article.read")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </HomeReveal>
    </section>

    <section className={`${styles.articleArchive} ${styles.shell}`} aria-label={labels("archive.allArticles")}>
      <div className={styles.archiveSectionHeading}><p className={styles.eyebrow}>{labels("archive.allArticles")}</p><span>{String(blogPosts.length).padStart(2, "0")}</span></div>
      <div className={styles.articleGrid}>
        {others.map((post, index) => <HomeReveal as="article" className={styles.articleTile} key={post.id} delay={index * 0.07} y={18}>
          <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }} className={styles.articleTileLink}>
            <div className={styles.tileImage}><Image src={post.image} alt={t(`${post.translationKey}.imageAlt`)} fill sizes="(max-width: 640px) 100vw, (max-width: 1050px) 44vw, 30vw" /></div>
            <div className={styles.tileMeta}><span>{String(index + 2).padStart(2, "0")}</span><span>{t(`${post.translationKey}.category`)}</span></div>
            <h2>{t(`${post.translationKey}.title`)}</h2>
            <p>{t(`${post.translationKey}.excerpt`)}</p>
            <span className={styles.draftStatus}><span aria-hidden="true" />{t("status")}</span>
          </Link>
        </HomeReveal>)}
      </div>
    </section>
  </main>;
}

export async function BlogPostContent({ post, locale }: { post: BlogPost; locale: BlogLocale }) {
  const t = await getTranslations("HomeRedesign.blog");
  const labels = await getTranslations("Blog");
  const readingMinutes = getBlogReadingMinutes(post, locale);
  const related = post.relatedIds.map((id) => blogPosts.find((candidate) => candidate.id === id)).filter((item): item is BlogPost => Boolean(item)).slice(0, 2);
  const headings = post.content[locale].filter((block) => block.type === "heading");

  return <main className={styles.page}>
    <article>
      <header className={`${styles.postHero} ${styles.shell}`}>
        <HomeReveal as="nav" className={styles.breadcrumb} aria-label={labels("article.breadcrumbLabel")}>
          <Link href="/blog"><ArrowLeft size={15} aria-hidden="true" />{labels("article.backToBlog")}</Link>
          <span aria-hidden="true">/</span><span>{t(`${post.translationKey}.category`)}</span>
        </HomeReveal>
        <HomeReveal as="p" className={styles.eyebrow}><span className={styles.number}>{String(blogPosts.findIndex(({ id }) => id === post.id) + 1).padStart(2, "0")}</span><span>{t(`${post.translationKey}.category`)}</span></HomeReveal>
        <HomeReveal className={styles.postTitle} delay={0.06}><h1>{t(`${post.translationKey}.title`)}</h1></HomeReveal>
        <HomeReveal className={styles.postSummary} delay={0.12}>
          <p>{t(`${post.translationKey}.excerpt`)}</p>
          <div className={styles.postByline}>
            <span>{labels("article.by", { author: post.author })}</span>
            {post.publishedAt && <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(post.publishedAt))}</time>}
            <span><Clock3 size={14} aria-hidden="true" />{labels("article.readTime", { time: readTimeLabel(readingMinutes, locale, { minute: labels("minute"), minutes: labels("minutes") }) })}</span>
          </div>
          {post.status === "draft" && <p className={styles.draftNotice}>{labels("article.draftNotice")}</p>}
        </HomeReveal>
      </header>

      <HomeReveal className={`${styles.postCover} ${styles.shell}`}>
        <Image src={post.image} alt={t(`${post.translationKey}.imageAlt`)} fill priority sizes="(max-width: 760px) 100vw, 92vw" />
      </HomeReveal>

      {headings.length >= 4 && <nav className={`${styles.toc} ${styles.shell}`} aria-label={labels("article.contents")}>
        <p>{labels("article.contents")}</p>
        <ol>{headings.map((block) => block.type === "heading" && <li key={block.id}><a href={`#${block.id}`}>{block.text}</a></li>)}</ol>
      </nav>}

      <div className={styles.articleLayout}>
        <aside className={styles.articleMargin} aria-hidden="true"><span>{String(blogPosts.findIndex(({ id }) => id === post.id) + 1).padStart(2, "0")}</span><span> / </span><span>{t(`${post.translationKey}.category`)}</span></aside>
        <div className={styles.articleBody}>
          {post.content[locale].map((block, index) => <ArticleBlock block={block} key={`${block.type}-${"id" in block ? block.id : index}`} />)}
        </div>
      </div>

      <footer className={`${styles.postEnd} ${styles.shell}`}>
        <Link href="/blog" className={styles.textLink}><ArrowLeft size={16} aria-hidden="true" />{labels("article.backToBlog")}</Link>
        {related.length > 0 && <section className={styles.related} aria-labelledby="related-title">
          <div className={styles.archiveSectionHeading}><h2 id="related-title">{labels("article.related")}</h2><span>↘</span></div>
          <div className={styles.relatedGrid}>{related.map((item) => <Link href={{ pathname: "/blog/[slug]", params: { slug: item.slug } }} key={item.id}>
            <span className={styles.category}>{t(`${item.translationKey}.category`)}</span><strong>{t(`${item.translationKey}.title`)}</strong><ArrowRight size={18} aria-hidden="true" />
          </Link>)}</div>
        </section>}
        <div className={styles.postCta}><p className={styles.eyebrow}>{labels("article.ctaEyebrow")}</p><p>{labels("article.ctaText")}</p><Link className={styles.textLink} href="/contatti">{labels("article.ctaLink")}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </footer>
    </article>
  </main>;
}

