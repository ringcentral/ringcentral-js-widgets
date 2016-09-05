import React from 'react';
import classNames from 'classnames';
import prefix from '../../../utils/style';
import Icon from '../../shared/Icon';
import Ratio from '../../shared/Ratio';

const { button, disabled, word, icon, panel, line } =
  prefix(['button', 'disabled', 'word', 'icon', 'panel', 'line'], 'CallConsole');

function iconClass(iconId) {
  return classNames(
          icon
        );
}

const CallConsole = (props) => {
  function contain(arr, target) {
    return arr && target && arr.indexOf(target) !== -1;
  }
  function isDisabled(action) {
    return props.disabled || (action && contain(props.disabledOperation, action));
  }
  function ratio(child) {
    return <Ratio size={2.6}>{child}</Ratio>;
  }
  function noop() {}
  // TODO: replace constant with enums
  return (
    <div className={panel}>
      <div className={line}>
        <button
          className={classNames({
            [button]: true,
            [disabled]: isDisabled(),
          })}
          onClick={isDisabled() ?
            noop :
            (event) => props.handleHoldClick(!contain(props.status, 'HOLDING'))}
        >
          {ratio(<Icon id={contain(props.status, 'HOLDING') ? 'icon-uni35' : 'icon-uni28'} />)}
          <div className={word}>Hold</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: isDisabled(),
          })}
          onClick={isDisabled('dtmf') ? noop : props.handleKeypadClick}
        >
          {ratio(<Icon id={'icon-uni21'} />)}
          <div className={word}>Keypad</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: isDisabled('record'),
          })}
          onClick={isDisabled('record') ?
            noop :
            () => props.handleRecordClick(!contain(props.status, 'RECORDING'))}
        >
          {ratio(<Icon id={contain(props.status, 'RECORDING') ? 'icon-uni30' : 'icon-uni24'} />)}
          <div className={word}>Record</div>
        </button>
      </div>
      <div className={line}>
        <button
          className={classNames({
            [button]: true,
            [disabled]: isDisabled('flip'),
          })}
          onClick={isDisabled('flip') ? noop : props.handleFlipClick}
        >
          {ratio(<Icon id={'icon-uni27'} />)}
          <div className={word}>Flip</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: isDisabled('transfer'),
          })}
          onClick={isDisabled('transfer') ? noop : props.handleTransferClick}
        >
          {ratio(<Icon id={'icon-uni23'} />)}
          <div className={word}>Transfer</div>
        </button>
        <button
          className={classNames({
            [button]: true,
            [disabled]: isDisabled('park'),
          })}
          onClick={isDisabled('park') ? noop : props.handleParkClick}
        >
          {ratio(<Icon id={'icon-uni22'} />)}
          <div className={word}>Park</div>
        </button>
      </div>
    </div>
  );
};

CallConsole.propTypes = {
  status: React.PropTypes.arrayOf(
    React.PropTypes.oneOf(['RECORDING', 'HOLDING', 'MUTED'])
  ),
  disabledOperation: React.PropTypes.arrayOf(
    React.PropTypes.oneOf(['record', 'flip', 'transfer', 'park'])
  ),
  disabled: React.PropTypes.bool,
  handleHoldClick: React.PropTypes.func,
  handleRecordClick: React.PropTypes.func,
  handleKeypadClick: React.PropTypes.func,
  handleFlipClick: React.PropTypes.func,
  handleTransferClick: React.PropTypes.func,
  handleParkClick: React.PropTypes.func,
};

export default CallConsole;
