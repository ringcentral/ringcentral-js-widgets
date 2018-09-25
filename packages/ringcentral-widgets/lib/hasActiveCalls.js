import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

export default function hasActiveCalls(phone) {
  const {
    callingSettings,
    callMonitor,
    webphone,
    callLogSection,
    callMonitorUI,
  } = phone;
  const isWebphoneMode = (callingSettings.callingMode === callingModes.webphone);
  return isWebphoneMode && !!(
    // (callMonitor && callMonitor.calls.length) &&
    (webphone && webphone.sessions.length)
  )
    || !isWebphoneMode && !!(
      (callMonitor && callMonitor.calls.length)
      || (callLogSection && callLogSection.showNotification)
      // || (callLogSection && callLogSection.show)
      || (callMonitorUI && callMonitorUI.cachedActive)
    );
}
