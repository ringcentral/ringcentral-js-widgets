import { ActiveCallControl } from 'ringcentral-integration/modules/ActiveCallControlV2';
import { CallingSettings } from 'ringcentral-integration/modules/CallingSettingsV2';
import CallLogger from 'ringcentral-integration/modules/CallLogger';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import DateTimeFormat from 'ringcentral-integration/modules/DateTimeFormat';
import { ForwardingNumber } from 'ringcentral-integration/modules/ForwardingNumberV2';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import { ExtensionFeatures } from '../../../ringcentral-integration/modules/ExtensionFeatures';
import { CallLogPanelProps } from '../../components/CallLogPanel';
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
  callLogSection: CallLogSection;
  routerInteraction: RouterInteraction;
  activeCallControl: ActiveCallControl;
  extensionFeatures: ExtensionFeatures;
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
