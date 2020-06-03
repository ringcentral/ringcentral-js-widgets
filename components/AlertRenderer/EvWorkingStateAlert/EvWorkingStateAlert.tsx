import { contains } from 'ramda';

import { messageTypes } from '../../../enums';
import i18n from './i18n';

interface EvWorkingStateAlertProps {
  message: {
    message: string;
  };
  currentLocale: string;
}

export default function EvWorkingStateAlert({
  message: { message },
  currentLocale,
}: EvWorkingStateAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvWorkingStateAlert.handleMessage = ({ message }: { message: string }) =>
  contains(message, [
    messageTypes.INVALID_STATE_CHANGE,
    messageTypes.OVER_BREAK_TIME,
  ]);
