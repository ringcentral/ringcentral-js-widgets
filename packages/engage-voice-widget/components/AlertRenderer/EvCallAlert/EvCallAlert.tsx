import { includes } from 'ramda';

import { messageTypes } from '../../../enums';
import i18n from './i18n';

interface EvCallAlertProps {
  message: {
    message: string;
  };
  currentLocale: string;
}

export default function EvCallAlert({
  message: { message },
  currentLocale,
}: EvCallAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvCallAlert.handleMessage = ({ message }: { message: string }) =>
  includes(message, [
    messageTypes.NO_SUPPORT_COUNTRY,
    messageTypes.INTERCEPT,
    messageTypes.FAILED_TO_CALL,
    messageTypes.FAILED_TO_CALL,
    messageTypes.OFFHOOK_INIT_ERROR,
    messageTypes.OFFHOOK_TERM_ERROR,
    messageTypes.ADD_SESSION_ERROR,
    messageTypes.DROP_SESSION_ERROR,
    messageTypes.HOLD_ERROR,
    messageTypes.LOGOUT_FAIL_WITH_CALL_CONNECTED,
    messageTypes.RECORD_PAUSED,
    messageTypes.RECORD_RESUME,
  ]);
