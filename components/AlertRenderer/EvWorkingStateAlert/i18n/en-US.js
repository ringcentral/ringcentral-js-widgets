"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../../enums");

var _messageTypes$OVER_BR;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageTypes$OVER_BR = {}, _defineProperty(_messageTypes$OVER_BR, _enums.messageTypes.OVER_BREAK_TIME, 'Your break time is over'), _defineProperty(_messageTypes$OVER_BR, _enums.messageTypes.INVALID_STATE_CHANGE, 'Unable to process state change event. Invalid transition specified. Manual transition from OFFLINE, ENGAGED, CHAT-ENGAGED or TRANSITION is not currently allowed.'), _messageTypes$OVER_BR);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
