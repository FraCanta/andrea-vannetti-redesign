import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, getProjectPath, projects, type ProjectLocale } from "@/lib/projects";
import { ProjectDetailContent } from "./ProjectDetailContent";

type Props = { params: Promise<{ locale: string; slug: string }> };
const baseUrl = "https://www.andreavannetti.dev";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

function getLocalizedProjectUrl(slug: string, locale: ProjectLocale) {
  const pathname = getPathname({
    href: getProjectPath(slug),
    locale,
  });
  return `${baseUrl}${pathname}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !routing.locales.includes(locale as ProjectLocale)) notFound();

  const projectLocale = locale as ProjectLocale;
  return {
    title: project.draft[projectLocale].seoTitle,
    description: project.draft[projectLocale].seoDescription,
    alternates: {
      canonical: getLocalizedProjectUrl(slug, projectLocale),
      languages: {
        it: getLocalizedProjectUrl(slug, "it"),
        en: getLocalizedProjectUrl(slug, "en"),
        "x-default": getLocalizedProjectUrl(slug, "it"),
      },
    },
    robots: { index: Boolean(project.caseStudy), follow: true },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project || !routing.locales.includes(locale as ProjectLocale)) notFound();

  return (
    <ProjectDetailContent
      project={project}
      locale={locale as ProjectLocale}
    />
  );
}
