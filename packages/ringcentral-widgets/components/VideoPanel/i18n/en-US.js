import { ASSISTED_USERS_MYSELF } from 'ringcentral-integration/modules/RcVideo/constants';

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
  onlyJoinAfterMe: 'Participants can only join after me',
  onlyJoinAfterHost: 'Participants can only join after host',
  muteAudio: 'Mute audio for participants',
  turnOffCamera: 'Turn off camera for participants',
  requirePassword: 'Require password',
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
};
