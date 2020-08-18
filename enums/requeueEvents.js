"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requeueEvents = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var requeueEvents = _ObjectMap.ObjectMap.prefixKeys(['START', 'SUCCESS', 'FAILURE'], 'requeue');

exports.requeueEvents = requeueEvents;
//# sourceMappingURL=requeueEvents.js.map
