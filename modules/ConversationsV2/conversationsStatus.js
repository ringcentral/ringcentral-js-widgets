"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conversationsStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var conversationsStatus = _ObjectMap.ObjectMap.prefixKeys(['fetching', 'idle', 'pushing'], 'conversations');

exports.conversationsStatus = conversationsStatus;
var _default = conversationsStatus;
exports["default"] = _default;
//# sourceMappingURL=conversationsStatus.js.map
