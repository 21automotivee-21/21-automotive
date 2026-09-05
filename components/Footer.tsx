"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import { FacebookIcon, InstagramIcon, XIcon } from "./icons";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="brand">
              <span className="brand__mark">21</span>
              <span className="brand__name">
                Automotive<span>{t("nav.tagline")}</span>
              </span>
            </Link>
            <p>{t("footer.blurb")}</p>
            <div className="footer__social">
              <a href="#" aria-label="21 Automotive on Instagram">
                <InstagramIcon width={18} height={18} />
              </a>
              <a href="#" aria-label="21 Automotive on Facebook">
                <FacebookIcon width={18} height={18} />
              </a>
              <a href="#" aria-label="21 Automotive on X">
                <XIcon width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <h4>{t("footer.quickLinks")}</h4>
            <ul className="footer__links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{t(link.key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t("footer.hours")}</h4>
            <ul className="footer__links">
              <li>{t("footer.everyDay")}</li>
              <li>{t("footer.hoursTime")}</li>
            </ul>
          </div>

          <div>
            <h4>{t("footer.contact")}</h4>
            <ul className="footer__links">
              <li>
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                {SITE.addressLine1}
                <br />
                {SITE.addressLine2}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.placeholderNote")}</span>
        </div>
      </div>
    </footer>
  );
}
