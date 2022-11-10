"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _Dialer = require("./Dialer");

var _DialerPanelWrapper = require("./DialerPanelWrapper");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LinkSizeMapping = {
  small: 'caption1',
  medium: 'body1',
  large: 'headline1'
};

var DialerPanel = function DialerPanel(_ref) {
  var dialout = _ref.dialout,
      toNumber = _ref.toNumber,
      currentLocale = _ref.currentLocale,
      size = _ref.size,
      hasDialer = _ref.hasDialer,
      setToNumber = _ref.setToNumber,
      goToManualDialSettings = _ref.goToManualDialSettings,
      _ref$dialoutStatus = _ref.dialoutStatus,
      dialoutStatus = _ref$dialoutStatus === void 0 ? 'idle' : _ref$dialoutStatus,
      dialButtonDisabled = _ref.dialButtonDisabled,
      hangup = _ref.hangup;

  if (!hasDialer) {
    return null;
  }

  var isIdle = dialoutStatus === 'idle';
  return /*#__PURE__*/_react["default"].createElement(_Dialer.Dialer, {
    value: toNumber,
    setValue: setToNumber,
    placeholder: _i18n["default"].getString('dialPlaceholder', currentLocale)
  }, !toNumber && /*#__PURE__*/_react["default"].createElement(_DialerPanelWrapper.RcTextWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    variant: "inherit",
    align: "center",
    noWrap: false,
    color: "neutral.f03",
    "data-sign": "callButtonTip"
  }, _i18n["default"].getString('callButtonTip', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    variant: "inherit",
    align: "center",
    noWrap: false,
    color: "neutral.f03",
    "data-sign": "callButtonEmergencyTip"
  }, _i18n["default"].getString('callButtonEmergencyTip', currentLocale))), toNumber && /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    size: size === 'medium' ? 'large' : size,
    disabledVariant: "normal",
    title: _i18n["default"].getString('callButton', currentLocale),
    "data-sign": "callButton",
    disabled: !isIdle || dialButtonDisabled,
    onClick: function onClick() {
      if (isIdle) {
        dialout();
      } else {
        hangup();
      }
    }
  }, _i18n["default"].getString('callButton', currentLocale)), /*#__PURE__*/_react["default"].createElement(_DialerPanelWrapper.RcLinkWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    variant: LinkSizeMapping[size],
    onClick: goToManualDialSettings,
    "data-sign": "manualDialSettings"
  }, _i18n["default"].getString('manualDialSettings', currentLocale))));
};

exports.DialerPanel = DialerPanel;
//# sourceMappingURL=DialerPanel.js.map
