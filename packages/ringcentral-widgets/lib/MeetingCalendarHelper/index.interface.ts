import { RcmInvitationInfo } from '@ringcentral-integration/commons/modules/Meeting';
import { MeetingTypeV } from '@ringcentral-integration/commons/helpers/meetingHelper.interface';
import {
  RcvInvitationInfo,
  RcVDialInNumberObj,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';

interface RcmMeeting {
  id: string;
  password: string;
  topic: string;
  meetingType: MeetingTypeV;
  schedule?: {
    startTime: Date | string;
    durationInMinutes: number;
    timeZone: {
      id: string;
    };
  };
  links: { joinUri: string };
}

interface RcvMeeting {
  id: string;
  name: string;
  startTime: Date | string;
  duration: number;
  joinUri: string;
  shortId: string;
  links: { joinUri: string };
  isMeetingSecret: boolean;
  e2ee: boolean;
  meetingPassword: string;
  meetingPasswordPSTN: string;
}

interface RcmServiceInfo {
  mobileDialingNumberTpl: string;
  phoneDialingNumberTpl: string;
}

interface CommonExtensionInfo {
  name: string;
}

export interface CommonBrand {
  id: string;
  code: string;
  name: string;
  rcvProductName?: string;
  rcvE2EESupportUrl?: string;
  brandConfig: {
    teleconference: string;
  };
  rcvTeleconference: string;
}

export interface RcmMainParams {
  meeting: RcmMeeting;
  serviceInfo: RcmServiceInfo;
  extensionInfo: CommonExtensionInfo;
  invitationInfo?: RcmInvitationInfo;
}

export interface RcvMainParams {
  meeting: RcvMeeting;
  extensionInfo: CommonExtensionInfo;
  dialInNumber: string | RcVDialInNumberObj[];
  hasRoomConnectorBeta: boolean;
  /**
   * provide this as the alternative invitation result, e.g. from rcv api
   */
  invitationInfo?: RcvInvitationInfo;
}

export interface TplResult {
  formattedMsg: string;
  links: {
    joinUri: string;
    teleconference: string;
  };
}

export interface ParcelledLink {
  uri: string;
  text: string;
}

export interface FormatToHtmlOptions {
  links?: Array<ParcelledLink | string>;
  uselessSentences?: Array<RegExp | string>;
  searchLinks?: boolean;
  newLine?: string;
  indentation?: string;
  tabIndentation?: string;
}
