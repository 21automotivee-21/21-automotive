"use client";

import { CtaBanner } from "@/components/CtaBanner";
import { useI18n } from "@/lib/i18n/I18nProvider";

const ITEMS = [
  {
    title: "accessories.item1Title",
    text: "accessories.item1Text",
    priceUsd: 89,
    paths: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
  },
  {
    title: "accessories.item2Title",
    text: "accessories.item2Text",
    priceUsd: 249,
    paths: <path d="M4 20V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M2 20h20M6 8V4h12v4" />,
  },
  {
    title: "accessories.item3Title",
    text: "accessories.item3Text",
    priceUsd: 899,
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3m0 12v3m9-9h-3M6 12H3" />
      </>
    ),
  },
  {
    title: "accessories.item4Title",
    text: "accessories.item4Text",
    priceUsd: 129,
    paths: (
      <>
        <rect x="2" y="7" width="20" height="15" rx="2" />
        <path d="M17 2 12 7 7 2" />
      </>
    ),
  },
  {
    title: "accessories.item5Title",
    text: "accessories.item5Text",
    priceUsd: 399,
    paths: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  },
  {
    title: "accessories.item6Title",
    text: "accessories.item6Text",
    priceUsd: 179,
    paths: (
      <>
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5a2 2 0 0 0-2 2v7h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </>
    ),
  },
];

export function AccessoriesView() {
  const { t, price } = useI18n();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("accessories.eyebrow")}</span>
          <h1>{t("accessories.title")}</h1>
          <p className="lead">{t("accessories.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="grid grid--3">
            {ITEMS.map((item) => (
              <div className="feature-card" key={item.title}>
                <div className="feature-card__icon">
                  <svg className="icon" viewBox="0 0 24 24" width={24} height={24}>
                    {item.paths}
                  </svg>
                </div>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
                <div className="price-tag" style={{ marginTop: "var(--space-4)" }}>
                  <span>{t("accessories.from")}</span> <span>{price(item.priceUsd)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrowKey="accessories.ctaEyebrow"
        titleKey="accessories.ctaTitle"
        textKey="accessories.ctaText"
        links={[
          { href: "/contact", key: "nav.getInTouch", variant: "btn-primary" },
          { href: "/inventory", key: "cta.browse", variant: "btn-ghost" },
        ]}
      />
    </>
  );
}
