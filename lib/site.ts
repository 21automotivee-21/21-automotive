// Business facts that appeared hard-coded in every page of the static site.
export const SITE = {
  name: "21 Automotive",
  phoneDisplay: "+20 150 058 5100",
  phoneHref: "tel:+201500585100",
  email: "21automotivee@gmail.com",
  addressLine1: "1234 Auto Plaza Drive",
  addressLine2: "Los Angeles, CA 90001",
} as const;

/** Primary navigation, in the order the static site listed it. */
export const NAV_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/inventory", key: "nav.inventory" },
  { href: "/export", key: "nav.exportCars" },
  { href: "/book-test-drive", key: "nav.bookTestDrive" },
  { href: "/financing", key: "nav.financing" },
] as const;

/** Secondary links, shown under the navbar's "More" dropdown. */
export const NAV_MORE_LINKS = [
  { href: "/warranty", key: "nav.warranty" },
  { href: "/service-packages", key: "nav.servicePackages" },
  { href: "/accessories", key: "nav.accessories" },
] as const;

/** Every link the footer lists under "Quick Links". */
export const FOOTER_LINKS = [
  ...NAV_LINKS,
  ...NAV_MORE_LINKS,
  { href: "/contact", key: "nav.contact" },
] as const;
