import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import { CallingSettings } from 'ringcentral-integration/modules/CallingSettingsV2';
import { Webphone } from 'ringcentral-integration/modules/WebphoneV2';
import { CallMonitor } from 'ringcentral-integration/modules/CallMonitorV2';

function hasActiveCalls({
  callingSettings,
  webphone,
  callMonitor,
}: {
  callingSettings: CallingSettings;
  webphone?: Webphone;
  callMonitor?: CallMonitor;
}) {
  if (callingSettings.callingMode === callingModes.webphone) {
    return !!(
      webphone?.sessions.length || callMonitor?.otherDeviceCalls.length
    );
  }
  return !!callMonitor?.calls.length;
}

export { hasActiveCalls, hasActiveCalls as default };
