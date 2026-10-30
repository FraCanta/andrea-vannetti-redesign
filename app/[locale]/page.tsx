import { EditorialHome } from "@/components/redesign/EditorialHome";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: getAlternates("/", locale) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <EditorialHome />
  );
}
