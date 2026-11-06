import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContattiContent } from "./ContattiContent";
import { getAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ subject?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/contatti", locale),
  };
}

export default async function ContattiPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { subject } = await searchParams;
  setRequestLocale(locale);

  return <ContattiContent requestSubject={subject === "collaboration" ? "collaboration" : null} />;
}
