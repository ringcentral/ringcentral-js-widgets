import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import { RouterInteraction } from '../RouterInteraction';

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
