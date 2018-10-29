'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasActiveCalls;

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasActiveCalls(phone) {
  var callingSettings = phone.callingSettings,
      webphone = phone.webphone,
      callMonitor = phone.callMonitor,
      callMonitorUI = phone.callMonitorUI,
      callLogSection = phone.callLogSection;

  if (callingSettings.callingMode === _callingModes2.default.webphone) {
    return !!(webphone && webphone.sessions.length || callMonitor && callMonitor.otherDeviceCalls.length);
  }
  return !!(callMonitor && callMonitor.calls.length || callMonitorUI && callMonitorUI.cachedActive || callLogSection && callLogSection.showNotification);
}
//# sourceMappingURL=hasActiveCalls.js.map
