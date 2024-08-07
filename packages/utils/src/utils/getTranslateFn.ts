/* eslint-disable @typescript-eslint/no-explicit-any */
import type I18n from '@ringcentral-integration/i18n';
import { RUNTIME } from '@ringcentral-integration/i18n';

import { format } from './format';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type ExtractBraces<S extends string> =
  S extends `${infer _Start}{${infer Param}}${infer Rest}`
    ?
        | {
            [K in Param]: string | number;
          }
        | ExtractBraces<Rest>
    : never;
type UnwrapI18n<T> = T extends I18n<infer U> ? U : never;
type MergeTypes<T, U> = T & U;

export type MergeI18nArray<Types extends any[]> = Types extends [
  infer First,
  ...infer Rest,
]
  ? MergeTypes<UnwrapI18n<First>, MergeI18nArray<Rest>>
  : unknown;

export interface Format<T extends Record<string, string>> {
  /**
   * i18n method `t`
   * Format using an object hash with keys matching [0-9a-zA-Z]+
   *
   * ```ts
   * showMessageWithSlot => '{hello} Show message'
   *
   * const message2 = t('showMessageWithSlot', { hello: 'Hello world' }); // => 'Hello world Show message'
   * ```
   */
  <K extends keyof T>(
    string: K,
    object: UnionToIntersection<ExtractBraces<T[K]>>,
  ): string;
  /**
   * i18n method `t`
   * Format using a number indexed array
   *
   * ```ts
   * showMessageWithArraySlot => '{0} Show message {1}'
   *
   * const message3 = t('showMessageWithArraySlot', [1, 2]); // => '1 Show message 2'
   * ```
   */
  <K extends keyof T>(string: K, array: Array<any>): string;
  /**
   * i18n method `t`
   * Escape {} pairs by using double {{}}
   *
   * ```ts
   * showMessage => 'Show message'
   * showMessageWithSlot => '{hello} Show message'
   * showMessageWithArraySlot => '{0} Show message {1}'
   *
   * const message1 = t('showMessage'); // => 'Show message'
   * const message2 = t('showMessageWithSlot', { hello: 'Hello world' }); // => 'Hello world Show message'
   * const message3 = t('showMessageWithArraySlot', [1, 2]); // => '1 Show message 2'
   * const message4 = t('showMessageWithArraySlot', 1, 2); // => '1 Show message 2'
   * ```
   */
  <K extends keyof T>(string: K): string;
}
/**
 * provide method to work translate and format string
 */
export const getTranslateFn = <
  T extends Array<I18n<any>>,
  P extends Record<string, string> = MergeI18nArray<T>,
>(
  ...i18nInput: T
): Format<P> => {
  const i18nInstances = Array.isArray(i18nInput) ? i18nInput : [i18nInput];

  if (process.env.NODE_ENV !== 'production') {
    class TranslateError extends Error {
      constructor(message: string, ...rest: any[]) {
        super(message);
        this.name = 'TranslateError';
      }
    }

    if (i18nInstances.length > 1) {
      const [firstI18n, ...rest] = i18nInstances;

      rest.forEach((nextI18n) => {
        Object.keys(firstI18n._cache[RUNTIME.defaultLocale] || {}).forEach(
          (key) => {
            if (
              Object.prototype.hasOwnProperty.call(
                nextI18n._cache[RUNTIME.defaultLocale],
                key,
              )
            ) {
              // eslint-disable-next-line no-console
              console.warn(
                new TranslateError(
                  `[i18n] i18n files has duplicated key "${key}"`,
                ),
                {
                  duplicatedKey: key,
                  i18nInstances,
                },
              );
            }
          },
        );
      });
    }
  }

  return (key: any, ...options: any[]) => {
    let i18nString = key as string;

    i18nInstances.some((i18nInstance) => {
      const result = i18nInstance.getString(key as any);
      if (result !== key) {
        i18nString = result;

        return true;
      }

      return false;
    });

    if (options.length > 0) {
      return format(i18nString, ...options);
    }
    return i18nString;
  };
};
