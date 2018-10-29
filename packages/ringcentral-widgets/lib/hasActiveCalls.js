import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

export default function hasActiveCalls(phone) {
  const {
    callMonitor,
    webphone,
    callLogSection,
    callMonitorUI,
    callingSettings,
  } = phone;
  if (callingSettings.callingMode === callingModes.webphone) {
    return !!(
      (webphone && webphone.sessions.length)
      || (callMonitor && callMonitor.calls.length)
    );
  }
  return !!(
    (callMonitor && callMonitor.calls.length)
    || (callMonitorUI && callMonitorUI.cachedActive)
    || (callLogSection && callLogSection.showNotification)
  );
}
