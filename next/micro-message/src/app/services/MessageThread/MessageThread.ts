import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { WebSocketSubscription as Subscription } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  CallQueueInfo,
  CallQueues,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  action,
  computed,
  delegate,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  RcModule,
  RouterPlugin,
  state,
  storage,
  StoragePlugin,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import isEqual from 'lodash/isEqual';
import { findLast } from 'ramda';
import {
  concatMap,
  debounceTime,
  defer,
  distinctUntilChanged,
  EMPTY,
  filter,
  firstValueFrom,
  interval,
  map,
  mergeMap,
  merge,
  of,
  pairwise,
  share,
  skip,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timeout,
} from 'rxjs';

import { ConversationLogger } from '../ConversationLogger';
import {
  buildConversationId,
  type CorrespondentMatch,
  type FilteredConversation,
} from '../Conversations';
import { MessageSender } from '../MessageSender';
import { SmsOptOut } from '../SmsOptOut';

import type {
  ListThreadMessagesOptions,
  ListThreadNotesOptions,
  ListThreadsOptions,
  MessageThreadData,
  MessageThreadListResponse,
  MessageThreadMessageListResponse,
  MessageThreadMessageResponse,
  MessageThreadOptions,
  MessageThreadRecord,
  MessageThreadSyncData,
  SyncSuccessOptions,
  ThreadInfo,
  ThreadInfoSyncData,
  ThreadMetaData,
  ThreadNoteCreateRequest,
  ThreadNoteListResponse,
  ThreadNoteModel,
  ThreadNotesDeleteRequest,
  ThreadNoteUpdateRequest,
  ThreadsMap,
  ThreadSyncSuccessOptions,
} from './MessageThread.interface';
import { t } from './i18n';

const DEFAULT_TTL = 5 * 60 * 1000; // 5 min
const RECORD_COUNT = 250;
const THREADS_PER_PAGE = 100;
const MESSAGES_PER_PAGE = 300;

type GroupedThreadInfo = {
  id: string;
  threads: ThreadsMap[string][];
  threadRecords: MessageThreadRecord[];
  messages: Message[];
  latestThread: ThreadsMap[string];
  unreadCount: number;
};

@injectable({
  name: 'MessageThread',
})
export class MessageThread extends RcModule {
  message$ = new Subject<Message>();
  private _incomingRecord$ = new Subject<MessageThreadRecord>();

  private manualSync$ = new Subject<void>();
  private syncDone$ = new Subject<'thread' | 'entries'>();
  private get _enable() {
    return this._messageThreadOptions?.enable ?? false;
  }

  private get _ttl() {
    return this._messageThreadOptions?.ttl ?? DEFAULT_TTL;
  }

  private get _recordCount() {
    return this._messageThreadOptions?.recordCount ?? RECORD_COUNT;
  }

  @computed
  get hasPermission() {
    return (
      this._appFeatures.hasReadMessagesPermission &&
      this.smsRecipientCallQueues.length > 0 &&
      this._enable
    );
  }

  @computed
  get uniqueNumbers() {
    return this.threadConversationsInfo.conversations
      .map((conversation) =>
        conversation.correspondents?.map(
          (correspondent) => correspondent.phoneNumber,
        ),
      )
      .flat()
      .filter(Boolean) as string[];
  }

  // TODO: still not support log conversation for message thread, so we need to return empty array for now
  @computed
  get conversationLogIds() {
    return [];
  }

  hasPermission$ = fromWatchValue(this, () => this.hasPermission);

  @storage
  @state
  historyLoaded = {
    threadsPageNumber: 1,
    messagesPageNumber: 1,
    threadsTotalPages: 0,
    messagesTotalPages: 0,
  };

  @state
  historyLoading = false;

  @action
  private _setLoadingHistory(loading: boolean) {
    this.historyLoading = loading;
  }

  @action
  private _setHistoryLoadedThreadsPageNumber(pageNumber: number) {
    this.historyLoaded.threadsPageNumber = pageNumber;
  }

  @action
  private _setHistoryLoadedMessagesPageNumber(pageNumber: number) {
    this.historyLoaded.messagesPageNumber = pageNumber;
  }

  @action
  private _setHistoryLoadedThreadsTotalPages(totalPages: number) {
    this.historyLoaded.threadsTotalPages = totalPages;
  }

  @action
  private _setHistoryLoadedMessagesTotalPages(totalPages: number) {
    this.historyLoaded.messagesTotalPages = totalPages;
  }

  @computed
  get smsRecipientCallQueues() {
    return this._callQueues.grants.reduce((acc, grant) => {
      const queueInfo = this._callQueues.getQueueMetadata(
        grant.extension.id,
      )?.queueInfo;

      if (queueInfo && grant.callQueueSmsRecipient) {
        acc.push(queueInfo);
      }
      return acc;
    }, [] as CallQueueInfo[]);
  }

