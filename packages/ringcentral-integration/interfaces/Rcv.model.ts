import {
  RcvWaitingRoomType,
  RcvWaitingRoomModeProps,
} from '../modules/RcVideo/constants';

export type MeetingProviderTypesProps = {
  meeting: 'RCMeetings';
  video: 'RCVideo';
};

export type RcVideoTypesProps = {
  meeting: 0;
  call: 1;
};

export interface RcvGSuiteMeetingModel {
  name: string;
  type: 0 | 1;
  allowJoinBeforeHost: boolean;
  expiresIn: number;
  isMeetingSecret?: boolean;
  meetingPassword?: string;
}

export interface RcVDialInNumberObj {
  phoneNumber: string;
  country: {
    name: string;
    isoCode: string;
    callingCode: string;
  };
  default: boolean;
  location: string;
}

export interface RcVDialInNumberGET {
  phoneNumbers: Array<RcVDialInNumberObj>;
}

export interface RcVideoAPI {
  id?: string;
  shortId?: string;
  extensionId?: string;
  accountId?: string;
  name: string;
  type: 0 | 1;
  startTime: Date;
  expiresIn: number;
  duration: number;
  allowJoinBeforeHost: boolean;
  muteAudio: boolean;
  muteVideo: boolean;
  isMeetingSecret: boolean;
  meetingPassword?: string;
  isOnlyAuthUserJoin: boolean;
  isOnlyCoworkersJoin: boolean;
  allowScreenSharing: boolean;
  waitingRoomMode?: RcvWaitingRoomModeProps;
}

export interface RcVideoAPIResponse extends RcVideoAPI {
  uri: string;
  id: string;
  participantCode: string;
  hostCode: string;
  shortId: string;
  meetingUri: string;
  joinUri: string;
  allowJoinBeforeHost: boolean;
  name: string;
  type: 0 | 1;
  announceOnEnter: boolean;
  countOnEnter: boolean;
  musicEnabled: boolean;
  enterExitTonesMode: number; // TODO: shrinker range
  muteAudio: boolean;
  muteVideo: boolean;
  accountId: string;
  extensionId: string;
  phoneGroup: string;
  // meetingPassword?: string;
  meetingPasswordPSTN?: string;
  meetingPasswordMasked?: string;
  isMeetingSecret: boolean;
  allowScreenSharing: boolean;
  isOnlyAuthUserJoin: boolean;
  isOnlyCoworkersJoin: boolean;
  waitingRoomMode?: RcvWaitingRoomModeProps;
}

export interface RcVMeetingModel extends RcVideoAPI {
  saveAsDefault?: boolean;
  isMeetingPasswordValid?: boolean;
  usePersonalMeetingId: boolean;
  personalMeetingId?: string;
  notShowAgain?: boolean;
  settingLock: RcVSettingLocks;
}

type ScreenSharingType = 'all' | 'host';
type AuthUserType = 'only_co_workers' | 'anyone_signed_into_rc';

type RcVSettingValue =
  | boolean
  | ScreenSharingType
  | AuthUserType
  | RcvWaitingRoomType;

export type RcVSettingId =
  | 'join_before_host'
  // | 'join_video_off'
  // | 'join_audio_mute'
  | 'password_scheduled'
  | 'password_instant'
  | 'guest_join'
  | 'join_authenticated_from_account_only'
  | 'screen_sharing_host_only'
  | 'waiting_room'
  | 'waiting_room_guests_only';

export interface RcVPreferenceDataItem {
  id: RcVSettingId;
  value: RcVSettingValue;
  readOnly: boolean;
  canModifyAccess: boolean;
}

export interface RcVPreferencesGET {
  join_before_host?: boolean;
  // join_video_off?: boolean;
  // join_audio_mute?: boolean;
  password_scheduled?: boolean;
  password_instant?: boolean;
  guest_join?: boolean;
  join_authenticated_from_account_only?: AuthUserType;
  screen_sharing_host_only?: ScreenSharingType;
  waiting_room?: boolean;
  waiting_room_guests_only?: RcvWaitingRoomType;
}

export type RcVSettingLocksGET = {
  [key in RcVSettingId]?: boolean;
};

export interface RcVPreferencesAPIResult {
  preferences: RcVPreferencesGET;
  settingLocks: RcVSettingLocksGET;
}

export type RcVSettingKey =
  | 'allowJoinBeforeHost'
  // | 'muteVideo'
  // | 'muteAudio'
  | 'isMeetingSecret'
  | 'isOnlyAuthUserJoin'
  | 'isOnlyCoworkersJoin'
  | 'allowScreenSharing'
  | 'waitingRoomMode';
export type RcVPreferences = Pick<RcVideoAPI, RcVSettingKey>;
export type RcVSettingLocks = Omit<
  Pick<RcVideoAPI, RcVSettingKey>,
  'waitingRoomMode'
> & {
  waitingRoomMode: boolean;
};

export interface RcvInvitationRequest {
  hostName: string;
  meetingName: string;
  meetingId: string;
  meetingUrl: string;
  participantCode: string;
  mainPhoneNumber?: string;
  password?: string;
  dialInPassword?: string;
  location?: string;
  joinBySip?: string;
  premiumNumbers?: string[];
}

export interface RcvInvitationInfo {
  body: string;
  subject: string;
}
