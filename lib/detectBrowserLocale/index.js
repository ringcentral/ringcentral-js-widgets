'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectBrowserLocale;

var _formatLocale = require('locale-loader/lib/formatLocale');

var _formatLocale2 = _interopRequireDefault(_formatLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_LOCALE = 'en-US';

/**
 * @function
 * @description Detects the default locale from browser if applicable and fall back to
 *   the specified defaultLocale.
 * @param {String} defaultLocale - (optional) The default locale for the application,
 *   default is 'en-US'.
 * @return {String}
 */
function detectBrowserLocale() {
  var defaultLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_LOCALE;

  if (typeof navigator !== 'undefined') {
    if (navigator.languages && navigator.languages.length) {
      return (0, _formatLocale2.default)(navigator.languages[0]);
    } else if (navigator.language) {
      return (0, _formatLocale2.default)(navigator.language);
    }
  }
  return (0, _formatLocale2.default)(defaultLocale);
}
//# sourceMappingURL=index.js.map
