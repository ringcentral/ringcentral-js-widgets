import { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import CallLogger from '@ringcentral-integration/commons/modules/CallLogger';
import ConnectivityMonitor from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import DateTimeFormat from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumberV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import RateLimiter from '@ringcentral-integration/commons/modules/RateLimiter';
import RegionSettings from '@ringcentral-integration/commons/modules/RegionSettings';
import { CallLogPanelProps } from '../../components/CallLogPanel';
import { CallLogSection as CallLogSectionV2 } from '../CallLogSectionV2';
import CallLogSection from '../CallLogSection';
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
  callLogSection: CallLogSection | CallLogSectionV2;
  routerInteraction: RouterInteraction;
  activeCallControl: ActiveCallControl;
  appFeatures: AppFeatures;
  connectivityMonitor: ConnectivityMonitor;
  callingSettings: CallingSettings;
  forwardingNumber: ForwardingNumber;
  callLogUIOptions: CallLogUIOptions;
}

export interface CallLogUIInterface extends State {
  getUIProps(): CallLogUIProps;
  getUIFunctions(): CallLogUIFunctions;
}

export type CallLogUIProps = Partial<CallLogPanelProps>;

export type CallLogUIFunctions = Partial<CallLogPanelProps>;
