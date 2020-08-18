"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enum = require("../utils/enum");

var _default = (0, _enum.createEnum)(['initial', 'pending', 'ready', 'resetting'], 'module');

exports["default"] = _default;
//# sourceMappingURL=moduleStatuses.js.map
