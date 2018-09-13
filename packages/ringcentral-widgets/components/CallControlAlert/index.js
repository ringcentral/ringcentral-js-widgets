/**
 * @file call control alert
 * it be used in <SimpleActiveCallCtrlPage>
 */
import i18n from './i18n';

export const CALL_CTRL_ALERT = {
  muteFail: 'CALL_MUTE_FAIL',
  unmuteFail: 'CALL_UNMUTE_FAIL',
  holdFail: 'CALL_HOLD_FAIL',
  unHoldFail: 'CALL_UNHOLDFAIL_FAIL',
  transferFail: 'CALL_TRANSFER_FAIL',
};

export default function CallControlAlert({
  message: {
    message
  },
  currentLocale
}) {
  return (i18n.getString(message, currentLocale));
}

CallControlAlert.handleMessage = ({ message }) => {
  for (const type in CALL_CTRL_ALERT) {
    if (CALL_CTRL_ALERT[type] === message) {
      return true;
    }
  }
  return false;
};
