import { Module } from '../../lib/di';
import Pollable from '../../lib/Pollable';
import moduleStatuses from '../../enums/moduleStatuses';

import { batchPutApi } from '../../lib/batchApiHelper';

import * as messageHelper from '../../lib/messageHelper';
import * as messageStoreHelper from './messageStoreHelper';

import ensureExist from '../../lib/ensureExist';
import actionTypes from './actionTypes';
import getMessageStoreReducer from './getMessageStoreReducer';
import getDataReducer from './getDataReducer';
import messageStoreErrors from './messageStoreErrors';
import sleep from '../../lib/sleep';
import proxify from '../../lib/proxy/proxify';

export function processResponseData(data) {
  const records = data.records.slice();
  return {
    records: records.reverse(),
    syncTimestamp: (new Date(data.syncInfo.syncTime)).getTime(),
    syncToken: data.syncInfo.syncToken,
  };
}
const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const DEFAULT_DAY_SPAN = 7;

/**
 * @class
 * @description Messages data manageing module
 */
@Module({
  deps: [
    'Alert',
    'Client',
    'Auth',
    'Subscription',
    'ConnectivityMonitor',
    'RolesAndPermissions',
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'MessageStoreOptions', optional: true }
  ]
})
export default class MessageStore extends Pollable {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {TabManager} params.tabManage - TabManager module instance
   * @param {subscription} params.subscription - subscription module instance
   * @param {connectivityMonitor} params.connectivityMonitor - connectivityMonitor module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Number} params.ttl - local cache timestamp
   * @param {Number} params.timeToRetry - waiting time to retry
   * @param {Number} params.daySpan - day span of call log
   * @param {Bool} params.polling - polling flag, default false
   */
  constructor({
    alert,
    client,
    auth,
    ttl = DEFAULT_TTL,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    daySpan = DEFAULT_DAY_SPAN,
    storage,
    subscription,
    connectivityMonitor,
    rolesAndPermissions,
    tabManager,
    polling = false,
    disableCache = false,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._alert = this::ensureExist(alert, 'alert');
    this._client = client;
    if (!disableCache) {
      this._storage = storage;
    }
    this._subscription = this::ensureExist(subscription, 'subscription');
    this._connectivityMonitor = this::ensureExist(connectivityMonitor, 'connectivityMonitor');
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._tabManager = tabManager;
    this._ttl = ttl;
    this._timeToRetry = timeToRetry;
    this._daySpan = daySpan;
    this._auth = this::ensureExist(auth, 'auth');
    this._promise = null;
    this._lastSubscriptionMessage = null;
    this._storageKey = 'messageStore';
    this._polling = polling;
    if (this._storage) {
      this._reducer = getMessageStoreReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._storageKey,
        reducer: getDataReducer(this.actionTypes),
      });
    } else {
      this._reducer = getMessageStoreReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes),
      });
    }

    this.addSelector(
      'textUnreadCounts',
      () => this.allConversations,
      (conversations) => {
        let unreadCounts = 0;
        conversations.forEach((conversation) => {
          if (messageHelper.messageIsTextMessage(conversation)) {
            unreadCounts += conversation.unreadCounts;
          }
        });
        return unreadCounts;
      }
    );

    this.addSelector(
      'voiceUnreadCounts',
      () => this.allConversations,
      (conversations) => {
        let unreadCounts = 0;
        conversations.forEach((conversation) => {
          if (messageHelper.messageIsVoicemail(conversation)) {
            unreadCounts += conversation.unreadCounts;
          }
        });
        return unreadCounts;
      }
    );

    this.addSelector(
      'faxUnreadCounts',
      () => this.allConversations,
      (conversations) => {
        let unreadCounts = 0;
        conversations.forEach((conversation) => {
          if (messageHelper.messageIsFax(conversation)) {
            unreadCounts += conversation.unreadCounts;
          }
        });
        return unreadCounts;
      }
    );

    this.addSelector(
      'unreadCounts',
      () => this.voiceUnreadCounts,
      () => this.textUnreadCounts,
      () => this.faxUnreadCounts,
      (voiceUnreadCounts, textUnreadCounts, faxUnreadCounts) => {
        let unreadCounts = 0;
        if (this._rolesAndPermissions.readTextPermissions) {
          unreadCounts += textUnreadCounts;
        }
        if (this._rolesAndPermissions.voicemailPermissions) {
          unreadCounts += voiceUnreadCounts;
        }
        if (this._rolesAndPermissions.readFaxPermissions) {
          unreadCounts += faxUnreadCounts;
        }
        return unreadCounts;
      },
    );

    this.addSelector(
      'textConversations',
      () => this.allConversations,
      conversations =>
        conversations.filter(
          conversation => messageHelper.messageIsTextMessage(conversation)
        )
    );

    this.addSelector(
      'faxMessages',
      () => this.allConversations,
      conversations =>
        conversations.filter(
          conversation => messageHelper.messageIsFax(conversation)
        )
    );

    this.addSelector(
      'voicemailMessages',
      () => this.allConversations,
      conversations =>
        conversations.filter(
          conversation => messageHelper.messageIsVoicemail(conversation)
        )
    );

    this.addSelector(
      'textAndVoicemailMessages',
      () => this.allConversations,
      conversations =>
        conversations.filter(
          conversation =>
            (
              messageHelper.messageIsTextMessage(conversation) ||
              messageHelper.messageIsVoicemail(conversation)
            )
        )
    );

    // setting up event handlers for message
    this._newMessageNotificationHandlers = [];
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (this._shouleCleanCache()) {
        this._cleanUpCache();
      }
      if (this._connectivityMonitor) {
        this._connectivity = this._connectivityMonitor.connectivity;
      }
      await this._initMessageStore();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    } else if (
      this.ready
    ) {
      this._subscriptionHandler();
      this._checkConnectivity();
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      this._subscription.ready &&
      (!this._connectivityMonitor || this._connectivityMonitor.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this._rolesAndPermissions.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._auth.loggedIn ||
        (!!this._storage && !this._storage.ready) ||
        !this._subscription.ready ||
        (!!this._tabManager && !this._tabManager.ready) ||
        (!!this._connectivityMonitor && !this._connectivityMonitor.ready) ||
        !this._rolesAndPermissions.ready
      ) &&
      this.ready
    );
  }

  _shouleCleanCache() {
    return (
      this._auth.isFreshLogin ||
      !this.updatedTimestamp ||
      (Date.now() - this.updatedTimestamp) > this.ttl
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  _cleanUpCache() {
    this.store.dispatch({
      type: this.actionTypes.cleanUp,
    });
  }

  findConversationById(id) {
    return this.conversationMap[id.toString()];
  }

  get _hasPermission() {
    return this._rolesAndPermissions.hasReadMessagesPermission;
  }

  async _initMessageStore() {
    if (!this._hasPermission) return;
    if (!this._storage || !this._tabManager || this._tabManager.active) {
      try {
        await this._syncMessages();
      } catch (e) {
        console.error(e);
      }
    } else if (this._polling) {
      this._startPolling();
    }
    this._subscription.subscribe('/account/~/extension/~/message-store');
  }

  _subscriptionHandler() {
    if (this._storage && this._tabManager && !this._tabManager.active) {
      return;
    }
    const accountExtesionEndPoint = /\/message-store$/;
    const { message } = this._subscription;
    if (
      message &&
      message !== this._lastSubscriptionMessage &&
      accountExtesionEndPoint.test(message.event) &&
      message.body &&
      message.body.changes
    ) {
      this._lastSubscriptionMessage = this._subscription.message;
      this._syncMessages({ passive: true });
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
        this._syncMessages();
      }
    }
  }

  async _messageSyncApi(params) {
    const response = await this._client
      .account()
      .extension()
      .messageSync()
      .list(params);
    return response;
  }
  async _recursiveFSync({
    dateFrom,
    dateTo = null,
    syncToken,
    recordsLength = 0,
  }) {
    const MAX_MSG_LENGTH = 500;
    const params = messageStoreHelper.getMessageSyncParams({
      dateFrom,
      dateTo,
      syncToken,
      daySpan: this._daySpan,
    });
    const {
      records,
      syncInfo,
    } = await this._messageSyncApi(params);
    recordsLength += records.length;
    if (recordsLength > MAX_MSG_LENGTH || !syncInfo.olderRecordsExist) {
      return {
        records,
        syncInfo,
      };
    }
    await sleep(1000);
    const _dateTo = new Date(records[records.length - 1].creationTime);
    const lastResponse = await this._recursiveFSync({
      dateFrom,
      dateTo: _dateTo,
      syncToken,
      recordsLength,
    });
    return {
      records: records.concat(lastResponse.records),
      syncInfo,
    };
  }
  async _updateMessagesFromSync({ passive = false } = {}) {
    let response;
    this.store.dispatch({
      type: this.actionTypes.sync,
    });
    try {
      const oldSyncToken = this.syncToken;
      const params = messageStoreHelper.getMessageSyncParams({
        syncToken: oldSyncToken,
        daySpan: this._daySpan,
      });
      if (!oldSyncToken) {
        response = await this._recursiveFSync({
          ...params,
        });
      } else {
        response = await this._messageSyncApi(params);
      }
      const {
        records,
        syncTimestamp,
        syncToken,
      } = processResponseData(response);

      // this is only executed in passive sync mode (aka. invoked by subscription)
      if (passive) {
        this._dispatchMessageHandlers(records);
      }

      this.store.dispatch({
        type: this.actionTypes.syncSuccess,
        records,
        syncTimestamp,
        syncToken,
      });
      if (this._polling) {
        this._startPolling();
      }
    } catch (error) {
      if (this._polling) {
        this._startPolling(this.timeToRetry);
      } else {
        this._retry();
      }
      throw error;
    }
  }

  onNewInboundMessage(handler) {
    if (typeof handler === 'function') {
      this._newMessageNotificationHandlers.push(handler);
    }
  }

  /**
   * Dispatch events to different handlers
   */
  _dispatchMessageHandlers(records) {
    // Sort all records by creation time
    records = records.slice().sort((a, b) =>
      (new Date(a.creationTime)).getTime() - (new Date(b.creationTime)).getTime()
    );
    for (const record of records) {
      const {
        direction,
        availability,
        messageStatus,
        readStatus,
      } = record || {};
      // Notify when new message incoming
      if (
        direction === 'Inbound' &&
        readStatus === 'Unread' &&
        messageStatus === 'Received' &&
        availability === 'Alive' &&
        // Ensure new inbound message does not exsit locally
        !this.messageExists(record)
      ) {
        this._newMessageNotificationHandlers.forEach(handler => handler(record));
      }
    }
  }

  messageExists(message) {
    return this.messages.some(m => m.id === message.id) ||
      this.voicemailMessages.some(m => m.id === message.id) ||
      this.faxMessages.some(m => m.id === message.id);
  }

  async _updateConversationFromSync(conversationId) {
    let response;
    const conversation = this.conversationMap[conversationId.toString()];
    if (!conversation) {
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.sync,
    });
    const oldSyncToken = conversation.syncToken;
    const params = messageStoreHelper.getMessageSyncParams({
      syncToken: oldSyncToken,
      conversationId: conversation.id,
      daySpan: this._daySpan,
    });
    if (!oldSyncToken) {
      response = await this._recursiveFSync({
        ...params,
      });
    } else {
      response = await this._messageSyncApi(params);
    }
    const {
      records,
      syncTimestamp,
      syncToken,
    } = processResponseData(response);
    this.store.dispatch({
      type: this.actionTypes.syncConversationSuccess,
      records,
      syncTimestamp,
      syncToken,
      syncConversationId: conversation.id,
    });
  }

  async _syncMessages({ passive = false } = {}) {
    await this._sync(async () => {
      await this._updateMessagesFromSync({ passive });
    });
  }

  @proxify
  async fetchData() {
    await this._syncMessages();
  }

  @proxify
  async syncConversation(id) {
    await this._sync(async () => {
      await this._updateConversationFromSync(id);
    });
  }

  async _sync(syncFunction) {
    if (!this._promise) {
      this._promise = (async () => {
        try {
          await syncFunction();
          this._promise = null;
        } catch (error) {
          this._onSyncError();
          this._promise = null;
          throw error;
        }
      })();
    }
    await this._promise;
  }

  _onSyncError() {
    this.store.dispatch({
      type: this.actionTypes.syncError,
    });
  }

  async _updateMessageApi(messageId, status) {
    const body = {
      readStatus: status,
    };
    const updateRequest = await this._client.account()
      .extension()
      .messageStore(messageId)
      .put(body);
    return updateRequest;
  }

  async _deleteMessageApi(messageId) {
    await this._client.account()
      .extension()
      .messageStore(messageId)
      .delete();
  }

  async _batchUpdateMessagesApi(messageIds, body) {
    const ids = decodeURIComponent(messageIds.join(','));
    const platform = this._client.service.platform();
    const responses = await batchPutApi({
      platform,
      url: `/account/~/extension/~/message-store/${ids}`,
      body,
    });
    return responses;
  }

  async _updateMessagesApi(messageIds, status) {
    if (messageIds.length === 1) {
      const result = await this._updateMessageApi(messageIds[0], status);
      return [result];
    }
    const UPDATE_MESSAGE_ONCE_COUNT = 20;
    const leftIds = messageIds.slice(0, UPDATE_MESSAGE_ONCE_COUNT);
    const rightIds = messageIds.slice(UPDATE_MESSAGE_ONCE_COUNT);
    const body = leftIds.map(() => (
      { body: { readStatus: status } }
    ));
    const responses = await this._batchUpdateMessagesApi(leftIds, body);
    const results = [];
    responses.forEach((res) => {
      if (res.response().status === 200) {
        results.push(res.json());
      }
    });
    if (rightIds.length > 0) {
      const rightResults = await this._updateMessagesApi(rightIds, status);
      if (rightResults.length > 0) {
        results.concat(rightResults);
      }
    }
    return results;
  }

  @proxify
  async readMessages(conversationId) {
    const conversation = this.conversationMap[conversationId];
    if (!conversation) {
      return null;
    }
    const unreadMessageIds = Object.keys(conversation.unreadMessages);
    if (unreadMessageIds.length === 0) {
      return null;
    }
    try {
      const updatedMessages = await this._updateMessagesApi(unreadMessageIds, 'Read');
      this.store.dispatch({
        type: this.actionTypes.updateMessages,
        records: updatedMessages,
      });
    } catch (error) {
      console.error(error);
      this._alert.warning({
        message: messageStoreErrors.readFailed,
      });
    }
    return null;
  }

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
      this._alert.warning({
        message: messageStoreErrors.unreadFailed,
      });
    }
  }

  // for track mark message
  @proxify
  async onUnmarkMessages() {
    this.store.dispatch({
      type: this.actionTypes.markMessages,
    });
  }

  @proxify
  async deleteMessage(messageId) {
    try {
      await this._deleteMessageApi(messageId);
      this.store.dispatch({
        type: this.actionTypes.removeMessage,
        conversationId: messageId,
        messageId,
      });
    } catch (error) {
      console.error(error);
      this._alert.warning({
        message: messageStoreErrors.deleteFailed,
      });
    }
  }

  searchMessagesText(searchText) {
    return this.messages.filter((message) => {
      if (
        message.subject &&
        message.subject.toLowerCase().indexOf(searchText) >= 0
      ) {
        return true;
      }
      return false;
    });
  }

  @proxify
  async updateConversationRecipientList(conversationId, recipients) {
    this.store.dispatch({
      type: this.actionTypes.updateConversationRecipients,
      conversationId,
      recipients,
    });
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

  // for track click to sms in message list
  @proxify
  onClickToSMS() {
    this.store.dispatch({
      type: this.actionTypes.clickToSMS
    });
  }

  // for track click to call in message list
  @proxify
  onClickToCall({ fromType = '' }) {
    this.store.dispatch({
      type: this.actionTypes.clickToCall,
      fromType
    });
  }


  get cache() {
    if (this._storage) {
      return this._storage.getItem(this._storageKey);
    }
    return this.state.data;
  }

  get messages() {
    return this.cache.data.messages;
  }

  get allConversations() {
    return (this.cache && this.cache.data.conversations) || [];
  }

  get voicemailMessages() {
    return this._selectors.voicemailMessages();
  }

  get faxMessages() {
    return this._selectors.faxMessages();
  }

  get textConversations() {
    return this._selectors.textConversations();
  }

  get conversations() {
    return this.allConversations;
  }

  get conversationMap() {
    return this.cache.data.conversationMap;
  }

  get updatedTimestamp() {
    return this.cache.updatedTimestamp;
  }

  get syncTimestamp() {
    return this.cache.data.syncTimestamp;
  }

  get syncToken() {
    return this.cache.syncToken;
  }

  get status() {
    return this.state.status;
  }

  get unreadCounts() {
    return this._selectors.unreadCounts();
  }

  get textUnreadCounts() {
    return this._selectors.textUnreadCounts();
  }

  get voiceUnreadCounts() {
    return this._selectors.voiceUnreadCounts();
  }

  get faxUnreadCounts() {
    return this._selectors.faxUnreadCounts();
  }
  get messageStoreStatus() {
    return this.state.messageStoreStatus;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.status === moduleStatuses.pending;
  }

  get ttl() {
    return this._ttl;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  get timestamp() {
    return this.syncTimestamp;
  }
}
