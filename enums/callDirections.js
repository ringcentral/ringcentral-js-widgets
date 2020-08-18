"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.callDirection = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var callDirection = _ObjectMap.ObjectMap.fromObject({
  inbound: 'Inbound',
  outbound: 'Outbound'
});

exports.callDirection = callDirection;
var _default = callDirection;
exports["default"] = _default;
//# sourceMappingURL=callDirections.js.map
