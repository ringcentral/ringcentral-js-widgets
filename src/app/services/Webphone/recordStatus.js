"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordStatus = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var recordStatus = exports.recordStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'pending', 'recording', 'noAccess'], 'webphone-record');
var _default = exports["default"] = recordStatus;
//# sourceMappingURL=recordStatus.js.map
