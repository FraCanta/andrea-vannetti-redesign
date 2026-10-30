"use client";

import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Home.hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orb (decorative) */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #95e600 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 section-padding w-full max-w-7xl mx-auto text-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-sm uppercase tracking-[0.2em] text-typography-muted font-body">
            {t("badge")}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-5xl md:text-8xl lg:text-[160px] uppercase leading-[0.9] tracking-tight"
        >
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 text-lg md:text-xl text-typography/80 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/progetti"
            className="group relative overflow-hidden px-8 py-4 bg-primary text-background font-display font-semibold uppercase tracking-wider text-sm rounded-full"
          >
            <span className="relative z-10 group-hover:text-background transition-colors">
              {t("ctaProjects")}
            </span>
            <span className="absolute inset-0 bg-typography scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-background font-display font-semibold uppercase tracking-wider text-sm">
              {t("ctaProjects")}
            </span>
          </Link>
          <Link
            href="/contatti"
            className="group px-8 py-4 border border-border text-typography font-display font-semibold uppercase tracking-wider text-sm rounded-full hover:border-primary hover:text-primary transition-all duration-300"
          >
            {t("ctaContact")}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-typography-dim">
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-typography-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}
