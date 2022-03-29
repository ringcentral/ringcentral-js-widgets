import moduleStatuses from '../../enums/moduleStatuses';
import subscriptionFilters from '../../enums/subscriptionFilters';
import syncTypes from '../../enums/syncTypes';
import { batchPutApi } from '../../lib/batchApiHelper';
import debounce from '../../lib/debounce';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import * as messageHelper from '../../lib/messageHelper';
import Pollable from '../../lib/Pollable';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import { sleep } from '../../lib/sleep';
import { actionTypes } from './actionTypes';
import messageStoreErrors from './errors';
import getDataReducer from './getDataReducer';
import getReducer from './getReducer';

const DEFAULT_CONVERSATIONS_LOAD_LENGTH = 10;
const DEFAULT_CONVERSATION_LOAD_LENGTH = 100;
const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_REFRESH_LOCK = 5 * 60 * 1000;
const DEFAULT_RETRY = 62 * 1000;
const DEFAULT_DAYSPAN = 7; // default to load 7 days' messages
const DEFAULT_MESSAGES_FILTER = (list) => list;
// Number of messages to be updated in one time
const UPDATE_MESSAGE_ONCE_COUNT = 20;

function getSyncParams({
  recordCount,
  conversationLoadLength,
  dateFrom,
  dateTo,
  syncToken,
}) {
  if (syncToken) {
    return {
      syncToken,
      syncType: syncTypes.iSync,
    };
  }
  const params = {
    recordCountPerConversation: conversationLoadLength,
    syncType: syncTypes.fSync,
  };
  if (recordCount) {
    params.recordCount = recordCount;
  }
  if (dateFrom) {
    params.dateFrom = dateFrom.toISOString();
  }
  if (dateTo) {
    params.dateTo = dateTo.toISOString();
  }
  return params;
}

/**
 * @class

 * @description Messages data managing module
 * fetch conversations
 * handle new message subscription
 */
@Module({
  deps: [
    'Alert',
    'Client',
    'Auth',
    'Subscription',
    'ConnectivityMonitor',
    'AppFeatures',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'MessageStoreOptions', optional: true },
  ],
})
export default class MessageStore extends Pollable {
  constructor({
    auth,
    alert,
    client,
    subscription,
    storage,
    tabManager,
    appFeatures,
    connectivityMonitor,
    availabilityMonitor,
    ttl = DEFAULT_TTL,
    refreshLock = DEFAULT_REFRESH_LOCK,
    polling = false,
    disableCache = false,
    timeToRetry = DEFAULT_RETRY,
    daySpan = DEFAULT_DAYSPAN,
    conversationsLoadLength = DEFAULT_CONVERSATIONS_LOAD_LENGTH,
    conversationLoadLength = DEFAULT_CONVERSATION_LOAD_LENGTH,
    messagesFilter = DEFAULT_MESSAGES_FILTER,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });

    this._auth = ensureExist.call(this, auth, 'auth');
    this._alert = ensureExist.call(this, alert, 'alert');
    this._client = ensureExist.call(this, client, 'client');
    this._subscription = ensureExist.call(this, subscription, 'subscription');
    this._appFeatures = appFeatures;

    if (!disableCache) {
      this._storage = storage;
    }

    this._dataStorageKey = 'messageStoreData';

    this._tabManager = tabManager;
    this._connectivityMonitor = connectivityMonitor;
    this._availabilityMonitor = availabilityMonitor;
    this._ttl = ttl;
    this._refreshLock = refreshLock;
    this._timeToRetry = timeToRetry;
    this._polling = polling;
    this._conversationsLoadLength = conversationsLoadLength;
    this._conversationLoadLength = conversationLoadLength;
    this._messagesFilter = messagesFilter;

    this._daySpan = daySpan;

