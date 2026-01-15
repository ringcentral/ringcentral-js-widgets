"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.includes.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvSessionConfigAlert;
var _ramda = require("ramda");
var _enums = require("../../../enums");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function EvSessionConfigAlert(_ref) {
  var _ref$message = _ref.message,
    message = _ref$message.message,
    payload = _ref$message.payload,
    currentLocale = _ref.currentLocale;
  if (message === _enums.messageTypes.AGENT_CONFIG_DETAIL_ERROR && payload) {
    return payload;
  }
  return _i18n["default"].getString(message, currentLocale);
}
EvSessionConfigAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.includes)(message, [_enums.messageTypes.INVALID_PHONE_NUMBER, _enums.messageTypes.AGENT_CONFIG_ERROR, _enums.messageTypes.AGENT_CONFIG_DETAIL_ERROR, _enums.messageTypes.UPDATE_AGENT_SUCCESS, _enums.messageTypes.UPDATE_AGENT_ERROR, _enums.messageTypes.EMPTY_PHONE_NUMBER, _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED, _enums.messageTypes.INVALID_PHONE_NUMBER]);
};
//# sourceMappingURL=EvSessionConfigAlert.js.map
