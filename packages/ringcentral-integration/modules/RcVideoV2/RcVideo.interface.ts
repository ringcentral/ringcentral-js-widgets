import Client from 'ringcentral-client';
import Alert from '../Alert';
import { Brand } from '../BrandV2';
import { Storage } from '../StorageV2';
import { AccountInfo } from '../AccountInfoV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import AvailabilityMonitor from '../AvailabilityMonitor';
import { VideoConfiguration } from '../VideoConfiguration';

export interface RcvDelegator {
  extensionId: string;
  id: string;
  name: string;
  accountId: string;
  isLoginUser?: boolean;
}

export interface RcVideoOptions {
  showAdminLock?: boolean;
  showSaveAsDefault?: boolean;
  isInstantMeeting?: boolean;
  enableWaitingRoom?: boolean;
  enablePersonalMeeting?: boolean;
  enableScheduleOnBehalf?: boolean;
  enableReloadAfterSchedule?: boolean;
}

export interface Deps {
  alert: Alert;
  client: Client;
  brand: Brand;
  storage: Storage;
  accountInfo: AccountInfo;
  extensionInfo: ExtensionInfo;
  videoConfiguration: VideoConfiguration;
  availabilityMonitor?: AvailabilityMonitor;
  rcVideoOptions?: RcVideoOptions;
}
