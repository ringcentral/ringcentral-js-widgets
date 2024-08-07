import {
  callControlAlerts,
  callControlError,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';

const { callsMerged, somethingWentWrong, tooManyParticipants } =
  callControlAlerts;

const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess,
  transferCompleted,
  replyCompleted,
} = callControlError;

export default {
  [callsMerged]: 'Calls merged',
  [somethingWentWrong]: 'Something went wrong. Please try again.',
  [tooManyParticipants]: 'Maximum number of participants is reached.',
  [muteConflictError]:
    'This call had been muted on other device. Please unmute the call before you control in this App.',
  [unHoldConflictError]:
    'This call had been held on other device. Please unhold the call before you control in this App.',
  [unMuteConflictError]:
    'This call had been unmuted on other device. Please mute the call before you control in this App.',
  [holdConflictError]:
    'This call had been unheld on other device. Please hold the call before you control in this App.',
  [generalError]: 'Unexpected server error. Please try again later.',
  [forwardSuccess]: 'Call forwarded',
  [transferCompleted]: 'Call transferred',
  [replyCompleted]: 'Voice message sent.',
} as const;
