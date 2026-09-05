"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  CURRENCIES,
  CURRENCY_COOKIE,
  LANG_COOKIE,
  PREF_COOKIE_MAX_AGE,
  dirFor,
  formatPrice as formatPriceIn,
  translate,
  translateEnum as translateEnumIn,
  type CurrencyCode,
  type EnumKind,
  type Lang,
} from "./settings";

type I18nValue = {
  lang: Lang;
  currency: CurrencyCode;
  isAr: boolean;
  /** Translate a dictionary key for the active language. */
  t: (key: string) => string;
  /** Translate a vehicle enum value (category/condition/fuel/transmission). */
  tEnum: (kind: EnumKind, value: string) => string;
  /** Render a USD amount in the active display currency. */
  price: (usdValue: number | string) => string;
  setLang: (lang: Lang) => void;
  setCurrency: (currency: CurrencyCode) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function writePref(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${PREF_COOKIE_MAX_AGE}; samesite=lax`;
}

export function I18nProvider({
  initialLang,
  initialCurrency,
  children,
}: {
  initialLang: Lang;
  initialCurrency: CurrencyCode;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [currency, setCurrencyState] = useState<CurrencyCode>(initialCurrency);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writePref(LANG_COOKIE, next);
    // The <html> attributes are rendered by the server layout, which doesn't
    // re-run on a client-side preference change — so keep them in sync here.
    const root = document.documentElement;
    root.lang = next;
    root.dir = dirFor(next);
    root.classList.toggle("lang-ar", next === "ar");
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    writePref(CURRENCY_COOKIE, next);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      currency,
      isAr: lang === "ar",
      t: (key: string) => translate(lang, key),
      tEnum: (kind: EnumKind, val: string) => translateEnumIn(lang, kind, val),
      price: (usdValue: number | string) => formatPriceIn(currency, usdValue),
      setLang,
      setCurrency,
    }),
    [lang, currency, setLang, setCurrency],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

export { CURRENCIES };
