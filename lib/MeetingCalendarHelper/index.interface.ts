import { RcmInvitationInfo } from 'ringcentral-integration/modules/Meeting/Meeting';

interface RcmMeeting {
  id: string;
  password: string;
  links: { joinUri: string };
}

interface RcvMeeting {
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
  dialInNumber: string;
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
