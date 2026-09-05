import type { Metadata } from "next";
import { BookTestDriveView } from "./BookTestDriveView";

export const metadata: Metadata = {
  title: "Book a Test Drive",
  description:
    "Pick a car, choose a time that works, and we'll have it ready at the door — no pressure, no obligation.",
};

export default async function BookTestDrivePage({
  searchParams,
}: PageProps<"/book-test-drive">) {
  // Arriving from a vehicle detail page preselects that car.
  const { id } = await searchParams;
  const preselectId = typeof id === "string" ? id : null;

  return <BookTestDriveView preselectId={preselectId} />;
}
