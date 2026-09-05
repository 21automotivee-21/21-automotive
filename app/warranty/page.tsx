import type { Metadata } from "next";
import { WarrantyView } from "./WarrantyView";

export const metadata: Metadata = {
  title: "Warranty",
  description:
    "Every vehicle we sell is backed by genuine warranty protection — see exactly what's included and what you can add.",
};

export default function WarrantyPage() {
  return <WarrantyView />;
}
