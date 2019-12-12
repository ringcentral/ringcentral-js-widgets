"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presenceStatus = void 0;

var _HashMap = require("../lib/HashMap");

var presenceStatus = (0, _HashMap.createHashMap)({
  offline: 'Offline',
  busy: 'Busy',
  available: 'Available'
});
exports.presenceStatus = presenceStatus;
//# sourceMappingURL=presenceStatus.enum.js.map
