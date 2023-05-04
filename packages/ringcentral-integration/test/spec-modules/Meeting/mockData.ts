import { getInitializedStartTime } from '../../../helpers/meetingHelper';

export const MOCK_TURN_OFF_3RD_PARTY_AUDIO = {
  audioConferenceInfo: '',
  thirdPartyAudio: false,
};

export const MOCK_PERSONAL_MEETING = {
  topic: 'RingCentral Meeting',
  meetingType: 'Scheduled',
  password: '123456',
  schedule: {
    startTime: '2020-11-23T09:00:00Z',
    durationInMinutes: 30,
    timeZone: { id: '26' },
  },
  host: {
    uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/270956004/extension/270963004',
    id: '270963004',
  },
  allowJoinBeforeHost: true,
  startHostVideo: false,
  startParticipantsVideo: false,
  audioOptions: ['ComputerAudio'],
  usePersonalMeetingId: true,
  _requireMeetingPassword: true,
  _showDate: false,
  _showTime: false,
  _saved: false,
  _lockRequireMeetingPassword: false,
  settingLock: {
    allowJoinBeforeHost: false,
    audioOptions: false,
    startHostVideo: false,
    startParticipantsVideo: false,
  },
  _pmiPassword: '',
  uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/270956004/extension/270963004/meeting/1482870071',
  uuid: 't90EAKqnQNO6vQ+EmItDcQ==',
  id: '1482870071',
  pmi: '6993012426',
  h323Password: '886918',
  status: 'NotStarted',
  links: {
    startUri: 'https://rcm.rcdev.ringcentral.com/s/6993012426',
    joinUri:
      'https://rcm.rcdev.ringcentral.com/j/6993012426?pwd=SU42dzV4NXdWT2ZJR0hSUXI3SmxDQT09',
  },
  muteParticipantsOnEntry: false,
  enableWaitingRoom: false,
  enforceLogin: false,
  autoRecordType: 'none',
  shortId: '6993012426',
};

export const EXPECT_PMI_DEFAULT_SETTING_WITH_SW_SETTING = {
  _saved: false,
  _showDate: false,
  _showTime: false,
  allowJoinBeforeHost: false,
  audioOptions: ['ComputerAudio'],
  host: {
    id: 'extensionId',
  },
  meetingType: 'Scheduled',
  password: '123456',
  schedule: {
    durationInMinutes: 60,
    startTime: getInitializedStartTime(),
    timeZone: {
      id: '1',
    },
  },
  settingLock: {},
  startHostVideo: false,
  startParticipantsVideo: false,
  topic: "extensionName's Meeting",
  usePersonalMeetingId: true,
};

export const SAVED_DEFAULT_MEETING_SETTING = {
  allowJoinBeforeHost: true,
  startHostVideo: true,
  startParticipantsVideo: true,
  audioOptions: ['Phone'],
  _requireMeetingPassword: true,
  _saved: true,
};

export const LAST_MEETING_SETTING = {
  allowJoinBeforeHost: false,
  startHostVideo: false,
  startParticipantsVideo: false,
  audioOptions: ['ComputerAudio'],
  _requireMeetingPassword: false,
  _saved: false,
};

export const EXPECT_SAVE_AS_DEFAULT_SETTING = {
  _requireMeetingPassword: true,
  _saved: true,
  _showDate: false,
  _showTime: false,
  allowJoinBeforeHost: true,
  audioOptions: ['Phone'],
  host: {
    id: 'extensionId',
  },
  meetingType: 'Scheduled',
  password: '',
  schedule: {
    durationInMinutes: 60,
    startTime: getInitializedStartTime(),
    timeZone: {
      id: '1',
    },
  },
  startHostVideo: true,
  startParticipantsVideo: true,
  topic: "extensionName's Meeting",
  usePersonalMeetingId: false,
};

export const EXPECT_LAST_MEETING_SETTING = {
  _requireMeetingPassword: false,
  _saved: false,
  _showDate: false,
  _showTime: false,
  allowJoinBeforeHost: false,
  audioOptions: ['ComputerAudio'],
  host: {
    id: 'extensionId',
  },
  meetingType: 'Scheduled',
  password: '',
  schedule: {
    durationInMinutes: 60,
    startTime: getInitializedStartTime(),
    timeZone: {
      id: '1',
    },
  },
  startHostVideo: false,
  startParticipantsVideo: false,
  topic: "extensionName's Meeting",
  usePersonalMeetingId: false,
};

export const EXPECT_GENERAL_DEFAULT_SETTING_WITH_SW_SETTING = {
  _lockRequireMeetingPassword: false,
  _pmiPassword: '',
  _requireMeetingPassword: false,
  _saved: false,
  _showDate: false,
  _showTime: false,
  allowJoinBeforeHost: false,
  audioOptions: ['Phone', 'ComputerAudio'],
  host: {
    id: 'extensionId',
  },
  meetingType: 'Scheduled',
  password: '',
  schedule: {
    durationInMinutes: 60,
    startTime: getInitializedStartTime(),
    timeZone: {
      id: '1',
    },
  },
  settingLock: {},
  startHostVideo: false,
  startParticipantsVideo: false,
  topic: "extensionName's Meeting",
  usePersonalMeetingId: false,
};
