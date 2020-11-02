import Alert from '../Alert';
import Storage from '../Storage';
import NumberValidate from '../NumberValidate';
import RolesAndPermissions from '../RolesAndPermissions';
import AvailabilityMonitor from '../AvailabilityMonitor';
import ConnectivityMonitor from '../ConnectivityMonitor';
import TabManager from '../TabManager';
import CallMonitor from '../CallMonitor';
import AccountInfo from '../AccountInfo';
import ExtensionInfo from '../ExtensionInfo';
import Subscription from '../Subscription';
import Auth from '../Auth';
import Webphone from '../Webphone';
import { RingCentralClient } from '../../lib/RingCentralClient';
import RegionSettings from '../RegionSettings';
import Brand from '../Brand';
import AudioSettings from '../AudioSettings';
import Presence from '../Presence';

export interface ActiveCallControlOptions {
  polling?: boolean;
  enableCache?: boolean;
  ttl?: number;
  timeToRetry?: number;
  permissionCheck?: boolean;
}

export interface Deps {
  client: RingCentralClient;
  auth: Auth;
  subscription: Subscription;
  connectivityMonitor: ConnectivityMonitor;
  rolesAndPermissions: RolesAndPermissions;
  callMonitor: CallMonitor;
  alert: Alert;
  numberValidate: NumberValidate;
  accountInfo: AccountInfo;
  extensionInfo: ExtensionInfo;
  webphone?: Webphone;
  tabManager?: TabManager;
  storage?: Storage;
  availabilityMonitor?: AvailabilityMonitor;
  activeCallControlOptions?: ActiveCallControlOptions;
  regionSettings: RegionSettings;
  brand: Brand;
  audioSettings: AudioSettings;
  presence: Presence;
}

export interface ModuleMakeCallParams {
  fromNumber?: string;
  toNumber: string;
  homeCountryId?: string;
  extendedControls?: object;
}
