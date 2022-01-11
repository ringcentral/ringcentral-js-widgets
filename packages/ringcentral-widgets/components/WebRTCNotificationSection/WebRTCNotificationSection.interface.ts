export interface WebRTCNotificationProps {
  formatPhone: (...args: any[]) => any;
  currentLocale: string;
  call: Call;
  logName: string;
  onCloseNotification: (...args: any[]) => any;
  currentNotificationIdentify: string;
  isWide: boolean;
  onIgnore: (telephonySession: string) => any;
  onForward: (phoneNumber: string, telephonySession: string) => any;
  endAndAnswer: (telephonySession: string) => any;
  holdAndAnswer: (telephonySession: string) => any;
  toVoicemail: (telephonySession: string) => any;
  forwardingNumbers: any[];
  hasActiveSession: boolean;
  answer: (telephonySession: string) => any;
  clickForwardTrack?: () => any;
}

export interface Call {
  direction?: string;
  result?: string;
  to?: PhoneInfo;
  from: PhoneInfo;
  telephonySessionId: any;
}

export interface PhoneInfo {
  phoneNumber: string;
  extensionNumber?: string;
}

export interface ForwardListProps {
  phoneNumber: string;
  extensionNumber?: string;
}
