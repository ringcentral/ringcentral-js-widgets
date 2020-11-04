import MeetingScheduleResource from 'ringcentral-client/build/definitions/MeetingScheduleResource';
import { MeetingTypeV } from '../../helpers/meetingHelper';

export const AUDIO_OPTIONS = {
  ComputerAudio: 'ComputerAudio',
  Phone: 'Phone',
} as const;

export interface RcmInvitationInfo {
  invitation: string;
}

export interface MeetingLinksInfo {
  startUri: string;
  joinUri: string;
}

export interface TimezoneInfo {
  id: string;
}

export type MeetingStatus = 'NotStarted' | 'Started';

export interface HostInfo {
  id: string;
  uri?: string;
}

type AudioOptions = (keyof typeof AUDIO_OPTIONS)[];

export interface MeetingInfoResponse {
  allowJoinBeforeHost: boolean;
  audioOptions: AudioOptions;
  h323Password?: string;
  host?: HostInfo;
  id?: string;
  links: MeetingLinksInfo;
  meetingType: MeetingTypeV;
  startHostVideo: boolean;
  startParticipantsVideo: boolean;
  status: MeetingStatus;
  topic: string;
  uri?: string;
  password: string;
  usePersonalMeetingId: boolean;
  uuid: string;
}

export interface DialInNumber {
  phoneNumber: string;
  formattedNumber: string;
  country: Country;
  location?: string;
}

export interface MeetingServiceInfo {
  uri: string;
  supportUri: string;
  intlDialInNumbersUri: string;
  dialInNumbers: DialInNumber[];
  domain: string;
}

export interface Country {
  uri: string;
  id: string;
  name: string;
  isoCode: string;
  callingCode: string;
}

export interface RecurrenceOptions {
  frequency: string;
  interval: string | number;
  count?: number;
  until?: string; // "2030-12-21T12:00:00Z"
}

export type RcMMeetingSettingLock = Pick<
  RcMMeetingModel,
  'allowJoinBeforeHost' | 'startHostVideo' | 'startParticipantsVideo'
> & {
  audioOptions: boolean;
};

export interface RcMMeetingModel {
  allowJoinBeforeHost: boolean;
  audioOptions: AudioOptions;
  host: HostInfo;
  meetingType: MeetingTypeV;
  password: string;
  schedule?: MeetingScheduleResource;
  _pmiPassword?: string;
  recurrence?: RecurrenceOptions;
  // duration: number;
  startHostVideo: boolean;
  startParticipantsVideo: boolean;
  topic: string;
  settingLock?: RcMMeetingSettingLock;
  _requireMeetingPassword: boolean;
  _lockRequireMeetingPassword?: boolean;
  _saved: boolean;
  _showDate: boolean;
  _showTime: boolean;
  usePersonalMeetingId: boolean;
  isMeetingPasswordValid?: boolean;
}

export interface MeetingInitialExtraData {
  userSettings: Partial<RcMMeetingModel>;
  personalMeetingSettings: Partial<RcMMeetingModel>;
}

export interface ExternalUserInfo {
  userId: string;
  accountId: string;
  userType: number;
  userToken: string;
  hostKey: string;
  personalMeetingId: string;
  usePmiForInstantMeetings: boolean;
}

interface ServiceInfo {
  uri: string;
  supportUri: string;
  intlDialInNumbersUri: string;
  domain: string;
  externalUserInfo: ExternalUserInfo;
  dialInNumbers: DialInNumber[];
  mobileDialingNumberTpl: string;
  phoneDialingNumberTpl: string;
}

interface ExtensionInfo {
  id: number;
  extensionNumber: string;
  contact: Contact;
  name: string;
  type: string;
  status: string;
  permissions: Permissions;
  profileImage: ProfileImage;
  regionalSettings: RegionalSettings;
  serviceFeatures: ServiceFeatures;
}

interface ServiceFeatures {
  SMS: Admin;
  SMSReceiving: Admin;
  Pager: Admin;
  PagerReceiving: Admin;
  Voicemail: Admin;
  Fax: Admin;
  FaxReceiving: Admin;
  DND: Admin;
  RingOut: Admin;
  InternationalCalling: Admin;
  Presence: Admin;
  VideoConferencing: Admin;
  SalesForce: Admin;
  Intercom: Admin;
  Paging: Admin;
  Conferencing: Admin;
  VoipCalling: Admin;
  FreeSoftPhoneLines: Admin;
  HipaaCompliance: HipaaCompliance;
  CallPark: Admin;
  SharedLines: Admin;
  OnDemandCallRecording: Admin;
  Reports: Admin;
  CallForwarding: Admin;
  DeveloperPortal: Admin;
  EncryptionAtRest: HipaaCompliance;
  BlockedMessageForwarding: HipaaCompliance;
  EmergencyCalling: HipaaCompliance;
  HDVoice: Admin;
  SingleExtensionUI: HipaaCompliance;
  CallSupervision: Admin;
  VoicemailToText: Admin;
  WebPhone: Admin;
  RCTeams: Admin;
  UserManagement: Admin;
  Calendar: Admin;
  PasswordAuth: Admin;
  CallerIdControl: HipaaCompliance;
  AutomaticInboundCallRecording: HipaaCompliance;
  AutomaticOutboundCallRecording: HipaaCompliance;
  AutomaticCallRecordingMute: HipaaCompliance;
  SoftPhoneUpdate: Admin;
  LinkedSoftphoneLines: HipaaCompliance;
  CallQualitySurvey: HipaaCompliance;
  AccountFederation: HipaaCompliance;
  MMS: Admin;
  CallParkLocations: Admin;
  ExternalDirectoryIntegration: HipaaCompliance;
  CallSwitch: Admin;
  PromoMessage: Admin;
  SiteCodes: HipaaCompliance;
  InternationalSMS: HipaaCompliance;
  ConferencingNumber: Admin;
  VoipCallingOnMobile: Admin;
  DynamicConference: HipaaCompliance;
  ConfigureDelegates: Admin;
  Archiver: Admin;
  EmergencyAddressAutoUpdate: HipaaCompliance;
  MobileVoipEmergencyCalling: HipaaCompliance;
}
interface RegionalSettings {
  timezone: Timezone;
  homeCountry: HomeCountry;
  language: Language;
  formattingLocale: Language;
  timeFormat: string;
}

interface Language {
  localeCode: string;
}

interface HomeCountry {
  id: string;
  isoCode: string;
  callingCode: string;
}

interface Timezone {
  id: string;
  name: string;
  bias: string;
}

interface ProfileImage {
  uri: string;
}

interface Permissions {
  admin: Admin;
  internationalCalling: Admin;
}

interface Admin {
  enabled: boolean;
}

interface Contact {
  firstName: string;
  company: string;
  email: string;
  businessPhone: string;
  businessAddress: BusinessAddress;
  emailAsLoginName: boolean;
  pronouncedName: PronouncedName;
}

interface PronouncedName {
  type: string;
  text: string;
}

interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface HipaaCompliance {
  enabled: boolean;
  reason: string;
}

export interface ScheduleMeetingResponse {
  meeting: MeetingInfoResponse;
  serviceInfo: ServiceInfo;
  extensionInfo: ExtensionInfo;
  invitationInfo?: any;
}

export interface MeetingDelegators {
  id: string;
  name: string;
  isLoginUser?: boolean;
}

export interface MeetingDelegatorsResponse {
  records: MeetingDelegators[];
}

export { MeetingScheduleResource };
