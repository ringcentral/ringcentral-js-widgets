import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type SyncInfoMessages from '@rc-ex/core/lib/definitions/SyncInfoMessages';

export interface ConversationItem {
  id: string;
  creationTime: number;
  type: GetMessageInfoResponse['type'];
  messageId: GetMessageInfoResponse['id'];
}

export interface ThreadParty {
  extensionId: string;
  extensionType: string;
  name: string;
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
  /**
   * SMS delivery failure code, not yet in the @rc-ex/core definitions
   */
  deliveryErrorCode?: string;
  /**
   * type of the message
   *
   * message: image, text, etc.
   * info: some message that want to be shown as info, like thread created, thread resolved, thread deleted, thread assigned
   *
   * @default 'message'
   */
  messageType?: 'message' | 'info';
  threadOwner?: ThreadParty;
  threadAuthor?: ThreadParty;
};

export type Messages = Message[];

export interface MessageSyncList {
  records: Messages;
  syncInfo: SyncInfoMessages;
}

export interface MessageStoreModel {
  syncInfo: SyncInfoMessages;
  conversationList: ConversationItem[];
  conversationStore: Record<string, Messages>;
}
