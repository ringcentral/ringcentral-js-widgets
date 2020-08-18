"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleStatuses = void 0;

var _ObjectMap = require("../lib/ObjectMap");

var moduleStatuses = _ObjectMap.ObjectMap.prefixKeys(['pending', 'initializing', 'ready', 'resetting'], 'module');

exports.moduleStatuses = moduleStatuses;
//# sourceMappingURL=moduleStatuses.js.map
