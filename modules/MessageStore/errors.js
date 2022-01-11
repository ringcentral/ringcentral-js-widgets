"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errors = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var errors = _ObjectMap.ObjectMap.prefixKeys(['deleteFailed', 'readFailed', 'unreadFailed'], 'messageStore');

exports.errors = errors;
var _default = errors;
exports["default"] = _default;
//# sourceMappingURL=errors.js.map
