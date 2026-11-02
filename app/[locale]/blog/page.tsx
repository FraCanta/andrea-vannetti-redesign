import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import { BlogArchive } from "./BlogEditorial";
import type { BlogLocale } from "@/lib/blog";

const metadataCopy: Record<BlogLocale, { title: string; description: string }> = {
  it: { title: "Blog — idee e approfondimenti sul web", description: "Approfondimenti su sviluppo web, architettura, UI/UX e performance." },
  en: { title: "Blog — ideas and notes on the web", description: "Articles on web development, architecture, UI/UX, and performance." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = metadataCopy[locale as BlogLocale] ?? metadataCopy.it;
  return {
    title: copy.title,
    description: copy.description,
    alternates: getAlternates("/blog", locale),
    openGraph: { type: "website", title: copy.title, description: copy.description, images: ["/images/blog/articolo1.webp"] },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogArchive />;
}
