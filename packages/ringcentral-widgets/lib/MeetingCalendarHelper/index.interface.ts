import { RcmInvitationInfo } from 'ringcentral-integration/modules/Meeting';
import { MeetingTypeV } from 'ringcentral-integration/helpers/meetingHelper.interface';
import { RcVDialInNumberObj } from 'ringcentral-integration/interfaces/Rcv.model';

interface RcmMeeting {
  id: string;
  password: string;
  topic: string;
  meetingType: MeetingTypeV;
  schedule?: {
    startTime: Date;
    durationInMinutes: number;
    timeZone: {
      id: string;
    };
  };
  links: { joinUri: string };
}

interface RcvMeeting {
  name: string;
  startTime: Date;
  duration: number;
  joinUri: string;
  shortId: string;
  links: { joinUri: string };
  isMeetingSecret: boolean;
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
  brandConfig: {
    teleconference: string;
  };
}

export interface RcmMainParams {
  meeting: RcmMeeting;
  serviceInfo: RcmServiceInfo;
  extensionInfo: CommonExtensionInfo;
  invitationInfo: RcmInvitationInfo;
}

export interface RcvMainParams {
  meeting: RcvMeeting;
  extensionInfo: CommonExtensionInfo;
  dialInNumber: string | RcVDialInNumberObj[];
}

export interface TplResult {
  formattedMsg: string;
  links: {
    joinUri: string;
    teleconference: string;
  };
}

export interface FormatToHtmlOptions {
  links?: string[];
  searchLinks?: boolean;
  newLine?: string;
  indentation?: string;
  tabIndentation?: string;
}
