import { includes } from 'ramda';

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
  message: { message, payload },
  currentLocale,
}: EvCallDispositionAlertProps) {
  return typeof payload === 'string'
    ? payload
    : i18n.getString(message, currentLocale);
}

EvCallDispositionAlert.handleMessage = ({ message }: HandleMessage): boolean =>
  includes(message, [
    logTypes.CALL_DISPOSITION_FAILURE,
    logTypes.CALL_DISPOSITION_SUCCESS,
    logTypes.CALL_LOG_CREATE_FAILURE,
    logTypes.CALL_LOG_CREATE_SUCCESS,
    logTypes.CALL_LOG_UPDATE_FAILURE,
    logTypes.CALL_LOG_UPDATE_SUCCESS,
  ]);
