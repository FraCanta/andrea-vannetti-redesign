import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <>
      <title>{`${t("title")} | Andrea Vannetti`}</title>

      <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-display font-black text-[clamp(8rem,35vw,32rem)] leading-none text-typography/[0.03]">
            404
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em]">
            <span className="text-primary">&lt;</span>
            <span className="text-typography-muted">{t("eyebrow")}</span>
            <span className="text-primary"> /&gt;</span>
          </p>

          <h1 className="font-display font-bold text-display-lg mt-4">
            {t("title")}
          </h1>

          <p className="mt-6 text-lg text-typography/80 font-light leading-relaxed">
            {t("text")}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-display font-semibold uppercase tracking-wider text-sm rounded-full hover:gap-5 transition-all duration-300"
            >
              {t("home")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/progetti"
              className="px-8 py-4 border border-border text-typography font-display font-semibold uppercase tracking-wider text-sm rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            >
              {t("projects")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
