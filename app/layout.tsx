import type { Metadata } from "next";
import { Inter, Space_Grotesk, Tajawal } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { getPreferences } from "@/lib/i18n/server";
import { dirFor } from "@/lib/i18n/settings";
import "./globals.css";

// Self-hosted through next/font, so there's no render-blocking request to
// Google's CDN the way the static site had. The CSS references these through
// the --font-display / --font-body tokens.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL in production so Open Graph image URLs resolve
  // against the real domain instead of localhost.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "21 Automotive — Premium New & Pre-Owned Vehicles",
    template: "%s — 21 Automotive",
  },
  description:
    "21 Automotive is your destination for hand-picked new and certified pre-owned vehicles, transparent pricing, and a team that treats you right.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Read the saved preference on the server so the very first HTML response is
  // already in the right language and direction — no flash, no hydration gap.
  const { lang, currency } = await getPreferences();

  const fontVars = `${inter.variable} ${spaceGrotesk.variable} ${tajawal.variable}`;

  return (
    <html
      lang={lang}
      dir={dirFor(lang)}
      className={`${fontVars}${lang === "ar" ? " lang-ar" : ""}`}
    >
      <body>
        <I18nProvider initialLang={lang} initialCurrency={currency}>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ChatWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
