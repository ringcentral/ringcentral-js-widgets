import type Client from 'ringcentral-client';
import type GetExtensionInfoResponse from '@rc-ex/core/lib/definitions/GetExtensionInfoResponse';

import type { RcVDialInNumberObj } from '../../interfaces/Rcv.model';
import type { AccountInfo } from '../AccountInfo';
import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { AvailabilityMonitor } from '../AvailabilityMonitor';
import type { Brand, I18nStrings } from '../Brand';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { Locale } from '../Locale';
import type { Storage } from '../Storage';
import type { VideoConfiguration } from '../VideoConfiguration';
import type { DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH } from './constants';

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
  enableInvitationBridgesApi?: boolean;
  enableWaitingRoom?: boolean;
  enablePersonalMeeting?: boolean;
  enableScheduleOnBehalf?: boolean;
  enableHostCountryDialinNumbers?: boolean;
  enableReloadAfterSchedule?: boolean;
  enableInvitationApi?: boolean;
  enableInvitationApiFailedToast?: boolean;
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
  rcvProductName?: string;
}

export interface InvitationBridgesResponse {
  name: string;
  url: string;
  pins: {
    pstn: {
      participant: string;
      host: string;
    };
    web: string;
  };
  hostName: string;
  security: {
    password: {
      plainText: string;
      pstn: string;
      hash: string;
    };
    passwordProtected: boolean;
    e2ee: boolean;
  };
  teleconference: string;
  phoneNumbers: PhoneNumber[];
  sip?: {
    url: string;
  };
}

interface PhoneNumber {
  country: {
    uri: string;
    id: string;
    name: string;
    isoCode: string;
    callingCode: string;
  };
  phoneNumber: string;
  premium: boolean;
  location: string;
}

export interface RcvInvitationRequestV2 extends InvitationBridgesResponse {
  brandName: string;
  brandId: string;
  currentLocale: string;
}
