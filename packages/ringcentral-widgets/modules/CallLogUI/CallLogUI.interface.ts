import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { CallLogger } from '@ringcentral-integration/commons/modules/CallLogger';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import type { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import type { CallLogPanelProps } from '../../components/CallLogPanel';
import type { CallLogSection } from '../CallLogSection';
import type { RouterInteraction } from '../RouterInteraction';

export interface State {}

export interface CallLogUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  callLogger: CallLogger;
  rateLimiter: RateLimiter;
  regionSettings: RegionSettings;
  dateTimeFormat: DateTimeFormat;
  callLogSection: CallLogSection;
  routerInteraction: RouterInteraction;
  activeCallControl: ActiveCallControl;
  appFeatures: AppFeatures;
  connectivityMonitor: ConnectivityMonitor;
  callingSettings: CallingSettings;
  forwardingNumber: ForwardingNumber;
  callLogUIOptions: CallLogUIOptions;
  accountInfo: AccountInfo;
}

export interface CallLogUIInterface extends State {
  getUIProps(): CallLogUIProps;
  getUIFunctions(): CallLogUIFunctions;
}

export type CallLogUIProps = Partial<CallLogPanelProps>;

export type CallLogUIFunctions = Partial<CallLogPanelProps>;
