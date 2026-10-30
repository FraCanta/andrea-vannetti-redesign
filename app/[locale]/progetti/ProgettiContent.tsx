"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, ExternalLink, Clock } from "lucide-react";
import {
  SiReact,
  SiWordpress,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiMui,
} from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { SectionReveal } from "@/components/SectionReveal";
import { highlight } from "@/components/highlight";
import { useTranslations } from "next-intl";

/* ───────────────────── DATA ───────────────────── */

const featuredProject = {
  key: "radici",
  title: "Radici in Chianti",
  status: "live" as const,
  tech: [
    { icon: SiReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiWordpress, name: "WordPress Headless" },
    { icon: SiMui, name: "Material UI" },
    { icon: SiVite, name: "Vite" },
  ],
  github: null,
  url: "https://www.radicinchianti.org",
  image: "/images/radici.webp",
};

const projects = [
  {
    key: "succulentarte",
    title: "Succulentarte",
    status: "live" as const,
    tech: [
      { icon: SiReact, name: "React" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiVite, name: "Vite" },
      { icon: SiMui, name: "Material UI" },
    ],
    url: "https://www.succulentarte.com",
    github: null,
    image: "/images/succulentarte.webp",
  },
  {
    key: "casanova",
    title: "Casanova di Bricciano",
    status: "live" as const,
    tech: [{ icon: SiWordpress, name: "WordPress" }],
    url: "https://www.casanovadibricciano.it",
    image: "/images/casanova-bricciano.webp",
  },
  {
    key: "cresta",
    title: "Cresta dell'Angiolo",
    status: "in-sviluppo" as const,
    tech: [
      { icon: SiReact, name: "React" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiWordpress, name: "WordPress Headless" },
      { icon: SiVite, name: "Vite" },
    ],
    github: null,
    image: null,
  },
  {
    key: "cantinetta",
    title: "La Cantinetta del Chianti",
    status: "live" as const,
    tech: [
      { icon: RiNextjsLine, name: "Next.js" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiWordpress, name: "WordPress Headless" },
      { icon: SiMui, name: "Material UI" },
    ],
    url: "https://www.lacantinettadelchianti.it/it",
    github: "https://github.com/AndreaV89/cantinetta-del-chianti",
    image: "/images/cantinetta.webp",
  },
  {
    key: "glam",
    title: "Glam Events in Tuscany",
    status: "live" as const,
    tech: [],
    url: "https://www.glameventsintuscany.com",
    github: undefined,
    image: "/images/glamevents.webp",
    hasLabel: true,
  },
  {
    key: "tecnochianti",
    title: "TecnoChianti",
    status: "in-sviluppo" as const,
    tech: [
      { icon: RiNextjsLine, name: "Next.js" },
      { icon: SiTypescript, name: "TypeScript" },
    ],
    github: null,
    image: null,
  },
];

/* ───────────────────── COMPONENT ───────────────────── */

function StatusBadge({ status }: { status: "live" | "in-sviluppo" }) {
  const t = useTranslations("Projects.status");

  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {t("live")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider bg-background-elevated text-typography-muted rounded-full border border-border">
      <Clock size={10} />
      {t("inProgress")}
    </span>
  );
}

