import React from 'react';

import DialPad from '../presentation/DialPad/DialPad.react';
import ActiveCall from '../presentation/ActiveCall/ActiveCall.react';
import IncomingCall from './IncomingCall/IncomingCall.react';

import { main } from '../index.css';

let remoteMedia;
let localMedia;

const WebPhone = (props) => {
  function content() {
    if (props.status === 'ON_CALL') {
      return (
        <ActiveCall
          phoneNumber={props.callingNumber}
          bye={props.bye}
          flip={props.flip}
          transfer={props.transfer}
          park={props.park}
          record={props.record}
          hold={props.hold}
          mute={props.mute}
          dtmf={props.dtmf}
          disabledOperation={props.disabledOperation}
          operationStatus={props.operationStatus}
          webphoneStatus={props.webphoneStatus}
        />
      );
    } else if (props.status === 'ON_INCOMING_CALL') {
      return <IncomingCall phoneNumber={props.callingNumber} />;
    }
    return (
      <DialPad
        contacts={props.contacts}
        remoteMedia={remoteMedia}
        localMedia={localMedia}
        call={props.call}
        userNumbers={props.userNumbers}
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
  status: React.PropTypes.oneOf(['ON_CALL', 'ON_INCOMING_CALL', 'IDLE']),
  contacts: React.PropTypes.array,
  callingNumber: React.PropTypes.string,

  call: React.PropTypes.func,
  bye: React.PropTypes.func,
  flip: React.PropTypes.func,
  transfer: React.PropTypes.func,
  park: React.PropTypes.func,
  record: React.PropTypes.func,
  hold: React.PropTypes.func,
  mute: React.PropTypes.func,
  dtmf: React.PropTypes.func,
  disabledOperation: React.PropTypes.array,
  operationStatus: React.PropTypes.array,
  webphoneStatus: React.PropTypes.string,

  userNumbers: React.PropTypes.array,

  flipNumbers: React.PropTypes.array,

  getString: React.PropTypes.func,
};

export default WebPhone;
