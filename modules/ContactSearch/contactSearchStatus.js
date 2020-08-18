"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.contactSearchStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var contactSearchStatus = _ObjectMap.ObjectMap.prefixKeys(['searching', 'idle'], 'contactSearchStatus');

exports.contactSearchStatus = contactSearchStatus;
var _default = contactSearchStatus;
exports["default"] = _default;
//# sourceMappingURL=contactSearchStatus.js.map
