import { connect } from 'react-redux';
import { connect as phoneConnect } from '../../../utils/integration/';

import WebPhone from './presentation/WebPhone.react';

function clean(str) {
  return str.slice(0, str.indexOf('@'));
}

const statusMapping = {
  REGISTER_SUCCESSED: 'Idle',
  PRE_REGISTER: 'Idle',
  CALL_INCOMING: 'OnCallIncoming',
  CALL_CONNECTING: 'OnCall',
  CALL_CONNECTED: 'OnCall',
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
  status: statusMapping[state.webphone.status],

  // <ActiveCall />
  operationStatus: state.webphone.operation.status,
  disabledOperation: state.webphone.operation.disabled,
  webphoneStatus: state.webphone.status,
  // phoneNumber could be (temp) toNumber from dial pad or
  // actuall info from sip
  callingNumber: state.webphone.callLineInfo ?
                clean(state.webphone.callLineInfo.to.friendlyName) :
                state.webphone.toNumber,

  // <Flip />
  flipNumbers: state.user.forwardingNumbers
                .filter(number => number.features.indexOf('CallFlip') > -1),

  // <DialPad />

  // <Transfer />

  // <CallerBar />
  userNumbers: state.user.phoneNumbers,
}))(withPhone);

export default withRedux;
