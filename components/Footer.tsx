"use client";

import { Link } from "@/i18n/navigation";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { SocialIcons } from "@/components/SocialIcons";
import { useTranslations } from "next-intl";

const quickLinks = [
  { href: "/progetti", key: "projects" },
  { href: "/servizi", key: "services" },
  { href: "/chi-sono", key: "about" },
  { href: "/contatti", key: "contact" },
  { href: "/privacy-policy", key: "privacy" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-border bg-background">
      <div className="section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          {/* Col 1-2: Brand block */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <img
                src="/Logo.svg"
                alt="Andrea Vannetti"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-typography-muted text-lg max-w-md leading-relaxed">
              {t("taglineLine1")}
              <br />
              {t("taglineLine2")}
            </p>
            <SocialIcons className="pt-2" />
          </div>

          {/* Col 3: Quick links */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-typography-muted">
              {t("navTitle")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-typography hover:text-primary transition-colors duration-300"
                  >
                    <span>{t(`links.${link.key}`)}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    window.dispatchEvent(new Event("open-cookie-settings"))
                  }
                  className="group flex items-center gap-2 text-typography hover:text-primary transition-colors duration-300"
                >
                  <span>{t("cookies")}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-typography-muted">
              {t("contactTitle")}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@andreavannetti.dev"
                  className="flex items-center gap-3 text-typography hover:text-primary transition-colors duration-300"
                >
                  <Mail size={16} className="text-primary shrink-0" />
                  <span className="text-sm">info@andreavannetti.dev</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+393470587552"
                  className="flex items-center gap-3 text-typography hover:text-primary transition-colors duration-300"
                >
                  <Phone size={16} className="text-primary shrink-0" />
                  <span className="text-sm">+39 347 0587552</span>
                </a>
              </li>
            </ul>
            <p className="text-xs text-typography-dim pt-4 leading-relaxed">
              {t("vat")}
              <br />
              {t("address")}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-typography-dim">
            {t("rights", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-typography-dim">
            {t("builtWith")} <span className="text-primary">Next.js</span> &{" "}
            <span className="text-primary">&hearts;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
