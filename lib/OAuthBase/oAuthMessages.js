"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.oAuthMessages = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var oAuthMessages = _ObjectMap.ObjectMap.prefixKeys(['accessDenied', 'internalError'], 'oAuthMessages');

exports.oAuthMessages = oAuthMessages;
var _default = oAuthMessages;
exports["default"] = _default;
//# sourceMappingURL=oAuthMessages.js.map
