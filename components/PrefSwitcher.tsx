"use client";

import { CURRENCIES, useI18n } from "@/lib/i18n/I18nProvider";
import type { CurrencyCode, Lang } from "@/lib/i18n/settings";

const LANGS: Lang[] = ["en", "ar"];

/** Language toggle + currency picker, shared by the desktop and mobile navbar. */
export function PrefSwitcher() {
  const { lang, currency, setLang, setCurrency } = useI18n();

  return (
    <div className="pref-switcher">
      <div className="lang-toggle" role="group" aria-label="Language">
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            className="lang-btn"
            aria-pressed={code === lang}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
      <select
        className="currency-select"
        aria-label="Currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
      >
        {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
}
