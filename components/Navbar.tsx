"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { NAV_LINKS, NAV_MORE_LINKS, SITE } from "@/lib/site";
import { PrefSwitcher } from "./PrefSwitcher";
import { ChevronDownIcon, PhoneIcon } from "./icons";

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Below this width the language/currency switcher, phone number, and CTA
  // move into the slide-down menu so the top bar never overflows.
  const isMobile = useMediaQuery("(max-width: 860px)");

  // Following any link closes the slide-down menu and the dropdown.
  const closeMenus = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  useEffect(() => {
    if (!moreOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };

    document.addEventListener("click", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const phoneLink = (
    <a className="navbar__phone" href={SITE.phoneHref}>
      <PhoneIcon />
      <strong>{SITE.phoneDisplay}</strong>
    </a>
  );

  const ctaLink = (
    <Link href="/contact" className="btn btn-primary btn-sm" onClick={closeMenus}>
      {t("nav.getInTouch")}
    </Link>
  );

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link href="/" className="brand">
          <span className="brand__mark">21</span>
          <span className="brand__name">
            Automotive<span>{t("nav.tagline")}</span>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links" id="primary-nav" data-open={String(menuOpen)}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={closeMenus}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}

            <li className="nav-dropdown" ref={dropdownRef} data-open={String(moreOpen)}>
              <button
                type="button"
                className="nav-dropdown__toggle"
                aria-expanded={moreOpen}
                aria-haspopup="true"
                onClick={() => setMoreOpen((open) => !open)}
              >
                <span>{t("nav.more")}</span>
                <ChevronDownIcon />
              </button>
              <ul className="nav-dropdown__menu">
                {NAV_MORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      onClick={closeMenus}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
                onClick={closeMenus}
              >
                {t("nav.contact")}
              </Link>
            </li>

            {isMobile && (
              <li className="nav-mobile-extra">
                <PrefSwitcher />
                {phoneLink}
                {ctaLink}
              </li>
            )}
          </ul>
        </nav>

        <div className="navbar__actions">
          {!isMobile && (
            <>
              <PrefSwitcher />
              {phoneLink}
              {ctaLink}
            </>
          )}
          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
