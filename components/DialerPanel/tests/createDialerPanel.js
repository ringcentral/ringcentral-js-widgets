"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDialerPanel = createDialerPanel;
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _DialerPanel = require("../DialerPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var currentLocale = 'en-US';
var size = 'medium';
function createDialerPanel() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$toNumber = _ref.toNumber,
    toNumber = _ref$toNumber === void 0 ? '' : _ref$toNumber,
    _ref$setToNumber = _ref.setToNumber,
    setToNumber = _ref$setToNumber === void 0 ? function () {} : _ref$setToNumber,
    _ref$dialout = _ref.dialout,
    dialout = _ref$dialout === void 0 ? function () {} : _ref$dialout,
    _ref$hasDialer = _ref.hasDialer,
    hasDialer = _ref$hasDialer === void 0 ? true : _ref$hasDialer,
    _ref$dialoutStatus = _ref.dialoutStatus,
    dialoutStatus = _ref$dialoutStatus === void 0 ? 'idle' : _ref$dialoutStatus,
    _ref$goToManualDialSe = _ref.goToManualDialSettings,
    goToManualDialSettings = _ref$goToManualDialSe === void 0 ? function () {} : _ref$goToManualDialSe,
    _ref$hangup = _ref.hangup,
    hangup = _ref$hangup === void 0 ? function () {} : _ref$hangup,
    _ref$dialButtonDisabl = _ref.dialButtonDisabled,
    dialButtonDisabled = _ref$dialButtonDisabl === void 0 ? false : _ref$dialButtonDisabl;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_DialerPanel.DialerPanel, {
    currentLocale: currentLocale,
    dialout: dialout,
    toNumber: toNumber,
    size: size,
    dialButtonDisabled: dialButtonDisabled,
    hasDialer: hasDialer,
    setToNumber: setToNumber,
    goToManualDialSettings: goToManualDialSettings,
    dialoutStatus: dialoutStatus,
    hangup: hangup
  })));
}
//# sourceMappingURL=createDialerPanel.js.map
