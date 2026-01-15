"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = detectBrowserLocale;
exports.getBrowserLocale = getBrowserLocale;
var _i18n = require("@ringcentral-integration/i18n");
/**
 * @function
 * @description Detects the default locale from browser if applicable and fall back to
 *   the specified defaultLocale.
 * @param {String} defaultLocale - (optional) The default locale for the application,
 *   default is 'en-US'.
 * @return {String}
 */
function detectBrowserLocale() {
  var defaultLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _i18n.DEFAULT_LOCALE;
  var browserLocale = getBrowserLocale();
  if (browserLocale) {
    return (0, _i18n.formatLocale)(browserLocale);
  }
  return defaultLocale;
}

/**
 * get the current browser locale
 */
function getBrowserLocale() {
  if (typeof navigator !== 'undefined') {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    }
    if (navigator.language) {
      return navigator.language;
    }
  }
}
//# sourceMappingURL=index.js.map
