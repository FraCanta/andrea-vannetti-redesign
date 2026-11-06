"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useParams } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ThemeSelector } from "@/components/ThemeSelector";
import { usePageTransition } from "@/components/PageTransition";
import { useLenis } from "lenis/react";
import styles from "@/components/redesign/SiteNavigation.module.css";

const links = [
  { href: "/", key: "home" },
  { href: "/progetti", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/servizi", key: "services" },
  { href: "/chi-sono", key: "about" },
  { href: "/contatti", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("SiteNav");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const router = useRouter();
  const navigate = usePageTransition();
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  };

  const switchLocale = () => {
    const nextLocale = locale === "it" ? "en" : "it";
    setMenuOpen(false);
    navigate(() => startTransition(() => {
      if (pathname === "/progetti/[slug]" && typeof params.slug === "string") {
        router.replace(
          { pathname: "/progetti/[slug]", params: { slug: params.slug } },
          { locale: nextLocale },
        );
        return;
      }
      if (pathname === "/blog/[slug]" && typeof params.slug === "string") {
        router.replace(
          { pathname: "/blog/[slug]", params: { slug: params.slug } },
          { locale: nextLocale },
        );
        return;
      }

      router.replace(
        pathname as Exclude<typeof pathname, "/progetti/[slug]" | "/blog/[slug]">,
        { locale: nextLocale },
      );
    }));
  };

  useEffect(() => {
    if (!menuOpen) {
      lenis?.start();
      document.body.style.overflow = "";
      return;
    }

    lenis?.stop();
    document.body.style.overflow = "hidden";
    const items = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    ) ?? []);
    items()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = items();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label={t("homeLabel")}>
          <Image src="/Icona.svg" alt="Andrea Vannetti" width={42} height={42} priority />
        </Link>
        <div className={styles.controls}>
          <ThemeSelector />
          <button
            type="button"
            className={`${styles.localeButton} ${styles.desktopLocale}`}
            lang={locale === "it" ? "en" : "it"}
            aria-label={t("switchLanguage", { locale: locale === "it" ? "English" : "Italiano" })}
            onClick={switchLocale}
            disabled={isPending}
          >
            {locale === "it" ? "EN" : "IT"}
          </button>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="site-navigation-menu"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? t("closeMenu") : t("openMenu")}</span>
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="site-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("menuLabel")}
            className={styles.menu}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={styles.menuMasthead}>
              <Link href="/" className={styles.menuBrand} aria-label={t("homeLabel")} onClick={() => setMenuOpen(false)}>
                <Image src="/Icona.svg" alt="Andrea Vannetti" width={38} height={38} />
              </Link>
              <div className={styles.menuControls}>
                <ThemeSelector />
                <button
                  className={styles.localeButton}
                  type="button"
                  lang={locale === "it" ? "en" : "it"}
                  aria-label={t("switchLanguage", { locale: locale === "it" ? "English" : "Italiano" })}
                  onClick={switchLocale}
                  disabled={isPending}
                >
                  {locale === "it" ? "EN" : "IT"}
                </button>
                <button type="button" className={styles.closeButton} onClick={closeMenu} aria-label={t("closeMenu")}>
                  <span>{t("closeMenu")}</span><X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className={styles.menuBody}>
              <nav className={styles.menuLinks} aria-label={t("menuLabel")}>
                {links.map((link, index) => (
                  <motion.div
                    key={`${link.key}-${index}`}
                    className={styles.menuItem}
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.04 + index * 0.055, ease: "easeOut" }}
                  >
                    <Link href={link.href} onClick={() => setMenuOpen(false)}>
                      <span className={styles.menuIndex}>{String(index).padStart(2, "0")}</span>
                      <span className={styles.menuLinkLabel}>{t(`links.${link.key}`)}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.aside
                className={styles.menuConversion}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.32, delay: reducedMotion ? 0 : 0.32, ease: "easeOut" }}
                aria-label={t("conversionLabel")}
              >
                <Link className={styles.projectCta} href="/contatti" onClick={() => setMenuOpen(false)}>
                  <span>{t("projectCta")}</span><ArrowUpRight aria-hidden="true" />
                </Link>
                <section className={styles.collaborationBlock}>
                  <p className={styles.collaborationEyebrow}>{t("collaborationEyebrow")}</p>
                  <p className={styles.collaborationDescription}>{t("collaborationDescription")}</p>
                  <Link className={styles.collaborationCta} href="/collaboriamo" onClick={() => setMenuOpen(false)}>
                    <span>{t("collaborationCta")}</span><ArrowUpRight aria-hidden="true" />
                  </Link>
                </section>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
