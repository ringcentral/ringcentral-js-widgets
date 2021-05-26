import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import messageTypes from 'ringcentral-integration/enums/messageTypes';
import { Entity } from 'ringcentral-integration/interfaces/Entity.interface';
import { Brand } from 'ringcentral-integration/modules/BrandV2';
import { Call } from 'ringcentral-integration/modules/CallV2';
import { ComposeText } from 'ringcentral-integration/modules/ComposeTextV2';
import { ConnectivityMonitor } from 'ringcentral-integration/modules/ConnectivityMonitorV2';
import { ContactMatcher } from 'ringcentral-integration/modules/ContactMatcherV2';
import { ContactSearch } from 'ringcentral-integration/modules/ContactSearchV2';
import { ConversationLogger } from 'ringcentral-integration/modules/ConversationLoggerV2';
import {
  Conversations,
  CurrentConversation,
  FilteredConversation,
} from 'ringcentral-integration/modules/ConversationsV2';
import {
  DateTimeFormat,
  FormatDateTimeOptions,
} from 'ringcentral-integration/modules/DateTimeFormatV2';
import { ExtensionFeatures } from 'ringcentral-integration/modules/ExtensionFeatures';
import { ExtensionInfo } from 'ringcentral-integration/modules/ExtensionInfoV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { MessageStore } from 'ringcentral-integration/modules/MessageStoreV2';
import { RateLimiter } from 'ringcentral-integration/modules/RateLimiterV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { ContactDetailsUI } from '../ContactDetailsUI';
import { RouterInteraction } from '../RouterInteraction';

export interface ConversationsUIOptions {
  //
}

export interface Deps {
  brand: Brand;
  locale: Locale;
  conversations: Conversations;
  contactMatcher: ContactMatcher;
  dateTimeFormat: DateTimeFormat;
  regionSettings: RegionSettings;
  extensionFeatures: ExtensionFeatures;
  call: Call;
  conversationLogger: ConversationLogger;
  connectivityMonitor: ConnectivityMonitor;
  rateLimiter: RateLimiter;
  messageStore: MessageStore;
  // TODO: fix type in `../ConnectivityManager`
  connectivityManager: any;
  extensionInfo: ExtensionInfo;
  // TODO: fix type in `../DialerUI`
  dialerUI: any;
  routerInteraction: RouterInteraction;
  contactDetailsUI?: ContactDetailsUI;
  composeText: ComposeText;
  contactSearch: ContactSearch;
  conversationsUIOptions?: ConversationsUIOptions;
}

export interface OnCreateContactOptions {
  phoneNumber: string;
  name: string;
  entityType: string;
}

export interface OnLogConversationOptions {
  conversationId: string;
  correspondentEntity: Entity;
  redirect: boolean;
}

export interface OnViewContactOptions {
  contact: { id: string; type: string };
  contactMatches: Entity[];
  phoneNumber?: string;
  matchEntitiesIds?: string[];
}

export interface ConversationsContainerProps {
  showTitle?: boolean;
  enableContactFallback?: boolean;
  showGroupNumberName?: boolean;
  showViewContact?: boolean;
  dateTimeFormatter?(options: Partial<FormatDateTimeOptions>): string;
  dialerRoute?: string;
  onCreateContact?(options: OnCreateContactOptions): Promise<void> | void;
  onLogConversation?(options: OnLogConversationOptions): Promise<void>;
  onViewContact?(options: OnViewContactOptions): void;
  conversationDetailRoute?: string;
  composeTextRoute?: string;
  previewFaxMessages(uri: string): void;
  onFaxDownload?(options: { uri: string }): void;
  renderExtraButton?(
    conversation: CurrentConversation,
    options: RenderExtraButtonOptions,
  ): React.ReactElement;
}

export type OnClickToDialOptions = Entity & {
  phoneNumber: string;
  fromType: string;
};

export type OnClickToSmsOptions = Entity & {
  phoneNumber: string;
};

export interface OnFaxDownloadOptions {
  uri: string;
}

export interface RenderExtraButtonOptions {
  logConversation: (options: {
    redirect?: boolean;
    selected: number;
    prefill?: boolean;
  }) => Promise<void> | void;
  isLogging: boolean;
}

// TODO: remove to ConversationsPanel folder with TypeScript
export interface ConversationsPanelProps {
  showTitle: boolean;
  enableContactFallback: boolean;
  showGroupNumberName: boolean;
  brand: string;
  currentLocale: string;
  currentSiteCode: string;
  isMultipleSiteEnabled: boolean;
  conversations: FilteredConversation[];
  areaCode: string;
  countryCode: string;
  disableLinks: boolean;
  disableCallButton: boolean;
  disableClickToDial: boolean;
  outboundSmsPermission: boolean;
  internalSmsPermission: boolean;
  composeTextPermission: boolean;
  loggingMap: Record<string, boolean>;
  showSpinner: boolean;
  searchInput: string;
  autoLog: boolean;
  typeFilter: ObjectMapValue<typeof messageTypes>;
  textUnreadCounts: number;
  voiceUnreadCounts: number;
  faxUnreadCounts: number;
  readTextPermission: boolean;
  readVoicemailPermission: boolean;
  readFaxPermission: boolean;
  loadingNextPage: boolean;
  showChooseEntityModal?: boolean;
  shouldLogSelectRecord?: boolean;
  createEntityTypes?: string[];
  dateTimeFormatter: (options: Partial<FormatDateTimeOptions>) => string;
  onViewContact: (options: OnViewContactOptions) => void;
  onCreateContact: (options: OnCreateContactOptions) => void | Promise<void>;
  onClickToDial?: (options: OnClickToDialOptions) => void;
  onClickToSms?: (
    contact: OnClickToSmsOptions,
    isDummyContact?: boolean,
  ) => void;
  onLogConversation: (options: OnLogConversationOptions) => Promise<void>;
  onSearchInputChange: (options: React.ChangeEvent<HTMLInputElement>) => void;
  showConversationDetail: (conversationId: string) => void;
  readMessage: (conversationId: string) => void;
  markMessage: (conversationId: string) => void;
  unmarkMessage: (conversationId: string) => void;
  goToComposeText: () => Promise<void> | void;
  updateTypeFilter: (
    type: ObjectMapValue<typeof messageTypes>,
  ) => Promise<void>;
  deleteMessage: (conversationId: string) => void;
  previewFaxMessages: (uri: string, conversationId: string) => void;
  loadNextPage(): Promise<void> | void;
  onUnmount: () => void;
  renderExtraButton?(
    conversation: CurrentConversation,
    options: RenderExtraButtonOptions,
  ): React.ReactElement;
  onFaxDownload: (options: OnFaxDownloadOptions) => void;
  onSelectContact?: (options: {
    correspondentEntity: Entity;
    conversation: CurrentConversation;
  }) => Promise<void> | void;
  contactPlaceholder?: string;
}
