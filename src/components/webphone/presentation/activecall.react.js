import React from 'react'
import PanelHeader from './PanelHeader.react'

const ActiveCall = (props) => (
  <div>
    <h2>Active Call</h2>
    <PanelHeader 
      displayName={props.displayName}
      phoneNumber={props.phoneNumber}
    />
  </div>
)

export default ActiveCall
