import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { useContactRenderInfoFromConversation } from '@ringcentral-integration/micro-phone/src/app/hooks';
import type { HistoryAction } from '@ringcentral-integration/next-widgets/components/ActionMenuList/useHistoryActionButtons';
import type ConversationPanel from '@ringcentral-integration/widgets/components/ConversationPanel';
import type { AlertProps } from '@ringcentral/spring-ui';

import type {
  Attachment,
  FilteredConversation,
  ThreadInfoRecord,
  ThreadMetaData,
} from '../../services';
import type { UseConversationsActions } from '../ConversationsViewSpring/Conversations.view';

export interface ConversationViewSpringOptions {
  component?: typeof ConversationPanel;
  showLogPopover?: boolean;
  showAlert?: () => boolean;
  alertProps?: () => AlertProps;
  renderLogIndicator?: (message: Message) => React.ReactNode;
}
export interface ConversationViewSpringProps {}

export interface ConversationViewSpringPanelProps {
  conversation?: FilteredConversation;
  messages: Message[];
  /**
   * send message to the current conversation, with text and attachments as parameters
   */
  replyToReceivers: (text: any, attachments: any) => void;
  updateMessageText?: (text: string) => void;
  messageText?: string;
  acceptFileTypes?: string;
  sendButtonDisabled: boolean;
  goBack: () => void;
  onLinkClick?(url: string): void;
  attachments?: Attachment[];
  supportAttachment?: boolean;
  addAttachments?: (attachments: Attachment[]) => void;
  removeAttachment?: (attachment: Attachment) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  toolbar?: React.ReactNode;
  createNewEntityTooltip?: string;
  showAlert?: boolean;
  /**
   * alert props for the alert component when `showAlert` is `true`
   */
  alertProps?: AlertProps;
  showLogPopover?: boolean;
  /**
   * should show log status info
   *
   * @default false
   */
  displayLogStatus?: boolean;
  /**
   * optional render function for per-message log indicator
   * receives the message data and should return a ReactNode
   */
  renderLogIndicator?: (message: Message) => React.ReactNode;
  /**
   * Provide conversation item info and actions generator from ConversationsView.
   * It should compute actions for the current conversation with pageType "detail".
   */
  useConversationItemInfo: (
    conversation: FilteredConversation,
    options?: { pageType?: 'list' | 'detail' | 'voicemail' | 'fax' },
  ) => {
    info: ReturnType<typeof useContactRenderInfoFromConversation>;
    actions: HistoryAction[];
  };
  /**
   * Conversations actions executor from ConversationsViewSpring
   */
  useActionsHandler: UseConversationsActions;
  /**
   * thread info
   */
  threadInfo?: ThreadInfoRecord;
  /**
   * extension id of current user
   */
  extensionId?: string;
  /**
   * thread metadata
   */
  threadMetadata?: ThreadMetaData;
  /**
   * sending status for current conversation
   */
  sending?: boolean;
  /**
   * additional end adornment element for MessageInput
   */
  endAdornment?: React.ReactNode;
  /**
   * Shared inbox: show reminder to log messages before resolving (CRM integrations).
   */
  showSharedSmsLogReminder?: boolean;
  /**
   * Persist dismissal of the shared SMS log reminder banner.
   */
  onDismissSharedSmsLogReminder?: () => void;
}

export type ConversationViewSpringIParams = {
  conversationId?: string;
};
