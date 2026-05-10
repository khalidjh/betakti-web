import { m } from '$lib/paraglide/messages.js';
import { setLocale, getLocale, locales } from '$lib/paraglide/runtime.js';

export type Locale = 'ar' | 'en';

export { m, setLocale, getLocale, locales };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'ar' || value === 'en';
}
