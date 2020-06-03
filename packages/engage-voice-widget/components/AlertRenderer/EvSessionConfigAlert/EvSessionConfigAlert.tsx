import { contains } from 'ramda';

import { messageTypes } from '../../../enums';
import i18n from './i18n';

interface EvSessionConfigAlertProps {
  message: {
    message: string;
    payload?: string;
  };
  currentLocale: string;
}

interface HandleMessage {
  message: string;
}

export default function EvSessionConfigAlert({
  message: { message, payload },
  currentLocale,
}: EvSessionConfigAlertProps) {
  if (message === messageTypes.AGENT_CONFIG_DETAIL_ERROR && payload) {
    return payload;
  }
  return i18n.getString(message, currentLocale);
}

EvSessionConfigAlert.handleMessage = ({ message }: HandleMessage): boolean =>
  contains(message, [
    messageTypes.INVALID_PHONE_NUMBER,
    messageTypes.AGENT_CONFIG_ERROR,
    messageTypes.AGENT_CONFIG_DETAIL_ERROR,
    messageTypes.EMPTY_PHONE_NUMBER,
    messageTypes.NO_AGENT_SELECTED,
    messageTypes.INVALID_PHONE_NUMBER,
  ]);
