export interface MessageThreadOptions {
  /**
   * enable message thread service
   *
   * @default false
   */
  enable?: boolean;
  /**
   * local cache time
   *
   * @default 5 min.
   */
  ttl?: number;

  /**
   * full sync record count
   *
   * @default 250.
   */
  recordCount?: number;
}

export interface MessageThreadRecord {
  id: string;
  threadId: string;
  recordType:
    | 'AliveMessage'
    | 'DeletedMessage'
    | 'AliveNote'
    | 'DeletedNote'
    | 'ThreadCreatedHint'
    | 'ThreadResolvedHint'
    | 'ThreadDeletedHint'
    | 'ThreadAssignedHint';
  lastModifiedTime: string;
  availability?: 'Alive';
  creationTime?: string;
  direction?: 'Inbound' | 'Outbound';
  messageStatus?: 'Received' | 'Sent';
  text?: string;
  initiator?: Initiator;
  assignee?: Initiator;
  previousAssignee?: Initiator;
  author?: Author;
}

interface Initiator {
  extensionId: string;
  name: string;
}

/**
 * the extra metadata for the thread
 */
export interface ThreadMetaData {
  /**
   * loading state of the thread
   */
  loading?: boolean;
  /**
   * whether the thread is reopened
   */
  reopen?: boolean;
}

export interface ThreadInfoRecord {
  id: string;
  status: 'Open' | 'Resolved';
  availability: string;
  ownerParty?: {
    phoneNumber?: string;
  };
  guestParty?: {
    phoneNumber?: string;
  };
  owner?: {
    extensionId: string;
    name: string;
    extensionType: string;
  };
  assignee?: {
    extensionId: string;
    name: string;
    extensionType: string;
  };
  creationTime: string;
  lastModifiedTime: string;
  statusReason?:
    | 'Manual'
    | 'ThreadExpired'
    | 'OwnerDeleted'
    | 'OwnerPhoneNumberDeleted';
}

export type ThreadInfo = {
  threadId: string;
  messages: string[]; // message ids in this
  /**
   * thread metadata from message-threads/sync API
   */
  threadInfo?: ThreadInfoRecord;
  /**
   * unread count of the thread
   */
  unreadCount?: number;
};

export type ThreadsMap = Record<string, ThreadInfo>;

export interface MessageThreadData {
  // Group messages by threadId for efficient access
  threads: ThreadsMap;
  messages: Record<string, MessageThreadRecord>; // message id -> record
  /**
   * the message-threads/sync token
   */
  token: string | null;
  /**
   * the message-threads/entries/sync token
   */
  entriesToken: string | null;
}

export interface MessageThreadSyncData {
  records: MessageThreadRecord[];
  syncInfo: {
    syncType: 'FSync' | 'ISync';
    syncToken: string;
    syncTime: string;
  };
}

export interface ThreadInfoSyncData {
  records: ThreadInfoRecord[];
  syncInfo: {
    syncType: 'FSync' | 'ISync';
    syncToken: string;
    syncTime: string;
  };
}

export interface SyncSuccessOptions {
  syncToken?: string;
  records?: MessageThreadRecord[];
}

export interface ThreadSyncSuccessOptions {
  syncToken?: string;
  records?: ThreadInfoRecord[];
}

export interface ListThreadsOptions {
  threadStatus?: 'Open' | 'Resolved';
  ownerExtensionIds?: string[];
  ownerPhoneNumber?: string;
  guestPhoneNumber?: string;
  availability?: ('Alive' | 'Deleted')[];
  perPage?: number;
  pageNumber?: number;
}

export interface ListThreadMessagesOptions {
  threadStatus?: 'Open' | 'Resolved';
  ownerExtensionIds?: string[];
  availability?: ('Alive' | 'Deleted')[];
  messageIds?: string[];
  perPage?: number;
  pageNumber?: number;
}

export interface MessageThreadListResponse {
  records: ThreadInfoRecord[];
  paging: {
    page: number;
    perPage: number;
    totalPages?: number;
    totalElements?: number;
  };
}

export interface MessageThreadMessageListResponse {
  records: MessageThreadRecord[];
  paging: {
    page: number;
    perPage: number;
    totalPages?: number;
    totalElements?: number;
  };
}

export interface MessageThreadMessageResponse {
  id: string;
  threadId: string;
  recordType: string;
  lastModifiedTime: string;
  availability: string;
  creationTime: string;
  direction: string;
  messageStatus: string;
  text: string;
  author: Author;
}

interface Author {
  extensionId: string;
  name: string;
  extensionType: string;
}

export interface ThreadNoteModel {
  id: string;
  threadId: string;
  availability: 'Alive' | 'Deleted';
  creationTime: string;
  lastModifiedTime: string;
  text: string;
  author: Author;
}

export interface ThreadNoteListResponse {
  records: ThreadNoteModel[];
  paging: {
    page: number;
    perPage: number;
    totalPages?: number;
    totalElements?: number;
  };
}

export interface ListThreadNotesOptions {
  ownerExtensionIds?: string[];
  availability?: ('Alive' | 'Deleted')[];
  threadIds?: string[];
  noteIds?: string[];
  perPage?: number;
  pageNumber?: number;
}

export interface ThreadNoteCreateRequest {
  threadId: string;
  text: string;
}

export interface ThreadNoteUpdateRequest {
  text: string;
}

export interface ThreadNotesDeleteRequest {
  ids: string[];
}
