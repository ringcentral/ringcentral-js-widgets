import { DEFAULT_LOCALE, formatLocale } from '@ringcentral-integration/i18n';

/**
 * @function
 * @description Detects the default locale from browser if applicable and fall back to
 *   the specified defaultLocale.
 * @param {String} defaultLocale - (optional) The default locale for the application,
 *   default is 'en-US'.
 * @return {String}
 */
export default function detectBrowserLocale(
  defaultLocale: string = DEFAULT_LOCALE,
): string {
  const browserLocale = getBrowserLocale();
  if (browserLocale) {
    return formatLocale(browserLocale);
  }

  return defaultLocale;
}

/**
 * get the current browser locale
 */
export function getBrowserLocale() {
  if (typeof navigator !== 'undefined') {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    }
    if (navigator.language) {
      return navigator.language;
    }
  }
}
