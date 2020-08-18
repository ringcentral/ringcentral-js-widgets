"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.messageDirection = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messageDirection = _ObjectMap.ObjectMap.fromObject({
  inbound: 'Inbound',
  outbound: 'Outbound'
});

exports.messageDirection = messageDirection;
var _default = messageDirection;
exports["default"] = _default;
//# sourceMappingURL=messageDirection.js.map
