import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./HomeChapters.module.css";
import { CookieSettingsButton } from "./CookieSettingsButton";

const services = [
  "web-dev",
  "wordpress",
  "ecommerce",
  "seo",
  "design",
  "consulenza",
] as const;
const exploreLinks = [
  { href: "/", key: "home" },
  { href: "/progetti", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/servizi", key: "services" },
  { href: "/chi-sono", key: "about" },
  { href: "/contatti", key: "contact" },
] as const;

export async function EditorialFooter() {
  const t = await getTranslations("Footer");
  const labels = await getTranslations("Footer.redesign");
  const home = await getTranslations("HomeRedesign");
  const servicesT = await getTranslations("Services.details.items");
  const nav = await getTranslations("Nav.links");
  const collab = await getTranslations("SiteNav");

  return (
    <footer className={styles.footer} aria-label={labels("footerLabel")}>
      <div className={styles.footerInner}>
        <div className={styles.footerMasthead}>
          <section
            className={styles.footerIdentity}
            aria-labelledby="footer-brand-title"
          >
            <Link
              href="/"
              className={styles.footerLogo}
              aria-label="Andrea Vannetti — Home"
            >
              <Image src="/Icona.svg" alt="" width={52} height={52} />
            </Link>
            <p className={styles.footerEyebrow}>{labels("identityLabel")}</p>
            <h2 id="footer-brand-title">Andrea Vannetti</h2>
            <p className={styles.footerDescription}>{labels("description")}</p>
            <a
              className={styles.footerEmail}
              href="mailto:info@andreavannetti.dev"
            >
              info@andreavannetti.dev{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link href="/contatti" className={styles.footerProjectLink}>
              {home("projectCta")} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </section>

          <section
            className={styles.footerServices}
            aria-labelledby="footer-services-title"
          >
            <div className={styles.footerGroupHeading}>
              <p className={styles.footerEyebrow}>
                01 / {labels("servicesLabel")}
              </p>
              <h2 id="footer-services-title">{labels("servicesTitle")}</h2>
            </div>
            <ul>
              {services.map((service, index) => (
                <li key={service}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {servicesT(`${service}.title`)}
                </li>
              ))}
            </ul>
            <Link href="/servizi" className={styles.footerTextLink}>
              {labels("allServices")}{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <div className={styles.footerDirectory}>
          <nav
            className={styles.footerExplore}
            aria-labelledby="footer-explore-title"
          >
            <p className={styles.footerEyebrow}>
              02 / {labels("exploreLabel")}
            </p>
            <h2 id="footer-explore-title">{labels("exploreTitle")}</h2>
            <ul>
              {exploreLinks.map((item, index) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {nav(item.key)}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section
            className={styles.footerLegal}
            aria-labelledby="footer-legal-title"
          >
            <p className={styles.footerEyebrow}>03 / {labels("legalLabel")}</p>
            <h2 id="footer-legal-title">{labels("legalTitle")}</h2>
            <Link href="/privacy-policy" className={styles.footerTextLink}>
              {t("links.privacy")} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <CookieSettingsButton
              label={t("cookies")}
              className={styles.footerTextLink}
            />
            <a className={styles.footerPhone} href="tel:+393470587552">
              +39 347 0587552
            </a>
            <p className={styles.footerProfessionalInfo}>
              {t("vat")}
              <br />
              {t("address")}
            </p>
          </section>

          <section
            className={styles.footerCommunity}
            aria-labelledby="footer-community-title"
          >
            <p className={styles.footerEyebrow}>
              04 / {labels("communityLabel")}
            </p>
            <h2 id="footer-community-title">{labels("socialTitle")}</h2>
            <ul className={styles.footerSocials}>
              <li>
                <a
                  href="https://www.instagram.com/vannetti.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AndreaV89"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/andrea-vannetti"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
            <div className={styles.footerCollaboration}>
              <h3>{collab("collaborationEyebrow")}</h3>
              <p>{collab("collaborationDescription")}</p>
              <Link
                href={{
                  pathname: "/contatti",
                  query: { subject: "collaboration" },
                }}
              >
                {collab("collaborationCta")}{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>

        <div className={styles.footerBottom}>
          <span>{t("rights", { year: new Date().getFullYear() })}</span>
          <span>
            {t("builtWith")} <strong>Next.js</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
