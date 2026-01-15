"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageSenderStatus = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var messageSenderStatus = exports.messageSenderStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'sending', 'validating'], 'messageSender');
var _default = exports["default"] = messageSenderStatus;
//# sourceMappingURL=messageSenderStatus.js.map
