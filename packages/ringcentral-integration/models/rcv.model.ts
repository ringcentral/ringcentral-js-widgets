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

export interface RcVideoAPI {
  id?: string;
  name: string;
  type: 0 | 1;
  expiresIn: number;
  allowJoinBeforeHost: boolean;
  muteAudio: boolean;
  muteVideo: boolean;
  isMeetingSecret: boolean;
  meetingPassword: string;
  isOnlyAuthUserJoin: boolean;
  isOnlyCoworkersJoin: boolean;
  allowScreenSharing: boolean;
  settingLock: RcVMeetingSettingLock;
}

export interface RcVMeetingModel extends RcVideoAPI {
  startTime: Date;
  duration: number;
  saveAsDefault: boolean;
  isMeetingPasswordValid: boolean;
  usePersonalMeetingId: boolean;
  personalMeetingId?: string;
  notShowAgain?: boolean;
}

type ScreenSharingType = 'all' | 'host';
type AuthUserType = 'only_co_workers' | 'anyone_signed_into_rc';

export interface RcVPreferencesValueModel {
  id: keyof RcVMeetingSettingLockGET;
  value: boolean | string | ScreenSharingType | AuthUserType;
  readOnly: boolean;
  canModifyAccess: boolean;
}

export interface RcVPreferencesGET {
  join_before_host?: boolean;
  password_scheduled?: boolean;
  password_instant?: boolean;
  // join_video_off: boolean;
  // join_audio_mute: boolean;
  guest_join?: boolean;
  join_authenticated_from_account_only?: AuthUserType;
  screen_sharing_host_only?: ScreenSharingType;
}

export interface RcVMeetingSettingLockGET {
  join_before_host?: boolean;
  password_scheduled?: boolean;
  password_instant?: boolean;
  guest_join?: boolean;
  join_authenticated_from_account_only?: boolean;
  screen_sharing_host_only?: boolean;
}

export interface RcVPreferencesAPIResult {
  preferences: RcVPreferencesGET;
  meetingSettingLock: RcVMeetingSettingLockGET;
}

export type RcVPreferencesPATCH = Partial<RcVPreferencesGET>;

export interface RcVDialInNumberGET {
  phoneNumbers: Array<{
    phoneNumber: string;
    country: {
      name: string;
      isoCode: string;
      callingCode: string;
    };
    default: boolean;
    location: string;
  }>;
}

export type RcVPreferences = Pick<
  RcVMeetingModel,
  | 'isMeetingSecret'
  | 'allowJoinBeforeHost'
  // | 'muteVideo'
  // | 'muteAudio'
  | 'isOnlyAuthUserJoin'
  | 'isOnlyCoworkersJoin'
  | 'allowScreenSharing'
>;

export type RcVMeetingSettingLock = Pick<
  RcVMeetingModel,
  | 'isMeetingSecret'
  | 'allowJoinBeforeHost'
  | 'isOnlyAuthUserJoin'
  | 'allowScreenSharing'
>;
