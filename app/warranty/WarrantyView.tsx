"use client";

import Link from "next/link";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { CtaBanner } from "@/components/CtaBanner";
import { useI18n } from "@/lib/i18n/I18nProvider";

const PLANS = [
  {
    eyebrow: "warranty.plan1Eyebrow",
    title: "warranty.plan1Title",
    term: "12",
    termUnit: "warranty.months",
    sub: "warranty.plan1Sub",
    items: [
      "warranty.plan1Item1",
      "warranty.plan1Item2",
      "warranty.plan1Item3",
      "warranty.plan1Item4",
    ],
    cta: { href: "/contact", key: "warranty.askUs", variant: "btn-ghost" },
    featured: false,
  },
  {
    eyebrow: "warranty.plan2Eyebrow",
    title: "warranty.plan2Title",
    term: "24",
    termUnit: "warranty.months",
    sub: "warranty.plan2Sub",
    items: [
      "warranty.plan2Item1",
      "warranty.plan2Item2",
      "warranty.plan2Item3",
      "warranty.plan2Item4",
    ],
    cta: { href: "/inventory", key: "warranty.browseCertified", variant: "btn-primary" },
    featured: true,
  },
  {
    eyebrow: "warranty.plan3Eyebrow",
    title: "warranty.plan3Title",
    // This plan's headline is a phrase rather than a number + unit.
    termKey: "warranty.upTo5",
    sub: "warranty.plan3Sub",
    items: [
      "warranty.plan3Item1",
      "warranty.plan3Item2",
      "warranty.plan3Item3",
      "warranty.plan3Item4",
    ],
    cta: { href: "/contact", key: "warranty.getPricing", variant: "btn-ghost" },
    featured: false,
  },
] as const;

const COVERED = ["warranty.covered1", "warranty.covered2", "warranty.covered3", "warranty.covered4"];
const NOT_COVERED = [
  "warranty.notCovered1",
  "warranty.notCovered2",
  "warranty.notCovered3",
  "warranty.notCovered4",
];

export function WarrantyView() {
  const { t } = useI18n();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("warranty.eyebrow")}</span>
          <h1>{t("warranty.title")}</h1>
          <p className="lead">{t("warranty.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="grid grid--3">
            {PLANS.map((plan) => (
              <div
                className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`}
                key={plan.title}
              >
                {plan.featured && (
                  <span className="pricing-card__badge">{t("warranty.mostPopular")}</span>
                )}
                <span className="eyebrow">{t(plan.eyebrow)}</span>
                <h3>{t(plan.title)}</h3>
                <div className="pricing-card__price">
                  <div className="price-tag">
                    {"termKey" in plan ? (
                      t(plan.termKey)
                    ) : (
                      <>
                        {plan.term} <span>{t(plan.termUnit)}</span>
                      </>
                    )}
                  </div>
                  <p style={{ fontSize: "0.85rem", marginTop: 4 }}>{t(plan.sub)}</p>
                </div>
                <ul className="pricing-card__list">
                  {plan.items.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.cta.href} className={`btn ${plan.cta.variant} btn-block`}>
                  {t(plan.cta.key)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("warranty.coverageEyebrow")}</span>
              <h2>{t("warranty.coverageTitle")}</h2>
            </div>
          </div>

          <div className="coverage-columns">
            <div>
              <h3 style={{ marginBottom: "var(--space-5)" }}>{t("warranty.coveredTitle")}</h3>
              <ul className="coverage-list coverage-list--yes">
                {COVERED.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: "var(--space-5)" }}>{t("warranty.notCoveredTitle")}</h3>
              <ul className="coverage-list coverage-list--no">
                {NOT_COVERED.map((item) => (
                  <li key={item}>
                    <CloseIcon />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrowKey="warranty.ctaEyebrow"
        titleKey="warranty.ctaTitle"
        textKey="warranty.ctaText"
        links={[
          { href: "/contact", key: "nav.getInTouch", variant: "btn-primary" },
          { href: "/inventory", key: "cta.browse", variant: "btn-ghost" },
        ]}
      />
    </>
  );
}
