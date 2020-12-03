import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import callDirections from 'ringcentral-integration/enums/callDirections';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import recordStatusEnum from 'ringcentral-integration/modules/Webphone/recordStatus';
import TransferSmallIcon from '@ringcentral/juno/icons/icon-transfer-call.svg';
import HoldIconInAction from '@ringcentral/juno/icons/icon-hold.svg';
import IgnoreIcon from '@ringcentral/juno/icons/icon-ignore.svg';
import VoicemailIcon from '@ringcentral/juno/icons/icon-voicemail.svg';
import ForwardIcon from '../../assets/images/Forward_white.svg';
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
import AnswerIcon from '../../assets/images/Answer.svg';
import MoreIcon from '../../assets/images/MoreIcon.svg';
import i18n from './i18n';
import styles from './styles.scss';
import { MoreActionWithForward } from './MoreActionWithForward';
import HoldAnswerIcon from '../../assets/images/HoldAnswer.svg';
import EndAnswerIcon from '../../assets/images/EndAnswer.svg';

const recodingVoiceTime = 6781;

const CallLogCallCtrlComponent = (props) => {
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
        disabled: recordPendingState || isOnHold,
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
    const ignoreTitle = i18n.getString('ignore', currentLocale);
    const voicemailTitle = i18n.getString('voicemail', currentLocale);
    const answerTitle = i18n.getString('answer', currentLocale);
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
          rootButtonProps={rootButtonProps}
          actionsList={forwardList}
          currentLocale={currentLocale}
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
          withSubText
          popoverClasses={{ paper: styles.forwardPopover }}
        />
        <span title={ignoreTitle}>
          <CircleButton
            dataSign={ignoreTitle}
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
        <span title={voicemailTitle}>
          <CircleButton
            dataSign={voicemailTitle}
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
        <span title={answerTitle}>
          <CircleButton
            dataSign={answerTitle}
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
    const voicemailTitle = i18n.getString('voicemail', currentLocale);
    return (
      <div className={classnames(!isWide ? styles.classic : null, styles.root)}>
        <span
          title={i18n.getString('answerAndEnd', currentLocale)}
          className={styles.answerButton}
          onClick={answerAndEnd}
        >
          <EndAnswerIcon />
        </span>
        <span title={voicemailTitle}>
          <CircleButton
            dataSign={voicemailTitle}
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
};

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
  forward: PropTypes.func,
  answer: PropTypes.func,
  forwardingNumbers: PropTypes.array,
  ignore: PropTypes.func,
  otherActiveCalls: PropTypes.bool,
  answerAndHold: PropTypes.func,
  answerAndEnd: PropTypes.func,
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
};

export default CallLogCallCtrlComponent;
