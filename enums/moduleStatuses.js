"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleStatuses = void 0;

var _enum = require("usm/lib/utils/enum");

var moduleStatuses = (0, _enum.createEnum)(['pending', 'initializing', 'ready', 'resetting'], 'module');
exports.moduleStatuses = moduleStatuses;
//# sourceMappingURL=moduleStatuses.js.map
