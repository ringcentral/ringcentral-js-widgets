import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';

/**
 * @function
 * @description Detects the default locale from browser if applicable and fall back to
 *   the specified defaultLocale.
 * @param {String} defaultLocale - (optional) The default locale for the application,
 *   default is 'en-US'.
 * @return {String}
 */
export default function detectBrowserLocale(defaultLocale = DEFAULT_LOCALE) {
  if (typeof navigator !== 'undefined') {
    if (navigator.languages && navigator.languages.length) {
      return formatLocale(navigator.languages[0]);
    } else if (navigator.language) {
      return formatLocale(navigator.language);
    }
  }
  return formatLocale(defaultLocale);
}
