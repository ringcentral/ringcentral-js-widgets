import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

export default function hasActiveCalls(phone) {
  const {
    callingSettings,
    callMonitor,
    webphone,
    callMonitorUI,
    conferenceCall,
  } = phone;
  const conferenceCallEquipped = !!conferenceCall;
  const isWebphoneMode = (callingSettings.callingMode === callingModes.webphone);
  return isWebphoneMode && !!(
    conferenceCallEquipped &&
    callMonitor.calls.length &&
    webphone.sessions.length
  )
    || !isWebphoneMode && !!(
      callMonitor.calls.length ||
      // (callLogSection && callLogSection.show) ||
      (callMonitorUI && callMonitorUI.cachedActive)
    );
}
