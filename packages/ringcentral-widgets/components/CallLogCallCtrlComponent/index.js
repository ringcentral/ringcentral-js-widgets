import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import callDirections from 'ringcentral-integration/enums/callDirections';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import MuteIcon from '../../assets/images/Mute.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';

import i18n from './i18n';
import styles from './styles.scss';

export default function CallLogCallCtrlComponent(props) {
  const {
    onMute,
    onUnmute,
    onHangup,
    onReject,
    isOnMute,
    callStatus,
    currentLocale,
    callDirection,
    onTransfer,
    isOnHold,
    onUnHold,
    onHold,
    disableLinks,
    isWide,
  } = props;

  // reject conditions: call direction is inbound & call status is ringing
  const isInComingCall =
    callDirections.inbound === callDirection &&
    telephonyStatuses.ringing === callStatus;

  const muteIcon = isOnMute ? MuteIcon : UnmuteIcon;
  const muteAction = isOnMute ? onUnmute : onMute;
  const muteTitle = isOnMute ? 'unmute' : 'mute';
  const holdTitle = isOnHold ? 'onHold' : 'hold';
  const holdAction = isOnHold ? onUnHold : onHold;
  const endTitle = isInComingCall ? 'reject' : 'hangup';
  const endAction = isInComingCall ? onReject : onHangup;
  const disabledCtrl = callStatus === telephonyStatuses.ringing;
  return (
    <div className={classnames(!isWide ? styles.classic : null, styles.root)}>
      <span title={i18n.getString(muteTitle, currentLocale)}>
        <CircleButton
          dataSign={muteTitle}
          icon={muteIcon}
          onClick={muteAction}
          className={classnames({
            [styles.button]: true,
            [styles.buttonDisabled]: disableLinks || disabledCtrl,
          })}
          disabled={disableLinks || disabledCtrl}
        />
      </span>
      <span title={i18n.getString('transfer', currentLocale)}>
        <CircleButton
          dataSign="transfer"
          icon={TransferIcon}
          onClick={onTransfer}
          className={classnames({
            [styles.button]: true,
            [styles.buttonDisabled]: disableLinks || isInComingCall,
          })}
          disabled={disableLinks || isInComingCall}
        />
      </span>
      <span title={i18n.getString(holdTitle, currentLocale)}>
        <CircleButton
          dataSign={holdTitle}
          icon={HoldIcon}
          onClick={holdAction}
          className={classnames({
            [styles.button]: true,
            [styles.buttonActive]: isOnHold,
            [styles.buttonDisabled]: isInComingCall || disableLinks,
          })}
          disabled={disableLinks || isInComingCall}
        />
      </span>
      <span title={i18n.getString(endTitle, currentLocale)}>
        <CircleButton
          dataSign={endTitle}
          showBorder={false}
          icon={EndIcon}
          onClick={endAction}
          className={classnames({
            [styles.hangup]: true,
            [styles.button]: true,
            [styles.buttonDisabled]: disableLinks,
          })}
          disabled={disableLinks}
        />
      </span>
    </div>
  );
}

CallLogCallCtrlComponent.propTypes = {
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onHangup: PropTypes.func,
  onReject: PropTypes.func,
  onTransfer: PropTypes.func,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  onUnHold: PropTypes.func,
  onHold: PropTypes.func,
  disableLinks: PropTypes.bool,
  callStatus: PropTypes.string,
  currentLocale: PropTypes.string,
  callDirection: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
};
CallLogCallCtrlComponent.defaultProps = {
  onMute() {},
  onUnmute() {},
  onHangup() {},
  onReject() {},
  onTransfer() {},
  onUnHold() {},
  onHold() {},
  isOnMute: false,
  isOnHold: false,
  callStatus: 'CallConnected',
  currentLocale: 'en-US',
  disableLinks: false,
  isWide: true,
};
