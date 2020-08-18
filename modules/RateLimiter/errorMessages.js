"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.errorMessages = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var errorMessages = _ObjectMap.ObjectMap.prefixKeys(['rateLimitReached'], 'rateLimiterErrorMessages');

exports.errorMessages = errorMessages;
var _default = errorMessages;
exports["default"] = _default;
//# sourceMappingURL=errorMessages.js.map
