/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { telephonySessionStatus } from '@ringcentral-integration/commons/enums/telephonySessionStatus';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import recordStatusEnum from '@ringcentral-integration/commons/modules/Webphone/recordStatus';
import { RcIconButtonGroup } from '@ringcentral/juno';
import {
  CallMore as JunoMoreIcon,
  Hold as HoldIconInAction,
  Ignore as IgnoreIcon,
  TransferCall as TransferSmallIcon,
  Voicemail as VoicemailIcon,
  CallAdd as CallAddIcon,
} from '@ringcentral/juno-icon';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import AnswerIcon from '../../assets/images/Answer.svg';
import DialpadIcon from '../../assets/images/Dialpad.svg';
import EndIcon from '../../assets/images/End.svg';
import EndAnswerIcon from '../../assets/images/EndAnswer.svg';
import ForwardIcon from '../../assets/images/Forward_white.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import HoldAnswerIcon from '../../assets/images/HoldAnswer.svg';
import MergeIntoConferenceIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import MoreIcon from '../../assets/images/MoreIcon.svg';
import MuteIcon from '../../assets/images/Mute.svg';
import RecordIcon from '../../assets/images/RecordOff.svg';
import RecordIconActive from '../../assets/images/RecordOn.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import { CircleButtonWithTitle } from '../CircleButton';

import { CallLogDialpad } from './CallLogDialpad';
import { MoreActionComponent } from './MoreActionComponent';
import { MoreActionWithIncomingCall } from './MoreActionWithIncomingCall';
import i18n from './i18n';
import { CompleteTransferButton } from './style';
import styles from './styles.scss';

