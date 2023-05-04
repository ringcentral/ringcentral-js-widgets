import { ComponentType } from 'react';

import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { ActiveCall } from '@ringcentral-integration/commons/interfaces/Presence.model';
import {
  NormalizedSession,
  WebphoneSession,
} from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { HistoryCall } from '@ringcentral-integration/commons/modules/CallHistory';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { CallLogger } from '@ringcentral-integration/commons/modules/CallLogger';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import {
  ComposeText,
  ToNumber,
} from '@ringcentral-integration/commons/modules/ComposeText';
import {
  ConferenceCall,
  Party,
  PartyState,
} from '@ringcentral-integration/commons/modules/ConferenceCall';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';

import {
  SwitchCallActiveCallParams,
  Webphone,
} from '@ringcentral-integration/commons/modules/Webphone';

import { OnCreateContactOptions } from '../CallsListUI';
import { ContactDetailsUI, RouteParams } from '../ContactDetailsUI';
import { ModalUI } from '../ModalUI';
import { ConfirmModalOptions } from '../ModalUI/ModalUI.interface';
import { RouterInteraction } from '../RouterInteraction';

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
  appFeatures: AppFeatures;
  connectivityMonitor: ConnectivityMonitor;
  modalUI?: ModalUI;
  webphone?: Webphone;
  callLogger?: CallLogger;
  composeText?: ComposeText;
  conferenceCall?: ConferenceCall;
  contactDetailsUI?: ContactDetailsUI;
  activeCallControl?: ActiveCallControl;
  accountInfo: AccountInfo;
  extensionInfo: ExtensionInfo;
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
  conferenceCallParties: (Party & PartyState)[] | null;
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
  renderContactName?: (call: Call) => string;
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
  isWide: boolean;
  allCalls: Call[];
}
