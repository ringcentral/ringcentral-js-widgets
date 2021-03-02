import {
  SyncInfoMessages,
  GetMessageInfoResponse,
} from '@rc-ex/core/definitions';

export interface ConversationItem {
  id: string;
  creationTime: number;
  type: GetMessageInfoResponse['type'];
  messageId: GetMessageInfoResponse['id'];
}

export type Message = Pick<
  GetMessageInfoResponse,
  Exclude<
    keyof GetMessageInfoResponse,
    'creationTime' | 'conversationId' | 'lastModifiedTime'
  >
> & { conversationId: string; creationTime: number; lastModifiedTime: number };

export type Messages = Message[];

export interface MessageSyncList {
  records: Messages;
  syncInfo: SyncInfoMessages;
}

export interface MessageStoreModel {
  syncInfo: SyncInfoMessages;
  conversationList: ConversationItem[];
  // conversationStore: Record<string, GetMessageInfoResponse[]>;
  conversationStore: Record<string, Messages>;
}
