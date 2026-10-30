import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { createTranslator } from "next-intl";
import it from "../messages/it.json";
import en from "../messages/en.json";

const BASE_URL = "https://www.andreavannetti.dev";
const messages = { it, en };

type Locale = "it" | "en";

export type ConfirmationEmailProps = {
  locale: Locale;
  name: string;
  channel: string;
  contact: string;
  site?: string;
  siteUrl?: string;
  hasBudget?: string;
  budget?: string;
  message: string;
};

const channelKey: Record<string, "email" | "phone" | "whatsapp"> = {
  Email: "email",
  Telefono: "phone",
  WhatsApp: "whatsapp",
};
const siteKey: Record<string, "no" | "yes" | "redo"> = {
  No: "no",
  Sì: "yes",
  "Sì, ma va rifatto": "redo",
};
const budgetKey: Record<string, "budgetLow" | "budgetMid" | "budgetHigh"> = {
  "< 2.000€": "budgetLow",
  "2.000€ - 5.000€": "budgetMid",
  "> 5.000€": "budgetHigh",
};

const getT = (locale: Locale) =>
  createTranslator({ locale, messages: messages[locale], namespace: "Email" });

export const getConfirmationSubject = (locale: Locale) =>
  getT(locale)("subject");

const colors = {
  page: "#f4f4f5",
  card: "#ffffff",
  dark: "#0b0b0b",
  green: "#95e600",
  text: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  recap: "#fafafa",
};

const font =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export default function ConfirmationEmail({
  locale,
  name,
  channel,
  contact,
  site,
  siteUrl,
  hasBudget,
  budget,
  message,
}: ConfirmationEmailProps) {
  const t = getT(locale);
  const tOpt = createTranslator({
    locale,
    messages: messages[locale],
    namespace: "ContactForm.options",
  });

  const home = locale === "en" ? `${BASE_URL}/en` : BASE_URL;
  const projects =
    locale === "en" ? `${BASE_URL}/en/projects` : `${BASE_URL}/progetti`;

  const channelText = channelKey[channel]
    ? t(`channel.${channelKey[channel]}`)
    : "";
  const siteText = site && siteKey[site] ? tOpt(siteKey[site]) : null;
  const budgetText =
    hasBudget === "Sì" && budget && budgetKey[budget]
      ? tOpt(budgetKey[budget])
      : hasBudget === "No"
        ? t("budgetNotSet")
        : null;

  const label = {
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: colors.muted,
    margin: "0 0 4px",
  };
  const value = {
    fontSize: "15px",
    color: colors.text,
    margin: "0 0 16px",
    lineHeight: "1.5",
  };

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t("preview")}</Preview>
      <Body
        style={{
          backgroundColor: colors.page,
          fontFamily: font,
          margin: 0,
          padding: "32px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: colors.card,
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: colors.dark,
              padding: "8px 32px",
              textAlign: "center",
            }}
          >
            <Link href={home} style={{ display: "inline-block" }}>
              <Img
                src={`${BASE_URL}/email-logo.png`}
                alt="Andrea Vannetti"
                width="240"
                style={{
                  display: "block",
                  margin: "0 auto",
                  height: "auto",
                  border: 0,
                }}
              />
            </Link>
          </Section>

          {/* Content */}
          <Section style={{ padding: "32px" }}>
            <Heading
              as="h1"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: colors.text,
                margin: "0 0 12px",
              }}
            >
              {t("greeting", { name })}
            </Heading>
            <Text
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                color: colors.text,
                margin: "0 0 24px",
              }}
            >
              {t("intro", { channel: channelText })}
            </Text>

            {/* Recap */}
            <Section
              style={{
                backgroundColor: colors.recap,
                border: `1px solid ${colors.border}`,
                borderLeft: `3px solid ${colors.green}`,
                borderRadius: "8px",
                padding: "20px 20px 4px",
              }}
            >
              <Text
                style={{
                  ...label,
                  color: colors.text,
                  fontWeight: 700,
                  margin: "0 0 16px",
                }}
              >
                {t("recapTitle")}
              </Text>

              <Text style={label}>{t("labels.contact")}</Text>
              <Text style={value}>{contact}</Text>

              {siteText && (
                <>
                  <Text style={label}>{t("labels.site")}</Text>
                  <Text style={value}>
                    {siteText}
                    {siteUrl && (
                      <>
                        {" — "}
                        <Link
                          href={siteUrl}
                          style={{
                            color: colors.text,
                            textDecoration: "underline",
                          }}
                        >
                          {siteUrl}
                        </Link>
                      </>
                    )}
                  </Text>
                </>
              )}

              {budgetText && (
                <>
                  <Text style={label}>{t("labels.budget")}</Text>
                  <Text style={value}>{budgetText}</Text>
                </>
              )}

              <Text style={label}>{t("labels.message")}</Text>
              <Text style={{ ...value, whiteSpace: "pre-wrap" }}>
                {message}
              </Text>
            </Section>

            <Text
              style={{
                fontSize: "14px",
                color: colors.muted,
                margin: "16px 0 28px",
              }}
            >
              {t("replyHint")}
            </Text>

            <Button
              href={projects}
              style={{
                backgroundColor: colors.green,
                color: colors.dark,
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "14px 28px",
                borderRadius: "999px",
              }}
            >
              {t("cta")}
            </Button>

            <Hr style={{ borderColor: colors.border, margin: "32px 0 20px" }} />

            {/* Signature */}
            <Text
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: colors.text,
                margin: "0",
              }}
            >
              Andrea Vannetti
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: colors.muted,
                margin: "2px 0 8px",
              }}
            >
              {t("role")}
            </Text>
            <Text style={{ fontSize: "14px", margin: 0 }}>
              <Link href={home} style={{ color: colors.text }}>
                andreavannetti.dev
              </Link>
              {"  ·  "}
              <Link
                href="https://wa.me/393470587552"
                style={{ color: colors.text }}
              >
                WhatsApp
              </Link>
              {"  ·  "}
              <Link
                href="https://www.linkedin.com/in/andrea-vannetti"
                style={{ color: colors.text }}
              >
                LinkedIn
              </Link>
            </Text>
          </Section>
        </Container>

        <Text
          style={{
            maxWidth: "560px",
            margin: "16px auto 0",
            padding: "0 32px",
            fontSize: "12px",
            color: colors.muted,
            textAlign: "center",
          }}
        >
          {t("footer")}
        </Text>
      </Body>
    </Html>
  );
}

ConfirmationEmail.PreviewProps = {
  locale: "it",
  name: "Giulia",
  channel: "Email",
  contact: "giulia@esempio.it",
  site: "Sì, ma va rifatto",
  siteUrl: "https://www.esempio.it",
  hasBudget: "Sì",
  budget: "2.000€ - 5.000€",
  message:
    "Ciao Andrea,\nvorrei rifare il sito del mio agriturismo. È vecchio e non funziona bene da telefono.",
} satisfies ConfirmationEmailProps;
