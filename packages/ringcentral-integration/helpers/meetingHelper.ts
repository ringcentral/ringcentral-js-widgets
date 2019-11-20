import format, {
  formatTypes,
} from '@ringcentral-integration/phone-number/lib/format';

function getMobileDialingNumberTpl(dialInNumbers, meetingId) {
  return dialInNumbers
    .map(
      ({ phoneNumber, location = '' }) =>
        `${phoneNumber},,${meetingId}# ${location}`,
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
      return `${filterFormattedNumber}${location}`;
    })
    .join('\n    ');
}

const UTC_TIMEZONE_ID = '1';
const MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  INSTANT: 'Instant',
};

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
function getDefaultMeetingSettings(extensionName, startTime) {
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
      id: null,
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
    _requireMeetingPassword: false,
    _showDate: false,
    _showTime: false,
    _saved: false,
  };
}

function getInitializedStartTime() {
  const now = new Date();
  const startTime = now.setHours(now.getHours() + 1, 0, 0);
  return startTime;
}

export {
  getMobileDialingNumberTpl,
  getPhoneDialingNumberTpl,
  UTC_TIMEZONE_ID,
  MeetingType,
  getMeetingSettings,
  getDefaultMeetingSettings,
  getInitializedStartTime,
};
