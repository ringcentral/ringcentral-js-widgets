import format, {
  formatTypes,
} from '@ringcentral-integration/phone-number/lib/format';
import { pick } from 'ramda';

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
}) {
  return {
    topic: topic || `${extensionName}'s Meeting`,
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

// Basic default meeting type information
function getDefaultMeetingSettings(
  extensionName: string,
  startTime: number,
  hostId?: string,
): RcMMeetingModel {
  return {
    topic: `${extensionName}'s Meeting`,
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

export {
  getMobileDialingNumberTpl,
  getPhoneDialingNumberTpl,
  UTC_TIMEZONE_ID,
  MeetingType,
  getMeetingSettings,
  getDefaultMeetingSettings,
  getInitializedStartTime,
  prunePreferencesObject,
  comparePreferences,
  isRecurringMeeting,
  generateRandomPassword,
};
