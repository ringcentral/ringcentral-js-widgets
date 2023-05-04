import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { Call } from '@ringcentral-integration/commons/modules/Call';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeText';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { ConversationLogger } from '@ringcentral-integration/commons/modules/ConversationLogger';
import {
  Conversations,
  CurrentConversation,
  FilteredConversation,
} from '@ringcentral-integration/commons/modules/Conversations';
import {
  DateTimeFormat,
  FormatDateTimeOptions,
} from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { MessageStore } from '@ringcentral-integration/commons/modules/MessageStore';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';

import { ReactNode } from 'react';
import { ContactDetailsUI } from '../ContactDetailsUI';
import { RouterInteraction } from '../RouterInteraction';

export interface ConversationsUIOptions {
  //
}

export interface Deps {
  appFeatures: AppFeatures;
  brand: Brand;
  locale: Locale;
  conversations: Conversations;
  contactMatcher: ContactMatcher;
  dateTimeFormat: DateTimeFormat;
  regionSettings: RegionSettings;
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
  accountInfo: AccountInfo;
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
  renderContactName?: (options: {
    conversation: CurrentConversation;
    phoneNumber: string;
    unread: boolean;
    defaultContactDisplay: JSX.Element;
  }) => ReactNode;
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
  dropdownClassName?: string;
  renderContactList?: (entity: { name: string; labelType: string }) => any;
  enableCDC: boolean;
  maxExtensionNumberLength: number;
  renderContactName?(options: {
    conversation: CurrentConversation;
    phoneNumber: string;
    unread: boolean;
    defaultContactDisplay: JSX.Element;
  }): ReactNode;
  externalHasEntity: (conversation: FilteredConversation) => boolean;
  externalViewEntity: (conversation: FilteredConversation) => void;
  renderActionMenuExtraButton?: (conversation: Message) => ReactNode;
}
