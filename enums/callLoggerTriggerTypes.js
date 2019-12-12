"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

var _default = (0, _HashMap.createHashMap)({
  manual: 'manual',
  presenceUpdate: 'presenceUpdate',
  callLogSync: 'callLogSync'
});

exports["default"] = _default;
//# sourceMappingURL=callLoggerTriggerTypes.js.map
