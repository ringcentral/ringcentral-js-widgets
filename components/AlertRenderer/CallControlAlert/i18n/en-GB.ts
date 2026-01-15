/* eslint-disable */
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
  [tooManyParticipants]: 'Maximum number of participants has been reached.',
  [muteConflictError]:
    'This call had been muted on another device. Please unmute the call before you take control in this app.',
  [unHoldConflictError]:
    'This call has been held on another device. Please unhold the call before you take control in this app.',
  [unMuteConflictError]:
    'This call has been unmuted on another device. Please mute the call before you take control in this app.',
  [holdConflictError]:
    'This call has been unheld on another device. Please hold the call before you take control in this app.',
  [generalError]: 'Unexpected server error. Please try again later.',
  [forwardSuccess]: 'Call forwarded',
  [transferCompleted]: 'Call transferred',
  [replyCompleted]: 'Voice message sent.',
} as const;

// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
