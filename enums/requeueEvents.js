"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requeueEvents = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var requeueEvents = exports.requeueEvents = _ObjectMap.ObjectMap.prefixKeys(['START', 'SUCCESS', 'FAILURE'], 'requeue');
//# sourceMappingURL=requeueEvents.js.map
