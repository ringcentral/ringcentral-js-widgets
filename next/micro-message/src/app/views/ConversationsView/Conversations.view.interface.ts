import type { MessageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { FormatDateTimeOptions } from '@ringcentral-integration/micro-core/src/app/services';
import type { ConversationsPanel } from '@ringcentral-integration/widgets/components/ConversationsPanel';
import type { ReactNode } from 'react';

import type { CurrentConversation, FilteredConversation } from '../../services';

export interface ConversationsViewOptions {
  component?: typeof ConversationsPanel;
}

export interface OnCreateContactOptions {
  phoneNumber: string;
  name: string;
  entityType: string;
}

interface OnLogConversationOptions {
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

export interface ConversationsViewProps {
  // TODO: fix type
  sourceIcons?: any;
  showContactDisplayPlaceholder?: boolean;
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
  previewFaxMessages?: (uri: string) => void;
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
  typeFilter: MessageTypes;
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
  dateTimeFormatter: (
    options: Partial<FormatDateTimeOptions>,
  ) => string | undefined | null;
  onViewContact?: (options: OnViewContactOptions) => void;
  onCreateContact?: (options: OnCreateContactOptions) => void | Promise<void>;
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
  updateTypeFilter: (type: MessageTypes) => Promise<void>;
  deleteMessage: (conversationId: string) => void;
  previewFaxMessages: (uri: string, conversationId: string) => void;
  loadNextPage(): Promise<void> | void;
  onUnmount: () => void;
  renderExtraButton?(
    conversation: CurrentConversation,
    options: RenderExtraButtonOptions,
  ): React.ReactElement;
  onFaxDownload?: (options: OnFaxDownloadOptions) => void;
  onSelectContact?: (options: {
    correspondentEntity: Entity;
    conversation: CurrentConversation;
  }) => Promise<void> | void;
  contactPlaceholder?: string;
  dropdownClassName?: string;
  isWide?: boolean;
  renderContactList?: (entity: { name: string; labelType: string }) => any;
  enableCDC: boolean;
  maxExtensionNumberLength: number;
  renderContactName?(options: {
    conversation: CurrentConversation;
    phoneNumber: string;
    unread: boolean;
    defaultContactDisplay: JSX.Element;
  }): ReactNode;
  externalHasEntity?: (conversation: FilteredConversation) => boolean;
  externalViewEntity?: (conversation: FilteredConversation) => void;
  renderActionMenuExtraButton?: (conversation: Message) => ReactNode;
  formatPhone: (phoneNumber: string) => string | null | undefined;
}
