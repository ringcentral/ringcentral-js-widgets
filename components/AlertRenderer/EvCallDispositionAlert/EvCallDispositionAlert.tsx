import { contains } from 'ramda';

import { logTypes } from '../../../enums/logTypes';
import i18n from './i18n';

interface EvCallDispositionAlertProps {
  message: {
    message: string;
    payload?: string;
  };
  currentLocale: string;
}

interface HandleMessage {
  message: string;
}

export default function EvCallDispositionAlert({
  message: { message },
  currentLocale,
}: EvCallDispositionAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvCallDispositionAlert.handleMessage = ({ message }: HandleMessage): boolean =>
  contains(message, [
    logTypes.CALL_DISPOSITION_FAILURE,
    logTypes.CALL_DISPOSITION_SUCCESS,
  ]);
