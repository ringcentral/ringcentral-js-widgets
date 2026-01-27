import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type InstantMessageEvent from '@rc-ex/core/lib/definitions/InstantMessageEvent';
import type MessageEvent from '@rc-ex/core/lib/definitions/MessageEvent';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type {
  Message,
  Messages,
  MessageStoreModel,
  MessageSyncList,
} from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { batchPutApi } from '@ringcentral-integration/commons/lib/batchApiHelper';
import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import {
  messageIsDeleted,
  messageIsUnread,
  normalizeRecord,
  sortByCreationTime,
} from '@ringcentral-integration/commons/lib/messageHelper';
import {
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ConnectivityMonitor,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  delegate,
  takeUntilAppDestroy,
  watch,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';
import type { ApiError } from '@ringcentral/sdk';
import { filter, Subject, switchMap, tap } from 'rxjs';

import { MessageStoreEventSubscriber } from '../MessageStoreEventSubscriber';

import type {
  DispatchedMessageIds,
  MessageHandler,
  MessageStoreConversations,
  MessageStoreItem,
  MessageStoreOptions,
  MessageType,
  ProcessRawConversationListOptions,
  ProcessRawConversationStoreOptions,
  SyncFunctionOptions,
} from './MessageStore.interface';
import { t } from './i18n';
import { getSyncParams } from './messageStoreHelper';

const DEFAULT_CONVERSATIONS_LOAD_LENGTH = 10;
const DEFAULT_CONVERSATION_LOAD_LENGTH = 100;
const DEFAULT_POLLING_INTERVAL = 30 * 60 * 1000; // 30 min
const DEFAULT_TTL = 5 * 60 * 1000; // 5 min
const DEFAULT_RETRY = 62 * 1000; // 62 sec

const DEFAULT_DAY_SPAN = 7; // default to load 7 days messages
const DEFAULT_MESSAGES_FILTER = (list: Messages) => list;
const UPDATE_MESSAGE_ONCE_COUNT = 20;

// reference: https://developers.ringcentral.com/api-reference/Message-Store/syncMessages
const INVALID_TOKEN_ERROR_CODES = ['CMN-101', 'MSG-333'];

export abstract class MessageStoreBase extends DataFetcherConsumer<MessageStoreModel> {
  protected _conversationsLoadLength =
    this._messageStoreOptions?.conversationsLoadLength ??
    DEFAULT_CONVERSATIONS_LOAD_LENGTH;

  protected _conversationLoadLength =
    this._messageStoreOptions?.conversationLoadLength ??
    DEFAULT_CONVERSATION_LOAD_LENGTH;

  protected _messagesFilter =
    this._messageStoreOptions?.messagesFilter ?? DEFAULT_MESSAGES_FILTER;

  protected _daySpan = this._messageStoreOptions?.daySpan ?? DEFAULT_DAY_SPAN;

  protected _messageType = this._messageStoreOptions?.messageType ?? undefined;

  protected _limitDateFrom = this._messageStoreOptions?.limitDateFrom ?? true;

  protected _message$ = new Subject<Message>();

  message$ = this._message$.asObservable();

  protected _dispatchedMessageIds: DispatchedMessageIds = [];

  protected _handledRecord: GetMessageInfoResponse[] | null = null;

  _messageIsUnreadFunc = messageIsUnread;

  /**
   * emit when receive new inbound message
   */
  newInboundMessage$ = new Subject<GetMessageInfoResponse>();

  constructor(
    protected _toast: Toast,
    protected _auth: Auth,
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _appFeatures: AppFeatures,
    protected _messageEventSubscriber: MessageStoreEventSubscriber,
    protected _availabilityMonitor?: AvailabilityMonitor,
    protected _tabManager?: any,
    protected _messageStoreOptions?: MessageStoreOptions,
  ) {
    super(_dataFetcher);

    const {
      disableCache = false,
      polling = false,
      timeToRetry = DEFAULT_RETRY,
      pollingInterval = DEFAULT_POLLING_INTERVAL,
      ttl = DEFAULT_TTL,
      messageStoreKey = 'messageStore',
    } = this._messageStoreOptions ?? {};
    this._source = new DataSource<MessageStoreModel>({
      ...this._messageStoreOptions,
      key: messageStoreKey,
      disableCache,
      ttl,
      polling,
      timeToRetry,
      pollingInterval,
      cleanOnReset: true,
      permissionCheckFunction: () => this._hasPermission,
      readyCheckFunction: () => this._appFeatures.ready,
      fetchFunction: async () => this._syncData() as Promise<MessageStoreModel>,
    });
    this._dataFetcher.register(this._source);
  }

  protected extractTypes(body: MessageEvent['body']): MessageType[] {
    return (body?.changes ?? []).reduce((acc, change) => {
      // filter out EMail type because we do not support it
      // and so the type system does not complain
      if (change?.type && (change.type as string) !== 'EMail') {
        acc.push(change.type);
      }
      return acc;
    }, [] as MessageType[]);
  }

  protected normalizeInstantEvent(
    body: InstantMessageEvent['body'],
  ): GetMessageInfoResponse {
    const { id = '', conversationId = '', type, ...message } = body || {};
    return {
      ...message,
      id: Number(id),
      conversationId: Number(conversationId),
      type: type as any,
    };
  }

  protected shouldHandleMessageTypes(types: MessageType[]) {
    const messageTypes = this._messageType;
    if (!messageTypes) {
      return true;
    }
    return types.some((t) => messageTypes?.includes(t));
  }

  override onInitOnce() {
    const messageEvents = this._messageEventSubscriber.messageEvents;
    if (messageEvents) {
      messageEvents.messageStore$
        .pipe(
          filter((body) =>
            this.shouldHandleMessageTypes(this.extractTypes(body)),
          ),
          switchMap(async (body) => {
            this.logger.log('fetchData on message event', body);
            try {
              await this.fetchData({ passive: true });
            } catch (ex) {
              console.error(
                '[MessageStoreBase] > handlerEventMessage > fetchData',
                ex,
              );
            }
          }),

          takeUntilAppDestroy,
        )
        .subscribe();

      messageEvents.instantMessage$
        .pipe(
          filter((_) => this.shouldHandleMessageTypes(['SMS'])),
          switchMap((body) => {
            this.logger.log('fetchData on message event', body);

            return this.pushMessage(this.normalizeInstantEvent(body));
          }),
          takeUntilAppDestroy,
        )
        .subscribe();
    }

    if (this._connectivityMonitor) {
      watch(
        this,
        () => this._connectivityMonitor.connectivity,
        (newValue) => {
          if (this.ready && this._connectivityMonitor.ready && newValue) {
            this._dataFetcher.fetchData(this._source);
          }
        },
      );
    }
  }

  @delegate('server')
  async _updateData(data: any, timestamp = Date.now()) {
    this._dataFetcher.updateData(this._source, data, timestamp);
  }

  _processRawConversationList({
    records,
    conversationStore,
    isFSyncSuccess,
  }: ProcessRawConversationListOptions) {
    const conversationList = this.data?.conversationList || [];
    const newState: MessageStoreModel['conversationList'] = [];
    const stateMap: Record<string, { index: number }> = {};
    if (!isFSyncSuccess) {
      if (!records || records.length === 0) {
        return conversationList;
      }

      // Prepare the newState and stateMap to process the records
      conversationList.forEach((oldConversation) => {
        newState.push(oldConversation);
        stateMap[oldConversation.id] = {
          index: newState.length - 1,
        };
      });
    }

    records.forEach((record) => {
      const message = normalizeRecord(record);
      const id = message.conversationId!;
      const newCreationTime = message.creationTime!;
      const isDeleted = messageIsDeleted(message);

      if (stateMap[id]) {
        const oldConversation = newState[stateMap[id].index];
        const creationTime = oldConversation.creationTime;
        if (creationTime < newCreationTime && !isDeleted) {
          newState[stateMap[id].index] = {
            id,
            creationTime: newCreationTime,
            type: message.type,
            messageId: message.id,
          };
        }
        // when user deleted a coversation message
        if (isDeleted && message.id === oldConversation.messageId) {
          const oldMessageList = conversationStore[id] || [];
          const exsitedMessageList = oldMessageList.filter(
            (m) => m.id !== message.id,
          );
          if (exsitedMessageList.length > 0) {
            newState[stateMap[id].index] = {
              id,
              creationTime: exsitedMessageList[0].creationTime!,
              type: exsitedMessageList[0].type,
              messageId: exsitedMessageList[0].id,
            };
            return;
          }
          // when user delete conversation
          // TODO: check assignment `null` for arr `sort`
          // @ts-ignore
          newState[stateMap[id].index] = null;
          delete stateMap[id];
        }
        return;
      }
      if (isDeleted || !this._messageIsAcceptable(message)) {
        return;
      }
      newState.push({
        id,
        creationTime: newCreationTime,
        type: message.type,
        messageId: message.id,
      });
      stateMap[id] = {
        index: newState.length - 1,
      };
    });
    return newState
      .filter((c) => !!c && typeof c.creationTime === 'number')
      .sort(sortByCreationTime);
  }

  /**
   * Don't show deleted messages
   * @param message
   * @returns
   */
  protected _messageIsAcceptable(message: Message) {
    return !messageIsDeleted(message);
  }

  _processRawConversationStore({
    records,
    isFSyncSuccess,
  }: ProcessRawConversationStoreOptions) {
    const state = this.data?.conversationStore ?? {};
    let newState: MessageStoreModel['conversationStore'] = {};
    const updatedConversations: Record<string, number> = {};
    if (!isFSyncSuccess) {
      if (!records || records.length === 0) {
        return state;
      }
      newState = {
        ...state,
      };
    }
    records.forEach((record) => {
      const message = normalizeRecord(record);
      const id = message.conversationId!;
      const newMessages: Messages[] = newState[id]
        ? // @ts-ignore
          [].concat(newState[id])
        : [];
      // @ts-ignore
      const oldMessageIndex = newMessages.findIndex((r) => r.id === record.id);
      if (messageIsDeleted(message)) {
        // @ts-ignore
        newState[id] = newMessages.filter((m) => m.id !== message.id);
        if (newState[id].length === 0) {
          delete newState[id];
        }
        return;
      }
      if (oldMessageIndex > -1) {
        if (
          // @ts-ignore
          newMessages[oldMessageIndex].lastModifiedTime <
          // @ts-ignore
          message.lastModifiedTime
        ) {
          // @ts-ignore
          newMessages[oldMessageIndex] = message;
        }
      } else if (this._messageIsAcceptable(message)) {
        // @ts-ignore
        newMessages.push(message);
      }
      updatedConversations[id] = 1;
      // @ts-ignore
      newState[id] = newMessages;
    });
    Object.keys(updatedConversations).forEach((id) => {
      const noSorted = newState[id];
      newState[id] = noSorted.sort(sortByCreationTime);
    });
    return newState;
  }

  async _syncFunction({
    recordCount,
    conversationLoadLength,
    dateFrom,
    dateTo,
    syncToken,
    receivedRecordsLength = 0,
    messageType,
  }: SyncFunctionOptions): Promise<MessageSyncList> {
    const params = getSyncParams({
      recordCount,
      conversationLoadLength,
      dateFrom,
      dateTo,
      syncToken,
      messageType,
    });
    const { records, syncInfo = {} } = (await this._client
      .account()
      .extension()
      .messageSync()
      .list(
        // TODO: that type not match with syncType
        params as any,
      )) as MessageSyncList;
    receivedRecordsLength += records.length;
    if (!syncInfo.olderRecordsExist || receivedRecordsLength >= recordCount!) {
      return { records, syncInfo };
    }
    await sleep(500);
    const olderDateTo = new Date(records[records.length - 1].creationTime!);
    const olderRecordResult = await this._syncFunction({
      conversationLoadLength,
      dateFrom,
      dateTo: olderDateTo,
      messageType,
    });
    return {
      records: records.concat(olderRecordResult.records),
      syncInfo,
    };
  }

  private async _syncData({
    dateTo,
    passive = false,
  }: {
    dateTo?: Date;
    passive?: boolean;
  } = {}) {
    const conversationsLoadLength = this._conversationsLoadLength;
    const conversationLoadLength = this._conversationLoadLength;
    const messageType = this._messageType;
    const { ownerId } = this._auth;
    try {
      const dateFrom = this._getDateFrom();
      let syncToken = dateTo
        ? undefined
        : (this.syncInfo?.syncToken as SyncFunctionOptions['syncToken']);
      const recordCount = conversationsLoadLength * conversationLoadLength;
      let data: MessageSyncList;
      try {
        data = await this._syncFunction({
          recordCount,
          conversationLoadLength,
          dateFrom,
          syncToken,
          dateTo,
          messageType,
        });
      } catch (e: unknown) {
        const error = e as ApiError;
        const responseResult = await error.response?.clone().json();
        if (
          responseResult?.errors?.some(({ errorCode = '' } = {}) =>
            INVALID_TOKEN_ERROR_CODES.includes(errorCode),
          )
        ) {
          data = await this._syncFunction({
            recordCount,
            conversationLoadLength,
            dateFrom,
            syncToken: undefined,
            dateTo,
            messageType,
          });
          syncToken = undefined;
        } else {
          throw error;
        }
      }
      if (this._auth.ownerId === ownerId) {
        const records = this._messagesFilter(data.records);
        const isFSyncSuccess = !syncToken;
        // this is only executed in passive sync mode (aka. invoked by subscription)
        if (passive) {
          this._handledRecord = records;
        }
        return {
          conversationList: this._processRawConversationList({
            records,
            conversationStore: this.conversationStore,
            isFSyncSuccess,
          }),
          conversationStore: this._processRawConversationStore({
            records,
            isFSyncSuccess,
          }),
          syncInfo: data.syncInfo,
        } as MessageStoreModel;
      }
    } catch (error) {
      if (this._auth.ownerId === ownerId) {
        console.error('[MessageStoreBase] > _syncData', error);
        throw error;
      }
    }
  }
  private _getDateFrom() {
    if (!this._limitDateFrom) {
      return undefined;
    }
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - this._daySpan);
    return dateFrom;
  }

  @delegate('server')
  override async fetchData({ passive = false } = {}) {
    const data = await this._syncData({ passive });
    this._updateData(data);
    if (passive && this._handledRecord) {
      this._dispatchMessageHandlers(this._handledRecord);
      this._handledRecord = null;
    }
  }

  onMessageUpdated(handler: MessageHandler) {
    this._message$
      .pipe(
        tap((message) => handler(message)),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  /**
   * Dispatch events to different handlers
   */
  _dispatchMessageHandlers(records: GetMessageInfoResponse[]) {
    // Sort all records by creation time
    records = records
      .slice()
      .sort(
        (a, b) =>
          new Date(a.creationTime!).getTime() -
          new Date(b.creationTime!).getTime(),
      );
    for (const record of records) {
      const {
        id,
        direction,
        availability,
        messageStatus,
        readStatus,
        lastModifiedTime,
        creationTime,
      } = record || {};
      // Notify when new message incoming
      // fix mix old messages and new messages logic error.
      if (!this._messageDispatched(record)) {
        // Mark last 10 messages that dispatched
        // To present dispatching same record twice
        this._dispatchedMessageIds = [
          { id: id!, lastModifiedTime: lastModifiedTime! },
        ]
          .concat(this._dispatchedMessageIds)
          .slice(0, 20);
        this._message$.next(record as Message);
        // For new inbound message notification
        if (
          direction === 'Inbound' &&
          readStatus === 'Unread' &&
          messageStatus === 'Received' &&
          availability === 'Alive' &&
          new Date(creationTime!).getTime() >
            new Date(lastModifiedTime!).getTime() - 600 * 1000
        ) {
          this.newInboundMessage$.next(record);
        }
      }
    }
  }

  _messageDispatched(message: GetMessageInfoResponse) {
    return this._dispatchedMessageIds.some(
      (m) =>
        m.id === message.id && m.lastModifiedTime === message.lastModifiedTime,
    );
  }

  @delegate('server')
  async pushMessages(_records: (GetMessageInfoResponse | undefined)[]) {
    const records = _records.filter((r) => !!r);
    const conversationList = this._processRawConversationList({
      records,
      conversationStore: this.conversationStore,
    });
    const conversationStore = this._processRawConversationStore({
      records,
    });
    this._dataFetcher.updateData(
      this._source,
      {
        ...this.data,
        conversationList,
        conversationStore,
      },
      this.timestamp!,
    );
  }

  pushMessage(record: GetMessageInfoResponse) {
    return this.pushMessages([record]);
  }

  async _updateMessageApi(messageId: string, status: Message['readStatus']) {
    const body = {
      readStatus: status,
    };
    const updateRequest = (await this._client
      .account()
      .extension()
      .messageStore(messageId)
      .put(body)) as GetMessageInfoResponse;
    return updateRequest;
  }

  @delegate('server')
  async deleteMessages(conversationId: string, messageIds: string[]) {
    await this.deleteMessageApi(messageIds.join(','));
    this._deleteMessages(conversationId, messageIds);
  }

  async deleteMessageApi(messageId: string) {
    const response = await this._client
      .account()
      .extension()
      .messageStore(messageId)
      .delete();
    return response;
  }

  private _deleteMessages(conversationId: string, messageIds: string[]) {
    let currentConversation = this.conversationStore[conversationId!];
    let conversationList = this.data?.conversationList?.slice() ?? [];
    if (currentConversation) {
      currentConversation = currentConversation.filter(
        (message) => !messageIds.includes(`${message.id}`),
      );
      // if there is no messages left in this conversation
      if (!currentConversation.length) {
        this._deleteConversation(conversationId);
        return;
      } else {
        // update the first message id in this conversation
        conversationList = conversationList.map((conversation) => {
          if (messageIds.includes(`${conversation.messageId}`)) {
            return {
              ...conversation,
              messageId: currentConversation[0].id,
            };
          }
          return conversation;
        });
      }
      this._dataFetcher.updateData(
        this._source,
        {
          ...this.data,
          conversationList,
          conversationStore: {
            ...this.conversationStore,
            [conversationId]: currentConversation,
          },
        },
        this.timestamp!,
      );
    }
  }

  /**
   * Batch update messages status
   */
  private async _batchUpdateMessagesApi(
    messageIds: Message['id'][],
    body: {
      body: {
        readStatus: Message['readStatus'];
      };
    }[],
  ) {
    // Not to request when there're no messages
    if (!messageIds || messageIds.length === 0) {
      return [];
    }

    const ids = decodeURIComponent(messageIds.join(','));
    const platform = this._client.service.platform();
    const responses: Response[] = await batchPutApi({
      platform,
      url: `/restapi/v1.0/account/~/extension/~/message-store/${ids}`,
      body,
    });
    return responses;
  }

  /**
   * Change messages' status to `READ` or `UNREAD`.
   * Update 20 messages per time with `_batchUpdateMessagesApi`,
   * or `_updateMessageApi` one by one in recursion.
   */
  protected async _updateMessagesApi(
    messageIds: Message['id'][],
    status: Message['readStatus'],
  ) {
    const allMessageIds = messageIds;
    if (!allMessageIds || allMessageIds.length === 0) {
      return [];
    }

    const results: GetMessageInfoResponse[] = [];

    for (let index = 0; ; index++) {
      let nextLength = (index + 1) * UPDATE_MESSAGE_ONCE_COUNT;

      if (nextLength > allMessageIds.length) {
        nextLength = allMessageIds.length - index * UPDATE_MESSAGE_ONCE_COUNT;
      } else {
        nextLength = UPDATE_MESSAGE_ONCE_COUNT;
      }

      // If there's only one message, use another api to update its status
      if (nextLength === 1) {
        const result = await this._updateMessageApi(
          `${messageIds[0] || ''}`,
          status,
        );
        return [result];
      }

      const leftIds = allMessageIds.slice(
        index * UPDATE_MESSAGE_ONCE_COUNT,
        index * UPDATE_MESSAGE_ONCE_COUNT + nextLength,
      );

      const body = leftIds.map(() => ({ body: { readStatus: status } }));
      const responses = await this._batchUpdateMessagesApi(leftIds, body);
      await Promise.all(
        responses.map(async (res) => {
          if (res.status === 200) {
            const result = await res.json();
            results.push(result);
          }
        }),
      );

      const { ownerId } = this._auth;
      if (allMessageIds.length > (index + 1) * UPDATE_MESSAGE_ONCE_COUNT) {
        await sleep(1300);
        // Check if owner ID has been changed. If it is, cancel this update.
        if (ownerId !== this._auth.ownerId) {
          return [];
        }
      } else {
        break;
      }
    }

    return results;
  }

  /**
   * Set message status to `READ`.
   */
  @delegate('server')
  async readMessages(conversationId: Message['conversationId']) {
    this._debouncedSetConversationAsRead(conversationId);
  }

  _debouncedSetConversationAsRead = debounce({
    fn: this._setConversationAsRead,
    threshold: 500,
    leading: true,
  });

  protected async _setConversationAsRead(
    conversationId: Message['conversationId'],
  ) {
    const messageList = this.conversationStore[conversationId!];
    if (!messageList || messageList.length === 0) {
      return;
    }
    const unreadMessageIds = messageList
      .filter(this._messageIsUnreadFunc)
      .map((m) => m.id);
    if (unreadMessageIds.length === 0) {
      return;
    }

    try {
      const { ownerId } = this._auth;
      const updatedMessages = await this._updateMessagesApi(
        unreadMessageIds,
        'Read',
      );

      if (ownerId !== this._auth.ownerId) {
        return;
      }

      this.pushMessages(updatedMessages);
    } catch (error: any) {
      // TODO: should check error type with instanceOf
      console.error(error);
      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        /*
         * TODO:
         * Any app used RecentMessage, ConversationLogger, ConversationsBase, Conversations
         * need to check if handle this error properly
         */
        throw error;
      }
    }
  }

  /**
   * Set message status to `UNREAD`.
   */
  @delegate('server')
  async unreadMessage(messageId: string) {
    try {
      const message = await this._updateMessageApi(messageId, 'Unread');
      this.pushMessage(message);
    } catch (error: any) {
      // TODO: should check error type with instanceOf
      console.error(error);
      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        /*
         * TODO:
         * Any app used RecentMessage, ConversationLogger, ConversationsBase, Conversations
         * need to check if handle this error properly
         */
        throw error;
      }
    }
  }

  @track(
    (that: MessageStoreBase, conversationId: Message['conversationId']) => {
      const [conversation] = that.conversationStore[conversationId!] ?? [];
      if (!conversation) return;
      if (conversation.type === 'VoiceMail') {
        return [trackEvents.deleteVoicemail];
      }
      if (conversation.type === 'Fax') {
        return [trackEvents.deleteFax];
      }
    },
  )
  @delegate('server')
  async onDeleteConversation(conversationId: Message['conversationId']) {
    //  for track delete message
  }

  @track(trackEvents.flagVoicemail)
  @delegate('server')
  async onUnmarkMessages() {
    //  for track mark message
  }

  _deleteConversationStore(conversationId: Message['conversationId']) {
    if (!this.conversationStore[conversationId!]) {
      return this.conversationStore;
    }
    const newState = { ...this.conversationStore };
    delete newState[conversationId!];
    return newState;
  }

  _deleteConversation(conversationId: Message['conversationId']) {
    const conversationList = (this.data?.conversationList ?? []).filter(
      (c) => c.id !== conversationId,
    );
    const conversationStore = this._deleteConversationStore(conversationId);
    this._dataFetcher.updateData(
      this._source,
      {
        ...this.data,
        conversationList,
        conversationStore,
      },
      this.timestamp!,
    );
  }

  @delegate('server')
  async deleteConversationMessages(conversationId: Message['conversationId']) {
    if (!conversationId) {
      return;
    }
    const messageList = this.conversationStore[conversationId];
    if (!messageList || messageList.length === 0) {
      return;
    }
    const messageId = messageList.map((m) => m.id).join(',');
    try {
      await this.deleteMessageApi(messageId);
      this._deleteConversation(conversationId);
    } catch (error: any) {
      console.error(error);
      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        throw error;
      }
    }
  }

  // TODO: for those API request should pick out of this store
  @delegate('server')
  async sendDeleteConversation(conversationId: Message['conversationId']) {
    if (!conversationId) {
      return;
    }
    await this._client
      .account()
      .extension()
      .messageStore()
      .delete({
        conversationId: [conversationId],
      });
    this._deleteConversation(conversationId);
  }

  @delegate('server')
  async deleteConversation(conversationId: Message['conversationId']) {
    try {
      await this.sendDeleteConversation(conversationId);
    } catch (error: any) {
      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        this._toast.warning({ message: t('deleteFailed') });
      }
    }
  }

  /**
   * manually insert the api response to message store before message-sync back
   * @param data response from sending fax api call
   */
  preInsertData(record: GetMessageInfoResponse) {
    const data = this.prepareData([record]);
    this._updateData(data);
  }

  protected prepareData(records: GetMessageInfoResponse[]) {
    // simulate an ISync update
    const isFSyncSuccess = false;
    return {
      conversationList: this._processRawConversationList({
        records,
        conversationStore: this.conversationStore,
        isFSyncSuccess,
      }),
      conversationStore: this._processRawConversationStore({
        records,
        isFSyncSuccess,
      }),
      syncInfo: this.data?.syncInfo, // use last sync info
    } as MessageStoreModel;
  }

  override get data() {
    return this._dataFetcher.getData(this._source);
  }

  get timestamp() {
    return this._dataFetcher.getTimestamp(this._source);
  }

  get syncInfo() {
    return this.data?.syncInfo;
  }

  @computed
  get conversationStore() {
    return this.data?.conversationStore || {};
  }

  get _hasPermission() {
    return this._appFeatures.hasReadMessagesPermission;
  }

  @computed
  get allConversationsInfo() {
    const { conversationList = [] } = this.data ?? {};
    return conversationList.reduce(
      (acc, conversation) => {
        const { id } = conversation;
        const messageList = this.conversationStore[id];
        if (messageList) {
          const conversationItem = {
            ...messageList[0],
            unreadCounts: messageList.filter(this._messageIsUnreadFunc).length,
          };
          const conversationId = conversationItem.conversationId!;
          acc.conversations.push(conversationItem);
          acc.conversationIds.push(conversationId);
          acc.map[conversationId] = conversationItem;
        }
        return acc;
      },
      {
        conversations: [] as MessageStoreConversations,
        conversationIds: [] as string[],
        map: {} as Record<string, MessageStoreItem>,
      },
    );
  }

  @computed
  get allConversations(): MessageStoreConversations {
    return this.allConversationsInfo.conversations;
  }

  get allConversationsMap() {
    return this.allConversationsInfo.map;
  }

  get conversationIds() {
    return this.allConversationsInfo.conversationIds;
  }

  getConversationByConversationId(
    conversationId: string,
  ): MessageStoreItem | undefined {
    return this.allConversationsMap[conversationId];
  }

  @computed
  get unreadCounts() {
    return this.allConversations.reduce((a, b) => a + b.unreadCounts, 0);
  }
}
