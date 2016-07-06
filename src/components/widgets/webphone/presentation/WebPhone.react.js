import React from 'react';

import DialPad from './DialPad.react';
import ActiveCall from './ActiveCall.react';
import IncomingCall from './IncomingCall.react';

const WebPhone = (props) => {
  if (props.status === 'OnCall') {
    return <ActiveCall phoneNumber={props.phoneNumber} />;
  } else if (props.status === 'OnCallIncoming') {
    return <IncomingCall phoneNumber={props.phoneNumber} />;
  }
  return <DialPad contacts={props.contacts} />;
};

WebPhone.propTypes = {
  status: React.PropTypes.oneOf(['OnCall', 'OnCallIncoming', 'Idle']),
  contacts: React.PropTypes.array,
  phoneNumber: React.PropTypes.string,
};

export default WebPhone;
