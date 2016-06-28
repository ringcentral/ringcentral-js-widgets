import React from 'react'

const CallConsole = (props) => (
  <div>
    <div>
      <button onClick={ props.handleHoldClick }>Hold</button>
      <button onClick={ props.handleKeypadClick }>Keypad</button>
      <button onClick={ props.handleRecordClick }>Record</button>
    </div>
    <div>
      <button onClick={ props.handleFlipClick }>Flip</button>
      <button onClick={ props.handleTransferClick }>Transfer</button>
      <button onClick={ props.handleParkClick }>Park</button>
    </div>
  </div>
)

CallConsole.propType = {
  handleHoldClick: React.PropTypes.func.isRequired,
  handleRecordClick: React.PropTypes.func.isRequired,
  handleKeypadClick: React.PropTypes.func.isRequired,
  handleFlipClick: React.PropTypes.func.isRequired,
  handleTransferClick: React.PropTypes.func.isRequired,
  handleParkClick: React.PropTypes.func.isRequired,
}

export default CallConsole
