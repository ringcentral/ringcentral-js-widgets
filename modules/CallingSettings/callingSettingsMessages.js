"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.callingSettingsMessages = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var callingSettingsMessages = _ObjectMap.ObjectMap.prefixKeys(['saveSuccess', 'saveSuccessWithSoftphone', 'permissionChanged', 'phoneNumberChanged', 'webphonePermissionRemoved', 'emergencyCallingNotAvailable', 'saveSuccessWithJupiter'], 'callingSettingsMessages');

exports.callingSettingsMessages = callingSettingsMessages;
var _default = callingSettingsMessages;
exports["default"] = _default;
//# sourceMappingURL=callingSettingsMessages.js.map
