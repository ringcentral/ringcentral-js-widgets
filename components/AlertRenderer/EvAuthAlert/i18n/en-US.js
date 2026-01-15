"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _enums = require("../../../../enums");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _enums.messageTypes.NO_AGENT, 'This RC account has not being assigned any EV agent account and please contact your admin or supervisor.'), _enums.messageTypes.CONNECT_ERROR, 'Authenticated error. Please retry later.'), _enums.messageTypes.UNEXPECTED_AGENT, 'This RC account has being assigned an unexpected EV agent account and please contact your admin or supervisor.'), _enums.messageTypes.INVALID_BROWSER, 'WebSocket NOT supported by your browser.'), _enums.messageTypes.CONNECT_TIMEOUT, 'Authorization timeout. Please retry later.'), _enums.messageTypes.OPEN_SOCKET_ERROR, 'Connect socket error. Please retry later.'), _enums.messageTypes.EXISTING_LOGIN_ENGAGED, 'Existing login engaged'), _enums.messageTypes.FORCE_LOGOUT, 'Your logon session has been terminated');
//# sourceMappingURL=en-US.js.map
