import type { Metadata } from "next";
import { findVehicle } from "@/lib/data/vehicles";
import { FinancingView } from "./FinancingView";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Estimate a monthly payment with our loan calculator, then get pre-qualified in minutes — it won't affect your credit score.",
};

export default async function FinancingPage({ searchParams }: PageProps<"/financing">) {
  // Arriving from a vehicle detail page prefills the calculator with its price.
  const { id } = await searchParams;
  const vehicle = (typeof id === "string" ? findVehicle(id) : undefined) ?? null;

  return <FinancingView vehicle={vehicle} />;
}
