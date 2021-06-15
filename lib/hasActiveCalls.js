"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.hasActiveCalls = hasActiveCalls;

var _callingModes = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingModes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function hasActiveCalls(_ref) {
  var callingSettings = _ref.callingSettings,
      webphone = _ref.webphone,
      callMonitor = _ref.callMonitor;

  if (callingSettings.callingMode === _callingModes["default"].webphone) {
    return !!((webphone === null || webphone === void 0 ? void 0 : webphone.sessions.length) || (callMonitor === null || callMonitor === void 0 ? void 0 : callMonitor.otherDeviceCalls.length));
  }

  return !!(callMonitor === null || callMonitor === void 0 ? void 0 : callMonitor.calls.length);
}
//# sourceMappingURL=hasActiveCalls.js.map
