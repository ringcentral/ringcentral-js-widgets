import React from 'react'

import DialPad from '../container/DialPad.react'
import ActiveCall from '../container/ActiveCall.react'
import IncomingCall from './IncomingCall.react'


const WebPhone = (props) => {
  const panel = () => {
    if (props.status === 'OnCall')
      return <ActiveCall phoneNumber={ props.phoneNumber }/>
    else if (props.status === 'OnCallIncoming')
      return <IncomingCall phoneNumber={ props.phoneNumber }/>
    else
      return <DialPad contacts={ props.contacts } />
  }
  return (
    <div>
      { panel() }
    </div>
  )
}

WebPhone.propTypes = {
  status: React.PropTypes.oneOf(['OnCall', 'OnCallIncoming', 'Idle']),
  phoneNumber: React.PropTypes.string
}

export default WebPhone
