"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authStatus = void 0;

var _Enum = require("ringcentral-integration/lib/Enum");

var authStatus = (0, _Enum.createEnum)(['LOGIN_SUCCESS', 'LOGOUT_BEFORE']);
exports.authStatus = authStatus;
//# sourceMappingURL=authStatus.js.map
