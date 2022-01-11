"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partyStatusCode = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var partyStatusCode = _ObjectMap.ObjectMap.fromKeys(['answered', 'gone', 'disconnected']);

exports.partyStatusCode = partyStatusCode;
var _default = partyStatusCode;
exports["default"] = _default;
//# sourceMappingURL=partyStatusCode.js.map
