import { includes } from 'ramda';

import { requeueEvents } from '../../../enums';
import i18n from './i18n';

interface EvRequeueCallAlertProps {
  message: {
    message: string;
  };
  currentLocale: string;
}

export default function EvRequeueCallAlert({
  message: { message },
  currentLocale,
}: EvRequeueCallAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvRequeueCallAlert.handleMessage = ({ message }: { message: string }) =>
  includes(message, [
    requeueEvents.FAILURE,
    requeueEvents.START,
    requeueEvents.SUCCESS,
  ]);
