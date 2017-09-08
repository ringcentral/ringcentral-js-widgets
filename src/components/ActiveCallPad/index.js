import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import recordStatus from 'ringcentral-integration/modules/Webphone/recordStatus';
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
  const onRecordClicked = props.recordStatus === recordStatus.recording ?
    props.onStopRecord :
    props.onRecord;
  const disabledFlip = props.flipNumbers.length === 0;
  const recordTitle = props.recordStatus === recordStatus.recording ?
    i18n.getString('stopRecord', props.currentLocale) :
    i18n.getString('record', props.currentLocale);
  const isRecordButtonActive = props.recordStatus === recordStatus.recording;
  const isRecordDisabled = props.recordStatus === recordStatus.pending;
  return (
    <div className={classnames(styles.root, props.className)}>
      <div className={styles.callCtrlButtonGroup}>
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
            title={
              props.isOnHold ?
              i18n.getString('onHold', props.currentLocale) :
              i18n.getString('hold', props.currentLocale)
            }
            active={props.isOnHold}
            icon={HoldIcon}
          />
          <ActiveCallButton
            onClick={props.onToggleTransferPanel}
            title={i18n.getString('transfer', props.currentLocale)}
            icon={TransferIcon}
            className={styles.callButton}
          />
        </div>
        <div className={styles.buttonRow}>
          <ActiveCallButton
            onClick={props.onPark}
            className={styles.callButton}
            title={i18n.getString('park', props.currentLocale)}
            icon={ParkIcon}
            disabled={props.isOnHold}
          />
          <ActiveCallButton
            onClick={onRecordClicked}
            title={recordTitle}
            active={isRecordButtonActive}
            className={styles.callButton}
            icon={RecordIcon}
            disabled={props.isOnHold || isRecordDisabled}
          />
          <ActiveCallButton
            onClick={props.onAdd}
            title={i18n.getString('add', props.currentLocale)}
            className={styles.callButton}
            icon={AddIcon}
          />
          <ActiveCallButton
            onClick={props.onShowFlipPanel}
            title={i18n.getString('flip', props.currentLocale)}
            icon={FlipIcon}
            className={styles.callButton}
            disabled={disabledFlip || props.isOnHold}
          />
        </div>
      </div>
      <div className={classnames(styles.buttonRow, styles.stopButtonGroup)}>
        <div className={styles.button}>
          <CircleButton
            className={styles.stopButton}
            onClick={props.onHangup}
            icon={EndIcon}
            showBorder={false}
            iconWidth={250}
            iconX={125}
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
  recordStatus: PropTypes.string.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  onPark: PropTypes.func.isRequired,
  onShowKeyPad: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onShowFlipPanel: PropTypes.func.isRequired,
  onToggleTransferPanel: PropTypes.func.isRequired,
  flipNumbers: PropTypes.array.isRequired,
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
};
