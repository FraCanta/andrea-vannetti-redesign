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
    "/servizi": { it: "/servizi", en: "/services" },
    "/chi-sono": { it: "/chi-sono", en: "/about" },
    "/contatti": { it: "/contatti", en: "/contact" },
    "/privacy-policy": "/privacy-policy",
  },
});
