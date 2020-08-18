"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.actionTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var actionTypes = _ObjectMap.ObjectMap.prefixKeys(['startToConnect', 'connectComplete'], 'softphone');

exports.actionTypes = actionTypes;
var _default = actionTypes;
exports["default"] = _default;
//# sourceMappingURL=actionTypes.js.map
