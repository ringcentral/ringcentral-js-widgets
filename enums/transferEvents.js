"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transferEvents = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var transferEvents = _ObjectMap.ObjectMap.prefixKeys(['START', 'SUCCESS', 'END', 'ERROR'], 'transfer');

exports.transferEvents = transferEvents;
//# sourceMappingURL=transferEvents.js.map
