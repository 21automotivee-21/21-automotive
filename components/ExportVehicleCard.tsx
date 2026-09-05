"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { ExportVehicle } from "@/lib/data/export-vehicles";
import { BoltIcon, CarIcon, FuelIcon, GaugeIcon } from "./icons";

/**
 * Export listings are always priced in EUR — export pricing isn't run through
 * the site's USD-based currency switcher.
 */
export function formatEUR(value: number): string {
  return "€" + Math.round(Number(value)).toLocaleString("en-DE");
}

export function ExportVehicleCard({ vehicle }: { vehicle: ExportVehicle }) {
  const { t } = useI18n();

  const fuelLabel = vehicle.fuel === "Diesel" ? t("export.fuelDiesel") : t("export.fuelPetrol");

  return (
    <article className="vehicle-card vehicle-card--export">
      <div className="vehicle-card__media vehicle-card__media--placeholder">
        <span className="vehicle-card__badge">🇩🇪 {t("export.origin")}</span>
        <span className="vehicle-card__year">{vehicle.year}</span>
        <CarIcon className="vehicle-card__media-icon" />
        {!vehicle.titleAvailable && (
          <span className="vehicle-card__warning">{t("export.titleMissing")}</span>
        )}
      </div>
      <div className="vehicle-card__body">
        <h3>
          {vehicle.make} {vehicle.model}{" "}
          <span style={{ color: "var(--color-text-faint)", fontWeight: 500 }}>{vehicle.trim}</span>
        </h3>
        <div className="vehicle-card__meta">
          <span>
            <GaugeIcon />
            {vehicle.mileageKm.toLocaleString("en-DE")} km
          </span>
          <span>
            <FuelIcon />
            {fuelLabel}
          </span>
          <span>
            <BoltIcon />
            {vehicle.powerPS} PS
          </span>
        </div>
        <div className="vehicle-card__tags">
          {vehicle.accidentFree && <span className="pill">{t("export.accidentFree")}</span>}
          {vehicle.vatStatus === "deductible" ? (
            <span className="pill pill--accent">{t("export.vatDeductible")}</span>
          ) : (
            <span className="pill">{t("export.marginTaxed")}</span>
          )}
        </div>
        <div className="vehicle-card__footer">
          <div className="vehicle-card__price">
            {formatEUR(vehicle.netPriceEUR)}
            <span>{t("export.netPriceNote")}</span>
          </div>
          <Link href="/contact" className="btn btn-ghost btn-sm">
            {t("export.enquire")}
          </Link>
        </div>
      </div>
    </article>
  );
}
