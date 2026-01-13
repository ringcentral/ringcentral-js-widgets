export interface MoreActionWithIncomingCallProps {
  disabled: boolean;
  enableReply?: boolean;
  isWebRTCNotification?: boolean;
  currentLocale: string;
  forwardingNumbers: { phoneNumber: string; label: string }[];
  forward: (forwardNumber: string) => Promise<void>;
  ignore?: () => Promise<void>;
  reply?: () => Promise<void>;
  clickForwardTrack: () => any;
  disableIgnore?: boolean;
  enabledForward?: boolean;
}
