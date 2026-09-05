"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { CtaBanner } from "@/components/CtaBanner";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SITE } from "@/lib/site";

const PACKAGES = [
  {
    eyebrow: "service.plan1Eyebrow",
    title: "service.plan1Title",
    priceUsd: 59,
    items: ["service.plan1Item1", "service.plan1Item2", "service.plan1Item3", "service.plan1Item4"],
    variant: "btn-ghost",
    featured: false,
  },
  {
    eyebrow: "service.plan2Eyebrow",
    title: "service.plan2Title",
    priceUsd: 149,
    items: ["service.plan2Item1", "service.plan2Item2", "service.plan2Item3", "service.plan2Item4"],
    variant: "btn-primary",
    featured: true,
  },
  {
    eyebrow: "service.plan3Eyebrow",
    title: "service.plan3Title",
    priceUsd: 249,
    items: ["service.plan3Item1", "service.plan3Item2", "service.plan3Item3", "service.plan3Item4"],
    variant: "btn-ghost",
    featured: false,
  },
] as const;

/** Individual à la carte services, with the icon each card shows. */
const SERVICES = [
  {
    title: "service.item1Title",
    text: "service.item1Text",
    priceUsd: 49,
    paths: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6M4.2 4.2l4.2 4.2m7.2 7.2 4.2 4.2M1 12h6m6 0h6M4.2 19.8l4.2-4.2m7.2-7.2 4.2-4.2" />
      </>
    ),
  },
  {
    title: "service.item2Title",
    text: "service.item2Text",
    priceUsd: 39,
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 9 9" />
      </>
    ),
  },
  {
    title: "service.item3Title",
    text: "service.item3Text",
    priceUsd: 29,
    paths: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  },
  {
    title: "service.item4Title",
    text: "service.item4Text",
    priceUsd: 35,
    paths: (
      <>
        <rect x="1" y="6" width="18" height="10" rx="2" />
        <path d="M19 10h2.5a1 1 0 0 1 .9.55L23.5 13.5V16a1 1 0 0 1-1 1H21" />
      </>
    ),
  },
  {
    title: "service.item5Title",
    text: "service.item5Text",
    priceUsd: 99,
    paths: <path d="M3 15a4 4 0 0 0 4 4h10a4 4 0 0 0 0-8 6 6 0 0 0-11.3-2A4 4 0 0 0 3 15Z" />,
  },
  {
    title: "service.item6Title",
    text: "service.item6Text",
    priceUsd: 45,
    paths: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M3 9h6M15 3v18M15 9h6" />
      </>
    ),
  },
  {
    title: "service.item7Title",
    text: "service.item7Text",
    priceUsd: 89,
    paths: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="6" x2="12" y2="12" />
        <line x1="16" y1="14" x2="12" y2="12" />
      </>
    ),
  },
  {
    title: "service.item8Title",
    text: "service.item8Text",
    priceUsd: 25,
    paths: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M4 9h16M9 4v16" />
      </>
    ),
  },
];

export function ServicePackagesView() {
  const { t, price } = useI18n();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("service.eyebrow")}</span>
          <h1>{t("service.title")}</h1>
          <p className="lead">{t("service.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="grid grid--3">
            {PACKAGES.map((pkg) => (
              <div
                className={`pricing-card${pkg.featured ? " pricing-card--featured" : ""}`}
                key={pkg.title}
              >
                {pkg.featured && (
                  <span className="pricing-card__badge">{t("warranty.mostPopular")}</span>
                )}
                <span className="eyebrow">{t(pkg.eyebrow)}</span>
                <h3>{t(pkg.title)}</h3>
                <div className="pricing-card__price">
                  <div className="price-tag">{price(pkg.priceUsd)}</div>
                  <p style={{ fontSize: "0.85rem", marginTop: 4 }}>{t("service.perVisit")}</p>
                </div>
                <ul className="pricing-card__list">
                  {pkg.items.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`btn ${pkg.variant} btn-block`}>
                  {t("service.bookThis")}
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
              <span className="eyebrow">{t("service.alaCarteEyebrow")}</span>
              <h2>{t("service.alaCarteTitle")}</h2>
            </div>
          </div>

          <div className="grid grid--4">
            {SERVICES.map((service) => (
              <div className="feature-card" key={service.title}>
                <div className="feature-card__icon">
                  <svg className="icon" viewBox="0 0 24 24" width={24} height={24}>
                    {service.paths}
                  </svg>
                </div>
                <h3>{t(service.title)}</h3>
                <p className="price-tag" style={{ fontSize: "1rem", marginBottom: 6 }}>
                  {price(service.priceUsd)}
                </p>
                <p>{t(service.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrowKey="service.ctaEyebrow"
        titleKey="service.ctaTitle"
        textKey="service.ctaText"
        links={[
          { href: "/contact", key: "nav.getInTouch", variant: "btn-primary" },
          { href: SITE.phoneHref, key: "", variant: "btn-ghost", label: SITE.phoneDisplay },
        ]}
      />
    </>
  );
}
