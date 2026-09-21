import { DEFAULT_LOCALE, PSEUDO_LOCALE } from '../../constants';
import I18n from '../../i18n';
import { getLanguageFromLocale } from '../getLanguageFromLocale';
import { toPseudoStringWithPadding } from '../toPseudoString';

import {
  I18nFlag,
  I18nStrings,
  LocaleCode,
  type ConvertI18nToString,
} from './type';

export type { ConvertI18nToString } from './type';

/**
 * processI18n takes brandConfigs with I18nStrings objects and based on the locale, return brandConfig without the I18nStrings.
 * @param config BrandConfig
 * @param locale
 * @param defaultLocale
 * @param parentKey parent key of object
 * @returns BrandConfig without I18nStrings structure
 */
export function processI18n<T>(
  input: T,
  locale: LocaleCode = DEFAULT_LOCALE,
  defaultLocale: LocaleCode = DEFAULT_LOCALE,
  parentKey?: string,
): ConvertI18nToString<T> {
  if (Array.isArray(input)) {
    return input.map((item) =>
      processI18n(item, locale, defaultLocale),
    ) as ConvertI18nToString<T>;
  }
  if (input && typeof input === 'object') {
    if ((input as unknown as I18nStrings)[I18nFlag]) {
      if (locale === PSEUDO_LOCALE) {
        return toPseudoStringWithPadding({
          str:
            (input as unknown as I18nStrings).translations[defaultLocale] ??
            parentKey,
          padRatio: I18n.padRatio,
        }) as unknown as ConvertI18nToString<T>;
      }
      return ((input as unknown as I18nStrings).translations[locale] ??
        (input as unknown as I18nStrings).translations[
          getLanguageFromLocale(locale)
        ] ??
        (input as unknown as I18nStrings).translations[
          defaultLocale
        ]) as unknown as ConvertI18nToString<T>;
    }
    return Object.keys(input).reduce((acc, key) => {
      if (Object.hasOwnProperty.call(input, key)) {
        acc[key] = processI18n((input as any)[key], locale, defaultLocale, key);
      }
      return acc;
    }, {} as any) as ConvertI18nToString<T>;
  }

  return input as ConvertI18nToString<T>;
}
