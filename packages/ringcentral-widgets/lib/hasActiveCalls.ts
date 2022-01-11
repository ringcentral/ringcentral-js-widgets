import callingModes from '@ringcentral-integration/commons/modules/CallingSettings/callingModes';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';

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

export { hasActiveCalls as default, hasActiveCalls };
