import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PrivacyIt } from "./PrivacyIt";
import { PrivacyEn } from "./PrivacyEn";
import { getAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Privacy Policy",
    description:
      locale === "en"
        ? "Privacy and cookie policy for andreavannetti.dev"
        : "Informativa sulla privacy e cookie policy del sito andreavannetti.dev",
    robots: { index: false, follow: false },
    alternates: getAlternates("/privacy-policy", locale),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="pt-32 md:pt-44 pb-section section-padding">
        <div className="max-w-3xl mx-auto prose-invert">
          {locale === "en" ? <PrivacyEn /> : <PrivacyIt />}
        </div>
      </section>
      <div className="section-divider" />
    </>
  );
}
