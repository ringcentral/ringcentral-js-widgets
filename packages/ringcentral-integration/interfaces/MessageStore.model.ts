import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type SyncInfoMessages from '@rc-ex/core/lib/definitions/SyncInfoMessages';

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
> & {
  conversationId?: string;
  creationTime?: number;
  lastModifiedTime?: number;
  conversationMatches?: any[];
  correspondentMatches?: any[];
  lastMatchedCorrespondentEntity?: any;
  correspondents?: any[];
  unreadCounts?: number;
  faxPageCount?: number;
  mmsAttachments?: any[];
  voicemailAttachment?: any;
  faxAttachment?: any;
  isLogging?: boolean;
};

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
