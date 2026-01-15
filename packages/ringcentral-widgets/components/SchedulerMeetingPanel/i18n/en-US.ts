import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';

export default {
  scheduleFor: 'Schedule on behalf of',
  scheduleForAssistedUser: 'Update meetings settings on behalf of {userName}.',
  scheduleForGuidance:
    "Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n",
  scheduleForGuidanceMore: 'Learn details',
  meetingSettings: 'Meeting settings',
  meetingSettingsDescription: 'Updates will apply to this meeting only.',
  [ASSISTED_USERS_MYSELF]: 'Myself',
  waitingRoomTitle: 'Use waiting room',
  waitingRoomDescription:
    'Participants wait until you admit them. Great for interviews or outside attendees.',
  waitingRoomNotCoworker: 'For anyone outside my company',
  waitingRoomGuest: 'For anyone not signed in',
  waitingRoomAll: 'For all participants',
  enterPassword: 'Enter Password',
  onlyJoinAfterMe: 'Start meeting after you join',
  allowJoinBeforeHostDescription:
    'The meeting will start after you join to prevent early conversations.',
  requirePassword: 'Require password',
  requirePasswordDescription:
    "Keep your meeting secure. Anyone using the link won't be prompted for a password.",
  password: 'Password:',
  passwordEmptyError: 'Meeting password required',
  passwordInvalidError:
    'Your password must be 1-10 letters and numbers long but cannot contain symbols',
  passwordHintText:
    'Your password should be 1-10 letters and numbers long, but can not contain symbols.',
  usePersonalMeetingIdInstead: 'Use personal meeting link',
  allowMeetingAccess: 'Manage who can join',
  anyoneWithLink: 'Anyone with link',
  signedInUsers: 'Only {shortName} accounts',
  signedInCoWorkers: 'Only my coworkers',
  passwordLabel: 'Password',
  edit: 'Edit',
  editSettings: 'Edit settings',
  lockTooltip: 'This setting is managed by your company admin',
  cancel: 'Cancel',
  update: 'Update',
  pmiSettingsTitle: 'Personal meeting settings',
  pmiSettingsDescription:
    'Set who can join and how for your personal meeting link.',
} as const;
