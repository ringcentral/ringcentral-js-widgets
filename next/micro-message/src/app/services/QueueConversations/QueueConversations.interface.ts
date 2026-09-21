import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';

import type { ConversationsOptions } from '../Conversations';
import type { MessageStoreOptions } from '../MessageStore';

export type QueueConversationFilter = 'All' | 'Unread' | 'Draft' | 'Failed';

export interface QueueConversationSearchForm {
  searchInput: string;
  filter: QueueConversationFilter;
  selectedCallQueueIds: string[];
}

export type QueueConversationSearchFormUpdate =
  | Partial<QueueConversationSearchForm>
  | 'reset';

export interface QueueMessageOwner {
  extensionId?: string;
  extensionType?: string;
  name?: string;
}

export type QueueMessage = Omit<Message, 'messageStatus'> & {
  messageStatus?: Message['messageStatus'] | 'Draft';
  owner?: QueueMessageOwner;
};

export interface QueueConversationsOptions extends ConversationsOptions {
  enable?: boolean;
}

export interface QueueMessageStoreOptions extends MessageStoreOptions {
  enable?: boolean;
}
