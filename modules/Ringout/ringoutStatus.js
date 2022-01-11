"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ringoutStatus = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var ringoutStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'connecting'], 'ringoutStatus');

exports.ringoutStatus = ringoutStatus;
var _default = ringoutStatus;
exports["default"] = _default;
//# sourceMappingURL=ringoutStatus.js.map
