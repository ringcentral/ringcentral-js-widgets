"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../../enums");

var _messageTypes$AGENT_C;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageTypes$AGENT_C = {}, _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.AGENT_CONFIG_ERROR, 'Agent Config Error'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.EMPTY_PHONE_NUMBER, "Sorry, we've failed to get your phone number."), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.INVALID_PHONE_NUMBER, 'Sorry, your phone number is invalid.'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED, 'Sorry, no inbound queues selected.'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.UPDATE_AGENT_ERROR, 'Session update failed'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.UPDATE_AGENT_SUCCESS, 'Session updated'), _messageTypes$AGENT_C);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
