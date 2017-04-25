import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

function OperationButton(props) {
  const className = classnames(styles.operationButton, props.className);
  const buttonClassName = classnames(styles.button, props.active ? styles.buttonActive : null);
  return (
    <div className={className}>
      <Button
        className={buttonClassName}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
      <div className={styles.buttonTitle}>
        {props.title}
      </div>
    </div>
  );
}

OperationButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

OperationButton.defaultProps = {
  className: undefined,
  disabled: false,
  active: false,
  children: undefined,
};

export default function ActiveCallPad(props) {
  const muteButton = props.isOnMute ?
    (
      <OperationButton
        onClick={props.onUnmute}
        title={'Unmute'}
      >
        <i className={rcFont.uniCE} />
      </OperationButton>
    ) :
    (
      <OperationButton
        onClick={props.onMute}
        title={'Mute'}
      >
        <i className={rcFont.uni7B} />
      </OperationButton>
    );
  const onHoldClicked = props.isOnHold ?
    props.onUnhold :
    props.onHold;
  const onRecordClicked = props.isOnRecord ?
    props.onStopRecord :
    props.onRecord;
  return (
    <div className={props.className}>
      <div className={styles.buttonRow}>
        {muteButton}
        <OperationButton
          onClick={() => null}
          title={'Keypad'}
        >
          <i className={rcFont.uniA4} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Audio'}
        >
          <i className={rcFont.uni2496} />
        </OperationButton>
      </div>
      <div className={styles.buttonRow}>
        <OperationButton
          onClick={onHoldClicked}
          title={'Hold'}
          active={props.isOnHold}
        >
          <i className={rcFont.uni2474} />
        </OperationButton>
        <OperationButton
          onClick={onRecordClicked}
          title={props.isOnRecord ? 'Stop' : 'Record'}
          active={props.isOnRecord}
        >
          <i className={rcFont.icon_radio_off} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Add'}
        >
          <i className={rcFont.ActionButtons_Add} />
        </OperationButton>
      </div>
      <div className={styles.buttonRow}>
        <OperationButton
          onClick={() => null}
          title={'Transfer'}
        >
          <i className={rcFont['icon-transfer']} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Park'}
        >
          <i className={rcFont.uni2E} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Flip'}
        >
          <i className={rcFont['icon-flip']} />
        </OperationButton>
      </div>
      <div className={styles.buttonRow}>
        <Button
          className={classnames(styles.button, styles.stopButton)}
          onClick={props.hangup}
          disabled={false}
        >
          <i className={rcFont.uni44} />
        </Button>
      </div>
    </div>
  );
}

ActiveCallPad.propTypes = {
  className: PropTypes.string,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  isOnRecord: PropTypes.bool,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  isOnRecord: false,
};
