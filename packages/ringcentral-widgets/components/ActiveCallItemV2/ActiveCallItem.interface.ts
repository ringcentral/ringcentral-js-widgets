import type {
  Session,
  WebPhoneSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';

import type { ConfirmModalOptions } from '../../modules/ModalUI/ModalUI.interface';

export interface ModalContentProps {
  contactName: string;
  confirmContext?: string;
}

export interface WebphoneButtonsProps {
  currentLocale: string;
  session?: WebPhoneSession;
  webphoneReject: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneHangup: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneResume: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneHold: (webphoneSessionId: string, telephonySessionId: string) => any;
  showMergeCall?: boolean;
  showHold?: boolean;
  disableMerge?: boolean;
  onMergeCall?: (webphoneSessionId: string, telephonySessionId: string) => any;
  webphoneAnswer: (
    webphoneSessionId: string,
    telephonySessionId: string,
    isHoldAndAnswer?: boolean,
  ) => any;
  disableLinks?: boolean;
  isOnHold: (session: object) => boolean;
  telephonySessionId: string;
  webphoneIgnore?: (telephonySessionId: string) => any;
  showIgnoreBtn?: boolean;
  showHoldAnswerBtn?: boolean;
  useCallDetailV2?: boolean;
  isConnecting?: boolean;
}

export interface ActiveCallControlButtonsProps {
  session?: object;
  currentLocale: string;
  disableLinks?: boolean;
  ringoutHangup: (telephonySessionId: string) => any;
  ringoutTransfer?: (telephonySessionId: string) => any;
  ringing: boolean;
  inbound: boolean;
  telephonySessionId: string;
  ringoutReject: (telephonySessionId: string) => any;
  showRingoutCallControl: boolean;
  showSwitchCall: boolean;
  showTransferCall: boolean;
  showHoldOnOtherDevice: boolean;
  onClickSwitchBtn?: () => any;
  webphoneResume?: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneHold?: (webphoneSessionId: string, telephonySessionId: string) => any;
  isConnecting?: boolean;
  clickSwitchTrack?: () => any;
  isWide?: boolean;
}

export interface Call {
  direction: 'Inbound' | 'Outbound';
  telephonyStatus?: string;
  startTime: number;
  offset?: number;
  activityMatches: [];
  fromMatches: any[];
  toMatches: any[];
  from: {
    phoneNumber?: string;
    extensionNumber?: string;
    name?: string;
  };
  to?: {
    phoneNumber?: string;
    extensionNumber?: string;
    name?: string;
  };
  webphoneSession?: WebPhoneSession;
  telephonySessionId?: string;
  telephonySession?: Session;
}

export interface ActiveCallItemProps {
  call: Call;
  areaCode: string;
  countryCode: string;
  currentLocale: string;
  disableLinks?: boolean;
  isLogging?: boolean;
  webphoneReject: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneHangup: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneResume: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneToVoicemail: (
    webphoneSessionId: string,
    telephonySessionId: string,
  ) => any;
  webphoneHold: (webphoneSessionId: string, telephonySessionId: string) => any;
  enableContactFallback?: boolean;
  brand?: string;
  showContactDisplayPlaceholder?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  renderContactName?: (call: Call) => string;
  renderSubContactName?: (call: Call) => string;
  renderExtraButton?: (call: Call) => any;
  contactDisplayStyle?: string;
  isOnConferenceCall?: boolean;
  conferenceCallParties: any[];
  onClick?: (...args: any[]) => any;
  showAvatar?: boolean;
  getAvatarUrl?: (...args: any[]) => any;
  showMergeCall?: boolean;
  showHold?: boolean;
  disableMerge?: boolean;
  onMergeCall?: (webphoneSessionId: string, telephonySessionId: string) => any;
  showCallDetail?: boolean;
  updateSessionMatchedContact?: (...args: any[]) => any;
  webphoneAnswer: (
    webphoneSessionId: string,
    telephonySessionId: string,
    isHoldAndAnswer?: boolean,
  ) => any;
  ringoutHangup: (telephonySessionId: string) => any;
  ringoutTransfer: (telephonySessionId: string) => any;
  showRingoutCallControl?: boolean;
  ringoutReject: (telephonySessionId: string) => any;
  showMultipleMatch?: boolean;
  showSwitchCall?: boolean;
  showTransferCall?: boolean;
  showHoldOnOtherDevice?: boolean;
  isOnHold?: (session: object) => boolean;
  webphoneSwitchCall: (call: Call) => any;
  webphoneIgnore: (telephonySessionId: string) => any;
  modalConfirm: (props: ConfirmModalOptions, usePromise?: true) => any;
  modalClose: (id: string) => any;
  // new Juno call direction icon
  newCallIcon: boolean;
  showHoldAnswerBtn?: boolean;
  useCallDetailV2?: boolean;
  showIgnoreBtn?: boolean;
  clickSwitchTrack?: () => any;
  isWide?: boolean;
  formatPhone?: (phoneNumber: string) => string;
  warmTransferRole?: string;
  onSwitchCall?: (call: Call) => void;
}

export interface ActiveCallItemState {
  selected: number;
  isLogging: boolean;
  avatarUrl: string;
  extraNum: number;
}
