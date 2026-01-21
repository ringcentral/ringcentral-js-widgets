import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type {
  Message,
  MessageStoreModel,
} from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { DataSourceBaseProps } from '@ringcentral-integration/micro-auth/src/app/services';

export type MessageType = NonNullable<GetMessageInfoResponse['type']>;
export interface MessageStoreOptions extends DataSourceBaseProps {
  daySpan?: number;
  /**
   * Set to false to ignore dayFrom params to fetch messages
   */
  limitDateFrom?: boolean;
  conversationsLoadLength?: number;
  conversationLoadLength?: number;
  messageType?: MessageType[];
  messageStoreKey?: string;
  messagesFilter?: (...args: any) => any;
}

export type MessageHandler = (record: Message) => any;

export type DispatchedMessageIds = {
  id: number;
  lastModifiedTime: string;
}[];

export interface ProcessRawConversationListOptions {
  records: GetMessageInfoResponse[];
  conversationStore: MessageStoreModel['conversationStore'];
  isFSyncSuccess?: boolean;
}

export interface ProcessRawConversationStoreOptions {
  records: GetMessageInfoResponse[];
  isFSyncSuccess?: boolean;
}

export interface SyncFunctionOptions {
  recordCount?: number;
  conversationLoadLength?: number;
  dateFrom?: Date;
  dateTo?: Date;
  syncToken?: 'FSync' | 'ISync';
  receivedRecordsLength?: number;
  messageType?: MessageType | MessageType[];
}

export type MessageStoreItem = Message & { unreadCounts: number };

export type MessageStoreConversations = MessageStoreItem[];
