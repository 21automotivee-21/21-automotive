import type { Metadata } from "next";
import { AccessoriesView } from "./AccessoriesView";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "Genuine and aftermarket accessories to personalize, protect, and get more out of your vehicle.",
};

export default function AccessoriesPage() {
  return <AccessoriesView />;
}
