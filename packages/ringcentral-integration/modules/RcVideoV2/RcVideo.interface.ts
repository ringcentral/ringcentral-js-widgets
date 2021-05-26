import Client from 'ringcentral-client';
import Alert from '../Alert';
import { Brand } from '../BrandV2';
import { Storage } from '../StorageV2';
import { AccountInfo } from '../AccountInfoV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import AvailabilityMonitor from '../AvailabilityMonitor';
import { VideoConfiguration } from '../VideoConfiguration';
import { Locale } from '../LocaleV2';

export interface RcvDelegator {
  extensionId: string;
  id: string;
  name: string;
  accountId: string;
  isLoginUser?: boolean;
}

export interface RcVideoOptions {
  showSaveAsDefault?: boolean;
  isInstantMeeting?: boolean;
  enableWaitingRoom?: boolean;
  enablePersonalMeeting?: boolean;
  enableScheduleOnBehalf?: boolean;
  enableHostCountryDialinNumbers?: boolean;
  enableReloadAfterSchedule?: boolean;
  enableInvitationApi?: boolean;
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
  locale: Locale;
}
