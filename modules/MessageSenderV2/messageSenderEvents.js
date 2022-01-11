"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageSenderEvents = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messageSenderEvents = _ObjectMap.ObjectMap.prefixKeys(['send', 'sendOver', 'sendError', 'validate', 'validateOver', 'validateError'], 'messageSender');

exports.messageSenderEvents = messageSenderEvents;
var _default = messageSenderEvents;
exports["default"] = _default;
//# sourceMappingURL=messageSenderEvents.js.map
