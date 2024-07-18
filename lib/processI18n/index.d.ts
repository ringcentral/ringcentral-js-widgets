import { I18nStrings, LocaleCode } from './type';
export type ConvertI18nToString<T> = T extends Array<infer D> ? Array<ConvertI18nToString<D>> : T extends object ? {
    [K in keyof T]: T[K] extends string | I18nStrings ? string : ConvertI18nToString<T[K]>;
} : T;
/**
 * processI18n takes brandConfigs with I18nStrings objects and based on the locale, return brandConfig without the I18nStrings.
 * @param config BrandConfig
 * @param locale
 * @param defaultLocale
 * @param parentKey parent key of object
 * @returns BrandConfig without I18nStrings structure
 */
export declare function processI18n<T>(input: T, locale?: LocaleCode, defaultLocale?: LocaleCode, parentKey?: string): ConvertI18nToString<T>;
