"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Enum = _interopRequireDefault(require("../../lib/Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _Enum["default"](['connecting', // status by first 3 connect
'connected', // registered
'reconnecting', //  status after last connect failed
'disconnecting', // status by user disconnect
'disconnected', // status by user disconnect
'connectFailed', // status when connect failed (retry time <=2)
'connectError', // status when connect failed (retry time > 2)
'inactiveDisconnecting', // status when disconnect for inactive
'inactive'], 'connectionStatus');

exports["default"] = _default;
//# sourceMappingURL=connectionStatus.js.map
