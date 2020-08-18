"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.composeTextStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var composeTextStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'sending'], 'composeText');

exports.composeTextStatus = composeTextStatus;
var _default = composeTextStatus;
exports["default"] = _default;
//# sourceMappingURL=composeTextStatus.js.map
