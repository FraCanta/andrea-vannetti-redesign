import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className={styles.page}>
      <title>{`${t("title")} | Andrea Vannetti`}</title>

      <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className={`${styles.watermark} font-display font-black text-[clamp(8rem,35vw,32rem)] leading-none`}>
            404
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>404</span>
            <span>{t("eyebrow")}</span>
          </p>

          <h1 className="font-display font-bold text-display-lg mt-4">
            {t("title")}
          </h1>

          <p className={`${styles.copy} mt-6 text-lg font-light leading-relaxed`}>
            {t.rich("text", { br: () => <br /> })}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className={`${styles.primaryButton} group`}
            >
              {t("home")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/progetti"
              className={styles.secondaryButton}
            >
              {t("projects")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
