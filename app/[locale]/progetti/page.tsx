import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProgettiContent } from "./ProgettiContent";
import { getAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/progetti", locale),
  };
}

export default async function ProgettiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProgettiContent />;
}
