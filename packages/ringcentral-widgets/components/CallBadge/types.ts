import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';

type SessionProps = {
  id: string;
  to: string;
  from: string;
  direction: string;
  startTime: number;
  isOnMute: boolean;
  isOnHold: boolean;
  isOnRecord: boolean;
  // @ts-expect-error TS(2749): 'sessionStatus' refers to a value, but is being us... Remove this comment to see the full error message
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
