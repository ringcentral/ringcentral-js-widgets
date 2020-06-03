"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transferEvents = void 0;

var _Enum = require("ringcentral-integration/lib/Enum");

var transferEvents = (0, _Enum.createEnum)(['START', 'SUCCESS', 'END', 'ERROR'], 'transfer');
exports.transferEvents = transferEvents;
//# sourceMappingURL=transferEvents.js.map
