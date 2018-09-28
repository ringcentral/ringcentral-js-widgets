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
      callMonitor = phone.callMonitor,
      webphone = phone.webphone,
      callMonitorUI = phone.callMonitorUI;

  var isWebphoneMode = callingSettings.callingMode === _callingModes2.default.webphone;
  return isWebphoneMode && !!(
  // (callMonitor && callMonitor.calls.length) &&
  webphone && webphone.sessions.length) || !isWebphoneMode && !!(callMonitor && callMonitor.calls.length ||
  // || (callLogSection && callLogSection.show)
  callMonitorUI && callMonitorUI.cachedActive);
}
//# sourceMappingURL=hasActiveCalls.js.map
