import { cookies } from "next/headers";
import {
  CURRENCY_COOKIE,
  LANG_COOKIE,
  normalizeCurrency,
  normalizeLang,
  type CurrencyCode,
  type Lang,
} from "./settings";

/**
 * Read the visitor's saved language/currency on the server so the first
 * rendered HTML already matches their preference.
 */
export async function getPreferences(): Promise<{ lang: Lang; currency: CurrencyCode }> {
  const store = await cookies();
  return {
    lang: normalizeLang(store.get(LANG_COOKIE)?.value),
    currency: normalizeCurrency(store.get(CURRENCY_COOKIE)?.value),
  };
}
