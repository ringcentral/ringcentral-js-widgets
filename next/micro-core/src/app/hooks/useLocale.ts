/* eslint-disable @typescript-eslint/no-explicit-any */
import type I18n from '@ringcentral-integration/i18n';
import { useConnector } from '@ringcentral-integration/next-core';
import {
  Format,
  getTranslateFn,
  type MergeI18nArray,
} from '@ringcentral-integration/utils';
import { useCallback } from 'react';

import type { Locale } from '../../app/services';

/**
 * get `currentLocale` and that i18n method `t` for easy use i18n in component
 *
 * @example
 *
 * - `en-US.ts`
 *  ```tsx
 *  export default {
 *    showMessage: '{hello} {name} Show message',
 *  };
 *  ```
 *
 * - `main.ts`
 *
 * ```tsx
 * import i18n from './i18n';
 *
 * const { t, currentLocale } = useLocale(i18n);
 *
 * const showMessage = t('showMessage', {
 *   hello: 'Hello world',
 *   name: 'John',
 * });
 * ```
 */
export const useLocale = <
  T extends Array<I18n<any>>,
  P extends Record<string, string> = MergeI18nArray<T>,
>(
  /**
   * current i18n instance
   */
  ...i18nInstance: T
) => {
  const currentLocale = useConnector((getModules) => {
    const locale = getModules<Locale>('Locale');

    return locale.currentLocale;
  });

  const t: Format<P> = useCallback(
    getTranslateFn(...i18nInstance),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLocale],
  );

  return {
    /**
     * current locale
     */
    currentLocale,
    /**
     * i18n method `t`
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
    t,
  };
};
