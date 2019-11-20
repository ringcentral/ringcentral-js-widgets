"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

var telephonyStatus = (0, _HashMap.createHashMap)({
  noCall: 'NoCall',
  onHold: 'OnHold',
  ringing: 'Ringing',
  callConnected: 'CallConnected',
  parkedCall: 'ParkedCall'
});
var _default = telephonyStatus;
exports["default"] = _default;
//# sourceMappingURL=telephonyStatus.js.map
