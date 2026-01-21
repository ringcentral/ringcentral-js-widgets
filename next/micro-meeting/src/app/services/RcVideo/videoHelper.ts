import type {
  MeetingProviderTypesProps,
  RcVDialInNumberObj,
  RcvGSuiteMeetingModel,
  RcVideoAPI,
  RcVideoAPIResponse,
  RcVideoV2Api,
  RcVideoV2PostData,
  RcVideoTypesProps,
  RcvInvitationRequest,
  RcVMeetingModel,
  RcVPreferences,
  RcVPreferencesGET,
  RcVSettingId,
  RcVSettingKey,
  RcVSettingLocks,
  RcVSettingLocksGET,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { format } from '@ringcentral-integration/utils';
import { filter, map, omit, pick, pipe, toPairs } from 'ramda';

import type { RcvInvitationRequestV2, TopicProps } from './RcVideo.interface';
import {
  RCV_E2EE_API_KEYS,
  RCV_PASSWORD_REGEX,
  RCV_WAITING_ROOM_API_KEYS,
  RCV_WAITING_ROOM_MODE,
  RCV_WAITING_ROOM_MODE_REVERSE,
  RCV_WAITING_ROOM_MODE_V2,
  RCV_WAITING_ROOM_MODE_V2_REVERSE,
} from './constants';
import { t } from './i18n';

/* TODO: this meetingProviderTypes is only used for calender-addon
 * if you want to use meetingProviderTypes
 * please turn to use MeetingProvider/interface
 */
const meetingProviderTypes: MeetingProviderTypesProps = {
  meeting: 'RCMeetings',
  video: 'RCVideo',
};

const RcVideoTypes: RcVideoTypesProps = {
  meeting: 0, // schedule
  call: 1, // instant meeting
};

const RCV_CREATE_API_KEYS: Array<keyof RcVideoAPI> = [
  'name',
  'type',
  'startTime',
  'expiresIn',
  'duration',
  'accountId',
  'extensionId',
  'allowJoinBeforeHost',
  'muteAudio',
  'muteVideo',
  'isMeetingSecret',
  'meetingPassword',
  'isOnlyAuthUserJoin',
  'isOnlyCoworkersJoin',
  'allowScreenSharing',
  RCV_WAITING_ROOM_API_KEYS,
  RCV_E2EE_API_KEYS,
  'allowAnyoneRecord',
  'allowAnyoneTranscribe',
];

const RCV_PREFERENCES_IDS: Array<RcVSettingId> = [
  'e2ee',
  'join_before_host',
  // 'join_video_off',
  // 'join_audio_mute',
  'password_scheduled',
  'password_instant',
  'guest_join',
  'join_authenticated_from_account_only',
  'screen_sharing_host_only',
  'waiting_room_guests_only',
  'waiting_room',
  'allow_anyone_record_meetings',
  'allow_anyone_transcribe_meetings',
];

const RCV_PREFERENCES_KEYS: Array<RcVSettingKey> = [
  'allowJoinBeforeHost',
  // 'muteVideo',
  // 'muteAudio',
  'isMeetingSecret',
  'isOnlyAuthUserJoin',
  'isOnlyCoworkersJoin',
  'allowScreenSharing',
  RCV_WAITING_ROOM_API_KEYS,
  RCV_E2EE_API_KEYS,
];

const RCV_E2EE_RELATED_KEYS: Array<RcVSettingKey> = [
  'allowJoinBeforeHost',
  'isMeetingSecret',
  'isOnlyAuthUserJoin',
  'isOnlyCoworkersJoin',
  RCV_WAITING_ROOM_API_KEYS,
];

const RCV_E2EE_DEFAULT_SECURITY_OPTIONS: Partial<RcVideoAPI> = {
  allowJoinBeforeHost: false,
  isMeetingSecret: true,
  isOnlyAuthUserJoin: true,
  isOnlyCoworkersJoin: false,
  waitingRoomMode: RCV_WAITING_ROOM_MODE.notcoworker,
} as const;

/* RCINT-14566
 * Exclude characters that are hard to visually differentiate ["0", "o", "O", "I", "l"]
 */
function getDefaultChars(): string {
  const DEFAULT_PASSWORD_CHARSET =
    'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  return DEFAULT_PASSWORD_CHARSET;
}

function validateRandomPassword(pwd: string): boolean {
  return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]*$/.test(pwd);
}