const recodingVoiceTime = 6781;
type CallLogCallCtrlComponentProps = {
  onMute?: (...args: any[]) => any;
  onUnmute?: (...args: any[]) => any;
  onHangup?: (...args: any[]) => any;
  onReject?: (...args: any[]) => any;
  onTransfer?: (...args: any[]) => any;
  onAddCall?: (...args: any[]) => any;
  onCompleteWarmTransfer?: (...args: any[]) => any;
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
  warmTransferActiveTelephonySessionId?: string;
  transferRef?: any;
  isOnTransfer?: boolean;
  sendDTMF?: (...args: any[]) => any;
  forward?: (...args: any[]) => any;
  answer?: (...args: any[]) => any;
  reply?: (telephonySession: string) => any;
  forwardingNumbers?: any[];
  ignore?: (...args: any[]) => any;
  otherActiveCalls?: boolean;
  answerAndHold?: (...args: any[]) => any;
  answerAndEnd?: (...args: any[]) => any;
  dialpadToggleTrack?: (...args: any[]) => any;
  clickForwardTrack: (...args: any[]) => any;
  realOutboundCallStatus?: string;
  enableReply?: boolean;
  allowPickupCall?: boolean;
  showConferenceCall?: boolean;
  isCurrentCall?: boolean;
  onMergeCall: () => Promise<void>;
};
const CallLogCallCtrlComponent: React.FC<CallLogCallCtrlComponentProps> = (
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
    onAddCall,
    onCompleteWarmTransfer,
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
    reply,
    forwardingNumbers,
    ignore,
    otherActiveCalls,
    answerAndHold,
    answerAndEnd,
    realOutboundCallStatus,
    dialpadToggleTrack,
    clickForwardTrack,
    warmTransferActiveTelephonySessionId,
    enableReply,
    allowPickupCall,
    showConferenceCall,
    isCurrentCall,
    onMergeCall,
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
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    dialpadToggleTrack(!dialpadShow);
    onDialpadShow(!dialpadShow);
  };
  // WebRTC logic
  const [anchorEl, setAnchorEl] = useState(null);
  const [recordPendingState, setRecordPendingState] = useState(false);
  let timer: any;
  const startRecordAction = async (...args: any[]) => {
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2345): Argument of type 'EventTarget & HTMLButtonElement'... Remove this comment to see the full error message
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isWebRTCCall = isCurrentDeviceCall;
  const onGoingActiveCalls = otherActiveCalls;
  const warmTransferCall = !!warmTransferActiveTelephonySessionId;
  const showExtraCallControl = warmTransferCall || isWebRTCCall;
  if (
    (showExtraCallControl && callDirections.outbound === callDirection) ||
    (showExtraCallControl &&
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
    const warmTransferMoreActions = [
      {
        icon: muteIcon,
        key: muteTitle,
        onClick: muteAction,
        iconClassName: clsx({
          [styles.moreActionIcon]: true,
          [styles.buttonDisabled]: disableLinks || disabledCtrl,
          [styles.moreActionIconActive]: isOnMute,
        }),
        disabled: disableLinks || disabledCtrl,
        text: i18n.getString(muteTitle, currentLocale),
      },
      {
        icon: DialpadIcon,
        key: keypadText,
        onClick: () => {
          handleClose();
          toggleDialpadShow();
        },
        iconClassName: clsx({
          [styles.moreActionIcon]: true,
          [styles.buttonDisabled]: isInComingCall || disableLinks,
          [styles.moreActionIconActive]: dialpadShow,
        }),
        disabled: disableLinks || isInComingCall,
        text: i18n.getString(keypadText, currentLocale),
      },
      {
        icon: HoldIconInAction,
        key: onHoldText,
        onClick: holdAction,
        iconClassName: clsx({
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
        iconClassName: clsx({
          [styles.moreActionIcon]: true,
          [styles.recordingIcon]: true,
          [styles.recordingDisabled]: recordPendingState,
        }),
        disabled: recordDisabled,
        text: i18n.getString(recordingText, currentLocale),
      },
      {
        icon: EndIcon,
        key: endTitle,
        onClick: () => {
          handleClose();
          endAction?.();
        },
        iconClassName: clsx({
          [styles.buttonDisabled]: disableLinks,
          [styles.endIcon]: true,
        }),
        disabled: disableLinks,
        text: i18n.getString(endTitle, currentLocale),
      },
    ];
    const conferenceItem = showConferenceCall
      ? [
          {
            icon: CallAddIcon,
            key: 'add',
            onClick: onAddCall,
            iconClassName: clsx({
              [styles.moreActionIcon]: true,
            }),
            text: i18n.getString('add', currentLocale),
          },
        ]
      : [];
    const moreActions = [
      ...conferenceItem,
      {
        icon: TransferSmallIcon,
        key: 'transfer',
        onClick: onTransfer,
        iconClassName: clsx({
          [styles.moreActionIcon]: true,
        }),
        text: i18n.getString('transfer', currentLocale),
      },
      {
        icon: HoldIconInAction,
        key: onHoldText,
        onClick: holdAction,
        iconClassName: clsx({
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
        iconClassName: clsx({
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
      junoIcon: JunoMoreIcon,
      tooltip: i18n.getString('more', currentLocale),
    };
    const DialPadCom = dialpadShow && (
      <CallLogDialpad
        className={clsx(styles.smallDialpad, {
          [styles.smallDiapadShow]: dialpadShow,
        })}
        onChange={(e) => {
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          sendDTMF(e);
        }}
        onClose={toggleDialpadShow}
        isWide={isWide}
      />
    );
    if (warmTransferActiveTelephonySessionId) {
      return (
        <>
          <RcIconButtonGroup
            data-sign="warmTransferControlButtonsWrap"
            className={clsx(!isWide ? styles.classic : null, styles.root)}
          >
            <CompleteTransferButton
              $isWide={isWide}
              data-sign="completeTransfer"
              disabled={disableLinks || disabledCtrl}
              color="positive"
              radius="round"
              disabledVariant="mask"
              fullWidth
              onClick={onCompleteWarmTransfer}
            >
              {i18n.getString('completeTransfer', currentLocale)}
            </CompleteTransferButton>
            <MoreActionComponent
              dataSign="more"
              // @ts-expect-error TS(2741): Property 'className' is missing in type '{ icon: a... Remove this comment to see the full error message
              rootButtonProps={rootButtonProps}
              // @ts-expect-error TS(2322): Type '({ icon: any; key: string; onClick: ((...arg... Remove this comment to see the full error message
              actionsList={warmTransferMoreActions}
              // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
              currentLocale={currentLocale}
              disabled={disableLinks || disabledCtrl}
              // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
              handleClick={handleClick}
              handleClose={handleClose}
              anchorEl={anchorEl}
              useJunoIcon
            />
          </RcIconButtonGroup>
          {DialPadCom}
        </>
      );
    }

    return (
      <>
        <div className={clsx(!isWide ? styles.classic : null, styles.root)}>
          {showConferenceCall && isWide && !isCurrentCall && (
            <CircleButtonWithTitle
              title={i18n.getString('mergeCall', currentLocale)}
              dataSign="mergeCall"
              icon={MergeIntoConferenceIcon}
              onClick={onMergeCall}
              className={clsx({
                [styles.button]: true,
                [styles.buttonDisabled]: disableLinks || disabledCtrl,
              })}
              disabled={disableLinks || disabledCtrl}
            />
          )}
          <CircleButtonWithTitle
            title={i18n.getString(muteTitle, currentLocale)}
            dataSign={muteTitle}
            icon={muteIcon}
            onClick={muteAction}
            className={clsx({
              [styles.button]: true,
              [styles.buttonDisabled]: disableLinks || disabledCtrl,
            })}
            disabled={disableLinks || disabledCtrl}
          />
          <CircleButtonWithTitle
            title={i18n.getString(keypadText, currentLocale)}
            dataSign={keypadText}
            icon={DialpadIcon}
            className={clsx({
              [styles.button]: true,
              [styles.buttonDisabled]: isInComingCall || disableLinks,
              [styles.dialpadIconActive]: dialpadShow,
            })}
            disabled={disableLinks || isInComingCall}
            onClick={toggleDialpadShow}
          />
          <MoreActionComponent
            dataSign="more"
            // @ts-expect-error TS(2322): Type '{ icon: any; junoIcon: React.MemoExoticCompo... Remove this comment to see the full error message
            rootButtonProps={rootButtonProps}
            // @ts-expect-error TS(2322): Type '({ icon: MemoExoticComponent<ForwardRefExoti... Remove this comment to see the full error message
            actionsList={moreActions}
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            currentLocale={currentLocale}
            disabled={disableLinks || disabledCtrl}
            // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
          <CircleButtonWithTitle
            title={i18n.getString(endTitle, currentLocale)}
            dataSign={endTitle}
            showBorder={false}
            icon={EndIcon}
            onClick={endAction}
            className={clsx({
              [styles.hangup]: true,
              [styles.button]: true,
              [styles.buttonDisabled]: disableLinks,
            })}
            disabled={disableLinks}
          />
        </div>
        {DialPadCom}
      </>
    );
  }
  if (
    (allowPickupCall || isWebRTCCall) &&
    isInComingCall &&
    !onGoingActiveCalls
  ) {
    const forwardTitle = i18n.getString('forward', currentLocale);
    const onForward = (e: any) => {
      e.stopPropagation();
      handleClose();
      const selectdValue = e.currentTarget.attributes['data-value'].value;
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      forward(selectdValue);
    };
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const forwardList = forwardingNumbers.map((phoneNumber) => {
      return {
        key: phoneNumber.phoneNumber,
        text: phoneNumber.label,
        subText: phoneNumber.phoneNumber,
        onClick: (e: any) => onForward(e),
      };
    });
    // @ts-expect-error TS(2345): Argument of type '{ key: string; text: string; onC... Remove this comment to see the full error message
    forwardList.push({
      key: 'custom',
      text: i18n.getString('custom', currentLocale),
      onClick: (e) => onForward(e),
    });
    const rootButtonProps = {
      icon: ForwardIcon,
      tooltip: forwardTitle,
    };
    return (
      <div className={clsx(!isWide ? styles.classic : null, styles.root)}>
        {enableReply ? (
          <MoreActionWithIncomingCall
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            currentLocale={currentLocale}
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            disabled={disableLinks}
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            forwardingNumbers={forwardingNumbers}
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            forward={forward}
            enableReply={enableReply}
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            reply={reply}
            clickForwardTrack={clickForwardTrack}
          />
        ) : (
          <MoreActionComponent
            dataSign={!anchorEl ? 'forward' : 'forwardActive'}
            // @ts-expect-error TS(2322): Type '{ icon: any; className: boolean; tooltip: st... Remove this comment to see the full error message
            rootButtonProps={rootButtonProps}
            // @ts-expect-error TS(2322): Type '{ key: any; text: any; subText: any; onClick... Remove this comment to see the full error message
            actionsList={forwardList}
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            currentLocale={currentLocale}
            // @ts-expect-error TS(2322): Type '(e: any) => void' is not assignable to type ... Remove this comment to see the full error message
            handleClick={(e: any) => {
              clickForwardTrack();
              handleClick(e);
            }}
            handleClose={handleClose}
            anchorEl={anchorEl}
            withSubText
            // @ts-expect-error TS(2741): Property 'root' is missing in type '{ paper: strin... Remove this comment to see the full error message
            popoverClasses={{ paper: styles.forwardPopover }}
          />
        )}
        <CircleButtonWithTitle
          title={i18n.getString('ignore', currentLocale)}
          dataSign="ignore"
          icon={IgnoreIcon}
          iconWidth={250}
          iconHeight={250}
          iconX={125}
          iconY={125}
          className={clsx({
            [styles.button]: true,
            [styles.buttonDisabled]: disableLinks || !isWebRTCCall,
          })}
          disabled={disableLinks || !isWebRTCCall}
          onClick={ignore}
        />
        <CircleButtonWithTitle
          title={i18n.getString('voicemail', currentLocale)}
          dataSign="toVoiceMail"
          showBorder={false}
          icon={VoicemailIcon}
          iconWidth={250}
          iconHeight={250}
          iconX={125}
          iconY={125}
          onClick={endAction}
          className={clsx({
            [styles.hangup]: true,
            [styles.button]: true,
            [styles.buttonDisabled]: disableLinks,
          })}
          disabled={disableLinks}
        />
        <CircleButtonWithTitle
          title={i18n.getString('answer', currentLocale)}
          dataSign="answer"
          showBorder={false}
          icon={AnswerIcon}
          onClick={answer}
          className={clsx({
            [styles.button]: true,
            [styles.answer]: true,
            [styles.buttonDisabled]: disableLinks,
          })}
          disabled={disableLinks}
        />
      </div>
    );
  }
  if (
    (allowPickupCall || isWebRTCCall) &&
    isInComingCall &&
    onGoingActiveCalls
  ) {
    return (
      <div className={clsx(!isWide ? styles.classic : null, styles.root)}>
        <MoreActionWithIncomingCall
          disableIgnore={!isWebRTCCall}
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          currentLocale={currentLocale}
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          disabled={disableLinks}
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          forwardingNumbers={forwardingNumbers}
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          forward={forward}
          ignore={ignore}
          enableReply={enableReply}
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          reply={reply}
          clickForwardTrack={clickForwardTrack}
        />
        <span
          data-sign="endAndAnswer"
          title={i18n.getString('answerAndEnd', currentLocale)}
          className={styles.answerButton}
          onClick={answerAndEnd}
        >
          <EndAnswerIcon />
        </span>
        <CircleButtonWithTitle
          title={i18n.getString('voicemail', currentLocale)}
          dataSign="voicemail"
          showBorder={false}
          icon={VoicemailIcon}
          iconWidth={250}
          iconHeight={250}
          iconX={125}
          iconY={125}
          onClick={endAction}
          className={clsx({
            [styles.hangup]: true,
            [styles.button]: true,
            [styles.buttonDisabled]: disableLinks,
          })}
          disabled={disableLinks}
        />
        <span
          data-sign="holdAndAnswer"
          title={i18n.getString('answerAndHold', currentLocale)}
          className={styles.answerButton}
          onClick={answerAndHold}
        >
          <HoldAnswerIcon />
        </span>
      </div>
    );
  }
  return (
    <div className={clsx(!isWide ? styles.classic : null, styles.root)}>
      <CircleButtonWithTitle
        title={i18n.getString(muteTitle, currentLocale)}
        dataSign={muteTitle}
        icon={muteIcon}
        onClick={muteAction}
        className={clsx({
          [styles.button]: true,
          [styles.buttonDisabled]: disableLinks || disabledCtrl,
        })}
        disabled={disableLinks || disabledCtrl}
      />
      <CircleButtonWithTitle
        ref={transferRef}
        title={i18n.getString('transfer', currentLocale)}
        dataSign="transfer"
        icon={TransferIcon}
        onClick={onTransfer}
        className={clsx({
          [styles.button]: true,
          [styles.buttonActive]: isOnTransfer,
          [styles.buttonDisabled]: disableLinks || isInComingCall,
        })}
        disabled={disableLinks || isInComingCall}
      />
      <CircleButtonWithTitle
        title={i18n.getString(holdTitle, currentLocale)}
        dataSign={holdTitle}
        icon={HoldIcon}
        onClick={holdAction}
        className={clsx({
          [styles.button]: true,
          [styles.buttonActive]: isOnHold,
          [styles.buttonDisabled]:
            isInComingCall || disableLinks || isOutboundCallConnecting,
        })}
        disabled={disableLinks || isInComingCall || isOutboundCallConnecting}
      />
      <CircleButtonWithTitle
        title={i18n.getString(endTitle, currentLocale)}
        dataSign={endTitle}
        showBorder={false}
        icon={EndIcon}
        onClick={endAction}
        className={clsx({
          [styles.hangup]: true,
          [styles.button]: true,
          [styles.buttonDisabled]: disableLinks,
        })}
        disabled={disableLinks}
      />
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
  dialpadToggleTrack() {},
  clickForwardTrack() {},
  realOutboundCallStatus: '',
};
export default CallLogCallCtrlComponent;
