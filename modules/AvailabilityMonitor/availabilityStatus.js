"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.availability = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var availability = _ObjectMap.ObjectMap.prefixKeys(['HIGH', 'LIMITED'], 'availability');

exports.availability = availability;
var _default = availability;
exports["default"] = _default;
//# sourceMappingURL=availabilityStatus.js.map
