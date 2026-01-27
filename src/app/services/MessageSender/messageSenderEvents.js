"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageSenderEvents = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var messageSenderEvents = exports.messageSenderEvents = _ObjectMap.ObjectMap.prefixKeys(['send', 'sendOver', 'sendError', 'validate', 'validateOver', 'validateError'], 'messageSender');
var _default = exports["default"] = messageSenderEvents;
//# sourceMappingURL=messageSenderEvents.js.map
