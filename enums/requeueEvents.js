"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requeueEvents = void 0;

var _Enum = require("ringcentral-integration/lib/Enum");

var requeueEvents = (0, _Enum.createEnum)(['START', 'SUCCESS', 'FAILURE'], 'requeue');
exports.requeueEvents = requeueEvents;
//# sourceMappingURL=requeueEvents.js.map
