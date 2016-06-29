import React from 'react'
import styles from '../index.css'
import { StatedButton } from '../../../commons/button/'


const CallConsole = (props) => (
  <div>
    <div className={ styles.line }>
      <StatedButton 
        className={ styles.settingButton } 
        onClick={ props.handleHoldClick }>
        Hold
      </StatedButton>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleKeypadClick }>
        Keypad
      </button>
      <StatedButton 
        className={ styles.settingButton } 
        onClick={ props.handleRecordClick }>
        Record
      </StatedButton>
    </div>
    <div className={ styles.line }>
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
      <StatedButton 
        className={ styles.settingButton } 
        onClick={ props.handleParkClick }>
        Park
      </StatedButton>
    </div>
  </div>
)

CallConsole.propTypes = {
  handleHoldClick: React.PropTypes.func.isRequired,
  handleRecordClick: React.PropTypes.func.isRequired,
  handleKeypadClick: React.PropTypes.func.isRequired,
  handleFlipClick: React.PropTypes.func.isRequired,
  handleTransferClick: React.PropTypes.func.isRequired,
  handleParkClick: React.PropTypes.func.isRequired,
}

export default CallConsole
