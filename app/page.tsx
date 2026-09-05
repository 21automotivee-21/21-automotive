"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ClockIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  StarRating,
  TagIcon,
  UsersIcon,
} from "@/components/icons";
import { VehicleCard } from "@/components/VehicleCard";
import { findVehicle } from "@/lib/data/vehicles";
import { useI18n } from "@/lib/i18n/I18nProvider";

const FEATURED_IDS = ["bmw-5-series", "range-rover-sport", "tesla-model-s"];

const WHY_CARDS = [
  { Icon: ShieldCheckIcon, title: "why.card1Title", text: "why.card1Text" },
  { Icon: TagIcon, title: "why.card2Title", text: "why.card2Text" },
  { Icon: UsersIcon, title: "why.card3Title", text: "why.card3Text" },
  { Icon: HeadsetIcon, title: "why.card4Title", text: "why.card4Text" },
];

const TESTIMONIALS = [
  { stars: 5, text: "testimonials.review1Text", name: "testimonials.review1Name", role: "testimonials.review1Role", initials: "AN" },
  { stars: 5, text: "testimonials.review2Text", name: "testimonials.review2Name", role: "testimonials.review2Role", initials: "SW" },
  { stars: 5, text: "testimonials.review3Text", name: "testimonials.review3Name", role: "testimonials.review3Role", initials: "YM" },
  { stars: 4, text: "testimonials.review4Text", name: "testimonials.review4Name", role: "testimonials.review4Role", initials: "MA" },
  { stars: 5, text: "testimonials.review5Text", name: "testimonials.review5Name", role: "testimonials.review5Role", initials: "DO" },
];

export default function HomePage() {
  const { t, price } = useI18n();

  const featured = FEATURED_IDS.map((id) => findVehicle(id)).filter(
    (v): v is NonNullable<typeof v> => Boolean(v),
  );

  return (
    <>
      <section className="hero">
        <Image
          className="hero__bg"
          src="/images/hero-showcase.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__road" aria-hidden="true">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="roadFade" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M480 900 L700 430 L740 430 L960 900 Z" fill="url(#roadFade)" />
            <line
              x1="720"
              y1="900"
              x2="720"
              y2="430"
              stroke="#3b82f6"
              strokeOpacity="0.18"
              strokeWidth="2"
              strokeDasharray="14 18"
            />
          </svg>
        </div>

        <div className="container hero__content">
          <div className="hero__intro">
            <div className="hero__badge-row">
              <span className="pill">
                <ShieldCheckIcon />
                <span>{t("hero.badgeOpening")}</span>
              </span>
              <span className="pill">
                <ClockIcon />
                <span>{t("hero.badgeHours")}</span>
              </span>
            </div>

            <h1>
              <span>{t("hero.titlePrefix")}</span> <em>21 Automotive</em>
            </h1>
            <p className="lead">{t("hero.lead")}</p>

            <div className="hero__cta-row">
              <Link href="/inventory" className="btn btn-primary">
                <span>{t("hero.browseInventory")}</span>
                <ArrowRightIcon />
              </Link>
              <Link href="/book-test-drive" className="btn btn-ghost">
                {t("nav.bookTestDrive")}
              </Link>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <strong>60+</strong>
                <span>{t("hero.statVehicles")}</span>
              </div>
              <div className="hero__stat">
                <strong>2026</strong>
                <span>{t("hero.statFounded")}</span>
              </div>
              <div className="hero__stat">
                <strong>12PM&ndash;12AM</strong>
                <span>{t("hero.statOpenDaily")}</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__panel">
              <div className="hero__car">
                <Image
                  src="/images/porsche-911-1.jpg"
                  alt="2023 Porsche 911 Carrera"
                  fill
                  sizes="(max-width: 1000px) 100vw, 480px"
                  priority
                />
              </div>
              <div className="hero__panel-caption">
                <div>
                  <h3>{t("hero.featuredThisWeek")}</h3>
                  <p>2023 Porsche 911 Carrera</p>
                </div>
                <div className="hero__price">{price(118500)}</div>
              </div>
            </div>
            <Link
              href="/vehicle/porsche-911-carrera"
              className="btn btn-ghost btn-block"
              style={{ marginTop: "var(--space-4)" }}
            >
              {t("hero.viewThisCar")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="featured">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("featured.eyebrow")}</span>
              <h2>{t("featured.title")}</h2>
            </div>
            <Link href="/inventory" className="btn btn-ghost">
              <span>{t("featured.viewFull")}</span>
              <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid grid--3">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("why.eyebrow")}</span>
              <h2>{t("why.title")}</h2>
            </div>
          </div>

          <div className="grid grid--4">
            {WHY_CARDS.map(({ Icon, title, text }) => (
              <div className="feature-card" key={title}>
                <div className="feature-card__icon">
                  <Icon width={24} height={24} />
                </div>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("testimonials.eyebrow")}</span>
              <h2>{t("testimonials.title")}</h2>
            </div>
            <div className="testimonials-summary">
              <StarRating />
              <span>{t("testimonials.ratingSummary")}</span>
            </div>
          </div>
          <p className="testimonials-note">{t("testimonials.sampleNote")}</p>

          <div className="testimonial-grid">
            {TESTIMONIALS.map((review) => (
              <div className="testimonial-card" key={review.name}>
                <StarRating filled={review.stars} label={review.stars + " out of 5 stars"} />
                <p className="testimonial-card__quote">{t(review.text)}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{review.initials}</div>
                  <div>
                    <strong>{t(review.name)}</strong>
                    <span>{t(review.role)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="cta-banner">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              {t("cta.eyebrow")}
            </span>
            <h2>{t("cta.title")}</h2>
            <p className="lead" style={{ marginInline: "auto" }}>
              {t("cta.text")}
            </p>
            <div className="cta-banner__row">
              <Link href="/book-test-drive" className="btn btn-primary">
                {t("nav.bookTestDrive")}
              </Link>
              <Link href="/inventory" className="btn btn-ghost">
                {t("cta.browse")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
