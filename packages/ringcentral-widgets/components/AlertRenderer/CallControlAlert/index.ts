import callControlError from '@ringcentral-integration/commons/modules/ActiveCallControl/callControlError';

import i18n from './i18n';

export default function CallControlAlert({
  message: { message },
  currentLocale,
}) {
  return i18n.getString(message, currentLocale);
}

CallControlAlert.handleMessage = ({ message }) => {
  const {
    holdConflictError,
    unHoldConflictError,
    muteConflictError,
    unMuteConflictError,
    generalError,
    forwardSuccess,
  } = callControlError;
  return (
    message === holdConflictError ||
    message === unHoldConflictError ||
    message === muteConflictError ||
    message === unMuteConflictError ||
    message === generalError ||
    message === forwardSuccess
  );
};
