import React from 'react'
import PanelHeader from './PanelHeader.react'

const IncomingCall = (props) => (
  <div>
    <h2>Incoming Call</h2>
    <PanelHeader 
      displayName={props.displayName}
      phoneNumber={props.phoneNumber}
    />
  </div>
)

export default IncomingCall
