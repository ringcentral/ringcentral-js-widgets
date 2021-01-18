"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var EVENTS = _ObjectMap.ObjectMap.fromKeys(['callRing', 'callStart', 'callEnd', 'callHold', 'callResume', 'beforeCallResume', 'beforeCallEnd', 'callInit', 'webphoneRegistered', 'webphoneUnregistered']);

exports.EVENTS = EVENTS;
//# sourceMappingURL=events.js.map
