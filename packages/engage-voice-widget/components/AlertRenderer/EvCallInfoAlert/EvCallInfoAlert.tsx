import { contains } from 'ramda';

import { messageTypes } from '../../../enums/messageTypes';
import i18n from './i18n';

interface EvCallInfoAlertProps {
  message: {
    message: string;
  };
  currentLocale: string;
}

interface HandleMessage {
  message: string;
}

export default function EvCallInfoAlert({
  message: { message },
  currentLocale,
}: EvCallInfoAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvCallInfoAlert.handleMessage = ({ message }: HandleMessage): boolean =>
  contains(message, [messageTypes.COPY_UII_SUCCESS]);
