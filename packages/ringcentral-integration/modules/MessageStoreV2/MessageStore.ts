import { EventEmitter } from 'events';

import { GetMessageInfoResponse } from '@rc-ex/core/definitions';
import { computed, track, watch } from '@ringcentral-integration/core';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import {
  Message,
  Messages,
  MessageStoreModel,
  MessageSyncList,
} from '../../interfaces/MessageStore.model';
import { batchPutApi } from '../../lib/batchApiHelper';
import { debounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import * as messageHelper from '../../lib/messageHelper';
import { proxify } from '../../lib/proxy/proxify';
import sleep from '../../lib/sleep';
import { trackEvents } from '../Analytics';
import { callingModes } from '../CallingSettingsV2';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import {
  Deps,
  DispatchedMessageIds,
  MessageHandler,
  MessageStoreConversations,
  ProcessRawConversationListOptions,
  ProcessRawConversationStoreOptions,
  SyncFunctionOptions,
} from './MessageStore.interface';
import { messageStoreErrors } from './messageStoreErrors';
import { getSyncParams } from './messageStoreHelper';

const DEFAULT_CONVERSATIONS_LOAD_LENGTH = 10;
const DEFAULT_CONVERSATION_LOAD_LENGTH = 100;
const DEFAULT_POLLING_INTERVAL = 30 * 60 * 1000; // 30 min
const DEFAULT_TTL = 5 * 60 * 1000; // 5 min
const DEFAULT_RETRY = 62 * 1000; // 62 sec

const DEFAULT_DAY_SPAN = 7; // default to load 7 days messages
const DEFAULT_MESSAGES_FILTER = (list: Messages) => list;
const UPDATE_MESSAGE_ONCE_COUNT = 20; // Number of messages to be updated in one time

/**
 * Messages data managing module
 * fetch conversations
 * handle new message subscription
 */
@Module({
  name: 'MessageStore',
  deps: [
    'Alert',
    'Auth',
    'Client',
    'DataFetcherV2',
    'Subscription',
    'ConnectivityMonitor',
    'AppFeatures',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'MessageStoreOptions', optional: true },
  ],
})
export class MessageStore<T extends Deps = Deps> extends DataFetcherV2Consumer<
  T,
  MessageStoreModel
