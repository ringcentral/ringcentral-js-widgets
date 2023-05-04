import { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { CallLogger } from '@ringcentral-integration/commons/modules/CallLogger';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import { CallLogPanelProps } from '../../components/CallLogPanel';
import { CallLogSection } from '../CallLogSection';
import { RouterInteraction } from '../RouterInteraction';

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
