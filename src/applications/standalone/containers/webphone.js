import { connect } from '../../../utils/integration/';
import { getString } from '../../../utils/locale/';

import WebPhone from '../../../widgets/webphone/WebPhone/WebPhone.react';

import activeCallSelector from '../../../widgets/webphone/ActiveCall/selector';
import dialPadSelector from '../../../widgets/webphone/DialPad/selector';
import incomingCallSelector from '../../../widgets/webphone/IncomingCall/selector';

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
