import { contains } from 'ramda';

import { EvSoftphoneEvents } from '../../../enums';
import { EvCallbackTypes } from '../../../lib/EvClient/enums';
import i18n from './i18n';

interface EvIntegratedSoftphoneAlertProps {
  message: {
    message: string;
  };
  currentLocale: string;
}

export default function EvIntegratedSoftphoneAlert({
  message: { message },
  currentLocale,
}: EvIntegratedSoftphoneAlertProps) {
  return i18n.getString(message, currentLocale);
}

EvIntegratedSoftphoneAlert.handleMessage = ({ message }: { message: string }) =>
  contains(message, [
    EvCallbackTypes.SIP_REGISTRATION_FAILED,
    EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
    EvSoftphoneEvents.CALL_REJECTED,
  ]);
