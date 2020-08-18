"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMessages = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var authMessages = _ObjectMap.ObjectMap.prefixKeys(['emptyPassword', 'emptyUsername', 'sessionExpired', 'beforeLogoutError', 'logoutError', 'accessDenied', 'internalError'], 'authMessages');

exports.authMessages = authMessages;
//# sourceMappingURL=authMessages.js.map
