import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, createRef } from 'react';
import callDirections from 'ringcentral-integration/enums/callDirections';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import recordStatusEnum from 'ringcentral-integration/modules/Webphone/recordStatus';
import TransferSmallIcon from '@ringcentral-integration/rcui/icons/icon-transfer-call.svg';
import HoldIconInAction from '@ringcentral-integration/rcui/icons/icon-hold.svg';
import RecordIcon from '../../assets/images/RecordOff.svg';
import RecordIconActive from '../../assets/images/RecordOn.svg';

import CircleButton from '../CircleButton';
import { MoreActionComponent } from './MoreActionComponent';
import { CallLogDialpad } from './CallLogDialpad';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import MuteIcon from '../../assets/images/Mute.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';

import DialpadIcon from '../../assets/images/Dialpad.svg';

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
    recordStatus,
    currentLocale,
    callDirection,
    onTransfer,
    isOnTransfer,
    isOnHold,
    onUnHold,
    onHold,
    startRecord,
    stopRecord,
    disableLinks,
    isWide,
    transferRef,
    isCurrentDeviceCall,
    sendDTMF,
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
  const [dialpadShow, onDialpadShow] = useState(false);
  const toggleDialpadShow = () => {
    onDialpadShow(!dialpadShow);
  };
  // WebRTC logic
  if (isCurrentDeviceCall && callDirections.outbound === callDirection) {
    const isRecording = recordStatus === recordStatusEnum.recording;
    const recordingText = isRecording ? 'stopRecord' : 'record';
    const recordAction = isRecording ? stopRecord : startRecord;
    const keypadText = dialpadShow ? 'hideKeypad' : 'showKeypad';

    const moreActions = [
      {
        icon: TransferSmallIcon,
        text: 'transfer',
        onClick: onTransfer,
        iconClassName: classnames({
          [styles.moreActionIcon]: true,
        }),
      },
      {
        icon: HoldIconInAction,
        text: isOnHold ? 'unHold' : 'hold',
        onClick: holdAction,
        iconClassName: classnames({
          [styles.moreActionIcon]: true,
          [styles.holdActive]: isOnHold,
        }),
      },
      {
        icon: isRecording ? RecordIconActive : RecordIcon,
        text: recordingText,
        onClick: recordAction,
        iconClassName: classnames({
          [styles.moreActionIcon]: true,
        }),
      },
    ];
    return (
      <>
        <div
          className={classnames(!isWide ? styles.classic : null, styles.root)}
        >
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
          <span title={i18n.getString(keypadText, currentLocale)}>
            <CircleButton
              icon={DialpadIcon}
              className={classnames({
                [styles.button]: true,
                [styles.buttonDisabled]: isInComingCall || disableLinks,
                [styles.dialpadIconActive]: dialpadShow,
              })}
              disabled={disableLinks || isInComingCall}
              onClick={toggleDialpadShow}
            />
          </span>
          <MoreActionComponent
            actionsList={moreActions}
            currentLocale={currentLocale}
            disabled={disableLinks || disabledCtrl}
          />
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
        {dialpadShow && (
          <CallLogDialpad
            className={classnames(styles.smallDialpad, {
              [styles.smallDiapadShow]: dialpadShow,
            })}
            onChange={(e) => {
              sendDTMF(e);
            }}
            onClose={toggleDialpadShow}
            isWide={isWide}
          />
        )}
      </>
    );
  }

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
      <span ref={transferRef} title={i18n.getString('transfer', currentLocale)}>
        <CircleButton
          dataSign="transfer"
          icon={TransferIcon}
          onClick={onTransfer}
          className={classnames({
            [styles.button]: true,
            [styles.buttonActive]: isOnTransfer,
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
  startRecord: PropTypes.func,
  stopRecord: PropTypes.func,
  disableLinks: PropTypes.bool,
  callStatus: PropTypes.string,
  recordStatus: PropTypes.string,
  currentLocale: PropTypes.string,
  callDirection: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
  isCurrentDeviceCall: PropTypes.bool,
  transferRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  isOnTransfer: PropTypes.bool,
  sendDTMF: PropTypes.func,
};
CallLogCallCtrlComponent.defaultProps = {
  onMute() {},
  onUnmute() {},
  onHangup() {},
  onReject() {},
  onTransfer() {},
  onUnHold() {},
  onHold() {},
  startRecord() {},
  stopRecord() {},
  isOnMute: false,
  isOnHold: false,
  callStatus: 'CallConnected',
  currentLocale: 'en-US',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false,
  sendDTMF() {},
};
