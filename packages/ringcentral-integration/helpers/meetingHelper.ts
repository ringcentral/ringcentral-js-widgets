import formatMessage from 'format-message';
import { pick } from 'ramda';

import format, {
  formatTypes,
} from '@ringcentral-integration/phone-number/lib/format';

import i18n from '../modules/MeetingV2/i18n';
import { RcMMeetingModel } from '../modules/MeetingV2/Meeting.interface';
import { MeetingType, MeetingTypeV } from './meetingHelper.interface';

function getMobileDialingNumberTpl(dialInNumbers, meetingId) {
  return dialInNumbers
    .map(({ phoneNumber, location = '' }) =>
      location
        ? `${phoneNumber},,${meetingId}# (${location})`
        : `${phoneNumber},,${meetingId}#`,
    )
    .join('\n    ');
}

function getPhoneDialingNumberTpl(dialInNumbers) {
  return dialInNumbers
    .map(({ phoneNumber, location = '', country }) => {
      const filterFormattedNumber = format({
        phoneNumber,
        countryCode: country.isoCode,
        type: formatTypes.international,
      });
      return location
        ? `${filterFormattedNumber} (${location})`
        : `${filterFormattedNumber}`;
    })
    .join('\n    ');
}

const UTC_TIMEZONE_ID = '1';

function isRecurringMeeting(meetingType: MeetingTypeV) {
  return (
    meetingType === MeetingType.RECURRING ||
    meetingType === MeetingType.SCHEDULED_RECURRING
  );
}

function getMeetingSettings({
  extensionName,
  startTime,
  durationInMinutes = 60,
  topic = '',
  currentLocale = 'en-US',
}) {
  return {
    topic:
      topic ||
      formatMessage(i18n.getString('meetingTitle', currentLocale), {
        extensionName,
      }),
    meetingType: MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime,
      durationInMinutes,
      timeZone: {
        id: UTC_TIMEZONE_ID,
      },
    },
    host: {
      id: null,
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
  };
}

function getDefaultTopic(
  extensionName: string,
  currentLocale: string = 'en-US',
) {
  return formatMessage(i18n.getString('meetingTitle', currentLocale), {
    extensionName,
  });
}

// Basic default meeting type information
function getDefaultMeetingSettings(
  extensionName: string,
  currentLocale: string = 'en-US',
  startTime: number,
  hostId?: string,
): RcMMeetingModel {
  return {
    topic: getDefaultTopic(extensionName, currentLocale),
    meetingType: MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime,
      durationInMinutes: 60,
      timeZone: {
        id: UTC_TIMEZONE_ID,
      },
    },
    host: {
      id: hostId ?? null,
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
    usePersonalMeetingId: false,
    _requireMeetingPassword: false,
    _showDate: false,
    _showTime: false,
    _saved: false,
  };
}

function getInitializedStartTime(): number {
  const now = new Date();
  const startTime = now.setHours(now.getHours() + 1, 0, 0, 0);
  return startTime;
}

const preferencesMembers = [
  'allowJoinBeforeHost',
  'startHostVideo',
  'startParticipantsVideo',
  '_requireMeetingPassword',
];

function prunePreferencesObject(meeting) {
  const preferences = pick(preferencesMembers, meeting);
  return preferences;
}

function comparePreferences(preferences, meeting): boolean {
  let preferencesChanged = false;
  if (preferences && meeting) {
    for (const key in preferences) {
      if (preferences[key] !== meeting[key]) {
        preferencesChanged = true;
        break;
      }
    }
  }
  return preferencesChanged;
}

function generateRandomPassword(length: number = 6): string {
  const charset = '0123456789';
  const charLen = charset.length;
  let retVal = '';
  for (let i = 0; i < length; i++) {
    retVal += charset.charAt(Math.floor(Math.random() * charLen));
  }
  return retVal;
}

// only update the date part (container year, month, day)
function updateFullYear(preTime: Date, currTime: Date): number {
  const y = currTime.getFullYear();
  const m = currTime.getMonth();
  const d = currTime.getDate();
  return preTime.setFullYear(y, m, d);
}

// only update the time part (container hour, minute, second)
function updateFullTime(preTime: Date, currTime: Date | number): Date {
  const newTime = new Date(currTime);
  preTime.setHours(newTime.getHours());
  preTime.setMinutes(newTime.getMinutes());
  preTime.setSeconds(newTime.getSeconds());
  return preTime;
}

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
export {
  comparePreferences,
  generateRandomPassword,
  getDefaultMeetingSettings,
  getDefaultTopic,
  getInitializedStartTime,
  getMeetingSettings,
  getMobileDialingNumberTpl,
  getPhoneDialingNumberTpl,
  isRecurringMeeting,
  MeetingType,
  prunePreferencesObject,
  updateFullTime,
  updateFullYear,
  UTC_TIMEZONE_ID,
};
