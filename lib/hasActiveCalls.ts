import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings';
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

  // This file use both next projects and old projects, so we need to check the callMonitor.calls first
  if (callMonitor?.calls) {
    return !!callMonitor?.calls.length;
  }

  return !!callMonitor?.allCalls.length;
}

export { hasActiveCalls as default, hasActiveCalls };
