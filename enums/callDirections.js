"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

var callDirection = (0, _HashMap.createHashMap)({
  inbound: 'Inbound',
  outbound: 'Outbound'
});
var _default = callDirection;
exports["default"] = _default;
//# sourceMappingURL=callDirections.js.map
