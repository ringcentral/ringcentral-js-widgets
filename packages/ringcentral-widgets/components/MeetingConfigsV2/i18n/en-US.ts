import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/Meeting';

export default {
  date: 'Date',
  time: 'Time',
  hours: '{howMany} hr',
  minutes: '{howMany} min',
  today: 'Today',
  duration: 'Duration',
  topic: 'Meeting title',
  voIPOnly: 'Internet audio only',
  telephonyOnly: 'Telephone only',
  both: 'Telephone and Internet audio',
  thirdParty: '3rd party audio',
  meetingId: 'Meeting ID',
  password: 'Password',
  video: 'Video',
  audio: 'Audio',
  scheduleFor: 'Schedule on behalf of',
  [ASSISTED_USERS_MYSELF]: 'Myself',
  meetingOptions: 'Meeting options',
  meetingSettings: 'Meeting settings',
  rcMeetingSettings: 'Video Meeting settings',
  audioOptions: 'Audio options',
  recurringMeeting: 'Recurring meeting',
  recurringNote: 'Note: Enable this one when choosing "Recurrence"',
  joinBeforeHost: 'Allow participants to join before host',
  turnOffCamera: 'Turn off camera for participants',
  turnOffHostCamera: 'Turn off camera for host when joining meeting',
  requirePassword: 'Require password',
  enterPassword: 'Enter Password',
  setPassword: 'Set password *',
  passwordEmptyError: 'Meeting password required',
  rcmPasswordInvalidError:
    'Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -',
  rcmPasswordHintText:
    'Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -',
  usePersonalMeetingId: 'Use Personal Meeting ID',
  pmiChangeConfirm: 'If you want to make changes for your Personal Meeting, ',
  changePmiSettings: 'change PMI settings',
  pmiSettingChangeAlert:
    'If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings.',
  lockedTooltip: 'This setting is managed by your company admin',
  when: 'When',
  recurringDescribe:
    'Please remember to check recurrence or repeat in your calendar invitation to your attendees.',
  ieSupportAlert:
    "Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above.",
};
