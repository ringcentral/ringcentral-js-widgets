'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectDefaultLocale;
var DEFAULT_LOCALE = 'en-US';

/**
 * @function
 * @description Detects the default locale from browser if applicable and fall back to
 *   the specified defaultLocale.
 * @param {String} defaultLocale - (optional) The default locale for the application,
 *   default is 'en-US'.
 * @return {String}
 */
function detectDefaultLocale() {
  var defaultLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_LOCALE;

  var browserLocale = defaultLocale;
  if (typeof navigator !== 'undefined') {
    if (navigator.languages && navigator.languages.length) {
      browserLocale = navigator.languages[0];
    } else {
      browserLocale = navigator.language || defaultLocale;
    }
  }
  var tokens = browserLocale.split(/[-_]/);
  return tokens.map(function (v, idx) {
    if (idx) {
      return v.toUpperCase();
    }
    return v.toLowerCase();
  }).join('-');
}
//# sourceMappingURL=index.js.map
