"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPanel = void 0;

require("core-js/modules/es6.string.link");

var _juno = require("@ringcentral/juno");

var _HandUp = _interopRequireDefault(require("@ringcentral/juno/icon/HandUp"));

var _Phone = _interopRequireDefault(require("@ringcentral/juno/icon/Phone"));

var _react = _interopRequireDefault(require("react"));

var _Dialer = require("./Dialer");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dialoutStatusMapping = {
  dialing: ['element', 'disabled'],
  callConnected: ['semantic', 'negative'],
  idle: ['semantic', 'positive']
};

var DialerPanel = function DialerPanel(_ref) {
  var dialout = _ref.dialout,
      toNumber = _ref.toNumber,
      currentLocale = _ref.currentLocale,
      size = _ref.size,
      hasDialer = _ref.hasDialer,
      setToNumber = _ref.setToNumber,
      goToManualDialSettings = _ref.goToManualDialSettings,
      dialoutStatus = _ref.dialoutStatus,
      dialButtonDisabled = _ref.dialButtonDisabled,
      hangup = _ref.hangup;

  if (!hasDialer) {
    return null;
  }

  var isIdle = dialoutStatus === 'idle';
  var isCallConnected = dialoutStatus === 'callConnected';
  var color = dialoutStatusMapping[dialoutStatus] || dialoutStatusMapping.idle;
  return /*#__PURE__*/_react["default"].createElement(_Dialer.Dialer, {
    value: toNumber,
    setValue: setToNumber,
    placeholder: _i18n["default"].getString('dialPlaceholder', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcFabIconButton, {
    size: size,
    color: color,
    "data-icon": isIdle ? 'answer' : 'hand-up',
    symbol: isIdle ? _Phone["default"] : _HandUp["default"],
    "data-sign": "callButton",
    disabled: dialButtonDisabled,
    onClick: function onClick() {
      if (isIdle) {
        dialout();
      } else if (isCallConnected) {
        hangup();
      } else {// unexpected state
      }
    }
  }, "phone"), /*#__PURE__*/_react["default"].createElement("i", {
    className: _styles["default"].flexFill
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].link
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    size: size,
    handleOnClick: goToManualDialSettings,
    "data-sign": "manualDialSettings"
  }, _i18n["default"].getString('manualDialSettings', currentLocale))));
};

exports.DialerPanel = DialerPanel;
//# sourceMappingURL=DialerPanel.js.map
