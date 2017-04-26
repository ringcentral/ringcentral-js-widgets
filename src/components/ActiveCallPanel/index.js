import React, { PropTypes } from 'react';

import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';

import Button from '../Button';
import DurationCounter from '../DurationCounter';
import ActiveCallUserInfo from '../ActiveCallUserInfo';
import ActiveCallPad from '../ActiveCallPad';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

function ActiveCallPanel(props) {
  const timeCounter = props.startTime ?
    (
      <span className={styles.timeCounter}>
        <DurationCounter startTime={props.startTime} />
      </span>
    ) : null;
  const statusIcon = props.callStatus === sessionStatus.connected ?
    (<i className={rcFont.uniBD} />) :
    (<i className={rcFont.uniBE} />);
  return (
    <div className={styles.root}>
      <Button
        className={styles.minimizeButton}
        onClick={props.toggleMinimized}
      >
        <i className={dynamicsFont.close} />
      </Button>
      <span className={styles.connectStatus}>
        {statusIcon}
      </span>
      {timeCounter}
      <ActiveCallUserInfo
        name={props.userName}
        phoneNumber={props.phoneNumber}
        currentLocale={props.currentLocale}
      />
      <ActiveCallPad
        isOnMute={props.isOnMute}
        isOnHold={props.isOnHold}
        isOnRecord={props.isOnRecord}
        onMute={props.onMute}
        onUnmute={props.onUnmute}
        onHold={props.onHold}
        onUnhold={props.onUnhold}
        onRecord={props.onRecord}
        onStopRecord={props.onStopRecord}
        hangup={props.hangup}
      />
      {props.children}
    </div>
  );
}

ActiveCallPanel.propTypes = {
  phoneNumber: PropTypes.string,
  userName: PropTypes.string,
  callStatus: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  startTime: PropTypes.number,
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
  toggleMinimized: PropTypes.func.isRequired,
  children: PropTypes.node,
};

ActiveCallPanel.defaultProps = {
  userName: null,
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  isOnRecord: false,
  sessionId: null,
  phoneNumber: null,
  callStatus: null,
  children: undefined,
};

export default ActiveCallPanel;
