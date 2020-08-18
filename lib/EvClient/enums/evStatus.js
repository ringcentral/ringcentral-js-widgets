"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var evStatus = _ObjectMap.ObjectMap.fromKeys(['START', 'CONNECTING', 'CONNECTED', 'CONNECT_FAILURE', 'LOGIN', 'LOGINED', 'LOGIN_FAILURE', 'CLOSED']);

exports.evStatus = evStatus;
//# sourceMappingURL=evStatus.js.map
