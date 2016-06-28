import React from 'react'
import PanelHeader from '../../../commons/panel/PanelHeader.react'

const IncomingCall = (props) => (
  <div>
    <h2>Incoming Call</h2>
    <PanelHeader 
      title={props.displayName}
      subtitle={props.phoneNumber}
    />
  </div>
)

export default IncomingCall
