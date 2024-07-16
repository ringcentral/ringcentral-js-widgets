import {
  callControlAlerts,
  callControlError,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';

import i18n from './i18n';

export default function CallControlAlert({
  message: { message },
  currentLocale,
}: any) {
  return i18n.getString(message, currentLocale);
}

CallControlAlert.handleMessage = ({ message }: any) => {
  const { callsMerged, somethingWentWrong, tooManyParticipants } =
    callControlAlerts;
  const {
    holdConflictError,
    unHoldConflictError,
    muteConflictError,
    unMuteConflictError,
    generalError,
    forwardSuccess,
    transferCompleted,
    replyCompleted,
  } = callControlError;
  return (
    message === callsMerged ||
    message === somethingWentWrong ||
    message === tooManyParticipants ||
    message === holdConflictError ||
    message === unHoldConflictError ||
    message === muteConflictError ||
    message === unMuteConflictError ||
    message === generalError ||
    message === forwardSuccess ||
    message === transferCompleted ||
    message === replyCompleted
  );
};
