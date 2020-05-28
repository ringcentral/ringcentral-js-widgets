import { contains } from 'ramda';

import { messageTypes } from '../../../enums';
import i18n from './i18n';

interface EvAuthAlertProps {
  message: {
    message: string;
  };
  currentLocale: string;
}

export default function EvAuthAlert({
  message: { message },
  currentLocale,
}: EvAuthAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvAuthAlert.handleMessage = ({ message }: { message: string }) =>
  contains(message, [
    messageTypes.NO_AGENT,
    messageTypes.CONNECT_ERROR,
    messageTypes.UNEXPECTED_AGENT,
    messageTypes.INVALID_BROWSER,
    messageTypes.CONNECT_TIMEOUT,
    messageTypes.OPEN_SOCKET_ERROR,
    messageTypes.EXISTING_LOGIN_ENGAGED,
  ]);
