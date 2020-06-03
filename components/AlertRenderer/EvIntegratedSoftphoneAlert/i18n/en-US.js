"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../../enums");

var _enums2 = require("../../../../lib/EvClient/enums");

var _EvSoftphoneEvents$AU;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_EvSoftphoneEvents$AU = {}, _defineProperty(_EvSoftphoneEvents$AU, _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED, 'We need your audio permission for browser using your device, please allow permission in browser setting'), _defineProperty(_EvSoftphoneEvents$AU, _enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, 'Integrated softphone registration failed.'), _defineProperty(_EvSoftphoneEvents$AU, _enums.EvSoftphoneEvents.CALL_REJECTED, 'The inbound call ended during routing. Please prepare for subsequent calls.'), _EvSoftphoneEvents$AU);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
