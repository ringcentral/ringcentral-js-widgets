"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evStatus = void 0;

var _Enum = require("ringcentral-integration/lib/Enum");

var evStatus = (0, _Enum.createEnum)(['START', 'CONNECTING', 'CONNECTED', 'CONNECT_FAILURE', 'LOGIN', 'LOGINED', 'LOGIN_FAILURE', 'CLOSED']);
exports.evStatus = evStatus;
//# sourceMappingURL=evStatus.js.map