> {
  protected _conversationsLoadLength =
    this._deps.messageStoreOptions?.conversationsLoadLength ??
    DEFAULT_CONVERSATIONS_LOAD_LENGTH;

  protected _conversationLoadLength =
    this._deps.messageStoreOptions?.conversationLoadLength ??
    DEFAULT_CONVERSATION_LOAD_LENGTH;

  protected _messagesFilter =
    this._deps.messageStoreOptions?.messagesFilter ?? DEFAULT_MESSAGES_FILTER;

  protected _daySpan =
    this._deps.messageStoreOptions?.daySpan ?? DEFAULT_DAY_SPAN;

  protected _eventEmitter = new EventEmitter();

  protected _dispatchedMessageIds: DispatchedMessageIds = [];

  protected _handledRecord: GetMessageInfoResponse[] = null;

  constructor(deps: T) {
    super({
      deps,
    });

    const {
      disableCache = false,
      polling = false,
      timeToRetry = DEFAULT_RETRY,
      pollingInterval = DEFAULT_POLLING_INTERVAL,
      ttl = DEFAULT_TTL,
    } = this._deps.messageStoreOptions ?? {};
    this._source = new DataSource({
      ...this._deps.messageStoreOptions,
      key: 'messageStore',
      disableCache,
      ttl,
      polling,
      timeToRetry,
      pollingInterval,
      cleanOnReset: true,
      permissionCheckFunction: () => this._hasPermission,
      readyCheckFunction: () => this._deps.appFeatures.ready,
      fetchFunction: async () => this._syncData(),
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  onInit() {
    if (this._hasPermission) {
      this._deps.subscription.subscribe([subscriptionFilters.messageStore]);
    }
  }

  onInitOnce() {
    if (this._deps.connectivityMonitor) {
      watch(
        this,
        () => this._deps.connectivityMonitor.connectivity,
        (newValue) => {
          if (this.ready && this._deps.connectivityMonitor.ready && newValue) {
            this._deps.dataFetcherV2.fetchData(this._source);
          }
        },
      );
    }
    watch(
      this,
      () => this._deps.subscription.message,
      (newValue) => {
        if (
          !this.ready ||
          (this._deps.tabManager && !this._deps.tabManager.active)
        ) {
          return;
        }
        const accountExtensionEndPoint = /\/message-store$/;
        if (
          newValue &&
          accountExtensionEndPoint.test(newValue.event) &&
          newValue.body?.changes
        ) {
          this.fetchData({ passive: true });
        }
      },
    );
  }

  @proxify
  async _updateData(data: any, timestamp = Date.now()) {
    this._deps.dataFetcherV2.updateData(this._source, data, timestamp);
  }

  _processRawConversationList({
    records,
    conversationStore,
    isFSyncSuccess,
  }: ProcessRawConversationListOptions) {
    const state = this.data?.conversationList || [];
    const newState: MessageStoreModel['conversationList'] = [];
    const stateMap: Record<string, { index: number }> = {};
    if (!isFSyncSuccess) {
      if (!records || records.length === 0) {
        return state;
      }
      state.forEach((oldConversation) => {
        newState.push(oldConversation);
        stateMap[oldConversation.id] = {
          index: newState.length - 1,
        };
      });
    }
    records.forEach((record) => {
      const message = messageHelper.normalizeRecord(record);
      const id = message.conversationId;
      const newCreationTime = message.creationTime;
      const isDeleted = messageHelper.messageIsDeleted(message);
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
              creationTime: exsitedMessageList[0].creationTime,
              type: exsitedMessageList[0].type,
              messageId: exsitedMessageList[0].id,
            };
            return;
          }
          // when user delete conversation
          newState[stateMap[id].index] = null;
          delete stateMap[id];
        }
        return;
      }
      if (isDeleted || !messageHelper.messageIsAcceptable(message)) {
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
      .sort(messageHelper.sortByCreationTime);
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
      const message = messageHelper.normalizeRecord(record);
      const id = message.conversationId;
      const newMessages = newState[id] ? [].concat(newState[id]) : [];
      const oldMessageIndex = newMessages.findIndex((r) => r.id === record.id);
      if (messageHelper.messageIsDeleted(message)) {
        newState[id] = newMessages.filter((m) => m.id !== message.id);
        if (newState[id].length === 0) {
          delete newState[id];
        }
        return;
      }
      if (oldMessageIndex > -1) {
        if (
          newMessages[oldMessageIndex].lastModifiedTime <
          message.lastModifiedTime
        ) {
          newMessages[oldMessageIndex] = message;
        }
      } else if (messageHelper.messageIsAcceptable(message)) {
        newMessages.push(message);
      }
      updatedConversations[id] = 1;
      newState[id] = newMessages;
    });
    Object.keys(updatedConversations).forEach((id) => {
      const noSorted = newState[id];
      newState[id] = noSorted.sort(messageHelper.sortByCreationTime);
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
  }: SyncFunctionOptions): Promise<MessageSyncList> {
    const params = getSyncParams({
      recordCount,
      conversationLoadLength,
      dateFrom,
      dateTo,
      syncToken,
    });
    const { records, syncInfo = {} }: MessageSyncList = await this._deps.client
      .account()
      .extension()
      .messageSync()
      .list(params);
    receivedRecordsLength += records.length;
    if (!syncInfo.olderRecordsExist || receivedRecordsLength >= recordCount) {
      return { records, syncInfo };
    }
    await sleep(500);
    const olderDateTo = new Date(records[records.length - 1].creationTime);
    const olderRecordResult = await this._syncFunction({
      conversationLoadLength,
      dateFrom,
      dateTo: olderDateTo,
    });
    return {
      records: records.concat(olderRecordResult.records),
      syncInfo,
    };
  }

  async _syncData({ dateTo = null as Date, passive = false } = {}) {
    const conversationsLoadLength = this._conversationsLoadLength;
    const conversationLoadLength = this._conversationLoadLength;
    const { ownerId } = this._deps.auth;
    try {
      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - this._daySpan);
      let syncToken = dateTo ? null : this.syncInfo?.syncToken;
      const recordCount = conversationsLoadLength * conversationLoadLength;
      let data;
      try {
        data = await this._syncFunction({
          recordCount,
          conversationLoadLength,
          dateFrom,
          syncToken,
          dateTo,
        });
      } catch (error) {
        if (
          error &&
          (error.message === 'Parameter [syncToken] value is invalid' ||
            error.message === 'Parameter [syncToken] is invalid')
        ) {
          data = await this._syncFunction({
            recordCount,
            conversationLoadLength,
            dateFrom,
            syncToken: null,
            dateTo,
          });
          syncToken = null;
        } else {
          throw error;
        }
      }
      if (this._deps.auth.ownerId === ownerId) {
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
        };
      }
    } catch (error) {
      if (this._deps.auth.ownerId === ownerId) {
        console.error(error);
        throw error;
      }
    }
  }

  @proxify
  async fetchData({ passive = false } = {}) {
    const data = await this._syncData({ passive });
    this._updateData(data);
    if (passive && this._handledRecord) {
      this._dispatchMessageHandlers(this._handledRecord);
      this._handledRecord = null;
    }
  }

  onNewInboundMessage(handler: MessageHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on('newInboundMessageNotification', handler);
    }
  }

  onMessageUpdated(handler: MessageHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on('messageUpdated', handler);
    }
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
          new Date(a.creationTime).getTime() -
          new Date(b.creationTime).getTime(),
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
        this._dispatchedMessageIds = [{ id, lastModifiedTime }]
          .concat(this._dispatchedMessageIds)
          .slice(0, 20);
        this._eventEmitter.emit('messageUpdated', record);
        // For new inbound message notification
        if (
          direction === 'Inbound' &&
          readStatus === 'Unread' &&
          messageStatus === 'Received' &&
          availability === 'Alive' &&
          new Date(creationTime).getTime() >
            new Date(lastModifiedTime).getTime() - 600 * 1000
        ) {
          this._eventEmitter.emit('newInboundMessageNotification', record);
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

  @proxify
  async pushMessages(records: GetMessageInfoResponse[]) {
    this._deps.dataFetcherV2.updateData(
      this._source,
      {
        ...this.data,
        conversationList: this._processRawConversationList({
          records,
          conversationStore: this.conversationStore,
        }),
        conversationStore: this._processRawConversationStore({
          records,
        }),
      },
      this.timestamp,
    );
  }

  pushMessage(record: GetMessageInfoResponse) {
    this.pushMessages([record]);
  }

  async _updateMessageApi(messageId: string, status: Message['readStatus']) {
    const body = {
      readStatus: status,
    };
    const updateRequest: GetMessageInfoResponse = await this._deps.client
      .account()
      .extension()
      .messageStore(messageId)
      .put(body);
    return updateRequest;
  }

  async deleteMessageApi(messageId: string) {
    const response: string = await this._deps.client
      .account()
      .extension()
      .messageStore(messageId)
      .delete();
    return response;
  }

  sliceConversations() {
    const conversationIds = Object.keys(this.conversationStore);
    const messages = conversationIds.reduce(
      (acc, id) => acc.concat(this.conversationStore[id]),
      [] as Messages,
    );
    const messageIds = this._messagesFilter(messages).map(
      (item: Message) => item.id,
    );
    const conversationList = (this.data?.conversationList ?? []).filter(
      ({ messageId }) => messageIds.indexOf(messageId) > -1,
    );
    const conversationStore = Object.keys(this.conversationStore).reduce(
      (acc, key) => {
        const messages = this.conversationStore[key];
        const persist = messages.filter(
          ({ id }) => messageIds.indexOf(id) > -1,
        );
        if (!persist.length) {
          return acc;
        }
        acc[key] = persist;
        return acc;
      },
      {} as Record<string, Messages>,
    );
    this._deps.dataFetcherV2.updateData(
      this._source,
      {
        ...this.data,
        conversationList,
        conversationStore,
      },
      this.timestamp,
    );
  }

  /**
   * Batch update messages status
   */
  async _batchUpdateMessagesApi(
    messageIds: Message['id'][],
    body: {
      body: {
        readStatus: Message['readStatus'];
      };
    }[],
  ) {
    // Not to request when there're no messages
    if (!messageIds || messageIds.length === 0) {
      return;
    }

    const ids = decodeURIComponent(messageIds.join(','));
    const platform = this._deps.client.service.platform();
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
  async _updateMessagesApi(
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
        const result = await this._updateMessageApi(messageIds[0], status);
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

      const { ownerId } = this._deps.auth;
      if (allMessageIds.length > (index + 1) * UPDATE_MESSAGE_ONCE_COUNT) {
        await sleep(1300);
        // Check if owner ID has been changed. If it is, cancel this update.
        if (ownerId !== this._deps.auth.ownerId) {
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
  @proxify
  async readMessages(conversationId: Message['conversationId']) {
    this._debouncedSetConversationAsRead(conversationId);
  }

  _debouncedSetConversationAsRead = debounce({
    fn: this._setConversationAsRead,
    threshold: 500,
    leading: true,
  });

  async _setConversationAsRead(conversationId: Message['conversationId']) {
    const messageList = this.conversationStore[conversationId];
    if (!messageList || messageList.length === 0) {
      return;
    }
    const unreadMessageIds = messageList
      .filter(messageHelper.messageIsUnread)
      .map((m) => m.id);
    if (unreadMessageIds.length === 0) {
      return;
    }
    try {
      const { ownerId } = this._deps.auth;
      const updatedMessages = await this._updateMessagesApi(
        unreadMessageIds,
        'Read',
      );

      if (ownerId !== this._deps.auth.ownerId) {
        return;
      }

      this.pushMessages(updatedMessages);
    } catch (error) {
      console.error(error);

      if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(error))
      ) {
        this._deps.alert.warning({ message: messageStoreErrors.readFailed });
      }
    }
  }

  /**
   * Set message status to `UNREAD`.
   */
  @proxify
  async unreadMessage(messageId: string) {
    this.onUnmarkMessages();
    try {
      const message = await this._updateMessageApi(messageId, 'Unread');
      this.pushMessage(message);
    } catch (error) {
      console.error(error);

      if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(error))
      ) {
        this._deps.alert.warning({ message: messageStoreErrors.unreadFailed });
      }
    }
  }

  @track(trackEvents.flagVoicemail)
  @proxify
  async onUnmarkMessages() {
    //  for track mark message
  }

  @track((that: MessageStore, conversationId: Message['conversationId']) => {
    const [conversation] = that.conversationStore[conversationId] ?? [];
    if (!conversation) return;
    if (conversation.type === 'VoiceMail') {
      return [trackEvents.deleteVoicemail];
    }
    if (conversation.type === 'Fax') {
      return [trackEvents.deleteFax];
    }
  })
  @proxify
  async onDeleteConversation(conversationId: Message['conversationId']) {
    //  for track delete message
  }

  _deleteConversationStore(conversationId: Message['conversationId']) {
    if (!this.conversationStore[conversationId]) {
      return this.conversationStore;
    }
    const newState = { ...this.conversationStore };
    delete newState[conversationId];
    return newState;
  }

  _deleteConversation(conversationId: Message['conversationId']) {
    const conversationList = (this.data?.conversationList ?? []).filter(
      (c) => c.id !== conversationId,
    );
    this.onDeleteConversation(conversationId);
    const conversationStore = this._deleteConversationStore(conversationId);
    this._deps.dataFetcherV2.updateData(
      this._source,
      {
        ...this.data,
        conversationList,
        conversationStore,
      },
      this.timestamp,
    );
  }

  @proxify
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
    } catch (error) {
      console.error(error);

      if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(error))
      ) {
        this._deps.alert.warning({ message: messageStoreErrors.deleteFailed });
      }
    }
  }

  @proxify
  async deleteConversation(conversationId: Message['conversationId']) {
    if (!conversationId) {
      return;
    }
    try {
      await this._deps.client.account().extension().messageStore().delete({
        conversationId,
      });
      this._deleteConversation(conversationId);
    } catch (error) {
      console.error(error);

      if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(error))
      ) {
        this._deps.alert.warning({ message: messageStoreErrors.deleteFailed });
      }
    }
  }

  @track(trackEvents.clickToSMSVoicemailList)
  @proxify
  async onClickToSMS() {
    // for track click to sms in message list
  }

  @track((_: MessageStore, action: { fromType?: Message['type'] }) => {
    if (action.fromType === 'Pager' || action.fromType === 'SMS') {
      return [trackEvents.clickToDialTextList];
    }
    if (action.fromType === 'VoiceMail') {
      return [trackEvents.clickToDialVoicemailList];
    }
  })
  @proxify
  async onClickToCall({ fromType = '' }) {
    // for track click to call in message list
    this.onClickToCallWithRingout();
  }

  @track((that: MessageStore) => {
    if (
      // TODO: refactor for Analytics
      (that.parentModule as any).callingSettings?.callingMode ===
      callingModes.ringout
    ) {
      return [trackEvents.callPlaceRingOutCallSMSHistory];
    }
  })
  @proxify
  async onClickToCallWithRingout() {
    // for track click to call with Ringout in message list
  }

  get data() {
    return this._deps.dataFetcherV2.getData(this._source);
  }

  get timestamp() {
    return this._deps.dataFetcherV2.getTimestamp(this._source);
  }

  get syncInfo() {
    return this.data?.syncInfo;
  }

  @computed((that: MessageStore) => [that.data?.conversationStore])
  get conversationStore() {
    return this.data?.conversationStore || {};
  }

  get _hasPermission() {
    return this._deps.appFeatures.hasReadMessagesPermission;
  }

  @computed((that: MessageStore) => [
    that.data?.conversationList,
    that.conversationStore,
  ])
  get allConversations(): MessageStoreConversations {
    const { conversationList = [] } = this.data ?? {};
    return conversationList.map((conversationItem) => {
      const messageList = this.conversationStore[conversationItem.id] || [];
      return {
        ...messageList[0],
        unreadCounts: messageList.filter(messageHelper.messageIsUnread).length,
      };
    });
  }

  @computed((that: MessageStore) => [that.allConversations])
  get textConversations() {
    return this.allConversations.filter((conversation) =>
      messageHelper.messageIsTextMessage(conversation),
    );
  }

  @computed((that: MessageStore) => [that.textConversations])
  get textUnreadCounts() {
    return this.textConversations.reduce((a, b) => a + b.unreadCounts, 0);
  }

  @computed((that: MessageStore) => [that.allConversations])
  get faxMessages() {
    return this.allConversations.filter((conversation) =>
      messageHelper.messageIsFax(conversation),
    );
  }

  @computed((that: MessageStore) => [that.faxMessages])
  get faxUnreadCounts() {
    return this.faxMessages.reduce((a, b) => a + b.unreadCounts, 0);
  }

  @computed((that: MessageStore) => [that.allConversations])
  get voicemailMessages() {
    return this.allConversations.filter((conversation) =>
      messageHelper.messageIsVoicemail(conversation),
    );
  }

  @computed((that: MessageStore) => [that.voicemailMessages])
  get voiceUnreadCounts() {
    return this.voicemailMessages.reduce((a, b) => a + b.unreadCounts, 0);
  }

  @computed((that: MessageStore) => [
    that.voiceUnreadCounts,
    that.textUnreadCounts,
    that.faxUnreadCounts,
  ])
  get unreadCounts() {
    let unreadCounts = 0;
    if (this._deps.appFeatures.hasReadTextPermission) {
      unreadCounts += this.textUnreadCounts;
    }
    if (this._deps.appFeatures.hasVoicemailPermission) {
      unreadCounts += this.voiceUnreadCounts;
    }
    if (this._deps.appFeatures.hasReadFaxPermission) {
      unreadCounts += this.faxUnreadCounts;
    }
    return unreadCounts;
  }
}
