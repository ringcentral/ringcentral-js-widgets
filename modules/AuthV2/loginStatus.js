"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var loginStatus = _ObjectMap.ObjectMap.prefixKeys(['loggingIn', 'loggedIn', 'beforeLogout', 'loggingOut', 'notLoggedIn'], 'loginStatus');

exports.loginStatus = loginStatus;
//# sourceMappingURL=loginStatus.js.map
