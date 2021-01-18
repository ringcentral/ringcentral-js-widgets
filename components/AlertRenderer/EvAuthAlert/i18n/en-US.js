"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../../enums");

var _messageTypes$NO_AGEN;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageTypes$NO_AGEN = {}, _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.NO_AGENT, 'This RC account has not being assigned any EV agent account and please contact your admin or supervisor.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.CONNECT_ERROR, 'Authenticated error. Please retry later.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.UNEXPECTED_AGENT, 'This RC account has being assigned an unexpected EV agent account and please contact your admin or supervisor.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.INVALID_BROWSER, 'WebSocket NOT supported by your browser.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.CONNECT_TIMEOUT, 'Authorization timeout. Please retry later.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.OPEN_SOCKET_ERROR, 'Connect socket error. Please retry later.'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.EXISTING_LOGIN_ENGAGED, 'Existing login engaged'), _defineProperty(_messageTypes$NO_AGEN, _enums.messageTypes.FORCE_LOGOUT, 'Your logon session has been terminated'), _messageTypes$NO_AGEN);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
