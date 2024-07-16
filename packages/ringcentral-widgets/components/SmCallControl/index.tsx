import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import clsx from 'clsx';
import React from 'react';

import EndIcon from '../../assets/images/End.svg';
import MuteIcon from '../../assets/images/Mute.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import CircleButton from '../CircleButton';

import i18n from './i18n';
import styles from './styles.scss';

type SmCallControlProps = {
  onMute?: (...args: any[]) => any;
  onUnmute?: (...args: any[]) => any;
  onHangup?: (...args: any[]) => any;
  onReject?: (...args: any[]) => any;
  isOnMute?: boolean;
  callStatus?: string;
  currentLocale?: string;
  callDirection: string;
};
const SmCallControl: React.FC<SmCallControlProps> = (props) => {
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
          className={clsx(
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
          className={clsx(styles.hangup, styles.button)}
        />
      </span>
    </div>
  );
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
export default SmCallControl;
