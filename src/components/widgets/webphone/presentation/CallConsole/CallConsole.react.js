import React from 'react';
import { icon, panel, line } from '../../index.css';
import { button, word } from './CallConsole.css';
import iconsStyles from '../../../../../styles/icon.css';
import { StatedButton } from '../../../../commons/button/';

import classNames from 'classnames';

function iconClass(iconId) {
  return classNames(
          iconsStyles[iconId],
          iconsStyles.icon,
          icon
        );
}

const CallConsole = (props) => (
  <div className={panel}>
    <div className={line}>
      <button
        className={button}
        onClick={props.handleHoldClick}
      >
        <span className={iconClass('icon-uni28')}></span>
        <div className={word}>Hold</div>
      </button>
      <button
        className={button}
        onClick={props.handleKeypadClick}
      >
        <span className={iconClass('icon-uni21')}></span>
        <div className={word}>Keypad</div>
      </button>
      <button
        className={button}
        onClick={props.handleRecordClick}
      >
        <span className={iconClass('icon-uni24')}></span>
        <div className={word}>Record</div>
      </button>
    </div>
    <div className={line}>
      <button
        className={button}
        onClick={props.handleFlipClick}
      >
        <span className={iconClass('icon-uni27')}></span>
        <div className={word}>Flip</div>
      </button>
      <button
        className={button}
        onClick={props.handleTransferClick}
      >
        <span className={iconClass('icon-uni23')}></span>
        <div className={word}>Transfer</div>
      </button>
      <button
        className={button}
        onClick={props.handleParkClick}
      >
        <span className={iconClass('icon-uni22')}></span>
        <div className={word}>Park</div>
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
