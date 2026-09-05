"use client";

import { useState } from "react";
import { CheckIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SITE } from "@/lib/site";

function PinIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" style={style}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ContactView() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  // No backend is wired up for general enquiries — the form validates and
  // confirms client-side, the same as the static site did.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const required = form.querySelectorAll<HTMLInputElement>("[required]");

    if (!form.checkValidity()) {
      required.forEach((field) => field.classList.toggle("is-invalid", !field.validity.valid));
      form.reportValidity();
      return;
    }

    required.forEach((field) => field.classList.remove("is-invalid"));
    setSent(true);
    form.reset();
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h1>{t("contact.title")}</h1>
          <p className="lead">{t("contact.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="info-card">
                <div className="info-card__row">
                  <div className="info-card__icon">
                    <PinIcon />
                  </div>
                  <div>
                    <h3>{t("contact.address")}</h3>
                    <p>
                      {SITE.addressLine1}
                      <br />
                      {SITE.addressLine2}
                    </p>
                  </div>
                </div>
                <div className="info-card__row">
                  <div className="info-card__icon">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3>{t("contact.phone")}</h3>
                    <p>
                      <a href={SITE.phoneHref} style={{ color: "var(--color-text-muted)" }}>
                        {SITE.phoneDisplay}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="info-card__row">
                  <div className="info-card__icon">
                    <MailIcon />
                  </div>
                  <div>
                    <h3>{t("contact.email")}</h3>
                    <p>
                      <a
                        href={`mailto:${SITE.email}`}
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {SITE.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="info-card__row">
                  <div className="info-card__icon">
                    <svg className="icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  <div>
                    <h3>{t("contact.hours")}</h3>
                    <p>
                      <span>{t("contact.everyDay12")}</span>
                      <br />
                      <span>{t("footer.hoursTime")}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="map-frame"
                role="img"
                aria-label="Placeholder map showing the 21 Automotive showroom location"
              >
                <div>
                  <PinIcon style={{ marginInline: "auto" }} />
                  <p style={{ fontSize: "0.85rem" }}>{t("contact.mapPreview")}</p>
                </div>
              </div>
            </div>

            <div className="form-card">
              <h2 style={{ marginBottom: 8 }}>{t("contact.sendMessage")}</h2>
              <p className="lead" style={{ marginBottom: 28 }}>
                {t("contact.formLead")}
              </p>

              <div
                className="form-success"
                data-visible={String(sent)}
                role="status"
                tabIndex={-1}
              >
                <CheckIcon />
                <span>{t("contact.successMsg")}</span>
              </div>

              <form id="contact-form" noValidate onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">
                      <span>{t("contact.fullName")}</span> <span className="required">*</span>
                    </label>
                    <input type="text" id="name" name="name" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">{t("contact.phoneNumber")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">
                    <span>{t("contact.emailAddress")}</span> <span className="required">*</span>
                  </label>
                  <input type="email" id="email" name="email" autoComplete="email" required />
                  <p className="field-hint">{t("contact.emailHint")}</p>
                </div>

                <div className="field">
                  <label htmlFor="interest">{t("contact.vehicleInterest")}</label>
                  <input
                    type="text"
                    id="interest"
                    name="interest"
                    placeholder={t("contact.vehiclePlaceholder")}
                  />
                </div>

                <div className="field">
                  <label htmlFor="message">
                    <span>{t("contact.message")}</span> <span className="required">*</span>
                  </label>
                  <textarea id="message" name="message" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  {t("contact.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
