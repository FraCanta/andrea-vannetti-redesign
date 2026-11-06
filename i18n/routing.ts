import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "as-needed",
  // No automatic redirect based on browser language or cookie: each URL always serves its own locale (Google-friendly)
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/progetti": { it: "/progetti", en: "/projects" },
    "/progetti/[slug]": { it: "/progetti/[slug]", en: "/projects/[slug]" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/servizi": { it: "/servizi", en: "/services" },
    "/chi-sono": { it: "/chi-sono", en: "/about" },
    "/collaboriamo": { it: "/collaboriamo", en: "/collaborate" },
    "/contatti": { it: "/contatti", en: "/contact" },
    "/privacy-policy": "/privacy-policy",
  },
});
