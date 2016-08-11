import { connect } from '../../../utils/integration/';

import WebPhone from './presentation/WebPhone/WebPhone.react';
import { getString } from '../../../utils/locale/';


import activeCallSelector from './presentation/ActiveCall/selector';
import dialPadSelector from './presentation/DialPad/selector';
import incomingCallSelector from './presentation/IncomingCall/selector';

const statusMapping = {
  PRE_REGISTER: 'DISABLED',
  REGISTER_SUCCESSED: 'IDLE',
  CALL_INCOMING: 'ON_INCOMING_CALL',
  CALL_CONNECTING: 'ON_CALL',
  CALL_CONNECTED: 'ON_CALL',
};

export default connect((state, props, phone) => ({
  // enums
  enums: phone.webphone.enums,

  // <WebPhone />
  status: statusMapping[state.common.webphone.status],

  incomingCall: incomingCallSelector(state, props, phone),
  activeCall: activeCallSelector(state, props, phone),
  dialPad: dialPadSelector(state, props, phone),

  getString: getString.bind(null, state.locale.lang),
}))(WebPhone);
