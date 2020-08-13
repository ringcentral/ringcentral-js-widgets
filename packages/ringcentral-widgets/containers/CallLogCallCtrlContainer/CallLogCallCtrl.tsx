import React, { FunctionComponent } from 'react';

import CallLogCallCtrlComponent from '../../components/CallLogCallCtrlComponent';

export type CurrentSession = {
  isOnMute: boolean;
  isOnHold: boolean;
  callStatus: string;
  direction: any;
  recordStatus: string;
};

export interface CallLogCallCtrlProps {
  isWebphone: boolean;
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
    isWebphone,
    sendDTMF,
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
      isWebphone={isWebphone}
      isCurrentDeviceCall={isCurrentDeviceCall}
      sendDTMF={async (dtmfValue) => sendDTMF(dtmfValue, telephonySessionId)}
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
};
