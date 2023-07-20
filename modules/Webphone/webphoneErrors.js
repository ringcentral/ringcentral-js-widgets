"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webphoneErrors = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var webphoneErrors = _ObjectMap.ObjectMap.prefixKeys(['connectFailed', 'connected', 'browserNotSupported', 'webphoneCountOverLimit', 'webphoneForbidden', 'noOutboundCallWithoutDL', 'toVoiceMailError', 'checkDLError', 'forwardError', 'muteError', 'holdError', 'flipError', 'recordError', 'pauseRecordError', 'recordDisabled', 'transferError', 'requestTimeout', 'serverTimeout', 'internalServerError', 'sipProvisionError', 'unknownError', 'provisionUpdate', 'serverConnecting'], 'webphone');
exports.webphoneErrors = webphoneErrors;
var _default = webphoneErrors;
exports["default"] = _default;
//# sourceMappingURL=webphoneErrors.js.map
