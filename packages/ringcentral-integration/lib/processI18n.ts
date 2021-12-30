import { keys, map, reduce } from 'ramda';

import I18n, {
  DEFAULT_LOCALE,
  PSEUDO_LOCALE,
} from '@ringcentral-integration/i18n';
import { getLanguageFromLocale } from '@ringcentral-integration/i18n/lib/getLanguageFromLocale';
import toPseudoString from '@ringcentral-integration/i18n/lib/toPseudoString';
import { LocaleCode } from '@ringcentral-integration/locale-settings';

import { I18nFlag, I18nStrings } from '../modules/Brand/BrandConfig.interface';

// TODO: find a better place to put this file

export type ConvertI18nToString<T> = T extends Array<infer D>
  ? Array<ConvertI18nToString<D>>
  : T extends object
  ? {
      [K in keyof T]: T[K] extends string | I18nStrings
        ? string
        : ConvertI18nToString<T[K]>;
    }
  : T;

/**
 * processI18n takes brandConfigs with I18nStrings objects and based on the locale, return brandConfig without the I18nStrings.
 * @param config BrandConfig
 * @param locale
 * @param defaultLocale
 * @param parentKey parent key of object
 * @returns BrandConfig without I18nStrings structure
 */
export function processI18n<T extends unknown>(
  input: T,
  locale: LocaleCode = DEFAULT_LOCALE,
  defaultLocale: LocaleCode = DEFAULT_LOCALE,
  parentKey?: string,
): ConvertI18nToString<T> {
  if (Array.isArray(input)) {
    return map(
      (item) => processI18n(item, locale, defaultLocale),
      input,
    ) as ConvertI18nToString<T>;
  }
  if (input && typeof input === 'object') {
    if ((input as I18nStrings)[I18nFlag]) {
      if (locale === PSEUDO_LOCALE) {
        return toPseudoString({
          str: (input as I18nStrings).translations[defaultLocale] ?? parentKey,
          padRatio: I18n.padRatio,
        }) as ConvertI18nToString<T>;
      }
      return ((input as I18nStrings).translations[locale] ??
        (input as I18nStrings).translations[getLanguageFromLocale(locale)] ??
        (input as I18nStrings).translations[
          defaultLocale
        ]) as ConvertI18nToString<T>;
    }
    return reduce(
      (acc, key) => {
        if (Object.hasOwnProperty.call(input, key)) {
          acc[key] = processI18n(input[key], locale, defaultLocale, key);
        }
        return acc;
      },
      {} as Partial<T>,
      keys(input as object),
    ) as ConvertI18nToString<T>;
  }

  return input as ConvertI18nToString<T>;
}
