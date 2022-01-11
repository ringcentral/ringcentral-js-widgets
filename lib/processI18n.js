"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processI18n = processI18n;

require("core-js/modules/es6.array.is-array");

var _ramda = require("ramda");

var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));

var _getLanguageFromLocale = require("@ringcentral-integration/i18n/lib/getLanguageFromLocale");

var _toPseudoString = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/toPseudoString"));

var _BrandConfig = require("../modules/Brand/BrandConfig.interface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
