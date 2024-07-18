"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvCallInfoAlert;
var _ramda = require("ramda");
var _messageTypes = require("../../../enums/messageTypes");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function EvCallInfoAlert(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}
EvCallInfoAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.includes)(message, [_messageTypes.messageTypes.COPY_UII_SUCCESS]);
};
//# sourceMappingURL=EvCallInfoAlert.js.map
