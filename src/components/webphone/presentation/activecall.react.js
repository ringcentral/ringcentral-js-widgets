import React from 'react'

const ActiveCall = (props) => (
  <div>
    <h2>Active Call</h2>
    <div>{props.displayName}</div>
    <div>{props.phoneNumber}</div>
  </div>
)

ActiveCall.propTypes = {
  displayName: React.PropTypes.string,
  phoneNumber: React.PropTypes.string.isRequired,
}

export default ActiveCall
