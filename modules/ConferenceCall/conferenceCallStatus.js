"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conferenceCallStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var conferenceCallStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'requesting'], 'conferenceCall');

exports.conferenceCallStatus = conferenceCallStatus;
var _default = conferenceCallStatus;
exports["default"] = _default;
//# sourceMappingURL=conferenceCallStatus.js.map
