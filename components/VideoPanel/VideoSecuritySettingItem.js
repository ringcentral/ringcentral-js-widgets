"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoSecuritySettingsItem = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _LockBorder = _interopRequireDefault(require("@ringcentral/juno/icon/LockBorder"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    className: _styles["default"].lockButton,
    symbol: _LockBorder["default"]
  })) : null;
}

var VideoSecuritySettingsItem = function VideoSecuritySettingsItem(_ref) {
  var dataSign = _ref.dataSign,
      label = _ref.label,
      _ref$isLock = _ref.isLock,
      isLock = _ref$isLock === void 0 ? false : _ref$isLock,
      currentLocale = _ref.currentLocale,
      children = _ref.children,
      _ref$hasScrollBar = _ref.hasScrollBar,
      hasScrollBar = _ref$hasScrollBar === void 0 ? false : _ref$hasScrollBar,
      labelPlacement = _ref.labelPlacement;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcFormControlLabel, {
    "data-sign": dataSign,
    disabled: isLock,
    control: /*#__PURE__*/_react["default"].createElement("span", {
      className: labelPlacement === 'start' ? _styles["default"].iconCombine : _styles["default"].checkboxSeparate
    }, labelPlacement === 'start' && generateLockIcon(isLock, currentLocale, hasScrollBar), children),
    label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, label, labelPlacement !== 'start' && generateLockIcon(isLock, currentLocale, hasScrollBar)),
    labelPlacement: labelPlacement,
    classes: {
      root: labelPlacement === 'start' ? _styles["default"].labelPlacementStartRoot : _styles["default"].labelPlacementEndRoot,
      label: _styles["default"].labelText
    }
  });
};

exports.VideoSecuritySettingsItem = VideoSecuritySettingsItem;
//# sourceMappingURL=VideoSecuritySettingItem.js.map
