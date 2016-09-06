import React from 'react';

import DialPad from '../DialPad';
import ActiveCall from '../ActiveCall';
import ActiveCallWithNote from '../ActiveCallWithNote';
import IncomingCall from '../IncomingCall';

import prefix from '../../../utils/style';

const { main } = prefix(['main'], 'WebPhone');

let remoteMedia;
let localMedia;

const WebPhone = (props) => {
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
  /**
   * @link ActiveCall
   * Props pass to <ActiveCall /> components.
   */
  activeCall: React.PropTypes.object,
  /**
   * @link IncomingCall
   * Props pass to <IncomingCall /> components.
   */
  incomingCall: React.PropTypes.object,
  /**
   * @link DialPad
   * Props pass to <DialPad /> components.
   */
  dialPad: React.PropTypes.object,

  enums: React.PropTypes.object,
  status: React.PropTypes.oneOf(['ON_CALL', 'ON_INCOMING_CALL', 'IDLE', 'DISABLED']),
  getString: React.PropTypes.func,
};

export default WebPhone;
