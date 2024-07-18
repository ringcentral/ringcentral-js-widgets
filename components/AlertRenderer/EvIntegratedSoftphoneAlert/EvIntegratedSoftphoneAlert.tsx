import { includes } from 'ramda';

import { EvSoftphoneEvents, tabManagerEvents } from '../../../enums';
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
  includes(message, [
    EvCallbackTypes.SIP_REGISTRATION_FAILED,
    EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
    EvSoftphoneEvents.CALL_REJECTED,
    tabManagerEvents.SIP_CONNECTING,
    tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED,
    tabManagerEvents.ASK_AUDIO_PERMISSION,
    tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE,
  ]);
