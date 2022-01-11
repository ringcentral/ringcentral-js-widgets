"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessages = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var errorMessages = _ObjectMap.ObjectMap.prefixKeys(['serviceLimited'], 'limitedErrorMessages');

exports.errorMessages = errorMessages;
var _default = errorMessages;
exports["default"] = _default;
//# sourceMappingURL=errorMessages.js.map
