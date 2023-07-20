"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasActiveCalls = exports["default"] = hasActiveCalls;
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
function hasActiveCalls(_ref) {
  var callingSettings = _ref.callingSettings,
    webphone = _ref.webphone,
    callMonitor = _ref.callMonitor;
  if (callingSettings.callingMode === _CallingSettings.callingModes.webphone) {
    return !!((webphone === null || webphone === void 0 ? void 0 : webphone.sessions.length) || (callMonitor === null || callMonitor === void 0 ? void 0 : callMonitor.otherDeviceCalls.length));
  }
  return !!(callMonitor === null || callMonitor === void 0 ? void 0 : callMonitor.calls.length);
}
//# sourceMappingURL=hasActiveCalls.js.map
