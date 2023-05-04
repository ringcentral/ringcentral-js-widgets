export interface MoreActionWithIncomingCallProps {
  disabled: boolean;
  enableReply?: boolean;
  isWebRTCNotification?: boolean;
  currentLocale: string;
  forwardingNumbers: object[];
  forward: (forwardNumber: string) => Promise<void>;
  ignore?: () => Promise<void>;
  reply?: () => Promise<void>;
  clickForwardTrack: () => any;
}
