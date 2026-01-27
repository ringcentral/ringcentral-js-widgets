"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocale = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _react = require("react");
/* eslint-disable @typescript-eslint/no-explicit-any */

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
var useLocale = exports.useLocale = function useLocale() {
  var currentLocale = (0, _nextCore.useConnector)(function (getModules) {
    var locale = getModules('Locale');
    return locale.currentLocale;
  });
  var t = (0, _react.useCallback)(_utils.getTranslateFn.apply(void 0, arguments),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [currentLocale]);
  return {
    /**
     * current locale
     */
    currentLocale: currentLocale,
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
    t: t
  };
};
//# sourceMappingURL=useLocale.js.map
