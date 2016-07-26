import React from 'react';

import UserDialPad from '../container/UserDialPad.react';
import UserActiveCall from '../container/UserActiveCall.react';
import IncomingCall from './IncomingCall/IncomingCall.react';

import { main } from '../index.css';

let remoteMedia;
let localMedia;

const WebPhone = (props) => {
  function content() {
    if (props.status === 'OnCall') {
      return <UserActiveCall phoneNumber={props.phoneNumber} />;
    } else if (props.status === 'OnCallIncoming') {
      return <IncomingCall phoneNumber={props.phoneNumber} />;
    }
    return (
      <UserDialPad
        contacts={props.contacts}
        remoteMedia={remoteMedia}
        localMedia={localMedia}
      />
    );
  }

  return (
    <div className={main}>
      <div>
        <video
          ref={(ref) => { remoteMedia = ref; }}
          id="remoteVideo"
          hidden="hidden"
        ></video>
        <video
          ref={(ref) => { localMedia = ref; }}
          id="localVideo"
          hidden="hidden"
          muted="muted"
        ></video>
      </div>
      {content()}
    </div>
  );
};

WebPhone.propTypes = {
  status: React.PropTypes.oneOf(['OnCall', 'OnCallIncoming', 'Idle']),
  contacts: React.PropTypes.array,
  phoneNumber: React.PropTypes.string,
};

export default WebPhone;
