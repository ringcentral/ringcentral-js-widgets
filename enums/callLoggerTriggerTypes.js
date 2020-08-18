"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.callLoggerTriggerTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var callLoggerTriggerTypes = _ObjectMap.ObjectMap.fromObject({
  manual: 'manual',
  presenceUpdate: 'presenceUpdate',
  callLogSync: 'callLogSync'
});

exports.callLoggerTriggerTypes = callLoggerTriggerTypes;
var _default = callLoggerTriggerTypes;
exports["default"] = _default;
//# sourceMappingURL=callLoggerTriggerTypes.js.map
