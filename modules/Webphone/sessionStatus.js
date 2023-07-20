"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionStatus = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var sessionStatus = _ObjectMap.ObjectMap.prefixKeys(['setup', 'connecting', 'connected', 'onHold', 'onMute', 'replaced', 'finished'], 'webphone-session');
exports.sessionStatus = sessionStatus;
var _default = sessionStatus;
exports["default"] = _default;
//# sourceMappingURL=sessionStatus.js.map
