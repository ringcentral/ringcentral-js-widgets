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
var _messageTypes$NO_SUPP;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// TODO: update wording
var _default = (_messageTypes$NO_SUPP = {}, _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.NO_SUPPORT_COUNTRY, 'Sorry, outbound call to the outside of the U.S. and Canada is not yet supported.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.FAILED_TO_CALL, 'Sorry, the line is busy or is at pending disposition.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.OFFHOOK_INIT_ERROR, 'Internal error offhook init occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.OFFHOOK_TERM_ERROR, 'Internal error offhook term occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.ADD_SESSION_ERROR, 'Internal error add session occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.DROP_SESSION_ERROR, 'Internal error drop session occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.HOLD_ERROR, 'Internal error hold/unhold call occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.LOGOUT_FAIL_WITH_CALL_CONNECTED, 'Logout is not working while the call is still connected.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.RECORD_PAUSED, 'Call recording paused.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.RECORD_RESUME, 'Call recording resumed.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.INTERCEPT, 'The dial result for your manual outbound call was INTERCEPT.'), _messageTypes$NO_SUPP);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
