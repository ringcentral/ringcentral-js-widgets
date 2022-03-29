import Client from 'ringcentral-client';

import { GetExtensionInfoResponse } from '@rc-ex/core/definitions';

import { RcVDialInNumberObj } from '../../interfaces/Rcv.model';
import { AccountInfo } from '../AccountInfoV2';
import { Alert } from '../Alert';
import AvailabilityMonitor from '../AvailabilityMonitor';
import { Brand } from '../Brand';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { Locale } from '../Locale';
import { Storage } from '../StorageV2';
import { VideoConfiguration } from '../VideoConfiguration';
import { DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH } from './constants';
import { AppFeatures } from '../AppFeatures';

export type DisableE2eeWhenRelatedOptionMatch =
  keyof typeof DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH;

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
  invitationInfo: string;
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
  appFeatures: AppFeatures;
  extensionInfo: ExtensionInfo;
  videoConfiguration: VideoConfiguration;
  locale: Locale;
  availabilityMonitor?: AvailabilityMonitor;
  rcVideoOptions?: RcVideoOptions;
}

export interface TopicProps {
  extensionName: string;
  brandName: string;
  shortName: string;
  rcvMeetingTopic: string;
}
