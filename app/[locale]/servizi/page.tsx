import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiziContent } from "./ServiziContent";
import { getAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/servizi", locale),
  };
}

export default async function ServiziPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServiziContent />;
}
