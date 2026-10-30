"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

const switchLabel: Record<Locale, string> = {
  it: "Passa all'italiano",
  en: "Switch to English",
};

export function LanguageSwitcher({ size = "md" }: { size?: "md" | "lg" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === "it" ? "en" : "it";
  const sizeClass = size === "lg" ? "w-12 h-12 text-sm" : "w-10 h-10 text-xs";

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(() => router.replace(pathname, { locale: nextLocale }))
      }
      disabled={isPending}
      lang={nextLocale}
      aria-label={switchLabel[nextLocale]}
      title={switchLabel[nextLocale]}
      className={`${sizeClass} shrink-0 rounded-full border border-border flex items-center justify-center font-mono uppercase tracking-wider text-typography-muted hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-50`}
    >
      {nextLocale}
    </button>
  );
}
