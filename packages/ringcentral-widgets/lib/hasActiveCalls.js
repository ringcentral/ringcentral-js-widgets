import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

export default function hasActiveCalls(phone) {
  const {
    callMonitor,
    webphone,
    callLogSection,
    callMonitorUI,
  } = phone;
  return !!(
    // (callMonitor && callMonitor.calls.length) &&
    (webphone && webphone.sessions.length)
  ) || !!(
    (callMonitor && callMonitor.calls.length)
    || (callLogSection && callLogSection.showNotification)
    // || (callLogSection && callLogSection.show)
    || (callMonitorUI && callMonitorUI.cachedActive)
  );
}
