"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.telephonyStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var telephonyStatus = _ObjectMap.ObjectMap.fromObject({
  noCall: 'NoCall',
  onHold: 'OnHold',
  ringing: 'Ringing',
  callConnected: 'CallConnected',
  parkedCall: 'ParkedCall'
});

exports.telephonyStatus = telephonyStatus;
var _default = telephonyStatus;
exports["default"] = _default;
//# sourceMappingURL=telephonyStatus.js.map
