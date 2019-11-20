import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';

type SessionProps = {
  id: string;
  to: string;
  from: string;
  direction: string;
  startTime: number;
  isOnMute: boolean;
  isOnHold: boolean;
  isOnRecord: boolean;
  callStatus: sessionStatus;
};

type CallBadgeProps = {
  updatePositionOffset: (x: number, y: number) => void;
  toggleMinimized: (sessionId: string) => any;
  goToCallCtrl: (sessionId: string) => void;
  defaultOffsetX?: number;
  defaultOffsetY?: number;
  currentLocale: string;
  hidden: boolean;
  session: SessionProps;
};

type CallBadgeState = {
  badgeOffsetX: number;
  badgeOffsetY: number;
};

export { CallBadgeProps, CallBadgeState };
