import React, { FunctionComponent } from 'react';

import CallLogCallCtrlComponent from '../../components/CallLogCallCtrlComponent';

export type CurrentSession = {
  isOnMute: boolean;
  isOnHold: boolean;
  callStatus: string;
  direction: any;
  recordStatus: string;
  sessionId: string;
};

export interface CallLogCallCtrlProps {
  currentLocale?: string;
  currentSession?: CurrentSession;
  telephonySessionId?: string;
  isWide?: boolean;
  isCurrentDeviceCall?: boolean;
  disableLinks?: boolean;
  transferRef?: React.RefObject<HTMLSpanElement>;
  isOnTransfer?: boolean;
  mute: (telephonySessionId: string) => any;
  unmute: (telephonySessionId: string) => any;
  hangUp: (telephonySessionId: string) => any;
  reject: (telephonySessionId: string) => any;
  onHold: (telephonySessionId: string) => any;
  onUnHold: (telephonySessionId: string) => any;
  onTransfer: (telephonySessionId: string) => any;
  startRecord: (telephonySessionId: string) => any;
  stopRecord: (telephonySessionId: string) => any;
  sendDTMF: (dtmfValue: string, telephonySessionId: string) => void;
  forward: (phoneNumber: string, telephonySessionId: string) => any;
  answer: (telephonySessionId: string) => any;
  forwardingNumbers: [];
  ignore: (telephonySessionId: string) => void;
  answerAndHold: (telephonySessionId: string) => void;
  answerAndEnd: (telephonySessionId: string) => void;
  otherActiveCalls: boolean;
  dialpadToggleTrack: (open: boolean) => void;
  clickForwardTrack: () => void;
  realOutboundCallStatus?: string;
}

export const CallLogCallCtrl: FunctionComponent<CallLogCallCtrlProps> = (
  props,
) => {
  const {
    currentLocale,
    telephonySessionId,
    disableLinks,
    isWide,
    currentSession,
    transferRef,
    isOnTransfer,
    isCurrentDeviceCall,
    sendDTMF,
    forward,
    answer,
    ignore,
    forwardingNumbers,
    otherActiveCalls,
    answerAndHold,
    answerAndEnd,
    realOutboundCallStatus,
    dialpadToggleTrack,
    clickForwardTrack,
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
    />
  );
};

CallLogCallCtrl.defaultProps = {
  currentLocale: 'en-US',
  currentSession: undefined,
  telephonySessionId: '',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false,
  realOutboundCallStatus: '',
};
