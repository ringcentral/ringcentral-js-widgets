import React from 'react'
import styles from '../index.css'
import iconsStyles from '../../../../styles/icon.css'
import { StatedButton } from '../../../commons/button/'

const CallConsole = (props) => (
  <div className={ styles.panel }>
    <div className={ styles.line }>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleHoldClick }>
        <span className={ iconsStyles['icon-uni28'] + ' ' + iconsStyles['icon'] + ' ' + styles['icon'] }></span>
        <div className={ styles.settingWord }>Hold</div>
      </button>
      <button 
        className={ styles.settingButton }
        onClick={ props.handleKeypadClick }>
        <span className={ iconsStyles['icon-uni21'] + ' ' + iconsStyles['icon'] + ' ' + styles['icon'] }></span>
        <div className={ styles.settingWord }>Keypad</div>
      </button>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleRecordClick }>
        <span className={ iconsStyles['icon-uni24'] + ' ' + iconsStyles['icon'] + ' ' + styles['icon'] }></span>
        <div className={ styles.settingWord }>Record</div>
      </button>
    </div>
    <div className={ styles.line }>
      <button
        className={ styles.settingButton }
        onClick={ props.handleFlipClick }>
        <span className={ iconsStyles['icon-uni27'] + ' ' + iconsStyles['icon'] + ' ' + styles['icon'] }></span>
        <div className={ styles.settingWord }>Flip</div>
      </button>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleTransferClick }>
        <span className={ iconsStyles['icon-uni23'] + ' ' + iconsStyles['icon'] + ' ' + styles['icon'] }></span>
        <div className={ styles.settingWord }>Transfer</div>
      </button>
      <button 
        className={ styles.settingButton } 
        onClick={ props.handleParkClick }>
        <span className={ iconsStyles['icon-uni22'] + ' ' + iconsStyles['icon'] + ' ' + styles['icon'] }></span>
        <div className={ styles.settingWord }>Park</div>
      </button>
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
