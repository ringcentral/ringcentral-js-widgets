"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.iterator");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processI18n = processI18n;
var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));
var _getLanguageFromLocale = require("@ringcentral-integration/i18n/lib/getLanguageFromLocale");
var _toPseudoString = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/toPseudoString"));
var _ramda = require("ramda");
var _BrandConfig = require("../modules/Brand/BrandConfig.interface");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// TODO: find a better place to put this file

/**
 * processI18n takes brandConfigs with I18nStrings objects and based on the locale, return brandConfig without the I18nStrings.
 * @param config BrandConfig
 * @param locale
 * @param defaultLocale
 * @param parentKey parent key of object
 * @returns BrandConfig without I18nStrings structure
 */
function processI18n(input) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _i18n.DEFAULT_LOCALE;
  var defaultLocale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _i18n.DEFAULT_LOCALE;
  var parentKey = arguments.length > 3 ? arguments[3] : undefined;
  if (Array.isArray(input)) {
    return (0, _ramda.map)(function (item) {
      return processI18n(item, locale, defaultLocale);
    }, input);
  }
  if (input && _typeof(input) === 'object') {
    if (input[_BrandConfig.I18nFlag]) {
      var _ref, _translations$locale;
      if (locale === _i18n.PSEUDO_LOCALE) {
        var _translations$default;
        return (0, _toPseudoString["default"])({
          str: (_translations$default = input.translations[defaultLocale]) !== null && _translations$default !== void 0 ? _translations$default : parentKey,
          padRatio: _i18n["default"].padRatio
        });
      }
      return (_ref = (_translations$locale = input.translations[locale]) !== null && _translations$locale !== void 0 ? _translations$locale : input.translations[(0, _getLanguageFromLocale.getLanguageFromLocale)(locale)]) !== null && _ref !== void 0 ? _ref : input.translations[defaultLocale];
    }
    return (0, _ramda.reduce)(function (acc, key) {
      if (Object.hasOwnProperty.call(input, key)) {
        acc[key] = processI18n(input[key], locale, defaultLocale, key);
      }
      return acc;
    }, {}, (0, _ramda.keys)(input));
  }
  return input;
}
//# sourceMappingURL=processI18n.js.map