function generateRandomPassword(length = 10): string {
  const charset = getDefaultChars();
  const charLen = charset.length;
  let retVal = '';
  for (let i = 0; i < length; i++) {
    retVal += charset.charAt(Math.floor(Math.random() * charLen));
  }
  if (!validateRandomPassword(retVal)) {
    return generateRandomPassword(length);
  }
  return retVal;
}

function validatePasswordSettings(
  meetingPassword: string,
  isMeetingSecret: boolean,
): boolean {
  if (!isMeetingSecret) {
    return true;
  }
  if (meetingPassword && RCV_PASSWORD_REGEX.test(meetingPassword)) {
    return true;
  }
  return false;
}

// gsuite
function getVideoSettings(data: RcVideoAPI): RcvGSuiteMeetingModel {
  const {
    name = 'Scheduled meeting',
    isMeetingSecret,
    meetingPassword,
    ...params
  } = data;
  const settings: RcvGSuiteMeetingModel = {
    ...params,
    name,
    type: RcVideoTypes.meeting,
    expiresIn: 31536000,
  };

  if (isMeetingSecret) {
    settings.isMeetingSecret = true;
    settings.meetingPassword = meetingPassword;
  } else {
    settings.isMeetingSecret = false;
    settings.meetingPassword = '';
  }

  return settings;
}

function getDefaultVideoSettings({
  topic,
  accountId,
  extensionId,
}: {
  topic: string;
  accountId: string;
  extensionId: string;
}): RcVMeetingModel {
  return {
    // api fields
    accountId,
    extensionId,
    name: topic,
    type: RcVideoTypes.meeting,
    expiresIn: 31536000,
    e2ee: false,
    allowJoinBeforeHost: false,
    muteAudio: false,
    muteVideo: false,
    isMeetingSecret: true,
    meetingPassword: '',
    isOnlyAuthUserJoin: false,
    isOnlyCoworkersJoin: false,
    allowScreenSharing: true,
    waitingRoomMode: RCV_WAITING_ROOM_MODE.off,
    // TODO: fix type
    // @ts-ignore
    settingLock: {
      allowJoinBeforeHost: false,
      // muteVideo: false,
      // muteAudio: false,
      isMeetingSecret: false,
      isOnlyAuthUserJoin: false,
      isOnlyCoworkersJoin: false,
      allowScreenSharing: false,
      waitingRoomMode: false,
      e2ee: false,
    },
    // ui fields
    startTime: new Date(),
    duration: 60,
    saveAsDefault: false,
    isMeetingPasswordValid: false,
    usePersonalMeetingId: false,
  };
}

function getTopic({
  extensionName,
  brandName,
  shortName,
  rcvMeetingTopic,
  rcvProductName,
}: TopicProps) {
  return format(rcvMeetingTopic, {
    extensionName,
    shortName,
    brandName,
    rcvProductName,
  });
}

/**
 * Remove client side properties before sending to RCV API
 */
function pruneMeetingObject(
  meeting: RcVMeetingModel,
  omitArr: Array<{
    condition: boolean;
    key: keyof RcVideoAPI;
  }>,
): RcVideoAPI {
  let meetingDetail = pick(RCV_CREATE_API_KEYS, meeting);
  omitArr.forEach(({ condition, key }) => {
    if (!condition) {
      meetingDetail = omit([key], meetingDetail) as RcVideoAPI;
    }
  });
  return meetingDetail;
}

/**
 * Helper function to filter out undefined values from an object
 */
