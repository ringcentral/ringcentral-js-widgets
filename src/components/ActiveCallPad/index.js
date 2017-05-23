import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import ActiveCallButton from '../ActiveCallButton';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

export default function ActiveCallPad(props) {
  const muteButton = props.isOnMute ?
    (
      <ActiveCallButton
        onClick={props.onUnmute}
        title={'Unmute'}
      >
        <i className={rcFont.uniCE} />
      </ActiveCallButton>
    ) :
    (
      <ActiveCallButton
        onClick={props.onMute}
        title={'Mute'}
      >
        <i className={rcFont.uni7B} />
      </ActiveCallButton>
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
        <ActiveCallButton
          onClick={props.onShowKeyPad}
          title={'Keypad'}
        >
          <i className={rcFont.uniA4} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={() => null}
          title={'Audio'}
        >
          <i className={rcFont.uni2496} />
        </ActiveCallButton>
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={onHoldClicked}
          title={'Hold'}
          active={props.isOnHold}
        >
          <i className={rcFont.uni2474} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={onRecordClicked}
          title={props.isOnRecord ? 'Stop' : 'Record'}
          active={props.isOnRecord}
        >
          <i className={rcFont.icon_radio_off} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={props.onAdd}
          title={'Add'}
        >
          <i className={rcFont.ActionButtons_Add} />
        </ActiveCallButton>
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          title={'Transfer'}
        >
          <i className={rcFont['icon-transfer']} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={() => null}
          title={'Park'}
        >
          <i className={rcFont.uni2E} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={() => null}
          title={'Flip'}
        >
          <i className={rcFont['icon-flip']} />
        </ActiveCallButton>
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
  onShowKeyPad: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  isOnRecord: false,
};
