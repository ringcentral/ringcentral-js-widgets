import { format } from '@ringcentral-integration/utils';
import { filter, map, omit, pick, pipe, toPairs } from 'ramda';

import type {
  MeetingProviderTypesProps,
  RcVDialInNumberObj,
  RcvGSuiteMeetingModel,
  RcVideoAPI,
  RcVideoTypesProps,
  RcvInvitationRequest,
  RcVMeetingModel,
  RcVPreferences,
  RcVPreferencesGET,
  RcVSettingId,
  RcVSettingKey,
  RcVSettingLocks,
  RcVSettingLocksGET,
} from '../../interfaces/Rcv.model';

import type { RcvInvitationRequestV2, TopicProps } from './RcVideo.interface';
import {
  RCV_E2EE_API_KEYS,
  RCV_PASSWORD_REGEX,
  RCV_WAITING_ROOM_API_KEYS,
  RCV_WAITING_ROOM_MODE,
  RCV_WAITING_ROOM_MODE_REVERSE,
} from './constants';
import i18n from './i18n';

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
    // @ts-expect-error TS(2322): Type '{ allowJoinBeforeHost: false; isMeetingSecre... Remove this comment to see the full error message
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

function transformPreferences(
  preferences: RcVPreferencesGET,
  isInstantMeeting = false,
): RcVPreferences {
  return {
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowJoinBeforeHost: preferences.join_before_host,
    // muteVideo: preferences.join_video_off,
    // muteAudio: preferences.join_audio_mute,
    e2ee: preferences.e2ee,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isMeetingSecret: isInstantMeeting
      ? preferences.password_instant
      : preferences.password_scheduled,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isOnlyAuthUserJoin: preferences.guest_join,
    isOnlyCoworkersJoin: preferences.guest_join
      ? preferences.join_authenticated_from_account_only === 'only_co_workers'
      : false,
    allowScreenSharing: preferences.screen_sharing_host_only === 'all',
    allowAnyoneRecord: !!preferences.allow_anyone_record_meetings,
    allowAnyoneTranscribe: !!preferences.allow_anyone_transcribe_meetings,
    waitingRoomMode: preferences.waiting_room
      ? // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        RCV_WAITING_ROOM_MODE[preferences.waiting_room_guests_only]
      : RCV_WAITING_ROOM_MODE.off,
  };
}

function transformSettingLocks(
  settingLocks: RcVSettingLocksGET,
  isInstantMeeting = false,
): RcVSettingLocks {
  return {
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowJoinBeforeHost: settingLocks.join_before_host,
    // muteVideo: settingLocks.join_video_off,
    // muteAudio: settingLocks.join_audio_mute,
    e2ee: settingLocks.e2ee,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isMeetingSecret: isInstantMeeting
      ? settingLocks.password_instant
      : settingLocks.password_scheduled,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isOnlyAuthUserJoin: settingLocks.guest_join,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isOnlyCoworkersJoin: settingLocks.join_authenticated_from_account_only,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowScreenSharing: settingLocks.screen_sharing_host_only,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    waitingRoomMode: settingLocks.waiting_room,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowAnyoneRecord: settingLocks.allow_anyone_record_meetings,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowAnyoneTranscribe: settingLocks.allow_anyone_transcribe_meetings,
  };
}

function reversePreferences(
  preferences: RcVPreferences,
  isInstantMeeting = false,
): Partial<RcVPreferencesGET> {
  const result: Partial<RcVPreferencesGET> = {
    join_before_host: preferences.allowJoinBeforeHost,
    // join_video_off: preferences.muteVideo,
    // join_audio_mute: preferences.muteAudio,
    guest_join: preferences.isOnlyAuthUserJoin,
    join_authenticated_from_account_only: preferences.isOnlyCoworkersJoin
      ? 'only_co_workers'
      : 'anyone_signed_into_rc',
    screen_sharing_host_only: preferences.allowScreenSharing ? 'all' : 'host',
    waiting_room: !!preferences.waitingRoomMode,
    waiting_room_guests_only:
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      RCV_WAITING_ROOM_MODE_REVERSE[preferences.waitingRoomMode],
    e2ee: preferences.e2ee,
  };
  if (isInstantMeeting) {
    result.password_instant = preferences.isMeetingSecret;
  } else {
    result.password_scheduled = preferences.isMeetingSecret;
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
  preferences: RcVPreferences,
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

function getLockedPreferences(
  settingLocks: RcVSettingLocks,
  preferences: RcVPreferences,
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
  { waitingRoomMode }: RcVPreferences,
  isUpdatingMode = false,
): Partial<RcVMeetingModel> {
  const processedSettings: Partial<RcVMeetingModel> = {};
  if (settings.isOnlyAuthUserJoin) {
    // for pmi setting, waitingRoom, joinAfterMe option maybe not avaliable
    if (
      !getAvaliableWaitingRoomOpions(settings.isOnlyCoworkersJoin).includes(
        // @ts-expect-error TS(2345): Argument of type 'number | undefined' is not assig... Remove this comment to see the full error message
        settings.waitingRoomMode,
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
): string {
  if (typeof dialInNumber === 'string') {
    return dialInNumber;
  }

  if (!dialInNumber || dialInNumber.length === 0) {
    // @ts-expect-error TS(2322): Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
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
      location: `${i18n.getString('tollFree', currentLocale)}`,
    }));
  return [...defaultPhoneNumbers, ...premiumNumbers, ...tollFreeNumbers];
};

const formatRcvInvitationRequestDataV2 = (params: any) => {
  // format number
  const numbers = sortDialInNumbers(params.phoneNumbers, params.currentLocale);
  return formatRcvRequestData(params, numbers);
};

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
export {
  assignObject,
  comparePreferences,
  formatMainPhoneNumber,
  formatPremiumNumbers,
  formatRcvInvitationRequestData,
  formatRcvInvitationRequestDataV2,
  generateRandomPassword,
  getDefaultChars,
  getDefaultVideoSettings,
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
  validatePasswordSettings,
  validateRandomPassword,
};
