import React, { FunctionComponent } from 'react';

import CallLogCallCtrlComponent from '../../components/CallLogCallCtrlComponent';

export type CurrentSession = {
  isOnMute: boolean;
  isOnHold: boolean;
  callStatus: string;
  direction: any;
};

export interface CallLogCallCtrlProps {
  currentLocale?: string;
  currentSession?: CurrentSession;
  telephonySessionId?: string;
  status?: string;
  mute: (telephonySessionId: string) => any;
  unmute: (telephonySessionId: string) => any;
  hangUp: (telephonySessionId: string) => any;
  reject: (telephonySessionId: string) => any;
  onHold: (telephonySessionId: string) => any;
  onUnHold: (telephonySessionId: string) => any;
  onTransfer: (telephonySessionId: string) => any;
  isWide?: boolean;
  disableLinks?: boolean;
  transferRef?: React.RefObject<HTMLSpanElement>;
  isOnTransfer?: boolean;
}

const CallLogCallCtrl: FunctionComponent<CallLogCallCtrlProps> = (props) => {
  const {
    currentLocale,
    telephonySessionId,
    disableLinks,
    isWide,
    currentSession,
    transferRef,
    isOnTransfer,
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
      isOnMute={currentSession.isOnMute}
      isOnHold={currentSession.isOnHold}
      callStatus={currentSession.callStatus}
      callDirection={currentSession.direction}
      currentLocale={currentLocale}
      disableLinks={disableLinks}
      isWide={isWide}
      transferRef={transferRef}
      isOnTransfer={isOnTransfer}
    />
  );
};

CallLogCallCtrl.defaultProps = {
  currentLocale: 'en-US',
  currentSession: undefined,
  telephonySessionId: '',
  status: '',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false,
};

export default CallLogCallCtrl;
