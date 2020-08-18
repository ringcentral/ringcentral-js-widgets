"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.messages = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messages = _ObjectMap.ObjectMap.prefixKeys(['requireAdditionalNumbers', 'scheduledSuccess'], 'conference-msg');

exports.messages = messages;
var _default = messages;
exports["default"] = _default;
//# sourceMappingURL=messages.js.map
