import Locale from 'ringcentral-integration/modules/Locale';
import CallLogger from 'ringcentral-integration/modules/CallLogger';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import DateTimeFormat from 'ringcentral-integration/modules/DateTimeFormat';
import { ActiveCallControl } from 'ringcentral-integration/modules/ActiveCallControlV2';
import RolesAndPermissions from 'ringcentral-integration/modules/RolesAndPermissions';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import { CallingSettings } from 'ringcentral-integration/modules/CallingSettingsV2';
import { ForwardingNumber } from 'ringcentral-integration/modules/ForwardingNumberV2';
import RouterInteraction from '../RouterInteraction';
import CallLogSection from '../CallLogSection';
import { CallLogPanelProps } from '../../components/CallLogPanel';

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
  rolesAndPermissions: RolesAndPermissions;
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
