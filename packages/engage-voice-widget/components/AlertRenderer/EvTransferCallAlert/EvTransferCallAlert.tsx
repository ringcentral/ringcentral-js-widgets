import { includes } from 'ramda';

import {
  transferErrors,
  transferEvents,
  transferSuccesses,
} from '../../../enums';

import i18n from './i18n';

interface EvTransferCallAlertProps {
  message: {
    message: string;
  };
  currentLocale: string;
}

export default function EvTransferCallAlert({
  message: { message },
  currentLocale,
}: EvTransferCallAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvTransferCallAlert.handleMessage = ({ message }: { message: string }) =>
  includes(message, [
    transferEvents.START,
    transferErrors.TRANSFER_ERROR,
    transferSuccesses.TRANSFER_CONNECTED,
    transferSuccesses.SEND_VOICEMAIL_SUCCESS,
    transferErrors.SEND_VOICEMAIL_ERROR,
  ]);
