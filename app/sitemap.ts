import type { MetadataRoute } from "next";
import { getUrl } from "@/lib/seo";

const pages = [
  { href: "/", priority: 1 },
  { href: "/servizi", priority: 0.9 },
  { href: "/progetti", priority: 0.8 },
  { href: "/contatti", priority: 0.8 },
  { href: "/chi-sono", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ href, priority }) =>
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
}
