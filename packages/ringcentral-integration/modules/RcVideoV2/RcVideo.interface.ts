import { GetExtensionInfoResponse } from '@rc-ex/core/definitions';
import Client from 'ringcentral-client';

import {
  RcVDialInNumberObj,
  RcvInvitationInfo,
} from '../../interfaces/Rcv.model';
import { AccountInfo } from '../AccountInfoV2';
import Alert from '../Alert';
import AvailabilityMonitor from '../AvailabilityMonitor';
import { Brand } from '../Brand';
import { DynamicConfig } from '../DynamicConfig';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { Locale } from '../Locale';
import { Storage } from '../StorageV2';
import { VideoConfiguration } from '../VideoConfiguration';
import { DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH } from './constants';

export type DisableE2eeWhenRelatedOptionMatch = keyof typeof DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH;

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
  enableE2EE?: boolean;
  enableWaitingRoom?: boolean;
  enablePersonalMeeting?: boolean;
  enableScheduleOnBehalf?: boolean;
  enableHostCountryDialinNumbers?: boolean;
  enableReloadAfterSchedule?: boolean;
  enableInvitationApi?: boolean;
}

export interface RcVideoResponse {
  invitationInfo: RcvInvitationInfo;
  extensionInfo: GetExtensionInfoResponse | GetExtensionInfoResponse;
  dialInNumber: string | RcVDialInNumberObj[];
  meeting: any;
}

export interface Deps {
  alert: Alert;
  client: Client;
  brand: Brand;
  storage: Storage;
  accountInfo: AccountInfo;
  extensionInfo: ExtensionInfo;
  videoConfiguration: VideoConfiguration;
  locale: Locale;
  dynamicConfig?: DynamicConfig;
  availabilityMonitor?: AvailabilityMonitor;
  rcVideoOptions?: RcVideoOptions;
}

export interface TopicProps {
  extensionName: string;
  brandName: string;
  shortName: string;
  fullName: string;
  brandCode: string;
  currentLocale: string;
}
