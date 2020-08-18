"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.callStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var callStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'connecting'], 'callStatus');

exports.callStatus = callStatus;
var _default = callStatus;
exports["default"] = _default;
//# sourceMappingURL=callStatus.js.map
