import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VEHICLES, findVehicle } from "@/lib/data/vehicles";
import { VehicleView } from "./VehicleView";

/** Inventory is a fixed data set, so every detail page can be prerendered. */
export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({ params }: PageProps<"/vehicle/[id]">): Promise<Metadata> {
  const { id } = await params;
  const vehicle = findVehicle(id);
  if (!vehicle) return { title: "Vehicle not found" };

  return {
    title: vehicle.name,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.name} — 21 Automotive`,
      description: vehicle.description,
      images: [{ url: vehicle.image }],
    },
  };
}

export default async function VehiclePage({ params }: PageProps<"/vehicle/[id]">) {
  const { id } = await params;
  const vehicle = findVehicle(id);
  if (!vehicle) notFound();

  return <VehicleView vehicle={vehicle} />;
}
