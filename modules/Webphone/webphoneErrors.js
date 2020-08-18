"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.webphoneErrors = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var webphoneErrors = _ObjectMap.ObjectMap.prefixKeys(['connectFailed', 'connected', 'browserNotSupported', 'webphoneCountOverLimit', 'webphoneForbidden', 'noOutboundCallWithoutDL', 'toVoiceMailError', 'checkDLError', 'forwardError', 'muteError', 'holdError', 'flipError', 'recordError', 'recordDisabled', 'transferError', 'requestTimeout', 'serverTimeout', 'internalServerError', 'sipProvisionError', 'unknownError', 'provisionUpdate', 'serverConnecting'], 'webphone');

exports.webphoneErrors = webphoneErrors;
var _default = webphoneErrors;
exports["default"] = _default;
//# sourceMappingURL=webphoneErrors.js.map
