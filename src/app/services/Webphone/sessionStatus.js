"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionStatus = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var sessionStatus = exports.sessionStatus = _ObjectMap.ObjectMap.prefixKeys(['setup', 'connecting', 'connected', 'onHold', 'onMute', 'replaced', 'finished'], 'webphone-session');
var _default = exports["default"] = sessionStatus;
//# sourceMappingURL=sessionStatus.js.map
