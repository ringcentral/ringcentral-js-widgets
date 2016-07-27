import { connect } from 'react-redux';
import { connect as phoneConnect } from '../../../utils/integration/';

import WebPhone from './presentation/WebPhone.react';
import { getString } from '../../../utils/locale/';

function clean(str) {
  return str.slice(0, str.indexOf('@'));
}

const statusMapping = {
  REGISTER_SUCCESSED: 'IDLE',
  PRE_REGISTER: 'IDLE',
  CALL_INCOMING: 'ON_INCOMING_CALL',
  CALL_CONNECTING: 'ON_CALL',
  CALL_CONNECTED: 'ON_CALL',
};

const withPhone = phoneConnect(phone => ({
  call: (...args) => phone.webphone.call(...args),
  bye: () => phone.webphone.bye(),
  flip: (...args) => phone.webphone.flip(...args),
  transfer: (...args) => phone.webphone.transfer(...args),
  park: (...args) => phone.webphone.park(...args),
  record: (...args) => phone.webphone.record(...args),
  hold: (...args) => phone.webphone.hold(...args),
  mute: (...args) => phone.webphone.mute(...args),
  dtmf: (...args) => phone.webphone.dtmf(...args),
}))(WebPhone);

const withRedux = connect(state => ({
  // <WebPhone />
  status: statusMapping[state.common.webphone.status],

  // <ActiveCall />
  operationStatus: state.common.webphone.operation.status,
  disabledOperation: state.common.webphone.operation.disabled,
  webphoneStatus: state.common.webphone.status,
  // phoneNumber could be (temp) toNumber from dial pad or
  // actuall info from sip
  callingNumber: state.common.webphone.callLineInfo ?
                clean(state.webphone.callLineInfo.to.friendlyName) :
                state.common.webphone.toNumber,

  // <Flip />
  flipNumbers: state.common.user.forwardingNumbers
                .filter(number => number.features.indexOf('CallFlip') > -1),

  // <DialPad />

  // <Transfer />

  // <CallerBar />
  userNumbers: state.common.user.phoneNumbers,

  // locale
  getString: getString.bind(null, state.locale.lang),
}))(withPhone);

export default withRedux;
