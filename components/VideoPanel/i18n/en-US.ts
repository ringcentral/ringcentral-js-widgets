import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo/constants';

export default {
  topic: 'Meeting title',
  date: 'Date',
  startTime: 'Time',
  duration: 'Duration',
  scheduleFor: 'Schedule on behalf of',
  meetingSettings: 'Meeting settings',
  [ASSISTED_USERS_MYSELF]: 'Myself',
  joinBeforeHost: 'Allow participants to join before host',
  enableWaitingRoom: 'Enable waiting room',
  waitingRoom: 'Enable waiting room for',
  waitingRoomNotCoworker: 'Anyone outside my company',
  waitingRoomGuest: 'Anyone not signed in',
  waitingRoomAll: 'Everyone',
  enterPassword: 'Enter Password',
  onlyJoinAfterMe: 'Participants can only join after me',
  onlyJoinAfterHost: 'Participants can only join after host',
  muteAudio: 'Mute audio for participants',
  turnOffCamera: 'Turn off camera for participants',
  requirePassword: 'Require password',
  useE2ee: 'Use end-to-end encryption',
  e2eeTooltip:
    "End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available.",
  setPassword: 'Set password *',
  setPasswordNotSymbol: 'Set password',
  passwordEmptyError: 'Meeting password required',
  passwordInvalidError:
    'Your password must be 1-10 letters and numbers long but cannot contain symbols',
  passwordHintText:
    'Your password should be 1-10 letters and numbers long but cannot contain symbols',
  usePersonalMeetingId: 'Use Personal Meeting ID',
  meetingSettingsSecurity: 'Security',
  onlyAuthUserJoin: 'Only authenticated users can join',
  signedInUsers: 'Signed in users',
  signedInCoWorkers: 'Signed in co-workers',
  limitScreenSharing: 'Only host & moderators can share screen',
  lockTooltip: 'This setting is managed by your company admin',
  pmiSettingAlert: 'These settings will apply to all meetings created with PMI',
  today: 'Today',
  scheduleForGuidance:
    "Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n",
  scheduleForGuidanceMore: 'Learn details',
  changePmiSettings: 'Change Personal meeting settings',
  ieSupportAlert:
    "Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above.",
};
