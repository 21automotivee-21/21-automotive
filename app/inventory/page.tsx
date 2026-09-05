import type { Metadata } from "next";
import { InventoryView } from "./InventoryView";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse hand-picked new and certified pre-owned vehicles at 21 Automotive. Filter by brand, price, and body type.",
};

export default function InventoryPage() {
  return <InventoryView />;
}
