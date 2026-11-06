import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import { CollaboriamoContent } from "./CollaboriamoContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Collaborate.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/collaboriamo", locale),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: getAlternates("/collaboriamo", locale).canonical,
    },
  };
}

export default async function CollaboriamoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CollaboriamoContent />;
}
