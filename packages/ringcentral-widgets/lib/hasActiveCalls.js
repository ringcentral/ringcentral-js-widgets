import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

export default function hasActiveCalls(phone) {
  const {
    callingSettings, // required
    webphone,
    callMonitor,
    callMonitorUI,
    callLogSection,
  } = phone;
  if (callingSettings.callingMode === callingModes.webphone) {
    return !!(
      (webphone && webphone.sessions.length)
      || (callMonitor && callMonitor.otherDeviceCalls.length)
    );
  }
  return !!(
    (callMonitor && callMonitor.calls.length)
    || (callMonitorUI && callMonitorUI.cachedActive)
    || (callLogSection && callLogSection.showNotification)
  );
}
