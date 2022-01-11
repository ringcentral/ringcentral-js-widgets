"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncStatus = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var syncStatus = _ObjectMap.ObjectMap.prefixKeys(['syncing', 'idle'], 'address-book');

exports.syncStatus = syncStatus;
var _default = syncStatus;
exports["default"] = _default;
//# sourceMappingURL=syncStatus.js.map
