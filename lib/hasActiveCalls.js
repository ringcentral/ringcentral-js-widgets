'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasActiveCalls;

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasActiveCalls(phone) {
  var callMonitor = phone.callMonitor,
      webphone = phone.webphone,
      callLogSection = phone.callLogSection,
      callMonitorUI = phone.callMonitorUI;

  return !!(
  // (callMonitor && callMonitor.calls.length) &&
  webphone && webphone.sessions.length) || !!(callMonitor && callMonitor.calls.length || callLogSection && callLogSection.showNotification
  // || (callLogSection && callLogSection.show)
  || callMonitorUI && callMonitorUI.cachedActive);
}
//# sourceMappingURL=hasActiveCalls.js.map
