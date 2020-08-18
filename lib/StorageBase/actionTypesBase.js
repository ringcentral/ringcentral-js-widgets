"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.actionTypesBase = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var actionTypesBase = _ObjectMap.ObjectMap.fromKeys(['init', 'initSuccess', 'reset', 'resetSuccess', 'sync']);

exports.actionTypesBase = actionTypesBase;
var _default = actionTypesBase;
exports["default"] = _default;
//# sourceMappingURL=actionTypesBase.js.map
