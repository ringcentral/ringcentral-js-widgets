import ActiveCall from '../presentation/ActiveCall/ActiveCall.react';
import { connect as phoneConnect } from '../../../../utils/integration/';
import { connect } from 'react-redux';

function clean(str) {
  return str.slice(0, str.indexOf('@'));
}

const withPhone = phoneConnect(phone => ({
  bye: () => phone.webphone.bye(),
  flip: (...args) => phone.webphone.flip(...args),
  transfer: (...args) => phone.webphone.transfer(...args),
  park: (...args) => phone.webphone.park(...args),
  record: (...args) => phone.webphone.record(...args),
  hold: (...args) => phone.webphone.hold(...args),
  mute: (...args) => phone.webphone.mute(...args),
  dtmf: (...args) => phone.webphone.dtmf(...args),
}))(ActiveCall);

const withRedux = connect(state => ({
  operationStatus: state.webphone.operation.status,
  disabledOperation: state.webphone.operation.disabled,
  webphoneStatus: state.webphone.status,

  // phoneNumber could be (temp) toNumber from dial pad or
  // actuall info from sip
  phoneNumber: state.webphone.callLineInfo ?
                clean(state.webphone.callLineInfo.to.friendlyName) :
                state.webphone.toNumber,
}))(withPhone);

export default withRedux;
