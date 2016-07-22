import ActiveCall from '../presentation/ActiveCall/ActiveCall.react';
import { connect as phoneConnect } from '../../../../utils/integration/';
import { connect } from 'react-redux';

const withPhone = phoneConnect(phone => ({
  bye: () => phone.webphone.bye(),
  flip: (...args) => phone.webphone.flip(...args),
  transfer: (...args) => phone.webphone.transfer(...args),
  park: (...args) => phone.webphone.park(...args),
  record: (...args) => phone.webphone.record(...args),
  hold: (...args) => phone.webphone.hold(...args),
  mute: (...args) => phone.webphone.mute(...args),
}))(ActiveCall);

const withRedux = connect(state => ({
  operationStatus: state.webphone.operation.status,
  webphoneStatus: state.webphone.status,
}))(withPhone);

export default withRedux;
