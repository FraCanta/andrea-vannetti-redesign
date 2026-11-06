import type { MetadataRoute } from "next";
import { getUrl } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";
import { getPathname } from "@/i18n/navigation";

const pages = [
  { href: "/", priority: 1 },
  { href: "/servizi", priority: 0.9 },
  { href: "/progetti", priority: 0.8 },
  { href: "/blog", priority: 0.7 },
  { href: "/contatti", priority: 0.8 },
  { href: "/chi-sono", priority: 0.7 },
  { href: "/collaboriamo", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = pages.flatMap(({ href, priority }) =>
    (["it", "en"] as const).map((locale) => ({
      url: getUrl(href, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          it: getUrl(href, "it"),
          en: getUrl(href, "en"),
        },
      },
    })),
  );
  const publishedPosts = blogPosts.filter((post) => post.status === "published");
  const blogPostUrls = publishedPosts.flatMap((post) =>
    (["it", "en"] as const).map((locale) => {
      const path = { pathname: "/blog/[slug]" as const, params: { slug: post.slug } };
      const url = `https://www.andreavannetti.dev${getPathname({ href: path, locale })}`;
      const localized = (targetLocale: "it" | "en") => `https://www.andreavannetti.dev${getPathname({ href: path, locale: targetLocale })}`;
      return {
        url,
        ...(post.updatedAt || post.publishedAt ? { lastModified: new Date(post.updatedAt ?? post.publishedAt!) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: { it: localized("it"), en: localized("en") } },
      };
    }),
  );
  return [...staticPages, ...blogPostUrls];
}
