"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.status = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var status = _ObjectMap.ObjectMap.prefixKeys(['fetching', 'idle', 'pushing'], 'conversations');

exports.status = status;
var _default = status;
exports["default"] = _default;
//# sourceMappingURL=status.js.map
