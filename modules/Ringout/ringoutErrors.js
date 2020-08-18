"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ringoutErrors = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var ringoutErrors = _ObjectMap.ObjectMap.prefixKeys(['pollingFailed', 'pollingCancelled', 'firstLegConnectFailed'], 'ringoutErrors');

exports.ringoutErrors = ringoutErrors;
var _default = ringoutErrors;
exports["default"] = _default;
//# sourceMappingURL=ringoutErrors.js.map
