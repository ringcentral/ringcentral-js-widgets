"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webSocketReadyStates = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var webSocketReadyStates = _ObjectMap.ObjectMap.fromKeys(['connecting', 'open', 'closing', 'closed']);

exports.webSocketReadyStates = webSocketReadyStates;
//# sourceMappingURL=webSocketReadyStates.js.map
