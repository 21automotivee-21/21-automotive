"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckIcon, MailIcon, PhoneIcon } from "@/components/icons";
import type { Vehicle } from "@/lib/data/vehicles";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SITE } from "@/lib/site";

function BackArrowIcon() {
  return (
    <svg className="icon icon--directional" viewBox="0 0 24 24" width={16} height={16}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function VehicleView({ vehicle }: { vehicle: Vehicle }) {
  const { t, tEnum, price, isAr } = useI18n();
  const [shotIndex, setShotIndex] = useState(0);

  const name = isAr && vehicle.ar ? vehicle.ar.name : vehicle.name;
  const description = isAr && vehicle.ar ? vehicle.ar.description : vehicle.description;
  const color = isAr && vehicle.ar ? vehicle.ar.color : vehicle.color;
  const features = isAr && vehicle.ar ? vehicle.ar.features : vehicle.features;

  const category = tEnum("category", vehicle.category);
  const shot = vehicle.gallery[shotIndex];

  const specs = [
    { label: t("veh.year"), value: vehicle.year },
    { label: t("veh.mileage"), value: vehicle.mileage },
    { label: t("veh.fuelType"), value: tEnum("fuel", vehicle.fuel) },
    { label: t("veh.transmission"), value: tEnum("transmission", vehicle.transmission) },
    { label: t("veh.color"), value: color },
    { label: t("veh.type"), value: category },
  ];

  return (
    <>
      <section className="page-header page-header--compact">
        <div className="container">
          <Link href="/inventory" className="back-link">
            <BackArrowIcon />
            <span>{t("veh.backToInventory")}</span>
          </Link>
          <span className="eyebrow">{category}</span>
          <h1>{name}</h1>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="vehicle-detail">
            <div className="gallery">
              <div className="gallery__main">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1000px) 100vw, 640px"
                  priority
                />
              </div>
              <div className="gallery__thumbs">
                {vehicle.gallery.map((item, index) => (
                  <button
                    key={`${item.src}-${index}`}
                    type="button"
                    className="gallery__thumb"
                    aria-current={index === shotIndex}
                    aria-label={`View photo: ${item.alt}`}
                    onClick={() => setShotIndex(index)}
                  >
                    <Image src={item.src} alt="" fill sizes="160px" />
                  </button>
                ))}
              </div>
            </div>

            <aside className="detail-panel">
              <span className="detail-panel__badge">{tEnum("condition", vehicle.condition)}</span>
              <div className="detail-panel__head">
                <h2>{name}</h2>
                <div className="detail-panel__price">{price(vehicle.priceValue)}</div>
              </div>

              <div className="spec-grid">
                {specs.map((spec) => (
                  <div className="spec-chip" key={spec.label}>
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                ))}
              </div>

              <div
                className="detail-panel__section"
                style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}
              >
                <h3>{t("veh.description")}</h3>
                <p>{description}</p>
              </div>

              <div className="detail-panel__section">
                <h3>{t("veh.keyFeatures")}</h3>
                <ul className="feature-list">
                  {features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-panel__section">
                <div className="interested-box">
                  <h3>{t("veh.interested")}</h3>
                  <p>{t("veh.interestedText")}</p>
                  <div className="interested-box__row">
                    <PhoneIcon />
                    <span>{SITE.phoneDisplay}</span>
                  </div>
                  <div className="interested-box__row">
                    <MailIcon />
                    <span>{SITE.email}</span>
                  </div>
                  <Link
                    href={`/book-test-drive?id=${vehicle.id}`}
                    className="btn btn-primary btn-block"
                  >
                    {t("nav.bookTestDrive")}
                  </Link>
                  <Link
                    href={`/financing?id=${vehicle.id}`}
                    className="btn btn-ghost btn-block"
                    style={{ marginTop: "var(--space-3)" }}
                  >
                    {t("veh.estimateFinancing")}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
