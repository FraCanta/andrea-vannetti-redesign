import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.andreavannetti.dev";

type Href = keyof typeof routing.pathnames;
type Locale = (typeof routing.locales)[number];

export function getUrl(href: Href, locale: string) {
  const pathname = getPathname({ href, locale: locale as Locale });
  return pathname === "/" ? BASE_URL : `${BASE_URL}${pathname}`;
}

export function getAlternates(href: Href, locale: string) {
  return {
    canonical: getUrl(href, locale),
    languages: {
      it: getUrl(href, "it"),
      en: getUrl(href, "en"),
      "x-default": getUrl(href, "it"),
    },
  };
}
