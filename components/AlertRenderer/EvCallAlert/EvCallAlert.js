"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvCallAlert;

var _ramda = require("ramda");

var _enums = require("../../../enums");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function EvCallAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}

EvCallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.contains)(message, [_enums.messageTypes.NO_SUPPORT_COUNTRY, _enums.messageTypes.INTERCEPT, _enums.messageTypes.FAILED_TO_CALL, _enums.messageTypes.FAILED_TO_CALL, _enums.messageTypes.OFFHOOK_INIT_ERROR, _enums.messageTypes.OFFHOOK_TERM_ERROR, _enums.messageTypes.ADD_SESSION_ERROR, _enums.messageTypes.DROP_SESSION_ERROR, _enums.messageTypes.HOLD_ERROR, _enums.messageTypes.LOGOUT_FAIL_WITH_CALL_CONNECTED, _enums.messageTypes.RECORD_PAUSED, _enums.messageTypes.RECORD_RESUME]);
};
//# sourceMappingURL=EvCallAlert.js.map
