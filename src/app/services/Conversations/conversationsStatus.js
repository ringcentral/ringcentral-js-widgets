"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conversationsStatus = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var conversationsStatus = exports.conversationsStatus = _ObjectMap.ObjectMap.prefixKeys(['fetching', 'idle', 'pushing'], 'conversations');
var _default = exports["default"] = conversationsStatus;
//# sourceMappingURL=conversationsStatus.js.map
