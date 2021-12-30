import React, { useEffect, useState } from 'react';

import classnames from 'classnames';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { telephonySessionStatus } from '@ringcentral-integration/commons/enums/telephonySessionStatus';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import recordStatusEnum from '@ringcentral-integration/commons/modules/Webphone/recordStatus';
import {
  Hold as HoldIconInAction,
  Ignore as IgnoreIcon,
  TransferCall as TransferSmallIcon,
  Voicemail as VoicemailIcon,
} from '@ringcentral/juno/icon';

import AnswerIcon from '../../assets/images/Answer.svg';
import DialpadIcon from '../../assets/images/Dialpad.svg';
import EndIcon from '../../assets/images/End.svg';
import EndAnswerIcon from '../../assets/images/EndAnswer.svg';
import ForwardIcon from '../../assets/images/Forward_white.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import HoldAnswerIcon from '../../assets/images/HoldAnswer.svg';
import MoreIcon from '../../assets/images/MoreIcon.svg';
import MuteIcon from '../../assets/images/Mute.svg';
import RecordIcon from '../../assets/images/RecordOff.svg';
import RecordIconActive from '../../assets/images/RecordOn.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import CircleButton from '../CircleButton';
import { CallLogDialpad } from './CallLogDialpad';
import i18n from './i18n';
import { MoreActionComponent } from './MoreActionComponent';
import { MoreActionWithForward } from './MoreActionWithForward';
import styles from './styles.scss';

