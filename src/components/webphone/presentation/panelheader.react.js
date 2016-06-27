import React from 'react'

const PanelHeader = (props) => (
  <div>
    <h2>{props.displayName}</h2>
    <div>{props.phoneNumber}</div>
  </div>
)

PanelHeader.propTypes = {
  displayName: React.PropTypes.string,
  phoneNumber: React.PropTypes.string.isRequired,
}

export default PanelHeader
