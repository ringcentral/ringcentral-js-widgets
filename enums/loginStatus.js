"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var loginStatus = _ObjectMap.ObjectMap.prefixKeys(['AUTH_SUCCESS', 'LOGIN_SUCCESS', 'LOGOUT_BEFORE', 'LOGOUT_AFTER', 'LOGGING_OUT', 'NOT_AUTH', 'BEFORE_LOGOUT_COMPLETE'], 'auth');

exports.loginStatus = loginStatus;
//# sourceMappingURL=loginStatus.js.map
