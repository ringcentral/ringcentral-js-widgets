"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvIntegratedSoftphoneAlert;
var _ramda = require("ramda");
var _enums = require("../../../enums");
var _enums2 = require("../../../lib/EvClient/enums");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function EvIntegratedSoftphoneAlert(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}
EvIntegratedSoftphoneAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.includes)(message, [_enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED, _enums.EvSoftphoneEvents.CALL_REJECTED, _enums.tabManagerEvents.SIP_CONNECTING, _enums.tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED, _enums.tabManagerEvents.ASK_AUDIO_PERMISSION, _enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE]);
};
//# sourceMappingURL=EvIntegratedSoftphoneAlert.js.map
