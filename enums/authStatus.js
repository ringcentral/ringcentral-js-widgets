"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var authStatus = _ObjectMap.ObjectMap.prefixKeys(['AUTH_SUCCESS', 'LOGIN_SUCCESS', 'LOGOUT_BEFORE', 'LOGOUT_AFTER', 'BEFORE_LOGOUT_COMPLETE'], 'auth');

exports.authStatus = authStatus;
//# sourceMappingURL=authStatus.js.map
