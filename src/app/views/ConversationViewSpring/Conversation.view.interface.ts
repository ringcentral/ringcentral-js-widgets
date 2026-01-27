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
}
export interface ConversationViewSpringProps {}

export interface ConversationViewSpringPanelProps {
  conversation: FilteredConversation;
  messages: Message[];

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
  extensionId?: number;
  /**
   * thread metadata
   */
  threadMetadata?: ThreadMetaData;
  /**
   * additional end adornment element for MessageInput
   */
  endAdornment?: React.ReactNode;
}

export type ConversationViewSpringIParams = {
  conversationId?: string;
};
