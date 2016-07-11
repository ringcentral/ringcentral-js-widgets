import WebPhone from './presentation/WebPhone.react';
import { connect } from 'react-redux';

function transformStatus(status) {
  if (status === 'REGISTER_SUCCESSED' || status === 'PRE_REGISTER') {
    return 'Idle';
  } else if (status === 'CALL_INCOMING') {
    return 'OnCallIncoming';
  } else if (status === 'CALL_CONNECTING' || status === 'CALL_CONNECTED') {
    return 'OnCall';
  }
  return 'OnCallIncoming';
}

export default connect(state => {
  console.log(state);
  return {
    status: transformStatus(state.webphone.status),
    // status: 'Idle',
    // status: 'OnCallIncoming',
    phoneNumber: state.user.accountInfo.mainNumber,
  };
})(WebPhone);
