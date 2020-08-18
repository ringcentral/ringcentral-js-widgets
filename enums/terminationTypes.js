"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.terminationTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var terminationTypes = _ObjectMap.ObjectMap.fromObject({
  "final": 'final',
  intermediate: 'intermediate'
});

exports.terminationTypes = terminationTypes;
var _default = terminationTypes;
exports["default"] = _default;
//# sourceMappingURL=terminationTypes.js.map
