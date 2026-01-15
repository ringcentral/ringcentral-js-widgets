/* eslint-disable */
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
  both: 'Telephone and internet audio',
  thirdParty: 'Third-party audio',
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
    'Your password must be 1–10 characters long, including letters and numbers, and cannot have symbols except for @, * or -',
  rcmPasswordHintText:
    'Your password should be 1–10 characters long, including letters and numbers, and cannot have symbols except for @, * or -',
  usePersonalMeetingId: 'Use Personal Meeting ID',
  pmiChangeConfirm: 'If you want to make changes for your Personal Meeting, ',
  changePmiSettings: 'change PMI settings',
  pmiSettingChangeAlert:
    'If you change the settings and schedule this meeting, all meetings with Personal Meeting ID will use the same latest settings.',
  lockedTooltip: 'This setting is managed by your company admin',
  when: 'When',
  recurringDescribe:
    'Please remember to check for recurrences or repeats in your calendar invitation to your attendees.',
} as const;

// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@