  constructor(
    private _auth: Auth,
    private _client: Client,
    private _appFeatures: AppFeatures,
    private _storage: StoragePlugin,
    private _router: RouterPlugin,
    private _callQueues: CallQueues,
    private _messageSender: MessageSender,
    private _portManager: PortManager,
    @optional('Subscription') protected _subscription?: Subscription,
    @optional('MessageThreadOptions')
    private _messageThreadOptions?: MessageThreadOptions,
    @optional() private _smsOptOut?: SmsOptOut,
    @optional() protected _extensionInfo?: ExtensionInfo,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional() protected _conversationLogger?: ConversationLogger,
  ) {
    super();
    this._storage.enable(this);

    this._subscription?.register(this, {
      filters: [
        subscriptionFilters.messageThreadsSync,
        subscriptionFilters.messageThreadsEntriesSync,
      ],
    });

    this._contactMatcher?.addQuerySource({
      getQueriesFn: () => this.uniqueNumbers,
      readyCheckFn: () => true,
    });

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.listenMessageUpdate$();
      });
    } else {
      this.listenMessageUpdate$();
    }
  }

  @storage
  @state
  data: MessageThreadData = {
    threads: {},
    messages: {},
    token: null,
    entriesToken: null,
  };

  @state
  threadMetadataMap: Record<string, ThreadMetaData> = {};

  @state
  inputValueMap: Record<string, string> = {};

  private listenMessageUpdate$() {
    const data$ = fromWatchValue(this, () => this.data.threads);

    this._incomingRecord$
      .pipe(
        mergeMap((record) => {
          const threadId = record.threadId;

          return data$.pipe(
            filter((threads) => Boolean(threads[threadId]?.threadInfo)),
            take(1),
            map(() => record),
            // if the thread info is not back in 10 seconds, we just emit the message
            timeout({
              first: 10_000,
              with: () => {
                this.logger.log(
                  'the record message not able to wait the info back more than 10s, skip this record',
                  record,
                );
                return EMPTY;
              },
            }),
          );
        }),
        tap((record) => {
          this.message$.next(this.convertThreadRecordToMessage(record));
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @action
  private _setInputValue(threadId: string, value: string) {
    this.inputValueMap[threadId] = value;
  }

  private getConversationHashId(threadId: string) {
    const thread = this.getThread(threadId);
    const guestPhone = thread?.threadInfo?.guestParty?.phoneNumber;
    const ownerPhone = thread?.threadInfo?.ownerParty?.phoneNumber;
    if (!guestPhone || !ownerPhone) {
      return '';
    }
    return buildConversationId([guestPhone], ownerPhone);
  }

  @delegate('server')
  async setInputValue(threadId: string, value: string) {
    const hashId = this.getConversationHashId(threadId);
    this._setInputValue(hashId, value);
  }

  getInputValue(threadId: string) {
    const hashId = this.getConversationHashId(threadId);

    // use hash as the input to ensure the input value can use same cache between threads
    return this.inputValueMap[hashId] || '';
  }

  @action
  resetInputValue(threadId: string) {
    const hashId = this.getConversationHashId(threadId);
    delete this.inputValueMap[hashId];
  }

  @action
  resetData() {
    this.data = {
      threads: {},
      messages: {},
      token: null,
      entriesToken: null,
    };
    this.threadMetadataMap = {};
    this.inputValueMap = {};
    this.historyLoaded = {
      threadsPageNumber: 1,
      messagesPageNumber: 1,
      threadsTotalPages: 0,
      messagesTotalPages: 0,
    };
    this.historyLoading = false;
  }

  @action
  markThreadAsViewed(threadId: string) {
    const group = this.getThreadGroup(threadId);
    group?.threads.forEach(({ threadId }) => {
      const thread = this.getThread(threadId);
      if (thread) {
        thread.unreadCount = 0;
      }
    });
  }

  getThreadMetadata(threadId: string): ThreadMetaData {
    return this.threadMetadataMap[threadId] || {};
  }

  @action
  private updateThreadMetaData(threadId: string, metadata: ThreadMetaData) {
    const thread = this.getThread(threadId);
    if (thread) {
      this.threadMetadataMap[threadId] = {
        ...this.threadMetadataMap[threadId],
        ...metadata,
      };
    }
  }

  @delegate('server')
  async reopenResolvedThread(threadId: string) {
    this.updateThreadMetaData(threadId, { reopen: true });
  }

  @action
  private setThreadLoading(threadId: string, loading: boolean) {
    this.updateThreadMetaData(threadId, { loading });
  }

  @action
  private syncEntriesSuccess(
    { syncToken, records = [] }: SyncSuccessOptions,
    fromSync = true,
  ) {
    if (syncToken) {
      this.data.entriesToken = syncToken;
    }

    const needToSortThreads = new Set<ThreadInfo>();

    // Add/update messages
    records.forEach((record) => {
      if (!record.id) return;

      // Add message to its thread first to check if it's new
      const threadId = record.threadId;
      if (!threadId) return;

      if (!this.data.threads[threadId]) {
        this.data.threads[threadId] = {
          threadId,
          messages: [],
          unreadCount: 0,
        };
      }

      const thread = this.data.threads[threadId];
      const isNewMessage = !this.data.messages[record.id];

      needToSortThreads.add(thread);

      // Add message to messages map
      this.data.messages[record.id] = record;

      // Add message id to thread if not already present
      if (isNewMessage) {
        thread.messages.push(record.id);

        // if not from sync, means that is history data, don't emit to message$
        if (!fromSync) return;

        // only new message will emit to message$
        this._incomingRecord$.next(record);

        const group = this.getThreadGroup(thread.threadId);

        if (
          group &&
          // when the user is on the thread page, ignore the unread count
          this._router.currentPath.includes(
            `/conversations/${group.latestThread.threadId}`,
          )
        ) {
          return;
        }

        const currentExtensionId = this._auth.ownerId;
        // Handle different record types for unread count management
        switch (record.recordType) {
          case 'AliveMessage': {
            const threadInfo = thread.threadInfo;
            const assigneeExtensionId = threadInfo?.assignee?.extensionId;

            // Increment unreadCount if thread is not assigned or assigned to current user
            if (
              (!assigneeExtensionId ||
                assigneeExtensionId === currentExtensionId) &&
              // only non self message will increment unread count
              record.direction !== 'Outbound' &&
              record.author?.extensionId !== currentExtensionId
            ) {
              thread.unreadCount = (thread.unreadCount || 0) + 1;
            }
            break;
          }
          case 'ThreadAssignedHint':
            // when thread is assigned to other user, set unread count to 0, because the thread is not assigned to current user anymore
            if (record.assignee) {
              if (record.assignee.extensionId !== currentExtensionId) {
                thread.unreadCount = 0;
              } else {
                // when thread is assign to me and the user is not on the thread page, increment unread count
                thread.unreadCount = (thread.unreadCount || 0) + 1;
              }
            }
            break;
          case 'ThreadResolvedHint':
            thread.unreadCount = 0;
            break;
          default:
            break;
        }
      }
    });

    // after save sync data success, sort the messages by lastModifiedTime to ensure the messages are in the correct order
    needToSortThreads.forEach((thread) => {
      thread.messages.sort(
        (a, b) =>
          this.convertTimestamp(this.data.messages[a].lastModifiedTime)! -
          this.convertTimestamp(this.data.messages[b].lastModifiedTime)!,
      );
    });
  }

  @action
  private syncThreadSuccess({
    syncToken,
    records = [],
  }: ThreadSyncSuccessOptions) {
    if (syncToken) {
      this.data.token = syncToken;
    }

    // Update thread metadata
    records.forEach((record) => {
      if (!record.id) return;

      const threadId = record.id;

      // Ensure thread exists
      if (!this.data.threads[threadId]) {
        this.data.threads[threadId] = {
          threadId,
          messages: [],
          unreadCount: 0,
        };
      }

      // Update thread info metadata
      this.data.threads[threadId].threadInfo = record;
    });
  }

  /**
   * Convert timestamp from ISO string to number
   */
  private convertTimestamp(timestamp?: string): number | undefined {
    if (!timestamp) {
      return undefined;
    }
    const date = new Date(timestamp).getTime();
    return isNaN(date) ? undefined : date;
  }

  /**
   * Get subject text based on recordType using i18n
   */
  private getSubjectByRecordType(record: MessageThreadRecord): string {
    const recordType = record.recordType;

    switch (recordType) {
      case 'AliveMessage':
        return record.text || '';
      case 'ThreadCreatedHint':
        return t('threadCreatedHint', { name: record.initiator?.name || '' });
      case 'ThreadResolvedHint': {
        // when not have initiator name, it means the thread is expired, resolved by server automatically
        if (!record.initiator?.name) {
          return t('threadExpiredHint');
        }

        return t('threadResolvedHint', { name: record.initiator.name });
      }
      case 'ThreadAssignedHint':
        if (record.assignee) {
          const isOwner = record.assignee.extensionId === this._auth.ownerId;
          return isOwner
            ? t('threadAssignedToOwnerHint')
            : t('threadAssignedHint', { name: record.assignee.name });
        } else if (record.previousAssignee) {
          return t('threadUnassignedHint');
        }
        return '';
      default:
        return '';
    }
  }

  /**
   * Convert MessageThreadRecord to Message format
   */
  private convertThreadRecordToMessage(record: MessageThreadRecord): Message {
    const creationTime = this.convertTimestamp(record.creationTime);
    const lastModifiedTime = this.convertTimestamp(record.lastModifiedTime);

    const isMessage = record.recordType === 'AliveMessage';
    const subject = this.getSubjectByRecordType(record);

    const thread = this.getThread(record.threadId);
    const threadInfo = thread?.threadInfo;

    const direction = record.direction || 'Inbound';
    const isOutbound = direction === 'Outbound';
    return {
      id: record.id as any,
      conversationId: record.threadId,
      type: 'Text' as const,
      // always set direction to outbound, because the thread ownerParty will be us
      direction,
      readStatus: 'Read' as const,
      creationTime,
      lastModifiedTime,
      subject,
      messageType: isMessage ? 'message' : 'info',
      messageStatus: record.messageStatus || 'Received',
      availability: record.availability || 'Alive',
      uri: '',
      attachments: [],
      from: {
        phoneNumber: isOutbound
          ? threadInfo?.ownerParty?.phoneNumber
          : threadInfo?.guestParty?.phoneNumber,
      },
      to: [
        {
          phoneNumber: isOutbound
            ? threadInfo?.guestParty?.phoneNumber
            : threadInfo?.ownerParty?.phoneNumber,
        },
      ],
      extensionId: '',
      priority: 'Normal',
    } as Message;
  }

  /**
   * Convert a thread to FilteredConversation
   */
  private convertThreadToConversation(
    thread: ThreadsMap[string],
    messages: MessageThreadRecord[],
    unreadCount: number | undefined,
  ): FilteredConversation | null {
    const latestMessage = messages[messages.length - 1] as
      | MessageThreadRecord
      | undefined;

    const threadInfo = thread.threadInfo;

    // Use getNumbersFromMessage to get self and correspondents, same as ConversationsBase
    // Create a minimal Message-like object for getNumbersFromMessage
    const extensionNumber = this._extensionInfo?.extensionNumber;

    // if the latest message is a deleted hint, don't show the conversation, that means the conversation is deleted
    if (
      !latestMessage ||
      latestMessage.recordType === 'ThreadDeletedHint' ||
      !threadInfo ||
      !extensionNumber
    ) {
      return null;
    }

    // Use threadId as conversationId since threads represent shared conversations
    const conversationId = thread.threadId;
    const creationTime = this.convertTimestamp(
      latestMessage.lastModifiedTime || latestMessage.creationTime,
    );
    const lastModifiedTime = this.convertTimestamp(
      latestMessage.lastModifiedTime,
    );

    const latestTextMessage =
      latestMessage.recordType === 'AliveMessage'
        ? latestMessage
        : findLast((msg) => msg?.recordType === 'AliveMessage', messages) ||
          latestMessage;

    if (!latestMessage) return null;

    let correspondents: Array<{
      phoneNumber?: string;
      extensionNumber?: string;
    }> = [];
    let self: { phoneNumber?: string; extensionNumber?: string } | undefined =
      undefined;

    const from = threadInfo.ownerParty;
    const to = threadInfo.guestParty;

    correspondents = [{ phoneNumber: to?.phoneNumber }];
    self = from;

    // Get matches using the same approach as ConversationsBase
    const contactMapping = this._contactMatcher?.dataMapping || {};
    const loggingMap = this._conversationLogger?.loggingMap || {};
    const conversationLogMapping = this._conversationLogger?.dataMapping || {};

    const selfNumber = self && (self.phoneNumber || self.extensionNumber);
    const selfMatches = (selfNumber && contactMapping[selfNumber]) || [];
    const correspondentMatchesList: CorrespondentMatch[][] = [];
    const correspondentMatches = correspondents.reduce((acc, curr) => {
      const phoneNumber = curr.phoneNumber || curr.extensionNumber;

      if (phoneNumber) {
        correspondentMatchesList.push(contactMapping[phoneNumber] || []);
      }

      return phoneNumber &&
        contactMapping[phoneNumber] &&
        contactMapping[phoneNumber].length
        ? acc.concat(contactMapping[phoneNumber])
        : acc;
    }, [] as CorrespondentMatch[]);

    // TODO: log still not supported for thread
    const conversationLogId: string | null | undefined = 'unknown';
    // this._conversationLogger && messageLike
    //   ? this._conversationLogger.getConversationLogId(messageLike)
    //   : null;
    const isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
    const conversationMatches =
      conversationLogMapping[conversationLogId!] || [];

    // Build the conversation object matching FilteredConversation interface
    const conversation: FilteredConversation = {
      // Basic Message fields
      id: latestMessage.id as any,
      conversationId,
      type: 'Text' as const,
      // always set direction to outbound, because the thread ownerParty will be us
      direction: 'Outbound',
      readStatus: 'Read' as const,
      creationTime,
      lastModifiedTime,
      subject: latestTextMessage.text || '',
      messageStatus: latestMessage.messageStatus || 'Received',
      availability: latestMessage.availability || 'Alive',
      uri: '',
      attachments: [],
      from,
      to: [to],
      extensionId: '',
      priority: 'Normal',
      // FormattedConversation fields
      unreadCounts: unreadCount ?? 0,
      self,
      correspondents,
      mmsAttachments: [],
      conversationLogId,
      isLogging,
      correspondentMatches,
      correspondentMatchesList,
      conversationMatches,
      selfMatches,
    } as FilteredConversation;

    return conversation;
  }

  /**
   * Get threadConversations as FilteredConversation[]
   */
  @computed
  get threadConversationsInfo() {
    const map = new Map<string, FilteredConversation>();
    const threads = Array.from(this.groupedThreadsMap.values()).map((group) => {
      const conversation = this.convertThreadToConversation(
        group.latestThread,
        group.threadRecords,
        group.unreadCount,
      );
      if (conversation) {
        // set each thread to the map let the target thread can find the belong conversation
        group.threads.forEach((thread) => {
          map.set(thread.threadId, conversation);
        });
      }
      return conversation;
    });

    const conversations = threads
      .filter((con): con is FilteredConversation => con !== null)
      .sort((a, b) => {
        if (!a.lastModifiedTime || !b.lastModifiedTime) return 0;
        return b.lastModifiedTime - a.lastModifiedTime;
      });

    return {
      conversations,
      map,
    };
  }

  getThread(threadId: string): ThreadsMap[string] | undefined {
    return this.data.threads[threadId];
  }

  /**
   * Get threads grouped by phone number hash (ownerParty + guestParty)
   */
  @computed
  get groupedThreadsMap() {
    const groupsMap = new Map<string, GroupedThreadInfo>();

    Object.values(this.data.threads).forEach((thread) => {
      const threadInfo = thread.threadInfo;
      const hashId = this.getConversationHashId(thread.threadId);

      if (!hashId) {
        // Skip threads without valid phone numbers
        return;
      }

      if (!groupsMap.has(hashId)) {
        groupsMap.set(hashId, {
          id: hashId,
          threads: [],
          threadRecords: [],
          messages: [],
          latestThread: thread,
          unreadCount: thread.unreadCount ?? 0,
        });
      }

      const item = groupsMap.get(hashId)!;
      item.threads.push(thread);

      const records = thread.messages
        .map((msgId) => this.data.messages[msgId])
        .filter((record): record is MessageThreadRecord => !!record);

      if (records.length > 0) {
        const firstRecord = records[0];

        // when this is history data, which means already resolved, add a fake ThreadCreatedHint to the beginning, if there is no ThreadCreatedHint
        if (
          threadInfo?.status === 'Resolved' &&
          firstRecord.recordType !== 'ThreadCreatedHint'
        ) {
          const startTime = new Date(
            new Date(firstRecord.lastModifiedTime).getTime() - 1,
          ).toISOString();
          // Add fake AliveMessage as anchor at the beginning
          const startAnchor: MessageThreadRecord = {
            id: `anchor-start-${thread.threadId}`,
            threadId: thread.threadId,
            recordType: 'ThreadCreatedHint',
            lastModifiedTime: startTime,
            creationTime: startTime,
            availability: 'Alive',
          };

          item.threadRecords.push(startAnchor);
        }

        item.threadRecords.push(...records);

        const lastRecord = records[records.length - 1];

        // when this is history data, which means already resolved, add a fake ThreadResolvedHint to the end, if there is no ThreadResolvedHint or ThreadDeletedHint
        if (
          threadInfo?.status === 'Resolved' &&
          lastRecord.recordType !== 'ThreadResolvedHint' &&
          lastRecord.recordType !== 'ThreadDeletedHint'
        ) {
          const endTime = new Date(
            new Date(lastRecord.lastModifiedTime).getTime() + 1,
          ).toISOString();
          // Add fake AliveMessage as anchor at the end
          const endAnchor: MessageThreadRecord = {
            id: `anchor-end-${thread.threadId}`,
            threadId: thread.threadId,
            recordType: 'ThreadResolvedHint',
            initiator:
              // when be expired, not set initiator to make that show as expired hint
              threadInfo.statusReason === 'ThreadExpired'
                ? undefined
                : {
                    extensionId: 'unknown',
                    name: t('someone'),
                  },
            lastModifiedTime: endTime,
            creationTime: endTime,
            availability: 'Alive',
          };
          item.threadRecords.push(endAnchor);
        }
      }

      const lastModifiedTime = thread.threadInfo?.lastModifiedTime;
      if (
        lastModifiedTime &&
        this.convertTimestamp(lastModifiedTime)! >
          this.convertTimestamp(
            item.latestThread.threadInfo?.lastModifiedTime!,
          )!
      ) {
        item.latestThread = thread;
      }

      item.unreadCount += thread.unreadCount ?? 0;
    });

    groupsMap.forEach((item) => {
      item.threadRecords.sort(
        (a, b) =>
          this.convertTimestamp(a.lastModifiedTime)! -
          this.convertTimestamp(b.lastModifiedTime)!,
      );

      // push the same order of threadRecords
      item.messages.push(
        ...item.threadRecords.map((record) =>
          this.convertThreadRecordToMessage(record),
        ),
      );
    });

    return groupsMap;
  }

  // Local unread count including thread messages
  @computed
  get threadUnreadCount(): number {
    return Object.values(this.data.threads).reduce((total, thread) => {
      return total + (thread?.unreadCount ?? 0);
    }, 0);
  }
  /**
   * Get conversation by threadId
   */
  getThreadConversation(threadId: string): FilteredConversation | undefined {
    return this.threadConversationsInfo.map.get(threadId);
  }

  /**
   * Get messages for a thread by threadId
   */
  getThreadMessages(threadId: string): Message[] {
    const thread = this.getThread(threadId);
    if (!thread) {
      return [];
    }

    const group = this.getThreadGroup(threadId);

    return group?.messages || [];
  }

  getThreadGroup(threadId: string) {
    const hashId = this.getConversationHashId(threadId);

    const groupedMessages = this.groupedThreadsMap.get(hashId);
    return groupedMessages;
  }

  /**
   * Check if a conversationId is a threadId
   */
  isThreadId(conversationId: string): boolean {
    return !!this.data.threads[conversationId];
  }

  get token() {
    return this.data.token;
  }

  get entriesToken() {
    return this.data.entriesToken;
  }

  override onInitOnce() {
    if (!this._subscription) return;

    const messageThreadSyncEvent$ = this._subscription
      .fromMessage$(/\/message-threads\/sync/)
      .pipe(
        tap(() => {
          this.logger.log('thread sync event detected');
        }),
      );

    const messageThreadEntriesSyncEvent$ = this._subscription
      .fromMessage$(/\/message-threads\/entries\/sync/)
      .pipe(
        tap(() => {
          this.logger.log('entries sync event detected');
        }),
      );

    const messageThreadChanges$ = merge(
      messageThreadSyncEvent$,
      messageThreadEntriesSyncEvent$,
      this.manualSync$,
      // a polling to avoid some miss server side push event
      interval(this._ttl),
    ).pipe(
      // share one interval to trigger both polling together
      share(),
      // to avoid too many sync events, because the events may trigger together in a short time, use debounce to avoid too many sync events
      debounceTime(500),
      startWith(null),
    );

    const messageThreadEvent$ = messageThreadChanges$.pipe(
      map(() => this.token),
      // use concatMap to ensure the sync api called one by one
      concatMap((token) =>
        defer(async () => {
          try {
            if (!token) {
              this.logger.log('thread info fsync start');
              await this._threadFSync();
              this.logger.log('thread info fsync done');
            } else {
              this.logger.log('thread info isync start');
              await this._threadISync();
              this.logger.log('thread info isync done');
            }
          } catch (error: any) {
            this.logger.error('thread sync error', error);
          }
        }),
      ),
      tap(() => {
        this.syncDone$.next('thread');
      }),
    );

    const messageThreadEntriesEvent$ = messageThreadChanges$.pipe(
      map(() => this.entriesToken),
      // use concatMap to ensure the sync api called one by one
      concatMap((token) =>
        defer(async () => {
          try {
            if (!token) {
              this.logger.log('entries fsync start');
              await this._entriesFSync();
              this.logger.log('entries fsync done');
            } else {
              this.logger.log('entries isync start');
              await this._entriesISync();
              this.logger.log('entries isync done');
            }
          } catch (error: any) {
            this.logger.error('entries sync error', error);
          }
        }),
      ),
      tap(() => {
        this.syncDone$.next('entries');
      }),
    );

    const smsRecipientCallQueuesIdChange$ = fromWatchValue(
      this,
      () => this.smsRecipientCallQueues,
    ).pipe(
      map((queues) => queues.map((queue) => queue.id).join('_')),
      distinctUntilChanged(),
      // skip the first value, only trigger when change
      skip(1),
    );

    const uniqueNumbers$ = fromWatchValue(this, () => this.uniqueNumbers).pipe(
      filter((numbers) => numbers.length > 0),
      distinctUntilChanged((a, b) => isEqual(a, b)),
      tap(() => {
        this._contactMatcher?.triggerMatch();
      }),
    );

    this.readyState$
      .pipe(
        switchMap(() =>
          this.ready
            ? this.hasPermission$.pipe(
                startWith(false),
                pairwise(),
                tap(([prev, current]) => {
                  if (prev && !current) {
                    this.logger.log(
                      'from permission become no permission, reset data',
                    );
                    this.resetData();
                  }
                }),
                map(([, current]) => current),
              )
            : EMPTY,
        ),
        switchMap((hasPermission) => {
          return hasPermission
            ? merge(
                smsRecipientCallQueuesIdChange$.pipe(
                  tap(() => {
                    this.logger.log(
                      'queue ids changed, reset data to ensure the user have correct data',
                    );
                    this.resetData();
                  }),
                  startWith(null),
                  switchMap(() =>
                    merge(
                      messageThreadEvent$,
                      messageThreadEntriesEvent$,
                      defer(() => this._loadInitialHistory()),
                    ),
                  ),
                  takeUntil(this._auth.beforeLogout$),
                ),
                uniqueNumbers$,
              )
            : EMPTY;
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  /**
   * Load initial historical data using listThreads and listThreadMessages
   * Loads the first page (which contains the latest data) with perPage: 100
   */
  @delegate('server')
  private async _loadInitialHistory() {
    // when threadsTotalPages > 0 means already fetched the initial history, not need fetch again
    if (this.historyLoaded.threadsTotalPages > 0) {
      this.logger.log('Initial history data already fetched, skipping');
      return;
    }

    this._setLoadingHistory(true);
    try {
      this.logger.log('Loading initial history data');

      // Step 1: Get total pages for threads
      const threadsFirstPage = await this.listThreads({ perPage: 1 }, false);
      const totalThreadPages = threadsFirstPage.paging.totalPages || 0;

      if (
        totalThreadPages === 0 ||
        threadsFirstPage.paging.totalElements === 0
      ) {
        this.logger.log('No threads found, skipping history load');
        return;
      }

      this.logger.log(`Found ${totalThreadPages} pages of threads`);

      // Step 2: Load the first page of threads (which contains the latest data)
      const firstThreadPage = await this.listThreads({
        perPage: THREADS_PER_PAGE,
        pageNumber: 1,
      });

      this._setHistoryLoadedThreadsPageNumber(1);
      this._setHistoryLoadedThreadsTotalPages(totalThreadPages);

      this.logger.log(
        `Loaded ${firstThreadPage.records.length} threads from page 1`,
      );

      // Step 3: Get total pages for messages
      const messagesFirstPage = await this.listThreadMessages(
        { perPage: 1 },
        false,
      );
      const totalMessagePages = messagesFirstPage.paging.totalPages || 0;

      if (
        totalMessagePages === 0 ||
        messagesFirstPage.paging.totalElements === 0
      ) {
        this.logger.log('No messages found, skipping message load');
        return;
      }

      this.logger.log(`Found ${totalMessagePages} pages of messages`);

      // Step 4: Load the first page of messages (which contains the latest data)
      // Messages will be automatically associated with threads via threadId

      const firstMessagePage = await this.listThreadMessages({
        perPage: MESSAGES_PER_PAGE,
        pageNumber: 1,
      });

      this._setHistoryLoadedMessagesPageNumber(1);
      this._setHistoryLoadedMessagesTotalPages(totalMessagePages);

      this.logger.log(
        `Loaded ${firstMessagePage.records.length} messages from page 1`,
      );
      this.logger.log('Initial history data loaded successfully');
    } catch (error: any) {
      this.logger.error('Failed to load initial history', error);
      // Don't throw - allow app to continue with sync mechanism
    } finally {
      this._setLoadingHistory(false);
    }
  }

  @delegate('server')
  private async _entriesFSync() {
    try {
      const params = new URLSearchParams();
      params.append('syncType', 'FSync');
      params.append('recordCount', this._recordCount.toString());
      params.append('messageType', 'SMS');
      params.append('scope', 'Accessible');

      const queryString = params.toString();
      const res = await this._client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/message-threads/entries/sync?${queryString}`,
        );

      const data: MessageThreadSyncData = await res.json();

      this.syncEntriesSuccess({
        records: data.records,
        syncToken: data.syncInfo?.syncToken,
      });
    } catch (error: any) {
      this.logger.error('_entriesFSync error', error);
      throw error;
    }
  }

  @delegate('server')
  private async _entriesISync() {
    try {
      const params = new URLSearchParams();
      params.append('syncType', 'ISync');
      params.append('syncToken', this.entriesToken!);

      const queryString = params.toString();
      const res = await this._client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/message-threads/entries/sync?${queryString}`,
        );

      const data: MessageThreadSyncData = await res.json();

      this.syncEntriesSuccess({
        records: data.records,
        syncToken: data.syncInfo?.syncToken,
      });
    } catch (error: any) {
      this.logger.error('_entriesISync error', error);

      try {
        if (error.response?.status === 400) {
          const errorData = await error.response.clone().json();
          const errorCode = errorData.errors?.[0]?.errorCode;
          switch (errorCode) {
            case 'MSG-411':
            case 'CMN-101':
              this.logger.error(`entriesISync ${errorCode} error`, errorData);
              await this._entriesFSync();
              break;
            default:
              break;
          }
        }
      } catch (error) {
        this.logger.error('full sync error', error);
      }

      throw error;
    }
  }

  @delegate('server')
  private async _threadFSync() {
    try {
      const params = new URLSearchParams();
      params.append('syncType', 'FSync');
      params.append('recordCount', this._recordCount.toString());

      const queryString = params.toString();
      const res = await this._client.service
        .platform()
        .get(`/restapi/v1.0/account/~/message-threads/sync?${queryString}`);

      const data: ThreadInfoSyncData = await res.json();

      this.syncThreadSuccess({
        records: data.records,
        syncToken: data.syncInfo?.syncToken,
      });
    } catch (error: any) {
      this.logger.error('_threadFSync error', error);
      throw error;
    }
  }

  @delegate('server')
  private async _threadISync() {
    try {
      const params = new URLSearchParams();
      params.append('syncType', 'ISync');
      params.append('syncToken', this.token!);

      const queryString = params.toString();
      const res = await this._client.service
        .platform()
        .get(`/restapi/v1.0/account/~/message-threads/sync?${queryString}`);

      const data: ThreadInfoSyncData = await res.json();

      this.syncThreadSuccess({
        records: data.records,
        syncToken: data.syncInfo?.syncToken,
      });
    } catch (error: any) {
      this.logger.error('_threadISync error', error);

      try {
        if (error.response?.status === 400) {
          const errorData = await error.response.clone().json();
          const errorCode = errorData.errors?.[0]?.errorCode;

          switch (errorCode) {
            case 'MSG-411':
            case 'CMN-101':
              this.logger.error(`threadISync ${errorCode} error`, errorData);
              await this._threadFSync();
              break;
            default:
              this.logger.error('threadISync non expect', error);

              break;
          }
        }
      } catch (error) {
        // ignore error
      }

      throw error;
    }
  }

  /**
   * Resolve a thread (set status to Resolved)
   */
  @delegate('server')
  async resolveThread(threadId: string) {
    this.setThreadLoading(threadId, true);
    try {
      const res = await this._client.service
        .platform()
        .post(`/restapi/v1.0/account/~/message-threads/${threadId}/resolve`);

      // Trigger sync to update thread status
      await this.emitUpdateAndWaitSyncDone();
      return await res.json();
    } catch (error: any) {
      this.logger.error('resolveThread error', error);
      throw error;
    } finally {
      this.setThreadLoading(threadId, false);
    }
  }

  /**
   * Assign or unassign a thread
   */
  @delegate('server')
  async assignThread(threadId: string, assigneeExtensionId: string | null) {
    this.setThreadLoading(threadId, true);
    try {
      const body = {
        assignee: assigneeExtensionId
          ? { extensionId: assigneeExtensionId }
          : null,
      };
      const res = await this._client.service
        .platform()
        .post(
          `/restapi/v1.0/account/~/message-threads/${threadId}/assign`,
          body,
        );

      // Trigger sync to update thread assignment
      await this.emitUpdateAndWaitSyncDone();
      return await res.json();
    } catch (error: any) {
      this.logger.error('assignThread error', error);
      throw error;
    } finally {
      this.setThreadLoading(threadId, false);
    }
  }

  /**
   * Unassign a thread (set assignee to null)
   */
  async unassignThread(threadId: string) {
    return this.assignThread(threadId, null);
  }

  /**
   * List message threads
   */
  @delegate('server')
  async listThreads(
    options: ListThreadsOptions = {},
    saveSync: boolean = true,
  ): Promise<MessageThreadListResponse> {
    try {
      const params = new URLSearchParams();

      if (options.threadStatus) {
        params.append('threadStatus', options.threadStatus);
      }

      if (options.ownerExtensionIds?.length) {
        options.ownerExtensionIds.forEach((id) => {
          params.append('ownerExtensionIds', id);
        });
      }

      if (options.ownerPhoneNumber) {
        params.append('ownerPhoneNumber', options.ownerPhoneNumber);
      }

      if (options.guestPhoneNumber) {
        params.append('guestPhoneNumber', options.guestPhoneNumber);
      }

      if (options.availability?.length) {
        options.availability.forEach((avail) => {
          params.append('availability', avail);
        });
      }

      if (options.perPage) {
        params.append('perPage', options.perPage.toString());
      }

      if (options.pageNumber) {
        params.append('pageNumber', options.pageNumber.toString());
      }

      const queryString = params.toString();

      const res = await this._client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/message-threads${
            queryString ? `?${queryString}` : ''
          }`,
        );

      const data: MessageThreadListResponse = await res.json();

      if (saveSync) {
        this.syncThreadSuccess({
          records: data.records,
        });
      }
      return data;
    } catch (error: any) {
      this.logger.error('listThreads error', error);
      throw error;
    }
  }

  /**
   * List messages across one or more threads
   */
  @delegate('server')
  async listThreadMessages(
    options: ListThreadMessagesOptions = {},
    saveSync: boolean = true,
  ): Promise<MessageThreadMessageListResponse> {
    try {
      const params = new URLSearchParams();

      if (options.threadStatus) {
        params.append('threadStatus', options.threadStatus);
      }

      if (options.ownerExtensionIds?.length) {
        options.ownerExtensionIds.forEach((id) => {
          params.append('ownerExtensionIds', id);
        });
      }

      if (options.availability?.length) {
        options.availability.forEach((avail) => {
          params.append('availability', avail);
        });
      }

      if (options.messageIds?.length) {
        options.messageIds.forEach((id) => {
          params.append('messageIds', id);
        });
      }

      if (options.perPage) {
        params.append('perPage', options.perPage.toString());
      }

      if (options.pageNumber) {
        params.append('pageNumber', options.pageNumber.toString());
      }

      const queryString = params.toString();

      const res = await this._client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/message-threads/messages${
            queryString ? `?${queryString}` : ''
          }`,
        );

      const data: MessageThreadMessageListResponse = await res.json();

      if (saveSync) {
        const notExistThreadDataIds = new Set<string>();

        // Add recordType to records since API response doesn't include it
        const recordsWithType: MessageThreadRecord[] = data.records.map(
          (record) => {
            // when found some record belong thread is not exist, accumulate them and sync later
            const thread = this.getThread(record.threadId);

            if (!thread) {
              notExistThreadDataIds.add(record.threadId);
            }

            return {
              ...record,
              recordType: 'AliveMessage' as const,
            };
          },
        );

        if (notExistThreadDataIds.size > 0) {
          // Keep fetching until all notExistThreadDataIds are found or no more data available
          while (notExistThreadDataIds.size > 0) {
            const currentPage = this.historyLoaded.threadsPageNumber;
            const totalPages = this.historyLoaded.threadsTotalPages;

            // Check if there's more data to fetch
            if (totalPages > 0 && currentPage >= totalPages) {
              this.logger.warn(
                `Cannot find ${notExistThreadDataIds.size} thread(s) after fetching all available pages`,
              );
              break;
            }

            // Increment page number and fetch
            const nextPage = currentPage + 1;

            const response = await this.listThreads({
              perPage: THREADS_PER_PAGE,
              pageNumber: nextPage,
            });

            this._setHistoryLoadedThreadsPageNumber(nextPage);

            // Update total pages if available
            if (response.paging.totalPages) {
              this._setHistoryLoadedThreadsTotalPages(
                response.paging.totalPages,
              );
            }

            // Check which thread IDs now exist and remove them from notExistThreadDataIds
            for (const threadId of Array.from(notExistThreadDataIds)) {
              if (this.getThread(threadId)) {
                notExistThreadDataIds.delete(threadId);
              }
            }
          }
        }

        this.syncEntriesSuccess(
          {
            records: recordsWithType,
          },
          false,
        );
      }
      return data;
    } catch (error: any) {
      this.logger.error('listThreadMessages error', error);
      throw error;
    }
  }

  @delegate('server')
  async loadMoreMessages() {
    if (this.historyLoading) {
      this.logger.log('Already loading history, skipping');
      return;
    }

    this.logger.log('load more messages');

    try {
      const currentPage = this.historyLoaded.messagesPageNumber;
      const totalPages = this.historyLoaded.messagesTotalPages;

      // Check if there are more pages to load
      if (totalPages > 0 && currentPage >= totalPages) {
        this.logger.log('No more messages needed to load');
        return;
      }

      this._setLoadingHistory(true);

      const nextPage = currentPage + 1;

      const response = await this.listThreadMessages({
        perPage: MESSAGES_PER_PAGE,
        pageNumber: nextPage,
      });
      this._setHistoryLoadedMessagesPageNumber(nextPage);

      // Update total pages if available
      if (response.paging.totalPages) {
        this._setHistoryLoadedMessagesTotalPages(response.paging.totalPages);
      }
    } finally {
      this._setLoadingHistory(false);
    }
  }

  /**
   * List notes across one or more threads
   */
  @delegate('server')
  async listThreadNotes(
    options: ListThreadNotesOptions = {},
  ): Promise<ThreadNoteListResponse> {
    try {
      const params = new URLSearchParams();

      if (options.ownerExtensionIds?.length) {
        options.ownerExtensionIds.forEach((id) => {
          params.append('ownerExtensionIds', id);
        });
      }

      if (options.availability?.length) {
        options.availability.forEach((avail) => {
          params.append('availability', avail);
        });
      }

      if (options.threadIds?.length) {
        options.threadIds.forEach((id) => {
          params.append('threadIds', id);
        });
      }

      if (options.noteIds?.length) {
        options.noteIds.forEach((id) => {
          params.append('noteIds', id);
        });
      }

      if (options.perPage) {
        params.append('perPage', options.perPage.toString());
      }

      if (options.pageNumber) {
        params.append('pageNumber', options.pageNumber.toString());
      }

      const queryString = params.toString();

      const res = await this._client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/message-threads/notes${
            queryString ? `?${queryString}` : ''
          }`,
        );

      const data: ThreadNoteListResponse = await res.json();
      return data;
    } catch (error: any) {
      this.logger.error('listThreadNotes error', error);
      throw error;
    }
  }

  /**
   * Create a new note in a thread
   */
  @delegate('server')
  async createThreadNote(
    request: ThreadNoteCreateRequest,
  ): Promise<ThreadNoteModel> {
    try {
      const res = await this._client.service
        .platform()
        .post(`/restapi/v1.0/account/~/message-threads/notes`, request);

      const data: ThreadNoteModel = await res.json();
      return data;
    } catch (error: any) {
      this.logger.error('createThreadNote error', error);
      throw error;
    }
  }

  /**
   * Update a note
   */
  @delegate('server')
  async updateThreadNote(
    noteId: string,
    request: ThreadNoteUpdateRequest,
  ): Promise<ThreadNoteModel> {
    try {
      const res = await this._client.service
        .platform()
        .patch(
          `/restapi/v1.0/account/~/message-threads/notes/${noteId}`,
          request,
        );

      const data: ThreadNoteModel = await res.json();
      return data;
    } catch (error: any) {
      this.logger.error('updateThreadNote error', error);
      throw error;
    }
  }

  /**
   * Delete thread notes
   */
  @delegate('server')
  async deleteThreadNotes(request: ThreadNotesDeleteRequest): Promise<void> {
    try {
      await this._client.service
        .platform()
        .delete(`/restapi/v1.0/account/~/message-threads/notes`, request);

      // DELETE returns 204 No Content, so no JSON to parse
    } catch (error: any) {
      this.logger.error('deleteThreadNotes error', error);
      throw error;
    }
  }

  /**
   * Send a message in a thread
   */
  @delegate('server')
  async sendThreadMessage(
    threadId: string,
    text: string,
    newThread: boolean = false,
  ) {
    await this._messageSender.uniqueManager.dismissAll();

    try {
      const thread = this.getThread(threadId);
      const threadInfo = thread?.threadInfo;
      if (
        !threadInfo?.ownerParty?.phoneNumber ||
        !threadInfo.guestParty?.phoneNumber
      ) {
        throw new Error('Cannot get thread info');
      }

      const from = { phoneNumber: threadInfo.ownerParty.phoneNumber };
      const to = [{ phoneNumber: threadInfo.guestParty.phoneNumber }];

      const messageText =
        this._smsOptOut?.attachOptOutHint(threadId, text) ?? text;

      if (!this._messageSender.validateContent(messageText, [], false)) {
        return;
      }

      const response = await this._sendThreadMessage({
        threadId: newThread ? null : threadId,
        text: messageText,
        from,
        to,
      });

      // when be new thread, revert the reopen state to false
      if (newThread) {
        this.updateThreadMetaData(threadId, { reopen: false });
      }

      this.resetInputValue(threadId);
      this._smsOptOut?.resetOptOut(threadId);

      return response;
    } catch (error) {
      this.logger.error('sendThreadMessage error', error);

      await this._messageSender._onSendError(error as any);
    }
  }

  private async _sendThreadMessage({
    threadId,
    text,
    from,
    to,
  }: {
    threadId: string | null;
    text: string;
    from: { phoneNumber: string };
    to: Array<{ phoneNumber: string }>;
  }) {
    if (threadId) {
      this.setThreadLoading(threadId, true);
    }
    try {
      const body = threadId
        ? {
            threadId,
            from,
            to,
            text,
          }
        : {
            from,
            to,
            text,
          };
      const res = await this._client.service
        .platform()
        .post(`/restapi/v1.0/account/~/message-threads/messages`, body);

      await this.emitUpdateAndWaitSyncDone();

      return (await res.json()) as MessageThreadMessageResponse;
    } catch (error: any) {
      this.logger.error('sendThreadMessage error', error);
      throw error;
    } finally {
      if (threadId) {
        this.setThreadLoading(threadId, false);
      }
    }
  }

  private emitUpdateAndWaitSyncDone() {
    this.manualSync$.next();

    return Promise.all([
      this.waitSyncDone('thread'),
      this.waitSyncDone('entries'),
    ]);
  }

  private async waitSyncDone(type: 'thread' | 'entries') {
    await firstValueFrom(
      this.syncDone$.pipe(
        filter((done) => done === type),
        timeout({
          each: 10_000,
          with: () => {
            this.logger.error(
              `wait ${type} sync done timeout after 10 seconds`,
            );
            return of(false);
          },
        }),
      ),
    );
  }
}
