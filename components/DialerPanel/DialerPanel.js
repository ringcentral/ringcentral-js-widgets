"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPanel = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.link");

var _juno = require("@ringcentral/juno");

var _HandUp = _interopRequireDefault(require("@ringcentral/juno/icon/HandUp"));

var _Phone = _interopRequireDefault(require("@ringcentral/juno/icon/Phone"));

var _react = _interopRequireDefault(require("react"));

var _Dialer = require("./Dialer");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  box-shadow: none !important;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var dialoutStatusMapping = {
  dialing: 'danger.b03',
  callConnected: 'danger.b03',
  idle: 'success.b03'
};
var LinkSizeMapping = {
  small: 'caption1',
  medium: 'body1',
  large: 'headline'
};
var DialButton = (0, _juno.styled)(_juno.RcIconButton)(_templateObject());

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
  var color = dialoutStatusMapping[dialoutStatus];
  return /*#__PURE__*/_react["default"].createElement(_Dialer.Dialer, {
    value: toNumber,
    setValue: setToNumber,
    placeholder: _i18n["default"].getString('dialPlaceholder', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(DialButton, {
    size: size === 'medium' ? 'large' : size,
    variant: "contained",
    color: color,
    "data-icon": isIdle ? 'answer' : 'hand-up',
    symbol: isIdle ? _Phone["default"] : _HandUp["default"],
    "data-sign": "callButton",
    disabled: dialButtonDisabled,
    onClick: function onClick() {
      if (isIdle) {
        dialout();
      } else {
        hangup();
      }
    }
  }, "phone"), /*#__PURE__*/_react["default"].createElement("i", {
    className: _styles["default"].flexFill
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].link
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    variant: LinkSizeMapping[size],
    onClick: goToManualDialSettings,
    "data-sign": "manualDialSettings"
  }, _i18n["default"].getString('manualDialSettings', currentLocale))));
};

exports.DialerPanel = DialerPanel;
//# sourceMappingURL=DialerPanel.js.map
