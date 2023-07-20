import type { FunctionComponent } from 'react';
import React from 'react';

import CallLogCallCtrlComponent from '../CallLogCallCtrlComponent';
import type { CallLogCallCtrlPanelProps } from './CallLogCallCtrlPanel.interface';

export type CurrentSession = {
  isOnMute: boolean;
  isOnHold: boolean;
  callStatus: string;
  direction: any;
  recordStatus: string;
  sessionId: string;
};

const CallLogCallCtrlPanel: FunctionComponent<CallLogCallCtrlPanelProps> = (
  props,
) => {
  const {
    currentLocale,
    telephonySessionId,
    disableLinks,
    isWide,
    enableReply = false,
    currentSession,
    transferRef,
    isOnTransfer,
    isCurrentDeviceCall,
    sendDTMF,
    forward,
    reply,
    answer,
    ignore,
    forwardingNumbers,
    otherActiveCalls,
    answerAndHold,
    answerAndEnd,
    realOutboundCallStatus,
    dialpadToggleTrack,
    clickForwardTrack,
    warmTransferActiveTelephonySessionId,
    allowPickupCall,
  } = props;

  if (!currentSession) {
    return null;
  }

  return (
    <CallLogCallCtrlComponent
      onMute={async () => props.mute(telephonySessionId)}
      onUnmute={async () => props.unmute(telephonySessionId)}
      onHangup={async () => props.hangUp(telephonySessionId)}
      onReject={async () => props.reject(telephonySessionId)}
      onTransfer={() => props.onTransfer(telephonySessionId)}
      onCompleteWarmTransfer={() =>
        props.onCompleteWarmTransfer(telephonySessionId)
      }
      onHold={async () => props.onHold(telephonySessionId)}
      onUnHold={async () => props.onUnHold(telephonySessionId)}
      startRecord={async () => props.startRecord(telephonySessionId)}
      stopRecord={async () => props.stopRecord(telephonySessionId)}
      isOnMute={currentSession.isOnMute}
      isOnHold={currentSession.isOnHold}
      callStatus={currentSession.callStatus}
      callDirection={currentSession.direction}
      recordStatus={currentSession.recordStatus}
      currentLocale={currentLocale}
      disableLinks={disableLinks}
      isWide={isWide}
      transferRef={transferRef}
      isOnTransfer={isOnTransfer}
      isCurrentDeviceCall={isCurrentDeviceCall}
      sendDTMF={async (dtmfValue) => sendDTMF(dtmfValue, telephonySessionId)}
      forward={async (phoneNumber) => forward(phoneNumber, telephonySessionId)}
      answer={async () => answer(telephonySessionId)}
      forwardingNumbers={forwardingNumbers}
      ignore={async () => ignore(telephonySessionId)}
      reply={async () => reply(telephonySessionId)}
      otherActiveCalls={otherActiveCalls}
      answerAndHold={async () => {
        await answerAndHold(telephonySessionId);
      }}
      answerAndEnd={async () => {
        await answerAndEnd(telephonySessionId);
      }}
      realOutboundCallStatus={realOutboundCallStatus}
      dialpadToggleTrack={dialpadToggleTrack}
      clickForwardTrack={clickForwardTrack}
      warmTransferActiveTelephonySessionId={
        warmTransferActiveTelephonySessionId
      }
      enableReply={enableReply}
      allowPickupCall={allowPickupCall}
    />
  );
};

CallLogCallCtrlPanel.defaultProps = {
  currentLocale: 'en-US',
  currentSession: undefined,
  telephonySessionId: '',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false,
  realOutboundCallStatus: '',
  enableReply: false,
};

export { CallLogCallCtrlPanel };
