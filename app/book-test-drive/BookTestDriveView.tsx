"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CarSideIcon, CheckIcon, MailIcon, ShieldCheckIcon } from "@/components/icons";
import { VEHICLES, findVehicle } from "@/lib/data/vehicles";
import { useI18n } from "@/lib/i18n/I18nProvider";

function AlertIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

const TIME_SLOTS = [
  { value: "Morning", key: "btd.morning" },
  { value: "Afternoon", key: "btd.afternoon" },
  { value: "Evening", key: "btd.evening" },
];

/** Today, in the yyyy-mm-dd form the date input expects. */
function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function BookTestDriveView({ preselectId }: { preselectId: string | null }) {
  const { t, price, isAr } = useI18n();

  const formRef = useRef<HTMLFormElement>(null);
  const [vehicleId, setVehicleId] = useState(
    preselectId && findVehicle(preselectId) ? preselectId : "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selected = findVehicle(vehicleId);

  function markInvalidFields(form: HTMLFormElement) {
    form.querySelectorAll<HTMLInputElement>("[required]").forEach((field) => {
      field.classList.toggle("is-invalid", !field.validity.valid);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setErrorMessage(null);

    if (!form.checkValidity()) {
      markInvalidFields(form);
      form.reportValidity();
      return;
    }
    form
      .querySelectorAll<HTMLInputElement>("[required]")
      .forEach((field) => field.classList.remove("is-invalid"));

    const data = new FormData(form);
    const payload = {
      vehicleId: vehicleId || null,
      vehicleName: selected ? selected.name : null,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      depositRequested: data.get("depositRequested") === "on",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();

      if (!res.ok) throw new Error(body.error || "Request failed");

      setSuccessMessage(body.message);
      form.reset();
      setVehicleId(preselectId && findVehicle(preselectId) ? preselectId : "");
    } catch {
      setErrorMessage(
        "Could not submit your request — the booking service may be offline. Please call us instead, or try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("btd.eyebrow")}</span>
          <h1>{t("btd.title")}</h1>
          <p className="lead">{t("btd.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="info-card" id="vehicle-summary-card">
                <h3 style={{ marginBottom: "var(--space-4)" }}>{t("btd.selectedVehicle")}</h3>
                <div className="vehicle-summary">
                  {selected ? (
                    <>
                      <div className="vehicle-summary__thumb">
                        <Image
                          src={selected.image}
                          alt={isAr && selected.ar ? selected.ar.name : selected.name}
                          fill
                          sizes="96px"
                        />
                      </div>
                      <div className="vehicle-summary__body">
                        <h3>{isAr && selected.ar ? selected.ar.name : selected.name}</h3>
                        <p>
                          {selected.year} &middot; {selected.mileage} &middot;{" "}
                          <span className="vehicle-summary__price">
                            {price(selected.priceValue)}
                          </span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="vehicle-summary__thumb">
                        <CarSideIcon width={28} height={28} />
                      </div>
                      <div className="vehicle-summary__body">
                        <h3>{t("btd.generalInquiry")}</h3>
                        <p>{t("btd.noVehicleSelected")}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="info-card">
                <div
                  className="info-card__row"
                  style={{ borderTop: "none", paddingTop: 0, marginTop: 0 }}
                >
                  <div className="info-card__icon">
                    <ShieldCheckIcon />
                  </div>
                  <div>
                    <h3>{t("btd.howItWorks")}</h3>
                    <p>{t("btd.howItWorksText")}</p>
                  </div>
                </div>
                <div className="info-card__row">
                  <div className="info-card__icon">
                    <MailIcon />
                  </div>
                  <div>
                    <h3>{t("btd.deposit")}</h3>
                    <p>{t("btd.depositText")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card">
              <span className="eyebrow">{t("btd.requestTitle")}</span>
              <h2 style={{ marginBottom: 8 }}>{t("btd.requestLead")}</h2>
              <p className="lead" style={{ marginBottom: 28 }}>
                {t("btd.requiredNote")}
              </p>

              <div
                className="form-success"
                data-visible={String(Boolean(successMessage))}
                role="status"
                tabIndex={-1}
              >
                <CheckIcon />
                <span>{successMessage}</span>
              </div>

              <div
                className="form-error"
                data-visible={String(Boolean(errorMessage))}
                role="alert"
                tabIndex={-1}
              >
                <AlertIcon />
                <span>{errorMessage}</span>
              </div>

              <form id="booking-form" noValidate ref={formRef} onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="vehicle-select">{t("btd.vehicle")}</label>
                  <select
                    id="vehicle-select"
                    name="vehicleId"
                    value={vehicleId}
                    onChange={(event) => setVehicleId(event.target.value)}
                  >
                    <option value="">{t("btd.generalInquiry2")}</option>
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {`${isAr && v.ar ? v.ar.name : v.name} — ${price(v.priceValue)}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="bk-date">
                      <span>{t("btd.preferredDate")}</span> <span className="required">*</span>
                    </label>
                    <input type="date" id="bk-date" name="date" min={todayISO()} required />
                  </div>
                  <div className="field">
                    <label htmlFor="bk-time">{t("btd.preferredTime")}</label>
                    <select id="bk-time" name="time" defaultValue="Morning">
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {t(slot.key)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="bk-name">
                      <span>{t("contact.fullName")}</span> <span className="required">*</span>
                    </label>
                    <input type="text" id="bk-name" name="name" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="bk-phone">
                      <span>{t("contact.phoneNumber")}</span> <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="bk-phone"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="bk-email">
                    <span>{t("contact.emailAddress")}</span> <span className="required">*</span>
                  </label>
                  <input type="email" id="bk-email" name="email" autoComplete="email" required />
                </div>

                <div className="field">
                  <label htmlFor="bk-message">{t("btd.anythingElse")}</label>
                  <textarea id="bk-message" name="message" />
                </div>

                <label className="deposit-toggle">
                  <input type="checkbox" id="bk-deposit" name="depositRequested" />
                  <div>
                    <strong>{t("btd.depositCheckboxTitle")}</strong>
                    <p>{t("btd.depositCheckboxText")}</p>
                  </div>
                </label>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  id="booking-submit"
                  disabled={submitting}
                >
                  {submitting ? t("common.submitting") : t("btd.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
