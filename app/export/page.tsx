import type { Metadata } from "next";
import { ExportView } from "./ExportView";

export const metadata: Metadata = {
  title: "Export Cars",
  description:
    "German market vehicles sourced for export, priced at net export cost before shipping, duties, and destination registration.",
};

export default function ExportPage() {
  return <ExportView />;
}