function filterUndefinedValues<T extends Record<string, any>>(
  obj: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

function transformPreferences(
  preferences: RcVPreferencesGET,
  isInstantMeeting = false,
): Partial<RcVPreferences> {
  const transformations = {
    allowJoinBeforeHost: preferences.join_before_host!,
    // muteVideo: preferences.join_video_off,
    // muteAudio: preferences.join_audio_mute,
    e2ee: preferences.e2ee,
    isMeetingSecret: isInstantMeeting
      ? preferences.password_instant!
      : preferences.password_scheduled!,
    isOnlyAuthUserJoin: preferences.guest_join!,
    isOnlyCoworkersJoin: preferences.guest_join
      ? preferences.join_authenticated_from_account_only === 'only_co_workers'
      : false,
    allowScreenSharing: preferences.screen_sharing_host_only === 'all',
    allowAnyoneRecord: !!preferences.allow_anyone_record_meetings,
    allowAnyoneTranscribe: !!preferences.allow_anyone_transcribe_meetings,
    waitingRoomMode:
      preferences.waiting_room && preferences.waiting_room_guests_only
        ? RCV_WAITING_ROOM_MODE[preferences.waiting_room_guests_only]
        : RCV_WAITING_ROOM_MODE.off,
  };

  return filterUndefinedValues(transformations);
}

function transformSettingLocks(
  settingLocks: RcVSettingLocksGET,
  isInstantMeeting = false,
) {
  return {
    allowJoinBeforeHost: settingLocks.join_before_host!,
    e2ee: settingLocks.e2ee,
    isMeetingSecret: isInstantMeeting
      ? settingLocks.password_instant!
      : settingLocks.password_scheduled!,
    isOnlyAuthUserJoin: settingLocks.guest_join!,
    isOnlyCoworkersJoin: settingLocks.join_authenticated_from_account_only!,
    allowScreenSharing: settingLocks.screen_sharing_host_only!,
    waitingRoomMode: settingLocks.waiting_room!,
    allowAnyoneRecord: settingLocks.allow_anyone_record_meetings!,
    allowAnyoneTranscribe: settingLocks.allow_anyone_transcribe_meetings!,
  } as RcVSettingLocks;
}

function reversePreferences(
  meeting: Partial<RcVMeetingModel>,
  isInstantMeeting = false,
): Partial<RcVPreferencesGET> {
  const result: Partial<RcVPreferencesGET> = {
    join_before_host: meeting.allowJoinBeforeHost,
    // join_video_off: meeting.muteVideo,
    // join_audio_mute: meeting.muteAudio,
    guest_join: meeting.isOnlyAuthUserJoin,
    join_authenticated_from_account_only: meeting.isOnlyCoworkersJoin
      ? 'only_co_workers'
      : 'anyone_signed_into_rc',
    screen_sharing_host_only: meeting.allowScreenSharing ? 'all' : 'host',
    waiting_room: !!meeting.waitingRoomMode,
    waiting_room_guests_only:
      RCV_WAITING_ROOM_MODE_REVERSE[meeting.waitingRoomMode!],
    e2ee: meeting.e2ee,
  };
  if (isInstantMeeting) {
    result.password_instant = meeting.isMeetingSecret;
  } else {
    result.password_scheduled = meeting.isMeetingSecret;
  }
  return result;
}

/**
 * Reserve only preferences fields
 */
function prunePreferencesObject(meeting: RcVMeetingModel): RcVPreferences {
  return pick(RCV_PREFERENCES_KEYS, meeting);
}

function comparePreferences(
  preferences: Partial<RcVPreferences>,
  meeting: RcVMeetingModel,
): boolean {
  let preferencesChanged = false;
  if (preferences && meeting) {
    for (const key of Object.keys(preferences)) {
      const settingKey = key as RcVSettingKey;
      if (preferences[settingKey] !== meeting[settingKey]) {
        preferencesChanged = true;
        break;
      }
    }
  }
  return preferencesChanged;
}

function assignValue<T, K extends keyof T>(a: T, b: T, key: K) {
  a[key] = b[key];
}

function assignObject<T, P extends T[K], K extends keyof T>(
  a: T,
  b: P,
  key: K,
) {
  a[key] = b;
}

/**
 * Get preferences that need to be saved (changed and unlocked)
 */
function getDirtyPreferences(
  preferencesPayload: Partial<RcVPreferencesGET>,
  currentPreferences: RcVPreferencesGET,
  settingLocks: RcVSettingLocksGET,
) {
  type PreferenceEntries = [keyof RcVPreferencesGET, any];
  return Object.entries(preferencesPayload).filter(
    (kvPairs): kvPairs is PreferenceEntries => {
      const [preferenceId, newValue] = kvPairs as PreferenceEntries;
      const oldValue = currentPreferences[preferenceId];
      const isLocked = settingLocks[preferenceId];
      return !isLocked && newValue !== undefined && newValue !== oldValue;
    },
  );
}

/**
 * Update local preferences state using dirty preferences
 * This ensures server and local preferences stay in sync
 */
function updateLocalPreferences(
  dirtyPreferences: [keyof RcVPreferencesGET, any][],
  currentPreferences: RcVPreferencesGET,
): Partial<RcVPreferencesGET> {
  // Start with current preferences and update only the changed ones
  const savedPreferences: Partial<RcVPreferencesGET> = {
    ...currentPreferences,
  };

  dirtyPreferences.forEach(([preferenceId, newValue]) => {
    savedPreferences[preferenceId] = newValue;
  });

  return savedPreferences;
}

function getLockedPreferences(
  settingLocks: RcVSettingLocks,
  preferences: Partial<RcVPreferences>,
): Partial<RcVPreferences> {
  const lockedPreferences: Partial<RcVPreferences> = {};
  for (const [key, locked] of Object.entries(settingLocks)) {
    if (locked) {
      const settingKey = key as RcVSettingKey;
      assignValue(lockedPreferences, preferences, settingKey);
    }
  }
  return lockedPreferences;
}

function getAvaliableWaitingRoomOpions(
  isOnlyCoworkersJoin: boolean,
): Array<number> {
  return isOnlyCoworkersJoin
    ? [RCV_WAITING_ROOM_MODE.off, RCV_WAITING_ROOM_MODE.all]
    : [
        RCV_WAITING_ROOM_MODE.off,
        RCV_WAITING_ROOM_MODE.all,
        RCV_WAITING_ROOM_MODE.notcoworker,
      ];
}

function patchWaitingRoomRelated(
  settings: RcVMeetingModel,
  { waitingRoomMode }: Partial<RcVPreferences> = {},
  isUpdatingMode = false,
): Partial<RcVMeetingModel> {
  const processedSettings: Partial<RcVMeetingModel> = {};
  if (settings.isOnlyAuthUserJoin) {
    // for pmi setting, waitingRoom, joinAfterMe option maybe not avaliable
    if (
      !getAvaliableWaitingRoomOpions(settings.isOnlyCoworkersJoin).includes(
        settings.waitingRoomMode!,
      )
    ) {
      processedSettings.waitingRoomMode = isUpdatingMode
        ? RCV_WAITING_ROOM_MODE.all
        : waitingRoomMode;
    }
  }
  // when waitingRoom is 'everyone', joinAfterMe should be always checked
  if (
    (processedSettings.waitingRoomMode === RCV_WAITING_ROOM_MODE.all ||
      settings.waitingRoomMode === RCV_WAITING_ROOM_MODE.all) &&
    settings.allowJoinBeforeHost
  ) {
    processedSettings.allowJoinBeforeHost = false;
  }
  return processedSettings;
}

function formatMainPhoneNumber(
  dialInNumber: string | RcVDialInNumberObj[],
): string | undefined {
  if (typeof dialInNumber === 'string') {
    return dialInNumber;
  }

  if (!dialInNumber || dialInNumber.length === 0) {
    return undefined;
  }

  return dialInNumber[0].phoneNumber;
}

function formatPremiumNumbers(
  dialInNumber: string | RcVDialInNumberObj[],
): string[] {
  if (typeof dialInNumber === 'string') {
    return [dialInNumber];
  }

  if (!dialInNumber || dialInNumber.length === 0) {
    return [];
  }

  return map((obj) => {
    const locationField =
      obj?.country?.name && obj.location
        ? `${obj.country.name} (${obj.location})`
        : obj?.country?.name || '';

    return `${obj.phoneNumber} ${locationField}`;
  }, dialInNumber);
}

const formatRcvRequestData = (params: RcvInvitationRequest, numbers: any) => {
  const joinUriInfo = params.joinUri?.split(`/join/`) || [];
  // format request data
  const parameters = {
    numbers,
    meetingName: `---`,
    hostName: params.hostName,
    personalMeetingName: params.personalMeetingName,
    meetingId: params.shortId,
    isSIPAvailable: params.isSIPAvailable,
    participantCode: params.shortId,
    brandName: params.brandName,
    entryPoint: joinUriInfo[0],
    $Brand_Id: params.brandId,
    $Extension_FormattingLocaleCode: params.currentLocale,
    $Extension_LanguageLocaleCode: params.currentLocale,
    isE2eeEnabled: !!params.e2ee,
    password: params.isMeetingSecret ? params.meetingPassword : undefined,
    dialInPassword: params.isMeetingSecret
      ? params.meetingPasswordPSTN
      : undefined,
    maskedPassword: params.isMeetingSecret
      ? params.meetingPasswordMasked
      : undefined,
  };
  return {
    notificationId: 'meetingInvite',
    plainTextPreferred: true,
    isolatedMode: true,
    parameters: pipe(
      toPairs,
      map(([parameterName, parameterValue]) => ({
        parameterName,
        parameterValue,
      })),
      filter(
        (item: { parameterName: string; parameterValue: any }) =>
          item.parameterValue !== undefined,
      ),
    )(parameters),
  };
};

const formatRcvInvitationRequestData = (params: RcvInvitationRequest) => {
  // format number
  const numbers = params.dialInNumbers.map((item) => {
    return {
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      default: item.default,
      location: item.location,
    };
  });
  return formatRcvRequestData(params, numbers);
};

const sortDialInNumbers = (
  numbers: RcvInvitationRequestV2['phoneNumbers'],
  currentLocale: string,
) => {
  const defaultPhoneNumbers = numbers
    .filter((item) => !item.premium)
    .map((item) => ({
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      location: item.location,
    }));
  const premiumNumbers = numbers
    .filter((item) => item.premium && !!item.location)
    .map((item) => ({
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      location: item.location,
    }));
  const tollFreeNumbers = numbers
    .filter((item) => item.premium && !item.location)
    .map((item) => ({
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      location: `${t('tollFree')}`,
    }));
  return [...defaultPhoneNumbers, ...premiumNumbers, ...tollFreeNumbers];
};

const formatRcvInvitationRequestDataV2 = (params: any) => {
  // format number
  const numbers = sortDialInNumbers(params.phoneNumbers, params.currentLocale);
  return formatRcvRequestData(params, numbers);
};

/**
 * Helper function to format join URI for PMI in V2 API
 */
const formatJoinUriWithPMN = (settings: RcVideoV2Api): string => {
  const joinUri = settings.discovery?.web;
  const alias = settings.pins?.aliases?.[0];

  if (settings.type === 'PMI' && alias) {
    const pmiId = settings.pins?.pstn.participant;
    return joinUri.replace(pmiId, alias);
  }

  return joinUri;
};

/**
 * Convert the data structure of RcVideoV2 to RcVideoV1
 */
const transformV2ResponseToV1 = (
  settings: RcVideoV2Api,
): Partial<RcVideoAPIResponse | RcVideoAPI> => {
  return {
    id: settings.id,
    name: settings.name,
    shortId: settings.pins?.pstn.participant,
    extensionId: settings.host?.extensionId,
    accountId: settings.host?.accountId,
    type: 0,
    personalMeetingName: settings.pins?.aliases?.[0],
    allowJoinBeforeHost: settings.preferences.joinBeforeHost,
    allowScreenSharing: settings.preferences.screenSharing,
    isMeetingSecret: settings.security.passwordProtected,
    meetingPassword: settings.security.password?.plainText,
    meetingPasswordMasked: settings.security.password?.joinQuery,
    meetingPasswordPSTN: settings.security.password?.pstn,
    isOnlyAuthUserJoin: settings.security.noGuests,
    isOnlyCoworkersJoin: settings.security.sameAccount,
    e2ee: settings.security.e2ee,
    joinUri: formatJoinUriWithPMN(settings),
    muteAudio: settings.preferences.join?.audioMuted,
    muteVideo: settings.preferences.join?.videoMuted,
    waitingRoomMode:
      RCV_WAITING_ROOM_MODE_V2[settings.preferences.join?.waitingRoomRequired],
    allowAnyoneRecord:
      settings.preferences.recordings?.everyoneCanControl.enabled ?? false,
    allowAnyoneTranscribe:
      settings.preferences.allowEveryoneTranscribeMeetings ?? false,
  };
};

/**
 * Transform V1 meeting data to V2 format for API calls
 */
const transformV1MeetingToV2 = (
  settings: RcVideoAPI,
  usePersonalMeetingId: boolean,
  options: {
    enableWaitingRoom: boolean;
    enableE2EE: boolean;
  },
): RcVideoV2PostData => {
  const result: RcVideoV2PostData = {
    name: settings.name,
    type: usePersonalMeetingId ? 'PMI' : 'Scheduled',
    security: {
      passwordProtected: settings.isMeetingSecret,
      password: settings.isMeetingSecret ? settings.meetingPassword! : '',
      // If true, only authenticated users can join to a meeting.
      noGuests: settings.isOnlyAuthUserJoin,
      // If true, only users have the same account can join to a meeting.
      sameAccount: settings.isOnlyCoworkersJoin,
    },
    preferences: {
      join: {
        audioMuted: settings.muteAudio,
        videoMuted: settings.muteVideo,
      },
      joinBeforeHost: settings.allowJoinBeforeHost,
      screenSharing: settings.allowScreenSharing,
      allowEveryoneTranscribeMeetings: !!settings.allowAnyoneTranscribe,
      recordings: {
        everyoneCanControl: { enabled: !!settings.allowAnyoneRecord },
      },
    },
  };
  if (options.enableWaitingRoom) {
    result.preferences.join.waitingRoomRequired =
      RCV_WAITING_ROOM_MODE_V2_REVERSE[settings.waitingRoomMode!];
  }
  if (options.enableE2EE) {
    result.security.e2ee = settings.e2ee!;
  }
  if (usePersonalMeetingId) {
    result.id = settings.id!;
  }
  return result;
};

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
export {
  assignObject,
  comparePreferences,
  formatJoinUriWithPMN,
  formatMainPhoneNumber,
  formatPremiumNumbers,
  formatRcvInvitationRequestData,
  formatRcvInvitationRequestDataV2,
  generateRandomPassword,
  getDefaultChars,
  getDefaultVideoSettings,
  getDirtyPreferences,
  getLockedPreferences,
  getTopic,
  getVideoSettings,
  meetingProviderTypes,
  patchWaitingRoomRelated,
  pruneMeetingObject,
  prunePreferencesObject,
  RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
  RCV_E2EE_RELATED_KEYS,
  RCV_PREFERENCES_IDS,
  RCV_PREFERENCES_KEYS,
  RcVideoTypes,
  reversePreferences,
  sortDialInNumbers,
  transformPreferences,
  transformSettingLocks,
  transformV1MeetingToV2,
  transformV2ResponseToV1,
  updateLocalPreferences,
  validatePasswordSettings,
  validateRandomPassword,
};
