import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { Correspondent } from '@ringcentral-integration/commons/lib/messageHelper';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures/AppFeatures';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import type { ConversationLogger } from '@ringcentral-integration/commons/modules/ConversationLogger';
import type {
  Conversations,
  CurrentConversation,
} from '@ringcentral-integration/commons/modules/Conversations';
import type {
  DateTimeFormat,
  FormatDateTimeOptions,
} from '@ringcentral-integration/commons/modules/DateTimeFormat';
import type { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Attachment } from '@ringcentral-integration/commons/modules/MessageSender';
import type { MessageStore } from '@ringcentral-integration/commons/modules/MessageStore';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { ReactNode } from 'react';
import type GetMessageInfoResponse from 'ringcentral-client/build/definitions/GetMessageInfoResponse';

import type { RouterInteraction } from '../RouterInteraction';

export interface ConversationUIOptions {
  //
}

export interface Deps {
  appFeatures: AppFeatures;
  brand: Brand;
  locale: Locale;
  conversationLogger: ConversationLogger;
  dateTimeFormat: DateTimeFormat;
  regionSettings: RegionSettings;
  conversations: Conversations;
  rateLimiter: RateLimiter;
  connectivityMonitor: ConnectivityMonitor;
  messageStore: MessageStore;
  routerInteraction: RouterInteraction;
  accountInfo: AccountInfo;
  contactMatcher?: ContactMatcher;
  conversationUIOptions?: ConversationUIOptions;
  extensionInfo?: ExtensionInfo;
}

export interface OnLogConversationOptions {
  conversationId: string;
  correspondentEntity: Entity;
  redirect: boolean;
}
export interface OnSelectContactOptions {
  correspondentEntity: Entity;
  conversation: CurrentConversation;
}

export interface RenderExtraButtonOptions {
  logConversation: (options: {
    redirect?: boolean;
    selected: number;
    prefill?: boolean;
  }) => Promise<void> | void;
  isLogging: boolean;
}

export interface ConversationContainerProps {
  params: {
    conversationId: string;
  };
  enableContactFallback?: boolean;
  showGroupNumberName?: boolean;
  supportAttachment?: boolean;
  perPage?: number;
  inputExpandable?: boolean;
  dateTimeFormatter?(options: Partial<FormatDateTimeOptions>): string;
  onLogConversation?(options: OnLogConversationOptions): Promise<void>;
  conversationsPath?: string;
  renderExtraButton?(
    conversation: CurrentConversation,
    options: RenderExtraButtonOptions,
  ): React.ReactElement;
}

// TODO: remove to ConversationPanel folder with TypeScript
export interface ConversationPanelProps {
  brand: string;
  enableContactFallback: boolean;
  showGroupNumberName: boolean;
  supportAttachment: boolean;
  currentLocale: string;
  conversationId: string;
  sendButtonDisabled: boolean;
  areaCode: string;
  countryCode: string;
  showSpinner: boolean;
  recipients: Correspondent[];
  messages: Message[];
  messageText: string;
  attachments: Attachment[];
  conversation: CurrentConversation;
  disableLinks: boolean;
  autoLog: boolean;
  perPage: number;
  loadingNextPage: boolean;
  inputExpandable: boolean;
  shouldLogSelectRecord?: boolean;
  contactPlaceholder?: string;
  dropdownClassName?: string;
  isWide?: boolean;
  replyToReceivers: (
    text: string,
    attachments?: Attachment[],
  ) => Promise<GetMessageInfoResponse>;
  unloadConversation: () => Promise<void>;
  loadConversation: (id: string) => Promise<void>;
  updateMessageText: (text: string) => Promise<boolean>;
  addAttachment: (attachment: Attachment) => Promise<void>;
  removeAttachment: (attachment: Attachment) => Promise<void>;
  dateTimeFormatter: (options: Partial<FormatDateTimeOptions>) => string;
  formatPhone: (phoneNumber: string) => string;
  getMatcherContactName: (phoneNumber: string) => string;
  getMatcherContactList: (phoneNumber: string) => string[];
  getMatcherContactNameList: (phoneNumber: string) => string[];
  onLogConversation: (options: OnLogConversationOptions) => Promise<void>;
  goBack(): void;
  readMessages(id: string): void;
  loadPreviousMessages(): void;
  renderExtraButton?(
    conversation: CurrentConversation,
    options: RenderExtraButtonOptions,
  ): React.ReactElement;
  onSelectContact?(options: OnSelectContactOptions): Promise<void> | void;
  restrictSendMessage?(...args: any): boolean;
  renderContactList?: (entity: { name: string; labelType: string }) => any;
  renderLogInfoSection?: (...args: any) => any;
  enableCDC: boolean;
  maxExtensionNumberLength: number;
  renderConversationTitle?(options: {
    conversation: CurrentConversation;
    phoneNumber: string;
    defaultContactDisplay: JSX.Element;
  }): ReactNode;
}
