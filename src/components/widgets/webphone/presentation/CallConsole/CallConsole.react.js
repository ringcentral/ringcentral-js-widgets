import React from 'react';
import { icon, panel, line } from '../../index.css';
import { button, disabled, word } from './CallConsole.css';
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

const CallConsole = (props) => {
  function contain(arr, target) {
    return arr.indexOf(target) !== -1;
  }
  // TODO: replace constant with enums
  return (
    <div className={panel}>
      <div className={line}>
        <button
          className={classNames({
            [button]: true,
            [disabled]: props.disabled,
          })}
          onClick={(event) => props.handleHoldClick(!contain(props.status, 'HOLDING'))}
        >
          <span
            className={
              classNames({
                [iconClass('icon-uni28')]: !contain(props.status, 'HOLDING'),
                [iconClass('icon-uni35')]: contain(props.status, 'HOLDING'),
              })
            }
          >
          </span>
          <div className={word}>Hold</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: props.disabled,
          })}
          onClick={props.handleKeypadClick}
        >
          <span className={iconClass('icon-uni21')}></span>
          <div className={word}>Keypad</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: props.disabled || contain(props.disabledOperation, 'record'),
          })}
          onClick={(event) => props.handleRecordClick(!contain(props.status, 'RECORDING'))}
        >
          <span
            className={
              classNames({
                [iconClass('icon-uni24')]: !contain(props.status, 'RECORDING'),
                [iconClass('icon-uni30')]: contain(props.status, 'RECORDING'),
              })
            }
          >
          </span>
          <div className={word}>Record</div>
        </button>
      </div>
      <div className={line}>
        <button
          className={classNames({
            [button]: true,
            [disabled]: props.disabled,
          })}
          onClick={props.handleFlipClick}
        >
          <span className={iconClass('icon-uni27')}></span>
          <div className={word}>Flip</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: props.disabled,
          })}
          onClick={props.handleTransferClick}
        >
          <span className={iconClass('icon-uni23')}></span>
          <div className={word}>Transfer</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: props.disabled || contain(props.disabledOperation, 'park'),
          })}
          onClick={props.handleParkClick}
        >
          <span className={iconClass('icon-uni22')}></span>
          <div className={word}>Park</div>
        </button>
      </div>
    </div>
  );
};

CallConsole.propTypes = {
  status: React.PropTypes.array,
  disabledOperation: React.PropTypes.array,
  disabled: React.PropTypes.bool,
  handleHoldClick: React.PropTypes.func,
  handleRecordClick: React.PropTypes.func,
  handleKeypadClick: React.PropTypes.func,
  handleFlipClick: React.PropTypes.func,
  handleTransferClick: React.PropTypes.func,
  handleParkClick: React.PropTypes.func,
};

export default CallConsole;
