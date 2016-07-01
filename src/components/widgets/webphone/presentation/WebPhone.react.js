import React from 'react'

import DialPad from './DialPad.react'
import ActiveCall from './ActiveCall.react'
import IncomingCall from './IncomingCall.react'

import styles from '../index.css'


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
    <div className={ styles.container }>
      { panel() }
    </div>
  )
}

WebPhone.propTypes = {
  status: React.PropTypes.oneOf(['OnCall', 'OnCallIncoming', 'Idle']),
  phoneNumber: React.PropTypes.string
}

export default WebPhone
