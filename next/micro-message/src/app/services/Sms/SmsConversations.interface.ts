import type { MessageTypes } from '@ringcentral-integration/commons/enums/messageTypes';

import type { ToNumber } from '../ComposeText/ComposeText.interface';
import type { ConversationsOptions as BaseOptions } from '../Conversations/Conversations.interface';

export interface SmsConversationsOptions extends BaseOptions {
  enableModifyLog?: boolean;
  checkDncStatusOfConversation?: (conversationId: string) => Promise<void>;
  autoLogTaskIfEnabled?: (conversationId: string) => Promise<void>;
  /**
   * Entity types to consider for DNC verification when building toNumbers from conversation.
   * E.g. ['Contact', 'Lead', 'PersonAccount'] for Salesforce.
   */
  dncEntityTypes?: string[];
  /**
   * DNC verification before sending a reply. Receives toNumbers computed from conversation.
   * Returns true if send should proceed, false if blocked.
   */
  onDncVerifyBeforeReply?: (
    toNumbers: ToNumber[],
    conversationId?: string,
  ) => Promise<boolean>;
  /**
   * The message types that support CRM log
   *
   * @default [messageTypes.sms, messageTypes.pager]
   */
  supportCRMLogMessageTypes?: MessageTypes[];
}
