import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import type { RouterInteraction } from '../RouterInteraction';

interface DialerAndCallsTabUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  callingSettings: CallingSettings;
  webphone?: Webphone;
  callMonitor?: CallMonitor;
  dialerAndCallsTabUIOptions?: DialerAndCallsTabUIOptions;
}

export interface DialerAndCallsTabContainerProps {
  hasActiveCalls: (options: {
    callingSettings: CallingSettings;
    webphone?: Webphone;
    callMonitor?: CallMonitor;
  }) => boolean;
}