const recodingVoiceTime = 6781;
type CallLogCallCtrlComponentProps = {
  onMute?: (...args: any[]) => any;
  onUnmute?: (...args: any[]) => any;
  onHangup?: (...args: any[]) => any;
  onReject?: (...args: any[]) => any;
  onTransfer?: (...args: any[]) => any;
  isOnMute?: boolean;
  isOnHold?: boolean;
  onUnHold?: (...args: any[]) => any;
  onHold?: (...args: any[]) => any;
  startRecord?: (...args: any[]) => any;
  stopRecord?: (...args: any[]) => any;
  disableLinks?: boolean;
  callStatus?: string;
  recordStatus?: string;
  currentLocale?: string;
  callDirection: string;
  isWide?: boolean;
  isCurrentDeviceCall?: boolean;
  transferRef?:
    | ((...args: any[]) => any)
    | {
        current?: any;
      };
  isOnTransfer?: boolean;
  sendDTMF?: (...args: any[]) => any;
  forward?: (...args: any[]) => any;
  answer?: (...args: any[]) => any;
  forwardingNumbers?: any[];
  ignore?: (...args: any[]) => any;
  otherActiveCalls?: boolean;
  answerAndHold?: (...args: any[]) => any;
  answerAndEnd?: (...args: any[]) => any;
  dialpadToggleTrack?: (...args: any[]) => any;
  clickForwardTrack?: (...args: any[]) => any;
  realOutboundCallStatus?: string;
};
const CallLogCallCtrlComponent: React.SFC<CallLogCallCtrlComponentProps> = (
  props,
) => {
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
    forward,
    answer,
    forwardingNumbers,
    ignore,
    otherActiveCalls,
    answerAndHold,
    answerAndEnd,
    realOutboundCallStatus,
    dialpadToggleTrack,
    clickForwardTrack,
  } = props;
  // reject conditions: call direction is inbound & call status is ringing
  const isInComingCall =
    callDirections.inbound === callDirection &&
    telephonyStatuses.ringing === callStatus;
  // real outbound call status
  const isOutboundCallConnecting =
    realOutboundCallStatus === telephonySessionStatus.proceeding;
  const isOutboundCallOnVoiceMail =
    realOutboundCallStatus === telephonySessionStatus.voicemail;
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
    dialpadToggleTrack(!dialpadShow);
    onDialpadShow(!dialpadShow);
  };
  // WebRTC logic
  const [anchorEl, setAnchorEl] = useState(null);
  const [recordPendingState, setRecordPendingState] = useState(false);
  let timer;
  const startRecordAction = async (...args) => {
    const res = await startRecord(...args);
    if (res) {
      setRecordPendingState(true);
      timer = setTimeout(() => {
        setRecordPendingState(false);
      }, recodingVoiceTime);
    }
  };
  useEffect(() => () => {
    timer && clearTimeout(timer);
    timer = null;
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isWebRTCCall = isCurrentDeviceCall;
  const onGoingActiveCalls = otherActiveCalls;
  if (
    (isWebRTCCall && callDirections.outbound === callDirection) ||
    (isWebRTCCall &&
      callDirections.inbound === callDirection &&
      callStatus !== telephonyStatuses.ringing)
  ) {
    const isRecording = recordStatus === recordStatusEnum.recording;
    const recordingText = isRecording ? 'stopRecord' : 'record';
    const recordAction = isRecording ? stopRecord : startRecordAction;
    const keypadText = dialpadShow ? 'hideKeypad' : 'showKeypad';
    const onHoldText = isOnHold ? 'unHold' : 'hold';
    const recordDisabled =
      recordPendingState ||
      isOnHold ||
      isOutboundCallConnecting ||
      isOutboundCallOnVoiceMail;
    const holdDisabled = disableLinks || isOutboundCallConnecting;
    const moreActions = [
      {
        icon: TransferSmallIcon,
        key: 'transfer',
        onClick: onTransfer,
        iconClassName: classnames({
          [styles.moreActionIcon]: true,
        }),
        text: i18n.getString('transfer', currentLocale),
      },
      {
        icon: HoldIconInAction,
        key: onHoldText,
        onClick: holdAction,
        iconClassName: classnames({
          [styles.moreActionIcon]: true,
          [styles.holdActive]: isOnHold,
        }),
        disabled: holdDisabled,
        text: i18n.getString(onHoldText, currentLocale),
      },
      {
        icon: isRecording ? RecordIconActive : RecordIcon,
        key: recordingText,
        onClick: recordAction,
        iconClassName: classnames({
          [styles.moreActionIcon]: true,
          [styles.recordingIcon]: true,
          [styles.recordingDisabled]: recordPendingState,
        }),
        disabled: recordDisabled,
        text: i18n.getString(recordingText, currentLocale),
      },
    ];
    const rootButtonProps = {
      icon: MoreIcon,
      tooltip: i18n.getString('more', currentLocale),
    };
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
              dataSign={keypadText}
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
            dataSign="more"
            rootButtonProps={rootButtonProps}
            actionsList={moreActions}
            currentLocale={currentLocale}
            disabled={disableLinks || disabledCtrl}
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
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
  if (isWebRTCCall && isInComingCall && !onGoingActiveCalls) {
    const forwardTitle = i18n.getString('forward', currentLocale);
    const onForward = (e) => {
      e.stopPropagation();
      handleClose();
      const selectdValue = e.currentTarget.attributes['data-value'].value;
      forward(selectdValue);
    };
    const forwardList = forwardingNumbers.map((phoneNumber) => {
      return {
        key: phoneNumber.phoneNumber,
        text: phoneNumber.label,
        subText: phoneNumber.phoneNumber,
        onClick: (e) => onForward(e),
      };
    });
    forwardList.push({
      key: 'custom',
      text: i18n.getString('custom', currentLocale),
      onClick: (e) => onForward(e),
    });
    const rootButtonProps = {
      icon: ForwardIcon,
      className: !!anchorEl && styles.rootButtonActive,
      tooltip: forwardTitle,
    };
    return (
      <div className={classnames(!isWide ? styles.classic : null, styles.root)}>
        <MoreActionComponent
          dataSign={!anchorEl ? 'forward' : 'forwardActive'}
          rootButtonProps={rootButtonProps}
          actionsList={forwardList}
          currentLocale={currentLocale}
          handleClick={(e) => {
            clickForwardTrack();
            handleClick(e);
          }}
          handleClose={handleClose}
          anchorEl={anchorEl}
          withSubText
          popoverClasses={{ paper: styles.forwardPopover }}
        />
        <span title={i18n.getString('ignore', currentLocale)}>
          <CircleButton
            dataSign="ignore"
            icon={IgnoreIcon}
            iconWidth={250}
            iconHeight={250}
            iconX={125}
            iconY={125}
            className={classnames({
              [styles.button]: true,
            })}
            disabled={disableLinks}
            onClick={ignore}
          />
        </span>
        <span title={i18n.getString('voicemail', currentLocale)}>
          <CircleButton
            dataSign="voicemail"
            showBorder={false}
            icon={VoicemailIcon}
            iconWidth={250}
            iconHeight={250}
            iconX={125}
            iconY={125}
            onClick={endAction}
            className={classnames({
              [styles.hangup]: true,
              [styles.button]: true,
              [styles.buttonDisabled]: disableLinks,
            })}
            disabled={disableLinks}
          />
        </span>
        <span title={i18n.getString('answer', currentLocale)}>
          <CircleButton
            dataSign="answer"
            showBorder={false}
            icon={AnswerIcon}
            onClick={answer}
            className={classnames({
              [styles.button]: true,
              [styles.answer]: true,
              [styles.buttonDisabled]: disableLinks,
            })}
            disabled={disableLinks}
          />
        </span>
      </div>
    );
  }
  if (isWebRTCCall && onGoingActiveCalls && isInComingCall) {
    return (
      <div className={classnames(!isWide ? styles.classic : null, styles.root)}>
        <span
          data-sign="endAndAnswer"
          title={i18n.getString('answerAndEnd', currentLocale)}
          className={styles.answerButton}
          onClick={answerAndEnd}
        >
          <EndAnswerIcon />
        </span>
        <span title={i18n.getString('voicemail', currentLocale)}>
          <CircleButton
            dataSign="voicemail"
            showBorder={false}
            icon={VoicemailIcon}
            iconWidth={250}
            iconHeight={250}
            iconX={125}
            iconY={125}
            onClick={endAction}
            className={classnames({
              [styles.hangup]: true,
              [styles.button]: true,
              [styles.buttonDisabled]: disableLinks,
            })}
            disabled={disableLinks}
          />
        </span>
        <span
          data-sign="holdAndAnswer"
          title={i18n.getString('answerAndHold', currentLocale)}
          className={styles.answerButton}
          onClick={answerAndHold}
        >
          <HoldAnswerIcon />
        </span>
        <MoreActionWithForward
          currentLocale={currentLocale}
          disabled={disableLinks}
          forwardingNumbers={forwardingNumbers}
          forward={forward}
          ignore={ignore}
          clickForwardTrack={clickForwardTrack}
        />
      </div>
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
            [styles.buttonDisabled]:
              isInComingCall || disableLinks || isOutboundCallConnecting,
          })}
          disabled={disableLinks || isInComingCall || isOutboundCallConnecting}
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
  forward() {},
  answer() {},
  forwardingNumbers: [],
  ignore() {},
  otherActiveCalls: false,
  answerAndEnd() {},
  answerAndHold() {},
  dialpadToggleTrack(i) {},
  clickForwardTrack() {},
  realOutboundCallStatus: '',
};
export default CallLogCallCtrlComponent;
