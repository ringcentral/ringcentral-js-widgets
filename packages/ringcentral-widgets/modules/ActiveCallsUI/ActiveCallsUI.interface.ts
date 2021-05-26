import { ComponentType } from 'react';
import { Brand } from 'ringcentral-integration/modules/BrandV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { CallMonitor } from 'ringcentral-integration/modules/CallMonitorV2';
import { RateLimiter } from 'ringcentral-integration/modules/RateLimiterV2';
import { ContactSearch } from 'ringcentral-integration/modules/ContactSearchV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { ContactMatcher } from 'ringcentral-integration/modules/ContactMatcherV2';
import { CallingSettings } from 'ringcentral-integration/modules/CallingSettingsV2';
import { ExtensionFeatures } from 'ringcentral-integration/modules/ExtensionFeatures';
import { ConnectivityMonitor } from 'ringcentral-integration/modules/ConnectivityMonitorV2';
import {
  SwitchCallActiveCallParams,
  Webphone,
} from 'ringcentral-integration/modules/WebphoneV2';
import { CallLogger } from 'ringcentral-integration/modules/CallLoggerV2';
import {
  ComposeText,
  ToNumber,
} from 'ringcentral-integration/modules/ComposeTextV2';
import {
  ConferenceCall,
  Party,
  PartyState,
} from 'ringcentral-integration/modules/ConferenceCallV2';
import {
  ActiveCallControl,
  ActiveSession,
} from 'ringcentral-integration/modules/ActiveCallControlV2';
import {
  NormalizedSession,
  WebphoneSession,
} from 'ringcentral-integration/interfaces/Webphone.interface';
import { Entity } from 'ringcentral-integration/interfaces/Entity.interface';
import { HistoryCall } from 'ringcentral-integration/modules/CallHistoryV2';
import { ActiveCall } from 'ringcentral-integration/interfaces/Presence.model';
import { Call } from 'ringcentral-integration/interfaces/Call.interface';
import RouterInteraction from '../RouterInteraction';
import { ModalUI } from '../ModalUIV2';
import { ContactDetailsUI, RouteParams } from '../ContactDetailsUI';
import { OnCreateContactOptions } from '../CallsListUI';
import { ConfirmModalOptions } from '../ModalUIV2/ModalUI.interface';

export interface Deps {
  brand: Brand;
  locale: Locale;
  callMonitor: CallMonitor;
  rateLimiter: RateLimiter;
  contactSearch: ContactSearch;
  regionSettings: RegionSettings;
  contactMatcher: ContactMatcher;
  callingSettings: CallingSettings;
  routerInteraction: RouterInteraction;
  extensionFeatures: ExtensionFeatures;
  connectivityMonitor: ConnectivityMonitor;
  modalUI?: ModalUI;
  webphone?: Webphone;
  callLogger?: CallLogger;
  composeText?: ComposeText;
  conferenceCall?: ConferenceCall;
  contactDetailsUI?: ContactDetailsUI;
  activeCallControl?: ActiveCallControl;
}

export interface ActiveCallsContainerProps {
  showContactDisplayPlaceholder?: boolean;
  showRingoutCallControl?: boolean;
  showSwitchCall?: boolean;
  showTransferCall?: boolean;
  showHoldOnOtherDevice?: boolean;
  useV2: boolean;
  useCallControl: boolean;
  composeTextRoute?: string;
  callCtrlRoute?: string;
  onCreateContact: (options: OnCreateContactOptions) => void | Promise<void>;
  onLogCall: (options: {
    call: HistoryCall | ActiveCall;
    contact: Entity;
    redirect?: boolean;
  }) => void;
  isLoggedContact: (...args: any) => boolean;
  onCallsEmpty: () => void;
  onViewContact: (options: { contact: RouteParams }) => void;
  showViewContact?: boolean;
  getAvatarUrl: (...args: any) => string;
}

