export const I18nFlag = '__i18n__';

export type I18nStrings<T = string> = {
  [I18nFlag]: true;
  translations: {
    [k: string]: T;
  };
};

export type LocaleCode = string;

/**
 * Output shape of `processI18n` for input type `T`.
 *
 * Runtime behavior for nullish values:
 * - Top-level or nested `null` / `undefined` are returned unchanged (`input && typeof input === 'object'`
 *   skips processing; primitives fall through to `return input`).
 * - On objects, `Object.keys` still visits keys whose value is `null` or `undefined`, and
 *   `processI18n` is called on those values, so the property stays `null` or `undefined`.
 *
 * `T[K] extends string | I18nStrings` does not include `null` or `undefined`, so those flow to
 * `ConvertI18nToString<T[K]>`. That conditional type distributes over unions, so e.g.
 * `string | undefined` → `string | undefined` and `Nested | null` → `ConvertI18nToString<Nested> | null`.
 *
 * `I18nStrings` must be handled before a plain `object` branch so it collapses to `string` instead
 * of being mapped field-by-field.
 */
export type ConvertI18nToString<T> = T extends ReadonlyArray<infer D>
  ? Array<ConvertI18nToString<D>>
  : T extends I18nStrings
  ? string
  : T extends object
  ? {
      [K in keyof T]: T[K] extends string | I18nStrings
        ? string
        : ConvertI18nToString<T[K]>;
    }
  : T;
