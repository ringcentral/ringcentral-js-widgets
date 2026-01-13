import type {
  RcvWaitingRoomModeProps,
  RcvWaitingRoomType,
} from '../modules/RcVideo';

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
  expiresIn: number | null;
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

export interface RcVideoV2Api {
  id: string;
  name: string;
  type: 'Instant' | 'Scheduled' | 'PMI';
  host: {
    accountId: string;
    extensionId: string;
  };
  discovery: {
    web: string;
  };
  pins: {
    pstn: {
      host: string;
      participant: string;
    };
    web: string;
    aliases: [string];
  };
  security: {
    passwordProtected: boolean;
    password?: {
      plainText: string;
      joinQuery: string;
      pstn: string;
    };
    // If true, only authenticated users can join to a meeting.
    noGuests: boolean;
    // If true, only users have the same account can join to a meeting.
    sameAccount: boolean;
    // If true, end to end encryption will be enabled for a meeting
    e2ee: boolean;
  };
  preferences: {
    join: {
      audioMuted: boolean;
      videoMuted: boolean;
      waitingRoomRequired:
        | 'Nobody'
        | 'Everybody'
        | 'GuestsOnly'
        | 'OtherAccount';
      pstn: {
        promptAnnouncement: boolean;
        promptParticipants: boolean;
      };
    };
    joinBeforeHost: boolean;
    screenSharing: boolean;
    // Controls whether participants can start and pause transcription
    allowEveryoneTranscribeMeetings: boolean;
    recordings: {
      // Controls whether participants can start and pause recording
      everyoneCanControl: {
        enabled: boolean;
        locked: boolean;
      };
    };
  };
}

export interface RcVideoV2PostData {
  id?: string;
  name: string;
  type: 'Instant' | 'Scheduled' | 'PMI';
  security: {
    passwordProtected: boolean;
    password?: string;
    // If true, only authenticated users can join to a meeting.
    noGuests: boolean;
    // If true, only users have the same account can join to a meeting.
    sameAccount: boolean;
    // If true, end to end encryption will be enabled for a meeting
    e2ee?: boolean;
  };
  preferences: {
    join: {
      audioMuted: boolean;
      videoMuted: boolean;
      waitingRoomRequired?:
        | 'Nobody'
        | 'Everybody'
        | 'GuestsOnly'
        | 'OtherAccount';
    };
    joinBeforeHost: boolean;
    screenSharing: boolean;
    // Controls whether participants can start and pause transcription
    allowEveryoneTranscribeMeetings: boolean;
    recordings: {
      // Controls whether participants can start and pause recording
      everyoneCanControl: {
        enabled: boolean;
      };
    };
  };
}

export interface RcVideoAPI {
  id?: string | null;
  shortId?: string;
  extensionId?: string;
  accountId?: string;
  name: string;
  type: 0 | 1;
  startTime?: Date;
  expiresIn?: number | null;
  duration?: number;
  allowJoinBeforeHost: boolean;
  muteAudio: boolean;
  muteVideo: boolean;
  isMeetingSecret: boolean;
  meetingPassword?: string;
  meetingPasswordMasked?: string;
  meetingPasswordPSTN?: string;
  isOnlyAuthUserJoin: boolean;
  isOnlyCoworkersJoin: boolean;
  allowScreenSharing: boolean;
  e2ee?: boolean;
  waitingRoomMode?: RcvWaitingRoomModeProps;
  allowAnyoneRecord?: boolean;
  allowAnyoneTranscribe?: boolean;
}

export interface RcVideoAPIResponse extends RcVideoAPI {
  uri: string;
  id: string;
  personalMeetingName?: string;
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
  | 'waiting_room_guests_only'
  | 'e2ee'
  | 'allow_anyone_record_meetings'
  | 'allow_anyone_transcribe_meetings';

export interface RcVPreferenceDataItem {
  id: RcVSettingId;
  value: RcVSettingValue;
  readOnly: boolean;
  canModifyAccess: boolean;
}

export interface RcVPreferencesGET {
  allow_anyone_record_meetings?: boolean;
  allow_anyone_transcribe_meetings?: boolean;
  join_before_host?: boolean;
  // join_video_off?: boolean;
  // join_audio_mute?: boolean;
  e2ee?: boolean;
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
  | 'e2ee'
  | 'allowJoinBeforeHost'
  | 'muteVideo'
  | 'muteAudio'
  | 'isMeetingSecret'
  | 'isOnlyAuthUserJoin'
  | 'isOnlyCoworkersJoin'
  | 'allowScreenSharing'
  | 'waitingRoomMode'
  | 'allowAnyoneRecord'
  | 'allowAnyoneTranscribe';
export type RcVPreferences = Pick<RcVideoAPI, RcVSettingKey>;
export type RcVSettingLocks = Omit<
  Pick<RcVideoAPI, RcVSettingKey>,
  'waitingRoomMode'
> & {
  waitingRoomMode: boolean;
  allowAnyoneRecord: boolean;
  allowAnyoneTranscribe: boolean;
};

export interface RcvInvitationRequest {
  hostName: string;
  e2ee?: boolean;
  shortId: string;
  id: string;
  personalMeetingName?: string;
  joinUri: string;
  isMeetingSecret: boolean;
  meetingPassword: string;
  meetingPasswordPSTN: string;
  meetingPasswordMasked: string;
  dialInNumbers: RcVDialInNumberObj[];
  currentLocale: string;
  brandName: string;
  brandId: string;
  isSIPAvailable: boolean;
}

export interface RcvInvitationInfo {
  body: string;
  subject: string;
}
