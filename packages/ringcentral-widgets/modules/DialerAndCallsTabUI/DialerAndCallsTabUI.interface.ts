import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
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
