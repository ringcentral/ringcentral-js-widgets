import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import telephonyStatus from 'ringcentral-integration/enums/telephonyStatus';

import CircleButton from '../CircleButton';

import MuteIcon from '../../assets/images/Mute.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import EndIcon from '../../assets/images/End.svg';
import styles from './styles.scss';

import i18n from './i18n';


export default function SmCallControl(props) {
  const {
    onMute, onUnmute, onHangup, isOnMute,
    callStatus, currentLocale
  } = props;
  const muteIcon = isOnMute ? MuteIcon : UnmuteIcon;
  const muteAction = isOnMute ? onUnmute : onMute;
  const muteTitle = isOnMute ? 'mute' : 'unmute';
  const hangupTile = callStatus === telephonyStatus.CallConnected ? 'hangup' : 'reject';
  const disabledCtrl = callStatus === telephonyStatus.ringing;
  return (
    <div className={styles.smWraper}>
      <CircleButton
        icon={muteIcon}
        onClick={muteAction}
        className={styles.button}
        title={i18n.getString(muteTitle, currentLocale)}
        disabled={disabledCtrl}
      />
      <CircleButton
        showBorder={false}
        icon={EndIcon}
        onClick={onHangup}
        className={classnames(styles.hangup, styles.button)}
        title={i18n.getString(hangupTile, currentLocale)}
        disabled={disabledCtrl}
      />
    </div>
  );
}

SmCallControl.propTypes = {
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onHangup: PropTypes.func,
  isOnMute: PropTypes.bool,
  callStatus: PropTypes.string,
  currentLocale: PropTypes.string,
};
SmCallControl.defaultProps = {
  onMute() { },
  onUnmute() { },
  onHangup() { },
  isOnMute: false,
  callStatus: 'CallConnected',
  currentLocale: 'en-US'
};
