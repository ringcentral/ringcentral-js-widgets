import formatLocale from './formatLocale';

/**
 * get accept locale map, use for map the outside locale to the supported locale
 *
 * @param supportedLocales
 */
export const getAcceptLocaleMap = (supportedLocales: readonly string[]) => {
  const map = new Map<string, string>();

  // Process all supported locales
  supportedLocales.forEach((locale) => {
    const formattedLocale = formatLocale(locale);
    // Add exact matches
    map.set(formattedLocale, formattedLocale);

    // Add language-only matches (only if not already set)
    const language = formattedLocale.split('-')[0];
    if (!map.has(language)) {
      map.set(language, formattedLocale);
    }
  });

  return map;
};
