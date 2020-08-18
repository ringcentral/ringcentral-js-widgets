"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.recordStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var recordStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'pending', 'recording', 'noAccess'], 'webphone-record');

exports.recordStatus = recordStatus;
var _default = recordStatus;
exports["default"] = _default;
//# sourceMappingURL=recordStatus.js.map
