import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { blogPosts, getBlogPost, type BlogLocale } from "@/lib/blog";
import { BlogPostContent } from "../BlogEditorial";

const baseUrl = "https://www.andreavannetti.dev";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

function localizedUrl(slug: string, locale: BlogLocale) {
  return `${baseUrl}${getPathname({ href: { pathname: "/blog/[slug]", params: { slug } }, locale })}`;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post || (locale !== "it" && locale !== "en")) notFound();
  const postLocale = locale as BlogLocale;
  const canonical = localizedUrl(slug, postLocale);
  return {
    title: post.seoTitle[postLocale],
    description: post.seoDescription[postLocale],
    authors: [{ name: post.author }],
    alternates: {
      canonical,
      languages: { it: localizedUrl(slug, "it"), en: localizedUrl(slug, "en"), "x-default": localizedUrl(slug, "it") },
    },
    openGraph: {
      type: "article",
      title: post.seoTitle[postLocale],
      description: post.seoDescription[postLocale],
      images: [{ url: post.image, alt: post.seoTitle[postLocale] }],
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
    },
    robots: { index: post.status === "published", follow: true, googleBot: { index: post.status === "published", follow: true } },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (locale !== "it" && locale !== "en") notFound();
  setRequestLocale(locale);
  const post = getBlogPost(slug);
  if (!post) notFound();
  const structuredData = post.status === "published" && post.publishedAt
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.seoTitle[locale],
        description: post.seoDescription[locale],
        image: `${baseUrl}${post.image}`,
        datePublished: post.publishedAt,
        ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
        author: { "@type": "Person", name: post.author, url: baseUrl },
        mainEntityOfPage: localizedUrl(slug, locale),
      }
    : null;
  return <>
    {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />}
    <BlogPostContent post={post} locale={locale} />
  </>;
}
