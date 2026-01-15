"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectionStatus = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var connectionStatus = exports.connectionStatus = _ObjectMap.ObjectMap.prefixKeys(['connecting',
// status by first 3 connect
'connected',
// registered
'reconnecting',
//  status after last connect failed
'disconnecting',
// status by user disconnect
'disconnected',
// status by user disconnect
'connectFailed',
// status when connect failed (retry time <=2)
'connectError',
// status when connect failed (retry time > 2)
'inactiveDisconnecting',
// status when disconnect for inactive
'inactive' // status when disconnected for inactive
], 'connectionStatus');
var _default = exports["default"] = connectionStatus;
//# sourceMappingURL=connectionStatus.js.map
