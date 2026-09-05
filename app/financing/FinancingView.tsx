"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "@/components/icons";
import type { Vehicle } from "@/lib/data/vehicles";
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

const TERMS = [
  { value: 24, key: "fin.term24" },
  { value: 36, key: "fin.term36" },
  { value: 48, key: "fin.term48" },
  { value: 60, key: "fin.term60" },
  { value: 72, key: "fin.term72" },
  { value: 84, key: "fin.term84" },
];

const BUDGET_OPTIONS = [
  { value: "Under $30,000", key: "inv.under30" },
  { value: "$30,000 – $50,000", key: "inv.30to50" },
  { value: "$50,000 – $80,000", key: "inv.50to80" },
  { value: "$80,000+", key: "inv.over80" },
];

const fmtUSD = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function bucketFor(price: number): string {
  if (price < 30000) return "Under $30,000";
  if (price < 50000) return "$30,000 – $50,000";
  if (price < 80000) return "$50,000 – $80,000";
  return "$80,000+";
}

export function FinancingView({ vehicle }: { vehicle: Vehicle | null }) {
  const { t } = useI18n();

  // Arriving from a vehicle's detail page prefills that car's price and a
  // suggested 10% down payment, rounded to the nearest $500.
  const initialPrice = vehicle ? vehicle.priceValue : 45000;
  const initialDown = vehicle ? Math.round((vehicle.priceValue * 0.1) / 500) * 500 : 5000;
  const priceMax = vehicle ? Math.max(200000, vehicle.priceValue + 10000) : 200000;

  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(initialDown);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(60);

  const [budgetRange, setBudgetRange] = useState(() => bucketFor(initialPrice));
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // A down payment can never exceed the vehicle price.
  const effectiveDown = Math.min(Math.max(0, down), Math.max(0, price));

  const totals = useMemo(() => {
    const principal = Math.max(0, price - effectiveDown);
    const monthlyRate = Math.max(0, rate) / 100 / 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = term > 0 ? principal / term : 0;
    } else {
      const factor = Math.pow(1 + monthlyRate, term);
      monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
    }
    if (!Number.isFinite(monthlyPayment)) monthlyPayment = 0;

    const totalCost = monthlyPayment * term;
    return {
      principal,
      monthlyPayment,
      totalCost,
      totalInterest: Math.max(0, totalCost - principal),
    };
  }, [price, effectiveDown, rate, term]);

  const moLabel = t("fin.mo");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setErrorMessage(null);

    const required = form.querySelectorAll<HTMLInputElement>("[required]");

    if (!form.checkValidity()) {
      required.forEach((field) => field.classList.toggle("is-invalid", !field.validity.valid));
      form.reportValidity();
      return;
    }
    required.forEach((field) => field.classList.remove("is-invalid"));

    const data = new FormData(form);
    const payload = {
      vehicleId: vehicle ? vehicle.id : null,
      vehicleName: vehicle ? vehicle.name : null,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      budgetRange,
      estCarPrice: price,
      estDownPayment: effectiveDown,
      estMonthlyPayment: Math.round(totals.monthlyPayment),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/finance-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();

      if (!res.ok) throw new Error(body.error || "Request failed");

      setSuccessMessage(body.message);
      form.reset();
      setBudgetRange(bucketFor(price));
    } catch {
      setErrorMessage(
        "Could not submit your application — the service may be offline. Please call us instead, or try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("fin.eyebrow")}</span>
          <h1>{t("fin.title")}</h1>
          <p className="lead">{t("fin.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="vehicle-detail">
            <div className="calculator-card">
              <span className="eyebrow">{t("fin.calcEyebrow")}</span>
              <h2 style={{ marginBottom: "var(--space-6)" }}>{t("fin.calcTitle")}</h2>

              <div className="range-field">
                <div className="range-field__head">
                  <label htmlFor="calc-price">{t("fin.vehiclePrice")}</label>
                  <span className="range-field__value">{fmtUSD(price)}</span>
                </div>
                <input
                  type="range"
                  id="calc-price-range"
                  className="range-input"
                  min={1000}
                  max={priceMax}
                  step={500}
                  value={price}
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
                <input
                  type="number"
                  id="calc-price"
                  className="range-field__number"
                  min={0}
                  step={100}
                  value={price}
                  aria-label="Vehicle price in dollars"
                  onChange={(event) => setPrice(Math.max(0, Number(event.target.value) || 0))}
                />
              </div>

              <div className="range-field">
                <div className="range-field__head">
                  <label htmlFor="calc-down">{t("fin.downPayment")}</label>
                  <span className="range-field__value">{fmtUSD(effectiveDown)}</span>
                </div>
                <input
                  type="range"
                  id="calc-down-range"
                  className="range-input"
                  min={0}
                  max={Math.max(0, price)}
                  step={500}
                  value={effectiveDown}
                  onChange={(event) => setDown(Number(event.target.value))}
                />
                <input
                  type="number"
                  id="calc-down"
                  className="range-field__number"
                  min={0}
                  step={100}
                  value={effectiveDown}
                  aria-label="Down payment in dollars"
                  onChange={(event) => setDown(Math.max(0, Number(event.target.value) || 0))}
                />
              </div>

              <div className="range-field">
                <div className="range-field__head">
                  <label htmlFor="calc-rate">{t("fin.interestRate")}</label>
                  <span className="range-field__value">{rate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  id="calc-rate-range"
                  className="range-input"
                  min={0}
                  max={20}
                  step={0.1}
                  value={rate}
                  onChange={(event) => setRate(Number(event.target.value))}
                />
                <input
                  type="number"
                  id="calc-rate"
                  className="range-field__number"
                  min={0}
                  max={30}
                  step={0.1}
                  value={rate}
                  aria-label="Interest rate percent"
                  onChange={(event) => setRate(Math.max(0, Number(event.target.value) || 0))}
                />
              </div>

              <div className="field" style={{ marginTop: "var(--space-6)" }}>
                <label htmlFor="calc-term">{t("fin.loanTerm")}</label>
                <select
                  id="calc-term"
                  value={term}
                  onChange={(event) => setTerm(Number(event.target.value))}
                >
                  {TERMS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.key)}
                    </option>
                  ))}
                </select>
              </div>
              <p className="field-hint">{t("fin.usdNote")}</p>
            </div>

            <aside className="calc-results">
              <span className="calc-results__label">{t("fin.estMonthlyPayment")}</span>
              <div className="calc-results__amount">
                {fmtUSD(totals.monthlyPayment)}/{moLabel}
              </div>
              <p className="calc-results__disclaimer">{t("fin.disclaimer")}</p>

              <div className="calc-breakdown">
                <div className="spec-chip">
                  <span>{t("fin.loanAmount")}</span>
                  <strong>{fmtUSD(totals.principal)}</strong>
                </div>
                <div className="spec-chip">
                  <span>{t("fin.loanTerm")}</span>
                  <strong>
                    {term} {moLabel}
                  </strong>
                </div>
                <div className="spec-chip">
                  <span>{t("fin.totalInterest")}</span>
                  <strong>{fmtUSD(totals.totalInterest)}</strong>
                </div>
                <div className="spec-chip">
                  <span>{t("fin.totalCost")}</span>
                  <strong>{fmtUSD(totals.totalCost)}</strong>
                </div>
              </div>

              <a
                href="#prequalify"
                className="btn btn-primary btn-block"
                style={{ marginTop: "var(--space-6)" }}
              >
                {t("fin.getPreQualified")}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--flush-top" id="prequalify">
        <div className="container">
          <div className="form-card" style={{ maxWidth: 720, marginInline: "auto" }}>
            <span className="eyebrow">{t("fin.prequalEyebrow")}</span>
            <h2 style={{ marginBottom: 8 }}>{t("fin.prequalTitle")}</h2>
            <p className="lead" style={{ marginBottom: 28 }}>
              {t("fin.prequalLead")}
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

            <form id="finance-form" noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fin-name">
                    <span>{t("contact.fullName")}</span> <span className="required">*</span>
                  </label>
                  <input type="text" id="fin-name" name="name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="fin-phone">
                    <span>{t("contact.phoneNumber")}</span> <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="fin-phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="fin-email">
                  <span>{t("contact.emailAddress")}</span> <span className="required">*</span>
                </label>
                <input type="email" id="fin-email" name="email" autoComplete="email" required />
              </div>

              <div className="field">
                <label htmlFor="fin-budget">
                  <span>{t("fin.budget")}</span> <span className="required">*</span>
                </label>
                <select
                  id="fin-budget"
                  name="budgetRange"
                  required
                  value={budgetRange}
                  onChange={(event) => setBudgetRange(event.target.value)}
                >
                  <option value="">{t("fin.selectRange")}</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.key)}
                    </option>
                  ))}
                </select>
                <p className="field-hint">{t("fin.budgetHint")}</p>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? t("common.submitting") : t("fin.submitApp")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
