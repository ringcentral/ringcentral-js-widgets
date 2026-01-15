"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var EVENTS = exports.EVENTS = _ObjectMap.ObjectMap.fromKeys(['callRing', 'callStart', 'callEnd', 'callHold', 'callResume', 'beforeCallResume', 'beforeCallEnd', 'callInit', 'webphoneRegistered', 'webphoneUnregistered']);
//# sourceMappingURL=events.js.map
