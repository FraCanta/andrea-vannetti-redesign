import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { PageProgressBar } from "@/components/redesign/PageProgressBar";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleTag } from "@/components/GoogleTag";
import ContactConversionTracker from "@/components/ContactConversionTracker";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteProviders } from "@/components/SiteProviders";

// Display font — bold, sharp, modern
const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Body font — clean, techy readability
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL("https://www.andreavannetti.dev"),
    alternates: {
      canonical: locale === "it" ? "/" : "/en",
      languages: {
        it: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    title: {
      default: t("siteTitle"),
      template: "%s | Andrea Vannetti",
    },
    description: t("description"),
    authors: [{ name: "Andrea Vannetti" }],
    creator: "Andrea Vannetti",
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_US",
      title: t("siteTitle"),
      description: t("ogDescription"),
      siteName: "Andrea Vannetti",
      images: [
        {
          url: "https://www.andreavannetti.dev/social-preview.jpg",
          width: 1200,
          height: 630,
          alt: t("siteTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("ogDescription"),
      images: ["https://www.andreavannetti.dev/social-preview.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Meta");

  const BASE_URL = "https://www.andreavannetti.dev";
  const localeUrl = locale === "it" ? BASE_URL : `${BASE_URL}/en`;
  const themeBootstrap = `(() => {
    const root = document.documentElement;
    let theme = "system";
    try {
      const stored = localStorage.getItem("av-theme");
      if (stored === "light" || stored === "dark" || stored === "system") theme = stored;
    } catch {}
    const resolved = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
  })();`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Andrea Vannetti",
        jobTitle: t("jobTitle"),
        image: `${BASE_URL}/ritratto.png`,
        url: localeUrl,
        sameAs: [
          "https://www.instagram.com/vannetti.dev/",
          "https://github.com/AndreaV89",
          "https://www.linkedin.com/in/andrea-vannetti",
        ],
        knowsAbout: [
          "Web Development",
          "React",
          "Next.js",
          "WordPress",
          "SEO",
          "E-Commerce",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#business`,
        name: "Andrea Vannetti - Web Developer",
        description: t("description"),
        url: localeUrl,
        image: `${BASE_URL}/social-preview.jpg`,
        logo: `${BASE_URL}/apple-touch-icon.png`,
        hasMap: "https://share.google/yoKZsakb0zASvn5kO",
        sameAs: ["https://share.google/yoKZsakb0zASvn5kO"],
        founder: { "@id": `${BASE_URL}/#person` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gaiole in Chianti",
          postalCode: "53013",
          addressRegion: "Toscana",
          addressCountry: "IT",
        },
        areaServed: [
          { "@type": "City", name: "Siena" },
          { "@type": "AdministrativeArea", name: "Provincia di Siena" },
          { "@type": "City", name: "Firenze" },
          {
            "@type": "AdministrativeArea",
            name: "Città Metropolitana di Firenze",
          },
          { "@type": "AdministrativeArea", name: "Toscana" },
          { "@type": "Country", name: "Italia" },
        ],
        priceRange: "€€",
        email: "info@andreavannetti.dev",
        telephone: "+393470587552",
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Andrea Vannetti",
        inLanguage: locale,
        publisher: { "@id": `${BASE_URL}/#person` },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${clashDisplay.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative z-10 text-typography font-body">
        <NextIntlClientProvider>
          <SiteProviders>
            <Navbar />
            <PageProgressBar />
            {children}
            <EditorialFooter />
            <CookieBanner />
            <ContactConversionTracker />
            <GoogleTag />
          </SiteProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
