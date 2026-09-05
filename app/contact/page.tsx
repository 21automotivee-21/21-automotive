import type { Metadata } from "next";
import { ContactView } from "./ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit the lot, call ahead, or send us a message — we typically reply within one business day.",
};

export default function ContactPage() {
  return <ContactView />;
}