function ProjectImage({
  image,
  title,
  label,
}: {
  image: string | null;
  title: string;
  label?: string;
}) {
  const t = useTranslations("Projects");

  if (image) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
        <Image
          src={image}
          alt={t("screenshotAlt", { title })}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {label && (
          <span className="absolute bottom-2 left-2 px-2 py-1 text-xs bg-black/60 text-white rounded-md backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-2">
          <Clock size={24} className="text-typography-dim mx-auto" />
          <p className="text-sm text-typography-dim font-display">
            {t("comingSoon")}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProgettiContent() {
  const t = useTranslations("Projects");

  return (
    <>
      {/* Hero */}
      <section className="pt-44 md:pt-80 pb-section section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <SectionReveal>
            <h1 className="font-display font-bold text-display-xl mt-4">
              {t.rich("hero.title", { highlight })}
            </h1>
            <p className="mt-6 text-lg text-typography/80 leading-relaxed font-light max-w-xl mx-auto">
              {t("hero.text")}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Featured project — Radici in Chianti */}
      <section className="pb-section section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="p-8 md:p-12 bg-background-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left — Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <StatusBadge status={featuredProject.status} />
                    <span className="text-xs text-typography-dim uppercase tracking-wider">
                      {t("featuredLabel")}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-display-sm">
                    {featuredProject.title}
                  </h2>
                  <p className="text-primary text-sm uppercase tracking-widest font-semibold">
                    {t("items.radici.subtitle")}
                  </p>
                  <p className="text-typography/80 leading-relaxed text-lg">
                    {t("items.radici.description")}
                  </p>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {featuredProject.tech.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-typography-muted"
                      >
                        <tech.icon size={14} />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  {/* Links */}
                  {(featuredProject.url || featuredProject.github) && (
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                      {featuredProject.url && (
                        <a
                          href={featuredProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm text-typography-muted hover:text-primary transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>{t("visit")}</span>
                        </a>
                      )}
                      {featuredProject.github && (
                        <a
                          href={featuredProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm text-typography-muted hover:text-primary transition-colors"
                        >
                          <SiGithub size={24} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Right — Features */}
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-widest text-typography-muted">
                    {t("keyFeatures")}
                  </p>
                  <ul className="space-y-4">
                    {(t.raw("items.radici.features") as string[]).map(
                      (feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span className="text-typography leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>

                  {/* Image */}
                  <ProjectImage
                    image={featuredProject.image}
                    title={featuredProject.title}
                  />
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Other projects */}
      <section className="py-section section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2 className="font-display font-bold text-display-md text-center mb-16">
              {t.rich("othersTitle", { highlight })}
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <SectionReveal key={project.title} delay={i * 0.1}>
                <div className="h-full flex flex-col p-8 bg-background-card border border-border rounded-2xl group hover:border-primary/30 transition-all duration-500">
                  {/* Status + Image placeholder */}
                  <div className="mb-6">
                    <StatusBadge status={project.status} />

                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background mt-4">
                      <ProjectImage
                        image={project.image}
                        title={project.title}
                        label={
                          project.hasLabel
                            ? t(`items.${project.key}.label`)
                            : undefined
                        }
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-display font-bold text-xl text-typography group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-primary text-xs uppercase tracking-widest font-semibold mt-1">
                    {t(`items.${project.key}.subtitle`)}
                  </p>
                  <p className="text-typography-muted text-sm leading-relaxed mt-3">
                    {t(`items.${project.key}.description`)}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background border border-border rounded-md text-xs text-typography-dim"
                      >
                        <tech.icon size={12} />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex-1" />

                  {/* Links */}
                  {(project.url || project.github) && (
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm text-typography-muted hover:text-primary transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>{t("visit")}</span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm text-typography-muted hover:text-primary transition-colors"
                        >
                          <SiGithub size={24} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* CTA */}
      <section className="py-section section-padding">
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span className="font-display font-black text-[clamp(5rem,20vw,18rem)] uppercase text-typography/[0.03] whitespace-nowrap">
              Next?
            </span>
          </div>

          <SectionReveal>
            <div className="relative z-10">
              <h2 className="font-display font-bold text-display-md">
                {t("cta.titleLine1")}
                <br />
                {t.rich("cta.titleLine2", { highlight })}
              </h2>
              <p className="mt-4 text-typography-muted text-lg">
                {t("cta.text")}
              </p>
              <Link
                href="/contatti"
                className="group inline-flex items-center gap-3 mt-8 px-10 py-5 bg-primary text-background font-display font-bold uppercase tracking-wider text-sm rounded-full hover:gap-5 transition-all duration-300"
              >
                {t("cta.button")}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
      {/* Divider */}
      <div className="section-divider" />
    </>
  );
}