// TODO: move to new ActiveCallsPanel component
export interface ActiveCallsPanelProps {
  currentLocale: string;
  className?: string;
  activeRingCalls: Call[];
  activeOnHoldCalls: Call[];
  activeCurrentCalls: Call[];
  otherDeviceCalls: Call[];
  areaCode: string;
  countryCode: string;
  brand: string;
  showContactDisplayPlaceholder: boolean;
  formatPhone: (phoneNumber: string) => void;
  onClickToSms?: (
    contact: ToNumber | { name: string; phoneNumber: string },
    isDummyContact?: boolean,
  ) => void;
  onCreateContact: (options: OnCreateContactOptions) => void | Promise<void>;
  outboundSmsPermission: boolean;
  internalSmsPermission: boolean;
  isLoggedContact: (...args: any) => boolean;
  onLogCall: (options: {
    call: HistoryCall | ActiveCall;
    contact: Entity;
    redirect?: boolean;
  }) => void;
  webphoneAnswer: (
    sessionId: string,
    telephonySessionId: string,
    isHoldAndAnswer?: boolean,
  ) => Promise<void>;
  webphoneReject: (sessionId: string) => Promise<void>;
  webphoneHangup: (
    sessionId: string,
    telephonySessionId: string,
  ) => Promise<void> | void;
  webphoneResume: (
    sessionId: string,
    telephonySessionId: string,
  ) => Promise<void> | void;
  webphoneToVoicemail: (
    sessionId: string,
    telephonySessionId: string,
  ) => Promise<void>;
  webphoneSwitchCall: (
    activeCall: SwitchCallActiveCallParams | ActiveSession,
  ) => Promise<WebphoneSession | void>;
  webphoneIgnore: (telephonySessionId: string) => Promise<void> | void;
  modalConfirm: (options: ConfirmModalOptions) => string;
  modalClose: (id: string) => boolean;
  autoLog: boolean;
  onViewContact: (options: { contact: RouteParams }) => void;
  enableContactFallback?: boolean;
  loggingMap?: any;
  onCallsEmpty: () => void;
  sourceIcons?: Record<string, ComponentType>;
  phoneTypeRenderer?: () => void;
  phoneSourceNameRenderer?: () => void;
  isWebRTC: boolean;
  showSpinner: boolean;
  isSessionAConferenceCall: (sessionId: string) => boolean;
  onCallItemClick: (call: Call) => void;
  getAvatarUrl: (...args: any) => string;
  conferenceCallParties: (Party & PartyState)[];
  webphoneHold: (
    sessionId: string,
    telephonySessionId: string,
  ) => Promise<any> | void;
  useV2: boolean;
  updateSessionMatchedContact: Webphone['updateSessionMatchedContact'];
  isOnHold: (Session: NormalizedSession) => boolean;
  // CallLog related
  currentLog?: { call: Call; logName: string };
  renderEditLogSection?: () => void;
  renderSaveLogButton?: () => void;
  renderExtraButton?: () => void;
  onSaveCallLog?: () => void;
  onUpdateCallLog?: () => void;
  onCloseLogSection?: () => void;
  // - Notification
  logNotification?: any;
  onCloseNotification?: () => void;
  onDiscardNotification?: () => void;
  onSaveNotification?: () => void;
  onExpandNotification?: () => void;
  showNotiLogButton?: boolean;
  notificationContainerStyles?: string;
  // Contact
  showAvatar?: boolean;
  renderContactName?: () => void;
  showOtherDevice?: boolean;
  ringoutHangup: (telephonySessionId: string) => Promise<void> | void;
  ringoutTransfer: (sessionId: string) => void;
  ringoutReject: (sessionId: string) => Promise<void> | void;
  disableLinks: boolean;
  showRingoutCallControl: boolean;
  showMultipleMatch?: boolean;
  showSwitchCall: boolean;
  showTransferCall: boolean;
  showHoldOnOtherDevice: boolean;
  onLogBasicInfoClick?: () => void;
  renderSmallCallContrl?: () => void;
  // customization
  showCallDetail?: boolean;
  showIgnoreBtn?: boolean;
  showHoldAnswerBtn?: boolean;
  useCallDetailV2?: boolean;
  newCallIcon?: boolean;
  useCallControl: boolean;
  clickSwitchTrack: () => void;
}
