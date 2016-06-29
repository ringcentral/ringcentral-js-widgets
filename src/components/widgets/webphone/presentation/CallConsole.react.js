import React from 'react'
import styles from '../index.css'


const CallConsole = (props) => (
  <div>
    <div>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleHoldClick }>
        Hold
      </button>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleKeypadClick }>
        Keypad
      </button>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleRecordClick }>
        Record
      </button>
    </div>
    <div>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleFlipClick }>
        Flip
      </button>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleTransferClick }>
        Transfer
      </button>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleParkClick }>
        Park
      </button>
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
