import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChiSonoContent } from "./ChiSonoContent";
import { getAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/chi-sono", locale),
  };
}

export default async function ChiSonoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ChiSonoContent />;
}
