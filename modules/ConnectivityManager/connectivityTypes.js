"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectivityTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var connectivityTypes = _ObjectMap.ObjectMap.prefixKeys(['networkLoss', 'offline', 'serverUnavailable', 'voipOnly', 'survival', 'webphoneUnavailable'], 'connectivityTypes');

exports.connectivityTypes = connectivityTypes;
var _default = connectivityTypes;
exports["default"] = _default;
//# sourceMappingURL=connectivityTypes.js.map
