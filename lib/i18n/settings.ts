// Language & currency engine, ported from the static site's js/i18n.js.
//
// The one structural change: preferences live in cookies rather than
// localStorage, so the server can render the correct language and currency on
// the first response. That removes the flash of English (and of LTR layout)
// that a client-only store would cause on every navigation.

import {
  CURRENCIES,
  DICT,
  ENUM_MAPS,
} from "./dictionary";

export type Lang = "en" | "ar";
export type CurrencyCode = keyof typeof CURRENCIES;
export type EnumKind = keyof typeof ENUM_MAPS;

export const LANG_COOKIE = "site-lang";
export const CURRENCY_COOKIE = "site-currency";

export const DEFAULT_LANG: Lang = "en";
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

// One year, matching how long localStorage effectively kept the old value.
export const PREF_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const dict = DICT as Record<Lang, Record<string, string>>;
const enumMaps = ENUM_MAPS as Record<EnumKind, Record<string, string>>;

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "ar";
}

export function isCurrency(value: unknown): value is CurrencyCode {
  return typeof value === "string" && value in CURRENCIES;
}

export function normalizeLang(value: unknown): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}

export function normalizeCurrency(value: unknown): CurrencyCode {
  return isCurrency(value) ? value : DEFAULT_CURRENCY;
}

/** Look up a translation, falling back to English and then to the key itself. */
export function translate(lang: Lang, key: string): string {
  return dict[lang]?.[key] ?? dict.en[key] ?? key;
}

/**
 * Translate a shared enum value (vehicle category/condition/fuel/transmission).
 * Falls back to the English value when no Arabic mapping exists.
 */
export function translateEnum(lang: Lang, kind: EnumKind, value: string): string {
  if (lang !== "ar") return value;
  return enumMaps[kind]?.[value] ?? value;
}

/** Convert a USD figure into the active display currency. */
export function formatPrice(currency: CurrencyCode, usdValue: number | string): string {
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const converted = Number(usdValue) * cur.rate;
  const rounded = converted >= 1000 ? Math.round(converted / 10) * 10 : Math.round(converted);
  const numStr = rounded.toLocaleString("en-US");
  return cur.position === "before" ? `${cur.symbol}${numStr}` : `${numStr} ${cur.symbol}`;
}

export function dirFor(lang: Lang): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

export { CURRENCIES };
