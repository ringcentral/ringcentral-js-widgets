"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.messageSenderStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messageSenderStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'sending', 'validating'], 'messageSender');

exports.messageSenderStatus = messageSenderStatus;
var _default = messageSenderStatus;
exports["default"] = _default;
//# sourceMappingURL=messageSenderStatus.js.map
