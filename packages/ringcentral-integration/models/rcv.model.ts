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

export interface RcVMeetingModel extends RcVideoAPI {
  startTime: Date;
  duration: number;
  saveAsDefault: boolean;
  isMeetingPasswordValid: boolean;
  usePersonalMeetingId: boolean;
  personalMeetingId: string;
}

export interface RcVideoAPI {
  name: string;
  type: 0 | 1;
  allowJoinBeforeHost: boolean;
  muteAudio: boolean;
  muteVideo: boolean;
  isMeetingSecret: boolean;
  meetingPassword: string;
  expiresIn: number;
}

export interface RcVPreferencesGET {
  join_before_host: boolean;
  password_scheduled: boolean;
  password_instant: boolean;
  // join_video_off: boolean;
  // join_audio_mute: boolean;
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
  'isMeetingSecret' | 'allowJoinBeforeHost' // | 'muteVideo' | 'muteAudio'
>;
