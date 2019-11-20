import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';

import CircleButton from '../CircleButton';

import MuteIcon from '../../assets/images/Mute.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import EndIcon from '../../assets/images/End.svg';
import styles from './styles.scss';

import i18n from './i18n';

export default function SmCallControl(props) {
  const {
    onMute,
    onUnmute,
    onHangup,
    onReject,
    isOnMute,
    callStatus,
    currentLocale,
    callDirection,
  } = props;

  // reject conditions: call direction is inbound & call status is ringing
  function canRejectCall() {
    return (
      callDirections.inbound === callDirection &&
      telephonyStatuses.ringing === callStatus
    );
  }

  const muteIcon = isOnMute ? MuteIcon : UnmuteIcon;
  const muteAction = isOnMute ? onUnmute : onMute;
  const muteTitle = isOnMute ? 'unmute' : 'mute';
  const endTitle = canRejectCall() ? 'reject' : 'hangup';
  const endAction = canRejectCall() ? onReject : onHangup;
  const disabledCtrl = callStatus === telephonyStatuses.ringing;
  return (
    <div className={styles.smWraper}>
      <span title={i18n.getString(muteTitle, currentLocale)}>
        <CircleButton
          dataSign={muteTitle}
          icon={muteIcon}
          onClick={muteAction}
          className={classnames(
            styles.button,
            disabledCtrl ? styles.buttonDisabled : null,
          )}
          disabled={disabledCtrl}
        />
      </span>
      <span title={i18n.getString(endTitle, currentLocale)}>
        <CircleButton
          dataSign={endTitle}
          showBorder={false}
          icon={EndIcon}
          onClick={endAction}
          className={classnames(styles.hangup, styles.button)}
        />
      </span>
    </div>
  );
}

SmCallControl.propTypes = {
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onHangup: PropTypes.func,
  onReject: PropTypes.func,
  isOnMute: PropTypes.bool,
  callStatus: PropTypes.string,
  currentLocale: PropTypes.string,
  callDirection: PropTypes.string.isRequired,
};
SmCallControl.defaultProps = {
  onMute() {},
  onUnmute() {},
  onHangup() {},
  onReject() {},
  isOnMute: false,
  callStatus: 'CallConnected',
  currentLocale: 'en-US',
};
