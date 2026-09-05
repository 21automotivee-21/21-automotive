"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";

type CtaLink = { href: string; key: string; variant: "btn-primary" | "btn-ghost"; label?: string };

/** The closing call-to-action banner shared by several content pages. */
export function CtaBanner({
  eyebrowKey,
  titleKey,
  textKey,
  links,
}: {
  eyebrowKey: string;
  titleKey: string;
  textKey: string;
  links: CtaLink[];
}) {
  const { t } = useI18n();

  return (
    <section className="section section--flush-top">
      <div className="container">
        <div className="cta-banner">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            {t(eyebrowKey)}
          </span>
          <h2>{t(titleKey)}</h2>
          <p className="lead" style={{ marginInline: "auto" }}>
            {t(textKey)}
          </p>
          <div className="cta-banner__row">
            {links.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.href} href={link.href} className={`btn ${link.variant}`}>
                  {link.label ?? t(link.key)}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className={`btn ${link.variant}`}>
                  {link.label ?? t(link.key)}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
