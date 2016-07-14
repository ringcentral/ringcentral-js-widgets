import React from 'react';
import styles from '../../index.css';
import iconsStyles from '../../../../../styles/icon.css';
import { StatedButton } from '../../../../commons/button/';

import classNames from 'classnames';

function iconClass(icon) {
  return classNames(
          iconsStyles[icon],
          iconsStyles.icon,
          styles.icon
        );
}

const CallConsole = (props) => (
  <div className={styles.panel}>
    <div className={styles.line}>
      <button
        className={styles.settingButton}
        onClick={props.handleHoldClick}
      >
        <span className={iconClass('icon-uni28')}></span>
        <div className={styles.settingWord}>Hold</div>
      </button>
      <button
        className={styles.settingButton}
        onClick={props.handleKeypadClick}
      >
        <span className={iconClass('icon-uni21')}></span>
        <div className={styles.settingWord}>Keypad</div>
      </button>
      <button
        className={styles.settingButton}
        onClick={props.handleRecordClick}
      >
        <span className={iconClass('icon-uni24')}></span>
        <div className={styles.settingWord}>Record</div>
      </button>
    </div>
    <div className={styles.line}>
      <button
        className={styles.settingButton}
        onClick={props.handleFlipClick}
      >
        <span className={iconClass('icon-uni27')}></span>
        <div className={styles.settingWord}>Flip</div>
      </button>
      <button
        className={styles.settingButton}
        onClick={props.handleTransferClick}
      >
        <span className={iconClass('icon-uni23')}></span>
        <div className={styles.settingWord}>Transfer</div>
      </button>
      <button
        className={styles.settingButton}
        onClick={props.handleParkClick}
      >
        <span className={iconClass('icon-uni22')}></span>
        <div className={styles.settingWord}>Park</div>
      </button>
    </div>
  </div>
);

CallConsole.propTypes = {
  handleHoldClick: React.PropTypes.func,
  handleRecordClick: React.PropTypes.func,
  handleKeypadClick: React.PropTypes.func,
  handleFlipClick: React.PropTypes.func,
  handleTransferClick: React.PropTypes.func,
  handleParkClick: React.PropTypes.func,
};

export default CallConsole;
