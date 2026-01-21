import type { MessageTypes } from '@ringcentral-integration/commons/enums/messageTypes';

import type { ConversationsOptions as BaseOptions } from '../Conversations/Conversations.interface';

export interface SmsConversationsOptions extends BaseOptions {
  enableModifyLog?: boolean;
  checkDncStatusOfConversation?: (conversationId: string) => Promise<void>;
  autoLogTaskIfEnabled?: (conversationId: string) => Promise<void>;
  /**
   * The message types that support CRM log
   *
   * @default [messageTypes.sms, messageTypes.pager]
   */
  supportCRMLogMessageTypes?: MessageTypes[];
}
