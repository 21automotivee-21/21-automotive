"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES } from "@/lib/data/vehicles";
import { useI18n } from "@/lib/i18n/I18nProvider";

const PRICE_RANGES = [
  { value: "all", key: "inv.anyPrice" },
  { value: "0-30000", key: "inv.under30" },
  { value: "30000-50000", key: "inv.30to50" },
  { value: "50000-80000", key: "inv.50to80" },
  { value: "80000-999999", key: "inv.over80" },
];

const SORT_OPTIONS = [
  { value: "featured", key: "inv.sortFeatured" },
  { value: "price-asc", key: "inv.sortPriceAsc" },
  { value: "price-desc", key: "inv.sortPriceDesc" },
  { value: "year-desc", key: "inv.sortYearDesc" },
  { value: "year-asc", key: "inv.sortYearAsc" },
  { value: "brand-asc", key: "inv.sortBrandAsc" },
];

const CATEGORIES = [
  { value: "all", key: "inv.allVehicles" },
  { value: "Sedan", key: "inv.categorySedan" },
  { value: "SUV", key: "inv.categorySUV" },
  { value: "Truck", key: "inv.categoryTruck" },
  { value: "Coupe", key: "inv.categoryCoupe" },
  { value: "Electric", key: "inv.categoryElectric" },
];

const BRANDS = [...new Set(VEHICLES.map((v) => v.make))].sort();

export function InventoryView() {
  const { t } = useI18n();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const results = useMemo(() => {
    const needle = search.trim().toLowerCase();

    const filtered = VEHICLES.filter((v) => {
      if (category !== "all" && v.category !== category) return false;
      if (brand !== "all" && v.make !== brand) return false;

      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (v.priceValue < min || v.priceValue > max) return false;
      }

      if (needle) {
        const haystack = `${v.make} ${v.model} ${v.name} ${v.ar ? v.ar.name : ""}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      return true;
    });

    switch (sort) {
      case "price-asc":
        return filtered.slice().sort((a, b) => a.priceValue - b.priceValue);
      case "price-desc":
        return filtered.slice().sort((a, b) => b.priceValue - a.priceValue);
      case "year-desc":
        return filtered.slice().sort((a, b) => Number(b.year) - Number(a.year));
      case "year-asc":
        return filtered.slice().sort((a, b) => Number(a.year) - Number(b.year));
      case "brand-asc":
        return filtered
          .slice()
          .sort((a, b) => a.make.localeCompare(b.make) || a.model.localeCompare(b.model));
      default:
        return filtered;
    }
  }, [search, brand, priceRange, category, sort]);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{t("inv.eyebrow")}</span>
          <h1>{t("inv.title")}</h1>
          <p className="lead">{t("inv.lead")}</p>
        </div>
      </section>

      <section className="section section--compact-top">
        <div className="container">
          <div className="toolbar">
            <div className="search-field">
              <SearchIcon />
              <input
                type="search"
                id="inventory-search"
                placeholder={t("inv.searchPlaceholder")}
                aria-label="Search inventory by make or model"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="toolbar__selects">
              <div className="select-field">
                <label htmlFor="brand-filter">{t("inv.brand")}</label>
                <select
                  id="brand-filter"
                  aria-label="Filter by brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                >
                  <option value="all">{t("inv.allBrands")}</option>
                  {BRANDS.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-field">
                <label htmlFor="price-filter">{t("inv.price")}</label>
                <select
                  id="price-filter"
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
                <label htmlFor="sort-select">{t("inv.sortBy")}</label>
                <select
                  id="sort-select"
                  aria-label="Sort vehicles"
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

          <div className="filter-bar" role="group" aria-label="Filter vehicles by type">
            {CATEGORIES.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className="filter-chip"
                aria-pressed={category === chip.value}
                onClick={() => setCategory(chip.value)}
              >
                {t(chip.key)}
              </button>
            ))}
          </div>

          <p className="results-count">
            {t("inv.showing")} {results.length} {t("inv.of")} {VEHICLES.length} {t("inv.vehicles")}
          </p>

          <div className="grid grid--4">
            {results.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="empty-state" data-visible={String(results.length === 0)}>
            <h3>{t("inv.emptyTitle")}</h3>
            <p>
              <span>{t("inv.emptyText")}</span>{" "}
              <Link href="/contact" style={{ color: "var(--color-accent)" }}>
                {t("inv.contactUs")}
              </Link>{" "}
              <span>{t("inv.arriving")}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
