"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoNotCallIndicator = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _Tooltip = require("../Rcui/Tooltip");
var _i18n = _interopRequireDefault(require("./i18n"));
var _DoNotCallIndicator = require("./styles/DoNotCallIndicator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DoNotCallIndicator = function DoNotCallIndicator(_ref) {
  var currentLocale = _ref.currentLocale;
  return /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: _i18n["default"].getString('doNotCall', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_DoNotCallIndicator.DoNotCallWrapper, {
    "data-sign": "doNotCall"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    color: "neutral.f04",
    symbol: _junoIcon.Blocked,
    size: "xsmall"
  })));
};
exports.DoNotCallIndicator = DoNotCallIndicator;
//# sourceMappingURL=DoNotCallIndicator.js.map
