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
var _messageTypes$NO_SUPP;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// TODO: update wording
var _default = exports["default"] = (_messageTypes$NO_SUPP = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.NO_SUPPORT_COUNTRY, 'Sorry, outbound call to the outside of the U.S. and Canada is not yet supported.'), _enums.messageTypes.FAILED_TO_CALL, 'Sorry, the line is busy or is at pending disposition.'), _enums.messageTypes.OFFHOOK_INIT_ERROR, 'Internal error offhook init occurred.'), _enums.messageTypes.OFFHOOK_TERM_ERROR, 'Internal error offhook term occurred.'), _enums.messageTypes.ADD_SESSION_ERROR, 'Internal error add session occurred.'), _enums.messageTypes.DROP_SESSION_ERROR, 'Internal error drop session occurred.'), _enums.messageTypes.HOLD_ERROR, 'Internal error hold/unhold call occurred.'), _enums.messageTypes.LOGOUT_FAIL_WITH_CALL_CONNECTED, 'Logout is not working while the call is still connected.'), _enums.messageTypes.RECORD_PAUSED, 'Call recording paused.'), _enums.messageTypes.RECORD_RESUME, 'Call recording resumed.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.INTERCEPT, 'The dial result for your manual outbound call was INTERCEPT.'));
//# sourceMappingURL=en-US.js.map
