"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdaptiveTypography = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AdaptiveTypography = function AdaptiveTypography(_ref) {
  var _ref$isLock = _ref.isLock,
    isLock = _ref$isLock === void 0 ? false : _ref$isLock,
    title = _ref.title;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    component: "div",
    variant: isLock ? 'body2' : 'body1',
    color: isLock ? 'neutral.b04' : 'neutral.b06',
    "data-sign": "title"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    display: "flex",
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].title,
    title: title
  }, title), isLock && /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
    placement: "bottom",
    "data-sign": "lockButtonTooltip",
    title: (0, _i18n.t)('lockTooltip')
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    color: "neutral.f04",
    symbol: _junoIcon.LockBorder,
    style: {
      cursor: 'pointer',
      marginLeft: '8px'
    }
  }))));
};
exports.AdaptiveTypography = AdaptiveTypography;
//# sourceMappingURL=AdaptiveTypography.js.map
