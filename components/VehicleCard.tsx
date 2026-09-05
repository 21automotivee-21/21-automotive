"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Vehicle } from "@/lib/data/vehicles";
import { CalendarIcon, MileageClockIcon } from "./icons";

/** Inventory card, shared by the homepage's featured strip and the full grid. */
export function VehicleCard({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) {
  const { t, tEnum, price, isAr } = useI18n();

  const name = isAr && vehicle.ar ? vehicle.ar.name : vehicle.name;
  const category = tEnum("category", vehicle.category);
  const badgeText = vehicle.condition === "Like New" ? t("inv.likeNew") : t("inv.certified");
  const href = `/vehicle/${vehicle.id}`;

  return (
    <article className="vehicle-card" data-category={vehicle.category}>
      <Link href={href} className="vehicle-card__media">
        <span className="vehicle-card__badge">{badgeText}</span>
        <span className="vehicle-card__year">{vehicle.year}</span>
        <Image
          src={vehicle.image}
          alt={name}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          priority={priority}
        />
      </Link>
      <div className="vehicle-card__body">
        <h3>{name}</h3>
        <div className="vehicle-card__meta">
          <span>
            <CalendarIcon />
            {vehicle.year}
          </span>
          <span>
            <MileageClockIcon />
            {vehicle.mileage}
          </span>
        </div>
        <div className="vehicle-card__footer">
          <div className="vehicle-card__price">
            {price(vehicle.priceValue)}
            <span>{category}</span>
          </div>
          <Link href={href} className="btn btn-ghost btn-sm">
            {t("common.seeDetails")}
          </Link>
        </div>
      </div>
    </article>
  );
}
