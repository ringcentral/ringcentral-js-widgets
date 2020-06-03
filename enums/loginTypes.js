"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginTypes = void 0;

var _Enum = require("ringcentral-integration/lib/Enum");

var loginTypes = (0, _Enum.createEnum)(['integratedSoftphone', 'externalPhone', 'RC_PHONE']);
exports.loginTypes = loginTypes;
//# sourceMappingURL=loginTypes.js.map
