import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

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
