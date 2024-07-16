export const RCM_PASSWORD_REGEX = /^[\w@*-]{0,10}$/;

export const ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';

export enum PMIRequirePassword {
  JBH_ONLY = 'jbh_only',
  ALL = 'all',
  NONE = 'none',
}

export const LAST_MEETING_SETTINGS = [
  'startHostVideo',
  'startParticipantsVideo',
  'allowJoinBeforeHost',
  'audioOptions',
  '_saved',
];

export const SAVED_DEFAULT_MEETING_SETTINGS = [
  'startHostVideo',
  'startParticipantsVideo',
  'allowJoinBeforeHost',
  'audioOptions',
  '_saved',
  'password',
  '_requireMeetingPassword',
];

export const COMMON_SETTINGS = [
  'allowJoinBeforeHost',
  'audioOptions',
  'startHostVideo',
  'startParticipantsVideo',
];

export const DEFAULT_LOCK_SETTINGS = {
  _lockRequireMeetingPassword: false,
  settingLock: {
    allowJoinBeforeHost: false,
    audioOptions: false,
    startHostVideo: false,
    startParticipantsVideo: false,
  },
};

export const RCM_ITEM_NAME = {
  scheduleFor: 'scheduleFor',
  password: 'password',
  allowJoinBeforeHost: 'allowJoinBeforeHost',
  _requireMeetingPassword: '_requireMeetingPassword',
} as const;

export type RcmItemType = (typeof RCM_ITEM_NAME)[keyof typeof RCM_ITEM_NAME];
