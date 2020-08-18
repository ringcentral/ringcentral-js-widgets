import {
  transferErrors,
  transferSuccesses,
  transferEvents,
} from '../../../../enums';

export default {
  [transferEvents.START]: 'Call transfer in progress',
  [transferErrors.TRANSFER_ERROR]: 'Call transfer is failed.',
  [transferSuccesses.TRANSFER_CONNECTED]: 'Call transfer is connected',
  [transferSuccesses.SEND_VOICEMAIL_SUCCESS]: 'Send voicemail is succeed',
  [transferErrors.SEND_VOICEMAIL_ERROR]: 'Send voicemail is failed',
};
