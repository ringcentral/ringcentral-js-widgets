import React from 'react';

import DialPad from '../DialPad/DialPad.react';
import ActiveCall from '../ActiveCall/ActiveCall.react';
import ActiveCallWithNote from '../ActiveCallWithNote/ActiveCallWithNote.react';
import IncomingCall from '../IncomingCall/IncomingCall.react';

import { main } from './WebPhone.css';

let remoteMedia;
let localMedia;

const WebPhone = (props) => {
  console.log('update')
  function content() {
    if (props.status === 'ON_CALL') {
      return <ActiveCall {...props.activeCall} enums={props.enums} />;
    } else if (props.status === 'ON_INCOMING_CALL') {
      return <IncomingCall {...props.incomingCall} />;
    }
    return (
      <DialPad
        {...props.dialPad}
        disabled={props.status === 'DISABLED'}
        remoteMedia={remoteMedia}
        localMedia={localMedia}
        getString={props.getString}
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
  activeCall: React.PropTypes.object,
  incomingCall: React.PropTypes.object,
  dialPad: React.PropTypes.object,

  enums: React.PropTypes.object,
  status: React.PropTypes.oneOf(['ON_CALL', 'ON_INCOMING_CALL', 'IDLE', 'DISABLED']),
  getString: React.PropTypes.func,
};

export default WebPhone;
