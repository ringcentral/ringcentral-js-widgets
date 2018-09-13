
import callControlError from 'ringcentral-integration/modules/ActiveCallControl/callControlError';

const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  hangUpError,
  transferError
} = callControlError;

export default {
  [muteConflictError]: 'This call had been muted on other device. Please unmute the call before you control in this App.',
  [holdConflictError]: 'This call had been held on other device. Please unhold the call before you control in this App.',
  [unMuteConflictError]: 'This call had been unmuted on other device. Please mute the call before you control in this App.',
  [unHoldConflictError]: 'This call had been unheld on other device. Please hold the call before you control in this App.',
  [transferError]: 'transfer error',
  [hangUpError]: 'hang up error',
};
