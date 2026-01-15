"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.includes.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvTransferCallAlert;
var _ramda = require("ramda");
var _enums = require("../../../enums");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function EvTransferCallAlert(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}
EvTransferCallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.includes)(message, [_enums.transferEvents.START, _enums.transferErrors.TRANSFER_ERROR, _enums.transferSuccesses.TRANSFER_CONNECTED, _enums.transferSuccesses.SEND_VOICEMAIL_SUCCESS, _enums.transferErrors.SEND_VOICEMAIL_ERROR]);
};
//# sourceMappingURL=EvTransferCallAlert.js.map
