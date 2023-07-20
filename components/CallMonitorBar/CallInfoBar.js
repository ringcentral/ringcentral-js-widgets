"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfoBar = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = require("../Button");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CallInfoBar = function CallInfoBar(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    onClick = _ref.onClick,
    _ref$currentLocale = _ref.currentLocale,
    currentLocale = _ref$currentLocale === void 0 ? '' : _ref$currentLocale,
    _ref$shouldDisplayVie = _ref.shouldDisplayViewCallsBtn,
    shouldDisplayViewCallsBtn = _ref$shouldDisplayVie === void 0 ? false : _ref$shouldDisplayVie,
    _ref$useV = _ref.useV2,
    useV2 = _ref$useV === void 0 ? false : _ref$useV,
    _ref$dataSign = _ref.dataSign,
    dataSign = _ref$dataSign === void 0 ? '' : _ref$dataSign;
  var buttonText = useV2 ? 'view' : 'viewCalls';
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: useV2 ? _styles["default"].callInfoBarV2 : _styles["default"].bar
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].currentCallInfo,
    title: label,
    onClick: onClick,
    "data-sign": dataSign
  }, label), shouldDisplayViewCallsBtn ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: _styles["default"].viewCallsBtn,
    tooltip: _i18n["default"].getString(buttonText, currentLocale),
    onClick: onClick,
    dataSign: "viewCalls"
  }, _i18n["default"].getString(buttonText, currentLocale)) : null);
};
exports.CallInfoBar = CallInfoBar;
//# sourceMappingURL=CallInfoBar.js.map
