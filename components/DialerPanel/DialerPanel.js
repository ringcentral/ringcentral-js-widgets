"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPanel = void 0;

require("core-js/modules/es6.string.link");

var _juno = require("@ringcentral/juno");

var _iconHandUp = _interopRequireDefault(require("@ringcentral/juno/icons/icon-hand-up.svg"));

var _iconPhone = _interopRequireDefault(require("@ringcentral/juno/icons/icon-phone.svg"));

var _react = _interopRequireWildcard(require("react"));

var _Dialer = require("./Dialer");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      checkOnCall = _ref.checkOnCall,
      dialoutStatus = _ref.dialoutStatus,
      dialButtonDisabled = _ref.dialButtonDisabled,
      hangup = _ref.hangup;
  (0, _react.useEffect)(function () {
    if (hasDialer) {
      checkOnCall();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

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
    symbol: isIdle ? _iconPhone["default"] : _iconHandUp["default"],
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
