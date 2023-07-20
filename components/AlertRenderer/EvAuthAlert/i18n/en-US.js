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
var _messageTypes$NO_AGEN;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_messageTypes$NO_AGEN = {}, _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.NO_AGENT, 'This RC account has not being assigned any EV agent account and please contact your admin or supervisor.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.CONNECT_ERROR, 'Authenticated error. Please retry later.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.UNEXPECTED_AGENT, 'This RC account has being assigned an unexpected EV agent account and please contact your admin or supervisor.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.INVALID_BROWSER, 'WebSocket NOT supported by your browser.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.CONNECT_TIMEOUT, 'Authorization timeout. Please retry later.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.OPEN_SOCKET_ERROR, 'Connect socket error. Please retry later.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.EXISTING_LOGIN_ENGAGED, 'Existing login engaged'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.FORCE_LOGOUT, 'Your logon session has been terminated'), _messageTypes$NO_AGEN);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
