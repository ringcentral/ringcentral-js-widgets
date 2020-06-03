import {
  transferErrors,
  transferSuccesses,
  transferEvents,
} from '../../../../enums';

export default {
  [transferEvents.START]: 'Call transfer in progress',
  [transferErrors.TRANSFER_ERROR]: 'Transfer call failed.',
  [transferSuccesses.TRANSFER_CONNECTED]: 'Call transfer connected',
  [transferSuccesses.SEND_VOICEMAIL_SUCCESS]: 'Succeed to send voicemail',
  [transferErrors.SEND_VOICEMAIL_ERROR]: 'Failed to send voicemail',
};
