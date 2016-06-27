import React from 'react'

import DialPad from './DialPad.react'
import ActiveCall from './ActiveCall.react'
import IncomingCall from './IncomingCall.react'


const WebPhone = (props) => (
  <div>
    {(() => {
      if (props.status === 'OnCall')
        return <ActiveCall phoneNumber={props.phoneNumber}/>
      else if (props.status === 'OnCallIncoming')
        return <IncomingCall phoneNumber={props.phoneNumber}/>
      else
        return <DialPad />
    })()}
  <button>Call</button>
  </div>
)

WebPhone.propTypes = {
  status: React.PropTypes.oneOf(['OnCall', 'OnCallIncoming', 'Idle']),
  phoneNumber: React.PropTypes.string
}

export default WebPhone
