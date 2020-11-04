"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webSocketReadyState = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var webSocketReadyState = _ObjectMap.ObjectMap.prefixKeys(['connecting', 'open', 'closing', 'closed'], 'webSocketReadyState');

exports.webSocketReadyState = webSocketReadyState;
//# sourceMappingURL=webSocketReadyState.js.map
