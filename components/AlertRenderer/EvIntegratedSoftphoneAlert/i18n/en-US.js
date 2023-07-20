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
var _enums2 = require("../../../../lib/EvClient/enums");
var _EvSoftphoneEvents$AU;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_EvSoftphoneEvents$AU = {}, _defineProperty(_EvSoftphoneEvents$AU, _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED, 'We need your audio permission for browser using your device, please allow permission in browser setting'), _defineProperty(_EvSoftphoneEvents$AU, _enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, 'Integrated softphone registration failed, please try later.'), _defineProperty(_EvSoftphoneEvents$AU, _enums.EvSoftphoneEvents.CALL_REJECTED, 'The inbound call ended during routing. Please prepare for subsequent calls.'), _defineProperty(_EvSoftphoneEvents$AU, _enums.tabManagerEvents.SIP_CONNECTING, 'Integrated Softphone connecting...'), _defineProperty(_EvSoftphoneEvents$AU, _enums.tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED, 'Try to reconnect Integrated Softphone...'), _defineProperty(_EvSoftphoneEvents$AU, _enums.tabManagerEvents.ASK_AUDIO_PERMISSION, 'Wait for accept audio permission.'), _defineProperty(_EvSoftphoneEvents$AU, _enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE, 'You have an incoming call. Switch to the browser tab with the blue flashing dot to answer the call'), _EvSoftphoneEvents$AU);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
