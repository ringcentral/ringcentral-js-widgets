import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CircleButton from '../CircleButton';
import ActiveCallButton from '../ActiveCallButton';
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
import i18n from './i18n';

export default function ActiveCallPad(props) {
  const muteButton = props.isOnMute ?
    (
      <ActiveCallButton
        onClick={props.onUnmute}
        className={styles.callButton}
        icon={MuteIcon}
        title={i18n.getString('unmute', props.currentLocale)}
      />
    ) :
    (
      <ActiveCallButton
        onClick={props.onMute}
        className={styles.callButton}
        title={i18n.getString('mute', props.currentLocale)}
        icon={UnmuteIcon}
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
          icon={KeypadIcon}
          title={i18n.getString('keypad', props.currentLocale)}
        />
        <ActiveCallButton
          onClick={onHoldClicked}
          className={styles.callButton}
          title={i18n.getString('hold', props.currentLocale)}
          active={props.isOnHold}
          icon={HoldIcon}
        />
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          className={styles.callButton}
          title={i18n.getString('park', props.currentLocale)}
          icon={ParkIcon}
        />
        <ActiveCallButton
          onClick={onRecordClicked}
          title={
            props.isOnRecord ?
              i18n.getString('stopRecord', props.currentLocale) :
              i18n.getString('record', props.currentLocale)
          }
          active={props.isOnRecord}
          className={styles.callButton}
          icon={RecordIcon}
        />
        <ActiveCallButton
          onClick={props.onAdd}
          title={i18n.getString('add', props.currentLocale)}
          className={styles.callButton}
          icon={AddIcon}
        />
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          title={i18n.getString('transfer', props.currentLocale)}
          icon={TransferIcon}
          className={styles.callButton}
        />
        <ActiveCallButton
          onClick={() => null}
          title={i18n.getString('flip', props.currentLocale)}
          icon={FlipIcon}
          className={styles.callButton}
        />
      </div>
      <div className={styles.buttonRow}>
        <div className={styles.button}>
          <CircleButton
            className={styles.stopButton}
            onClick={props.hangup}
            icon={EndIcon}
            showBorder={false}
          />
        </div>
      </div>
    </div>
  );
}

ActiveCallPad.propTypes = {
  currentLocale: PropTypes.string.isRequired,
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
