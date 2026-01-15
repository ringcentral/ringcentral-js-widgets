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
var _enums2 = require("../../../../lib/EvClient/enums");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED, 'We need your audio permission for browser using your device, please allow permission in browser setting'), _enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, 'Integrated softphone registration failed, please try later.'), _enums.EvSoftphoneEvents.CALL_REJECTED, 'The inbound call ended during routing. Please prepare for subsequent calls.'), _enums.tabManagerEvents.SIP_CONNECTING, 'Integrated Softphone connecting...'), _enums.tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED, 'Try to reconnect Integrated Softphone...'), _enums.tabManagerEvents.ASK_AUDIO_PERMISSION, 'Wait for accept audio permission.'), _enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE, 'You have an incoming call. Switch to the browser tab with the blue flashing dot to answer the call');
//# sourceMappingURL=en-US.js.map
