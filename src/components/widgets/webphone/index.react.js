import WebPhone from './presentation/WebPhone.react';
import { connect } from 'react-redux';

export default connect(state => ({
  ...state,
  status: 'OnCall',
  // status: 'Idle',
  // status: 'OnCallIncoming',
  phoneNumber: '(650) 397-6085',
  contacts: ['aa', 'bb', 'cc'],
}))(WebPhone);
