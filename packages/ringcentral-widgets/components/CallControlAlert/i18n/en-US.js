import { CALL_CTRL_ALERT } from '../index';

export default {
  [CALL_CTRL_ALERT.muteFail]: 'This call had been muted on other device. Please unmute the call before you control in this App.',
  [CALL_CTRL_ALERT.holdFail]: 'This call had been held on other device. Please unhold the call before you control in this App.',
  [CALL_CTRL_ALERT.unmuteFail]: 'This call had been unmuted on other device. Please mute the call before you control in this App.',
  [CALL_CTRL_ALERT.unHoldFail]: 'This call had been unheld on other device. Please hold the call before you control in this App.',
  [CALL_CTRL_ALERT.transferFail]: 'transfer error',
};
