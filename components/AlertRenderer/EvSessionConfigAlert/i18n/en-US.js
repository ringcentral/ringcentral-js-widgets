"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _enums = require("../../../../enums");
var _messageTypes$AGENT_C;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_messageTypes$AGENT_C = {}, _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.AGENT_CONFIG_ERROR, 'Agent Config Error'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.EMPTY_PHONE_NUMBER, "Sorry, we've failed to get your phone number."), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.INVALID_PHONE_NUMBER, 'Sorry, your phone number is invalid.'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED, 'Sorry, no inbound queues selected.'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.UPDATE_AGENT_ERROR, 'Session update failed'), _defineProperty(_messageTypes$AGENT_C, _enums.messageTypes.UPDATE_AGENT_SUCCESS, 'Session updated'), _messageTypes$AGENT_C);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
