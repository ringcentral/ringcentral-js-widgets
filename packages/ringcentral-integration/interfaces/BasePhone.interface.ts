import { AlertUI } from '../../ringcentral-widgets/modules/AlertUI';
import { Beforeunload } from '../../ringcentral-widgets/modules/Beforeunload';
import { Block } from '../../ringcentral-widgets/modules/Block';
import { BlockUI } from '../../ringcentral-widgets/modules/BlockUI';
import { ConnectivityBadgeUI } from '../../ringcentral-widgets/modules/ConnectivityBadgeUI';
import { ConnectivityManager } from '../../ringcentral-widgets/modules/ConnectivityManager';
import LoginUI from '../../ringcentral-widgets/modules/LoginUI';
import { ModalUI } from '../../ringcentral-widgets/modules/ModalUI';
import OAuth from '../../ringcentral-widgets/modules/ProxyFrameOAuth';
import RegionSettingsUI from '../../ringcentral-widgets/modules/RegionSettingsUI';
import { RouterInteraction } from '../../ringcentral-widgets/modules/RouterInteraction';
import { SettingsUI } from '../../ringcentral-widgets/modules/SettingsUI';
import AccountInfo from '../modules/AccountInfo';
import { Alert } from '../modules/AlertV2';
import { AppFeatures } from '../modules/AppFeatures';
import Auth from '../modules/Auth';
import AvailabilityMonitor from '../modules/AvailabilityMonitor';
import { Brand } from '../modules/Brand';
import { CallMonitor } from '../modules/CallMonitorV2';
import { Call } from '../modules/CallV2';
import ConnectivityMonitor from '../modules/ConnectivityMonitor';
import { DateTimeFormat } from '../modules/DateTimeFormatV2';
import DialingPlan from '../modules/DialingPlan';
import Environment from '../modules/Environment';
import { ExtensionFeatures } from '../modules/ExtensionFeatures';
import ExtensionInfo from '../modules/ExtensionInfo';
import GlobalStorage from '../modules/GlobalStorage';
import { Locale } from '../modules/Locale';
import { Presence } from '../modules/PresenceV2';
import RateLimiter from '../modules/RateLimiter';
import { RegionSettings } from '../modules/RegionSettings';
import { Storage } from '../modules/StorageV2';
import Subscription from '../modules/Subscription';
import { TabManager } from '../modules/TabManager';

export interface BasePhone {
  alert: Alert;
  auth: Auth;
  block: Block;
  brand: Brand;
  accountInfo: AccountInfo;
  connectivityMonitor: ConnectivityMonitor;
  dateTimeFormat: DateTimeFormat;
  dialingPlan: DialingPlan;
  extensionInfo: ExtensionInfo;
  environment: Environment;
  globalStorage: GlobalStorage;
  locale: Locale;
  extensionFeatures: ExtensionFeatures;
  appFeatures: AppFeatures;
  regionSettings: RegionSettings;
  rateLimiter: RateLimiter;
  subscription: Subscription;
  storage: Storage;
  availabilityMonitor: AvailabilityMonitor;
  oAuth: OAuth;
  routerInteraction: RouterInteraction;
  callMonitor: CallMonitor;
  connectivityManager: ConnectivityManager;
  settingsUI: SettingsUI;
  connectivityBadgeUI: ConnectivityBadgeUI;
  loginUI: LoginUI;
  alertUI: AlertUI;
  regionSettingsUI: RegionSettingsUI;
  modalUI: ModalUI;
  blockUI: BlockUI;
  tabManager?: TabManager;
  beforeunload: Beforeunload;
  call: Call;
  presence: Presence;
}
