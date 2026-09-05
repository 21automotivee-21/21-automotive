"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { ExportVehicleCard } from "@/components/ExportVehicleCard";
import { EXPORT_VEHICLES } from "@/lib/data/export-vehicles";
import { useI18n } from "@/lib/i18n/I18nProvider";

const PRICE_RANGES = [
  { value: "all", key: "export.anyPrice" },
  { value: "0-10000", key: "export.under10k" },
  { value: "10000-15000", key: "export.10to15k" },
  { value: "15000-20000", key: "export.15to20k" },
  { value: "20000-999999", key: "export.over20k" },
];

const SORT_OPTIONS = [
  { value: "featured", key: "export.sortFeatured" },
  { value: "price-asc", key: "export.sortPriceAsc" },
  { value: "price-desc", key: "export.sortPriceDesc" },
  { value: "mileage-asc", key: "export.sortMileageAsc" },
  { value: "year-desc", key: "export.sortYearDesc" },
];

const FUEL_CHIPS = [
  { value: "all", key: "export.allFuel" },
  { value: "Petrol", key: "export.fuelPetrol" },
  { value: "Diesel", key: "export.fuelDiesel" },
];

const BRANDS = [...new Set(EXPORT_VEHICLES.map((v) => v.make))].sort();

/** Icons for the "How export pricing works" explainer cards. */
const HOW_CARDS = [
  {
    title: "export.howVatTitle",
    text: "export.howVatText",
    paths: (
      <>
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
  {
    title: "export.howMarginTitle",
    text: "export.howMarginText",
    paths: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15l4-6 3 3 5-8" />
      </>
    ),
  },
  {
    title: "export.howTitleTitle",
    text: "export.howTitleText",
    paths: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
      </>
    ),
  },
];

export function ExportView() {
  const { t } = useI18n();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [sort, setSort] = useState("featured");

  const results = useMemo(() => {
    const needle = search.trim().toLowerCase();

    const filtered = EXPORT_VEHICLES.filter((v) => {
      if (fuel !== "all" && v.fuel !== fuel) return false;
      if (brand !== "all" && v.make !== brand) return false;

      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (v.netPriceEUR < min || v.netPriceEUR > max) return false;
      }

      if (needle) {
        const haystack = `${v.make} ${v.model} ${v.trim}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      return true;
    });

    switch (sort) {
      case "price-asc":
        return filtered.slice().sort((a, b) => a.netPriceEUR - b.netPriceEUR);
      case "price-desc":
        return filtered.slice().sort((a, b) => b.netPriceEUR - a.netPriceEUR);
      case "mileage-asc":
        return filtered.slice().sort((a, b) => a.mileageKm - b.mileageKm);
      case "year-desc":
        return filtered.slice().sort((a, b) => b.year - a.year);
      default:
        return filtered;
    }
  }, [search, brand, priceRange, fuel, sort]);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("export.eyebrow")}</span>
          <h1>{t("export.title")}</h1>
          <p className="lead">{t("export.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="toolbar">
            <div className="search-field">
              <SearchIcon />
              <input
                type="search"
                id="export-search"
                placeholder={t("export.searchPlaceholder")}
                aria-label="Search export inventory by make or model"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="toolbar__selects">
              <div className="select-field">
                <label htmlFor="export-brand-filter">{t("export.brand")}</label>
                <select
                  id="export-brand-filter"
                  aria-label="Filter by brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                >
                  <option value="all">{t("export.allBrands")}</option>
                  {BRANDS.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-field">
                <label htmlFor="export-price-filter">{t("export.price")}</label>
                <select
                  id="export-price-filter"
                  aria-label="Filter by price range"
                  value={priceRange}
                  onChange={(event) => setPriceRange(event.target.value)}
                >
                  {PRICE_RANGES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.key)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-field">
                <label htmlFor="export-sort-select">{t("export.sortBy")}</label>
                <select
                  id="export-sort-select"
                  aria-label="Sort export vehicles"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.key)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="filter-bar" role="group" aria-label="Filter export vehicles by fuel type">
            {FUEL_CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className="filter-chip export-filter-chip"
                aria-pressed={fuel === chip.value}
                onClick={() => setFuel(chip.value)}
              >
                {t(chip.key)}
              </button>
            ))}
          </div>

          <p className="results-count export-results-count">
            {t("export.showing")} {results.length} {t("export.of")} {EXPORT_VEHICLES.length}{" "}
            {t("export.vehicles")}
          </p>

          <div className="grid grid--4">
            {results.map((vehicle) => (
              <ExportVehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="empty-state export-empty-state" data-visible={String(results.length === 0)}>
            <h3>{t("export.emptyTitle")}</h3>
            <p>
              <span>{t("export.emptyText")}</span>{" "}
              <Link href="/contact" style={{ color: "var(--color-accent)" }}>
                {t("export.contactUs")}
              </Link>{" "}
              <span>{t("export.arriving")}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("export.howEyebrow")}</span>
              <h2>{t("export.howTitle")}</h2>
            </div>
          </div>

          <div className="grid grid--3">
            {HOW_CARDS.map((card) => (
              <div className="feature-card" key={card.title}>
                <div className="feature-card__icon">
                  <svg className="icon" viewBox="0 0 24 24" width={24} height={24}>
                    {card.paths}
                  </svg>
                </div>
                <h3>{t(card.title)}</h3>
                <p>{t(card.text)}</p>
              </div>
            ))}
          </div>

          <p className="field-hint" style={{ marginTop: "var(--space-8)" }}>
            {t("export.disclaimer")}
          </p>
        </div>
      </section>
    </>
  );
}
