"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Locale = void 0;
var _react = _interopRequireDefault(require("react"));
var _InputLine = _interopRequireDefault(require("../InputLine"));
var _LocalePicker = _interopRequireDefault(require("../LocalePicker"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Locale = function Locale(_ref) {
  var supportedLocales = _ref.supportedLocales,
    savedLocale = _ref.savedLocale,
    saveLocale = _ref.saveLocale;
  if (savedLocale && saveLocale && supportedLocales && supportedLocales.length > 1) {
    return /*#__PURE__*/_react["default"].createElement(_InputLine["default"], {
      label: (0, _i18n.t)('language')
    }, /*#__PURE__*/_react["default"].createElement(_LocalePicker["default"], {
      value: savedLocale,
      onChange: saveLocale,
      options: supportedLocales
    }));
  }
  return null;
};
exports.Locale = Locale;
//# sourceMappingURL=Locale.js.map
