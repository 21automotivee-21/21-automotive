import type { Metadata } from "next";
import { ServicePackagesView } from "./ServicePackagesView";

export const metadata: Metadata = {
  title: "Service Packages",
  description:
    "Straightforward maintenance packages with transparent pricing — no upsells, no surprise line items.",
};

export default function ServicePackagesPage() {
  return <ServicePackagesView />;
}
