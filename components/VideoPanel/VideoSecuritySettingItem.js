"use strict";

require("core-js/modules/es.array.includes");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoSecuritySettingItem = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function generateLockIcon(isLock, currentLocale, hasScrollBar) {
  var isMac = navigator.platform.includes('Mac');
  return isLock ? /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
    classes: {
      popper: isMac || !hasScrollBar ? _styles["default"].popper : _styles["default"].popperOfWin,
      tooltip: _styles["default"].tooltip
    },
    placement: "bottom",
    "data-sign": "lockButtonTooltip",
    title: _i18n["default"].getString('lockTooltip', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    color: "neutral.f04",
    className: _styles["default"].lockButton,
    symbol: _junoIcon.LockBorder
  })) : null;
}
var VideoSecuritySettingItem = function VideoSecuritySettingItem(_ref) {
  var dataSign = _ref.dataSign,
    label = _ref.label,
    _ref$isLock = _ref.isLock,
    isLock = _ref$isLock === void 0 ? false : _ref$isLock,
    _ref$isDisabled = _ref.isDisabled,
    isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled,
    currentLocale = _ref.currentLocale,
    children = _ref.children,
    _ref$hasScrollBar = _ref.hasScrollBar,
    hasScrollBar = _ref$hasScrollBar === void 0 ? false : _ref$hasScrollBar,
    labelPlacement = _ref.labelPlacement,
    defaultControlStyle = _ref.controlStyle;
  var controlStyle = '';
  var rootStyle = '';
  switch (labelPlacement) {
    case 'start':
      controlStyle = _styles["default"].iconCombine;
      rootStyle = _styles["default"].labelPlacementStartRoot;
      break;
    case 'top':
      controlStyle = '';
      rootStyle = _styles["default"].labelPlacementTopRoot;
      break;
    default:
      controlStyle = _styles["default"].checkboxSeparate;
      rootStyle = _styles["default"].labelPlacementEndRoot;
      break;
  }
  return /*#__PURE__*/_react["default"].createElement(_juno.RcFormControlLabel, {
    "data-sign": dataSign,
    disabled: isLock || isDisabled,
    control: /*#__PURE__*/_react["default"].createElement("span", {
      className: defaultControlStyle !== null && defaultControlStyle !== void 0 ? defaultControlStyle : controlStyle
    }, labelPlacement === 'start' && generateLockIcon(isLock, currentLocale, hasScrollBar), children),
    label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, label, labelPlacement !== 'start' && generateLockIcon(isLock, currentLocale, hasScrollBar)),
    labelPlacement: labelPlacement,
    classes: {
      root: rootStyle,
      label: _styles["default"].labelText
    }
  });
};
exports.VideoSecuritySettingItem = VideoSecuritySettingItem;
//# sourceMappingURL=VideoSecuritySettingItem.js.map
