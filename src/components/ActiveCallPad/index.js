import React, { PropTypes } from 'react';
import classnames from 'classnames';
import CircleButton from '../CircleButton';
import ActiveCallButton from '../ActiveCallButton';
import rcFont from '../../assets/RcFont/RcFont.scss';
import MuteIcon from '../../assets/images/Mute.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import KeypadIcon from '../../assets/images/Dialpad.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import ParkIcon from '../../assets/images/Park.svg';
import RecordIcon from '../../assets/images/Record.svg';
import AddIcon from '../../assets/images/AddCall.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import FlipIcon from '../../assets/images/Flip.svg';
import EndIcon from '../../assets/images/End.svg';
import styles from './styles.scss';

export default function ActiveCallPad(props) {
  const muteButton = props.isOnMute ?
    (
      <ActiveCallButton
        onClick={props.onUnmute}
        className={styles.callButton}
        Icon={MuteIcon}
        title={'Unmute'}
      />
    ) :
    (
      <ActiveCallButton
        onClick={props.onMute}
        className={styles.callButton}
        title={'Mute'}
        Icon={UnmuteIcon}
      />
    );
  const onHoldClicked = props.isOnHold ?
    props.onUnhold :
    props.onHold;
  const onRecordClicked = props.isOnRecord ?
    props.onStopRecord :
    props.onRecord;
  return (
    <div className={classnames(styles.root, props.className)}>
      <div className={styles.buttonRow}>
        {muteButton}
        <ActiveCallButton
          onClick={props.onShowKeyPad}
          className={styles.callButton}
          Icon={KeypadIcon}
          title={'Keypad'}
        />
        <ActiveCallButton
          onClick={onHoldClicked}
          className={styles.callButton}
          title={'Hold'}
          active={props.isOnHold}
          Icon={HoldIcon}
        />
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          className={styles.callButton}
          title={'Park'}
          Icon={ParkIcon}
        />
        <ActiveCallButton
          onClick={onRecordClicked}
          title={props.isOnRecord ? 'Stop' : 'Record'}
          active={props.isOnRecord}
          className={styles.callButton}
          Icon={RecordIcon}
        />
        <ActiveCallButton
          onClick={props.onAdd}
          title={'Add'}
          className={styles.callButton}
          Icon={AddIcon}
        />
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          title={'Transfer'}
          Icon={TransferIcon}
          className={styles.callButton}
        />
        <ActiveCallButton
          onClick={() => null}
          title={'Flip'}
          Icon={FlipIcon}
          className={styles.callButton}
        />
      </div>
      <div className={styles.buttonRow}>
        <div className={styles.button}>
          <CircleButton
            className={styles.stopButton}
            onClick={props.hangup}
            Icon={EndIcon}
            showBorder={false}
          />
        </div>
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
  onShowKeyPad: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  isOnRecord: false,
};