    if (this._storage) {
      this._reducer = getReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._dataStorageKey,
        reducer: getDataReducer(this.actionTypes),
      });
    } else {
      this._reducer = getReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes, false),
      });
    }

    this._promise = null;
    this._lastSubscriptionMessage = null;
    // setting up event handlers for message
    this._newInboundMessageNotificationHandlers = [];
    this._messageUpdatedHandlers = [];
    this._dispatchedMessageIds = [];
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      await this._init();
    } else if (this._isDataReady()) {
      /**
       * When there is cached data, triggering init will immediately trigger initSuccess.
       * This causes the code to run this._checkConnectivity() before initializing
       * this._connectivity, forcing the the module to always run sync on app restart.
       * Moving the this._connectivity initializating just before initSuccess ensure
       * that this._checkConnectivity is only run when this._connectivity has been set.
       */
      if (this._connectivityMonitor) {
        this._connectivity = this._connectivityMonitor.connectivity;
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._clearTimeout();
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    } else if (this.ready) {
      this._subscriptionHandler();
      this._checkConnectivity();
    }
  }

  _shouldInit() {
    return !!(
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      (!this._connectivityMonitor || this._connectivityMonitor.ready) &&
      this._subscription.ready &&
      this._appFeatures.ready &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return !!(
      (!this._auth.loggedIn ||
        (this._storage && !this._storage.ready) ||
        !this._subscription.ready ||
        (!!this._connectivityMonitor && !this._connectivityMonitor.ready) ||
        !this._appFeatures.ready ||
        (this._tabManager && !this._tabManager.ready) ||
        (this._availabilityMonitor && !this._availabilityMonitor.ready)) &&
      this.ready
    );
  }

  _isDataReady() {
    return (
      this.status === moduleStatuses.initializing &&
      (!this._hasPermission || this.syncInfo !== null)
    );
  }

  async _init() {
    this.store.dispatch({
      type: this.actionTypes.init,
    });
    if (!this._hasPermission) {
      return;
    }
    if (this._shouldFetch()) {
      try {
        await this.fetchData();
      } catch (e) {
        console.error('fetchData error:', e);
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
    this._subscription.subscribe([subscriptionFilters.messageStore]);
  }

  _shouldFetch() {
    return (
      (!this._tabManager || this._tabManager.active) &&
      (!this.timestamp || Date.now() - this.timestamp > this.refreshLock)
    );
  }

  _subscriptionHandler() {
    if (this._storage && this._tabManager && !this._tabManager.active) {
      return;
    }
    const accountExtensionEndPoint = /\/message-store$/;
    const { message } = this._subscription;
    if (
      message &&
      message !== this._lastSubscriptionMessage &&
      accountExtensionEndPoint.test(message.event) &&
      message.body &&
      message.body.changes
    ) {
      this._lastSubscriptionMessage = this._subscription.message;
      this.fetchData({ passive: true });
    }
  }

  _checkConnectivity() {
    if (
      this._connectivityMonitor &&
      this._connectivityMonitor.ready &&
      this._connectivity !== this._connectivityMonitor.connectivity
    ) {
      this._connectivity = this._connectivityMonitor.connectivity;
      if (this._connectivity) {
        this.fetchData();
      }
    }
  }

  async _syncFunction({
    recordCount,
    conversationLoadLength,
    dateFrom,
    dateTo,
    syncToken,
    receivedRecordsLength = 0,
  }) {
    const params = getSyncParams({
      recordCount,
      conversationLoadLength,
      dateFrom,
      dateTo,
      syncToken,
    });
    const { records, syncInfo } = await this._client
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

  getSyncActionType({ syncToken }) {
    if (syncToken) {
      return this.actionTypes.conversationsISyncSuccess;
    }
    return this.actionTypes.conversationsFSyncSuccess;
  }

  async _syncData({
    dateTo,
    conversationsLoadLength = this._conversationsLoadLength,
    conversationLoadLength = this._conversationLoadLength,
    passive = false,
  } = {}) {
    this.store.dispatch({
      type: this.actionTypes.conversationsSync,
    });
    const { ownerId } = this._auth;
    try {
      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - this._daySpan);
      let syncToken = dateTo ? null : this.syncInfo && this.syncInfo.syncToken;
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
      if (this._auth.ownerId === ownerId) {
        const actionType = this.getSyncActionType({ dateTo, syncToken });
        this.store.dispatch({
          type: actionType,
          recordCount,
          records: this._messagesFilter(data.records),
          syncInfo: data.syncInfo,
          timestamp: Date.now(),
          conversationStore: this.conversationStore,
        });
        // this is only executed in passive sync mode (aka. invoked by subscription)
        if (passive) {
          this._dispatchMessageHandlers(this._messagesFilter(data.records));
        }
      }
    } catch (error) {
      if (this._auth.ownerId === ownerId) {
        console.error(error);
        this.store.dispatch({
          type: this.actionTypes.conversationsSyncError,
          error,
        });
        throw error;
      }
    }
  }

  async _fetchData({
    dateTo,
    conversationsLoadLength,
    conversationLoadLength,
    passive = false,
  } = {}) {
    try {
      await this._syncData({
        dateTo,
        conversationsLoadLength,
        conversationLoadLength,
        passive,
      });
      if (this._polling) {
        this._startPolling();
      }
      this._promise = null;
    } catch (error) {
      this._promise = null;
      if (this._polling) {
        this._startPolling(this.timeToRetry);
      } else {
        this._retry();
      }
      throw error;
    }
  }

  _startPolling(t = this.timestamp + this.ttl + 10 - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (
        (!this._tabManager || this._tabManager.active) &&
        this.pageNumber === 1
      ) {
        if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
          this.fetchData();
        } else {
          this._startPolling();
        }
      } else if (this.timestamp && Date.now() - this.timestamp < this.ttl) {
        this._startPolling();
      } else {
        this._startPolling(this.timeToRetry);
      }
    }, t);
  }

  @proxify
  async fetchData({ passive = false } = {}) {
    if (!this._promise) {
      this._promise = this._fetchData({ passive });
    }
    await this._promise;
  }

  onNewInboundMessage(handler) {
    if (typeof handler === 'function') {
      this._newInboundMessageNotificationHandlers.push(handler);
    }
  }

  onMessageUpdated(handler) {
    if (typeof handler === 'function') {
      this._messageUpdatedHandlers.push(handler);
    }
  }

  /**
   * Dispatch events to different handlers
   */
  _dispatchMessageHandlers(records) {
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
        this._messageUpdatedHandlers.forEach((handler) => handler(record));
        // For new inbound message notification
        if (
          direction === 'Inbound' &&
          readStatus === 'Unread' &&
          messageStatus === 'Received' &&
          availability === 'Alive' &&
          new Date(creationTime).getTime() >
            new Date(lastModifiedTime).getTime() - 600 * 1000
        ) {
          this._newInboundMessageNotificationHandlers.forEach((handler) =>
            handler(record),
          );
        }
      }
    }
  }

  _messageDispatched(message) {
    return this._dispatchedMessageIds.some(
      (m) =>
        m.id === message.id && m.lastModifiedTime === message.lastModifiedTime,
    );
  }

  @proxify
  async pushMessages(records) {
    this.store.dispatch({
      type: this.actionTypes.updateMessages,
      records,
    });
  }

  pushMessage(record) {
    this.pushMessages([record]);
  }

  async _updateMessageApi(messageId, status) {
    const body = {
      readStatus: status,
    };
    const updateRequest = await this._client
      .account()
      .extension()
      .messageStore(messageId)
      .put(body);
    return updateRequest;
  }

  async deleteMessageApi(messageId) {
    const response = await this._client
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
      [],
    );
    const messageIds = this._messagesFilter(messages).map((item) => item.id);
    this.store.dispatch({
      type: this.actionTypes.sliceConversations,
      messageIds,
    });
  }

  /**
   * Batch update messages status
   *
   * @param {*} messageIds
   * @param {*} body
   * @returns
   * @memberof MessageStore
   */
  async _batchUpdateMessagesApi(messageIds, body) {
    // Not to request when there're no messages
    if (!messageIds || messageIds.length === 0) {
      return;
    }

    const ids = decodeURIComponent(messageIds.join(','));
    const platform = this._client.service.platform();
    const responses = await batchPutApi({
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
   *
   * @param {*} messageIds
   * @param {*} status
   * @returns
   * @memberof MessageStore
   */
  async _updateMessagesApi(messageIds, status) {
    const allMessageIds = messageIds;
    if (!allMessageIds || allMessageIds.length === 0) {
      return [];
    }

    const results = [];

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
   *
   * @param {*} conversationId
   * @returns
   * @memberof MessageStore
   */
  @proxify
  async readMessages(conversationId) {
    this._debouncedSetConversationAsRead(conversationId);
  }

  _debouncedSetConversationAsRead = debounce(
    this._setConversationAsRead,
    500,
    true,
  );

  async _setConversationAsRead(conversationId) {
    const messageList = this.conversationStore[conversationId];
    if (!messageList || messageList.length === 0) {
      return null;
    }
    const unreadMessageIds = messageList
      .filter(messageHelper.messageIsUnread)
      .map((m) => m.id);
    if (unreadMessageIds.length === 0) {
      return null;
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

      this.store.dispatch({
        type: this.actionTypes.updateMessages,
        records: updatedMessages,
      });
    } catch (error) {
      console.error(error);

      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        this._alert.warning({ message: messageStoreErrors.readFailed });
      }
    }
    return null;
  }

  /**
   * Set message status to `UNREAD`.
   *
   * @param {*} conversationId
   * @returns
   * @memberof MessageStore
   */
  @proxify
  async unreadMessage(messageId) {
    //  for track mark message
    this.store.dispatch({
      type: this.actionTypes.markMessages,
    });
    try {
      const message = await this._updateMessageApi(messageId, 'Unread');
      this.store.dispatch({
        type: this.actionTypes.updateMessages,
        records: [message],
      });
    } catch (error) {
      console.error(error);

      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        this._alert.warning({ message: messageStoreErrors.unreadFailed });
      }
    }
  }

  @proxify
  async onUnmarkMessages() {
    this.store.dispatch({
      type: this.actionTypes.markMessages,
    });
  }

  @proxify
  async deleteConversationMessages(conversationId) {
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
      this.store.dispatch({
        type: this.actionTypes.deleteConversation,
        conversationId,
      });
    } catch (error) {
      console.error(error);

      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        this._alert.warning({ message: messageStoreErrors.deleteFailed });
      }
    }
  }

  @proxify
  async deleteConversation(conversationId) {
    if (!conversationId) {
      return;
    }
    try {
      await this._client.account().extension().messageStore().delete({
        conversationId,
      });
      this.store.dispatch({
        type: this.actionTypes.deleteConversation,
        conversationId,
      });
    } catch (error) {
      console.error(error);

      if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(error))
      ) {
        this._alert.warning({ message: messageStoreErrors.deleteFailed });
      }
    }
  }

  // for track click to sms in message list
  @proxify
  onClickToSMS() {
    this.store.dispatch({
      type: this.actionTypes.clickToSMS,
    });
  }

  // for track click to call in message list
  @proxify
  onClickToCall({ fromType = '' }) {
    this.store.dispatch({
      type: this.actionTypes.clickToCall,
      fromType,
    });
  }

  get status() {
    return this.state.status;
  }

  get data() {
    return this._storage
      ? this._storage.getItem(this._dataStorageKey)
      : this.state.data;
  }

  get timestamp() {
    return this.data && this.data.timestamp;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  get ttl() {
    return this._ttl;
  }

  get refreshLock() {
    return this._refreshLock;
  }

  get syncInfo() {
    return this.data && this.data.syncInfo;
  }

  get conversationStore() {
    return this.data && this.data.conversationStore;
  }

  get _hasPermission() {
    return this._appFeatures.hasReadMessagesPermission;
  }

  @selector
  allConversations = [
    () => this.data && this.data.conversationList,
    () => this.conversationStore,
    (conversationList = [], conversationStore) =>
      conversationList.map((conversationItem) => {
        const messageList = conversationStore[conversationItem.id] || [];
        return {
          ...messageList[0],
          unreadCounts: messageList.filter(messageHelper.messageIsUnread)
            .length,
        };
      }),
  ];

  @selector
  textConversations = [
    () => this.allConversations,
    (conversations) =>
      conversations.filter((conversation) =>
        messageHelper.messageIsTextMessage(conversation),
      ),
  ];

  @selector
  textUnreadCounts = [
    () => this.textConversations,
    (conversations) => conversations.reduce((a, b) => a + b.unreadCounts, 0),
  ];

  @selector
  faxMessages = [
    () => this.allConversations,
    (conversations) =>
      conversations.filter((conversation) =>
        messageHelper.messageIsFax(conversation),
      ),
  ];

  @selector
  faxUnreadCounts = [
    () => this.faxMessages,
    (conversations) => conversations.reduce((a, b) => a + b.unreadCounts, 0),
  ];

  @selector
  voicemailMessages = [
    () => this.allConversations,
    (conversations) =>
      conversations.filter((conversation) =>
        messageHelper.messageIsVoicemail(conversation),
      ),
  ];

  @selector
  voiceUnreadCounts = [
    () => this.voicemailMessages,
    (conversations) => conversations.reduce((a, b) => a + b.unreadCounts, 0),
  ];

  @selector
  unreadCounts = [
    () => this.voiceUnreadCounts,
    () => this.textUnreadCounts,
    () => this.faxUnreadCounts,
    (voiceUnreadCounts, textUnreadCounts, faxUnreadCounts) => {
      let unreadCounts = 0;
      if (this._appFeatures.hasReadTextPermission) {
        unreadCounts += textUnreadCounts;
      }
      if (this._appFeatures.hasVoicemailPermission) {
        unreadCounts += voiceUnreadCounts;
      }
      if (this._appFeatures.hasReadFaxPermission) {
        unreadCounts += faxUnreadCounts;
      }
      return unreadCounts;
    },
  ];
}
