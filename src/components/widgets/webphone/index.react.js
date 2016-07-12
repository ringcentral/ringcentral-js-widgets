import WebPhone from './presentation/WebPhone.react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const statusMapping = {
  REGISTER_SUCCESSED: 'Idle',
  PRE_REGISTER: 'Idle',
  CALL_INCOMING: 'OnCallIncoming',
  CALL_CONNECTING: 'OnCall',
  CALL_CONNECTED: 'OnCall',
};

const webphoneStatus = (state) => state.webphone.status;
const accountInfo = (state) => state.user.accountInfo;
const statusSelector = createSelector(
  webphoneStatus,
  status => statusMapping[status]
);
const accountInfoSelector = createSelector(
  accountInfo,
  info => info,
);
const phoneNumberSelector = createSelector(
  accountInfoSelector,
  info => info ? info.mainNumber : '',
);

export default connect(state => {
  console.log(state);
  return {
    status: statusSelector(state),
    phoneNumber: phoneNumberSelector(state),
  };
})(WebPhone);
