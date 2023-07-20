"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Locale = void 0;
var _react = _interopRequireDefault(require("react"));
var _InputLine = _interopRequireDefault(require("../InputLine"));
var _LocalePicker = _interopRequireDefault(require("../LocalePicker"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Locale = function Locale(_ref) {
  var supportedLocales = _ref.supportedLocales,
    currentLocale = _ref.currentLocale,
    savedLocale = _ref.savedLocale,
    saveLocale = _ref.saveLocale;
  if (supportedLocales && supportedLocales.length > 1) {
    return /*#__PURE__*/_react["default"].createElement(_InputLine["default"], {
      label: _i18n["default"].getString('language', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_LocalePicker["default"]
    // @ts-expect-error TS(2769): No overload matches this call.
    , {
      value: savedLocale,
      onChange: saveLocale,
      options: supportedLocales
    }));
  }
  return null;
};
exports.Locale = Locale;
//# sourceMappingURL=Locale.js.map
