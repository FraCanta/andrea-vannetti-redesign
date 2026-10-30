"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieBanner() {
  const t = useTranslations("Cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookie_consent");
      if (stored !== "accepted" && stored !== "rejected") {
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-background-card border border-border rounded-2xl p-6 shadow-2xl shadow-black/50">
        <p className="text-sm text-typography/80 leading-relaxed mb-1">
          <span className="font-display font-semibold text-typography">
            {t("title")}
          </span>
        </p>
        <p className="text-sm text-typography-muted leading-relaxed mb-5">
          {t.rich("text", {
            link: (chunks) => (
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 bg-primary text-background text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-primary-dark transition-colors duration-300"
          >
            {t("accept")}
          </button>
          <button
            onClick={handleReject}
            className="px-6 py-2.5 border border-border text-typography-muted text-sm font-semibold uppercase tracking-wider rounded-full hover:border-typography-dim hover:text-typography transition-all duration-300"
          >
            {t("reject")}
          </button>
        </div>
      </div>
    </div>
  );
}
