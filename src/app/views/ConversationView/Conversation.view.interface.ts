import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { Correspondent } from '@ringcentral-integration/commons/lib/messageHelper';
import type { FormatDateTimeOptions } from '@ringcentral-integration/micro-core/src/app/services';
import type ConversationPanel from '@ringcentral-integration/widgets/components/ConversationPanel';
import type { ReactNode } from 'react';
import type GetMessageInfoResponse from 'ringcentral-client/build/definitions/GetMessageInfoResponse';

import type {
  Attachment,
  ConversationMatch,
  CurrentConversation,
  FormattedConversation,
} from '../../services';

export interface ConversationViewOptions {
  component?: typeof ConversationPanel;
  showLogPopover?: boolean;
}

interface OnLogConversationOptions {
  conversationId: string;
  correspondentEntity: Entity;
  redirect: boolean;
}
export interface OnSelectContactOptions {
  correspondentEntity: Entity;
  conversation: CurrentConversation;
}

interface RenderExtraButtonOptions {
  logConversation: (options: {
    redirect?: boolean;
    selected: number;
    prefill?: boolean;
  }) => Promise<void> | void;
  isLogging: boolean;
}

export interface ConversationViewProps {
  // TODO: after spring-ui done fix the type
  sourceIcons?: any;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  showContactDisplayPlaceholder?: boolean;
  enableContactFallback?: boolean;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  showGroupNumberName?: boolean;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  supportAttachment?: boolean;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  supportEmoji?: boolean;
  perPage?: number;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  inputExpandable?: boolean;
  dateTimeFormatter?: (
    options: Partial<FormatDateTimeOptions>,
  ) => string | null;
  /**
   * @deprecated should use ui to inject the event instead
   *
   * should use `ConversationLoggerOptions` `logFunction` instead
   */
  onLogConversation?: (options: OnLogConversationOptions) => Promise<void>;
  conversationsPath?: string;
  renderExtraButton?(
    conversation: CurrentConversation,
    options: RenderExtraButtonOptions,
  ): React.ReactElement;
  /**
   * @deprecated should use ui to inject the event instead
   *
   * should use `ConversationLoggerOptions` `logFunction` instead
   */
  onSelectContact?(options: OnSelectContactOptions): Promise<void> | void;
}

// TODO: remove to ConversationPanel folder with TypeScript
export interface ConversationPanelProps {
  brand: string;
  enableContactFallback: boolean;
  showGroupNumberName: boolean;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  showContactDisplayPlaceholder?: boolean;
  supportAttachment: boolean;
  supportEmoji?: boolean;
  currentLocale: string;
  conversationId?: string;
  sendButtonDisabled: boolean;
  areaCode: string;
  countryCode: string;
  showSpinner: boolean;
  recipients: Correspondent[];
  messages: Message[];
  messageText?: string;
  attachments?: Attachment[];
  conversation: CurrentConversation;
  disableLinks: boolean;
  autoLog: boolean;
  perPage: number;
  loadingNextPage: boolean;
  inputExpandable: boolean;
  shouldLogSelectRecord?: boolean;
  disableAutoSelect?: boolean;
  contactPlaceholder?: string;
  dropdownClassName?: string;
  acceptFileTypes: string;
  replyToReceivers: (
    text: string,
    attachments?: Attachment[],
  ) => Promise<GetMessageInfoResponse | null>;
  unloadConversation: () => Promise<void>;
  loadConversation: (id: string) => Promise<void>;
  updateMessageText: (text: string) => Promise<boolean>;
  addAttachments: (attachments: Attachment[]) => Promise<void>;
  removeAttachment: (attachment: Attachment) => Promise<void>;
  dateTimeFormatter: (options: Partial<FormatDateTimeOptions>) => string | null;
  formatPhone: (phoneNumber: string) => string;
  getMatcherContactName: (phoneNumber: string) => string | null;
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
  isMultipleSiteEnabled: boolean;
  currentSiteCode?: string;
  maxExtensionNumberLength: number;
  renderConversationTitle?(options: {
    conversation: CurrentConversation;
    phoneNumber: string;
    defaultContactDisplay: JSX.Element;
  }): ReactNode;
  onLinkClick?(url: string): void;
}

export type IParams = {
  conversationId?: string;
};
