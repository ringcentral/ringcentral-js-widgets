import { Module } from '../../lib/di';
import LoggerBase from '../../lib/LoggerBase';
import ensureExist from '../../lib/ensureExist';
import actionTypes from './actionTypes';
import getDataReducer from './getDataReducer';
import messageTypes from '../../enums/messageTypes';
import { getNumbersFromMessage, sortByDate } from '../../lib/messageHelper';
import sleep from '../../lib/sleep';
import proxify from '../../lib/proxy/proxify';

export function getLogId({ conversationId, date }) {
  return `${conversationId}/${date}`;
}

export function conversationLogIdentityFunction(conversation) {
  return conversation.conversationLogId;
}

/**
 * @class
 * @description Conversation logger module
 */
@Module({
  deps: [
    'Auth',
    'Storage',
    { dep: 'TabManager', optional: true },
    'ContactMatcher',
    'ConversationMatcher',
    'DateTimeFormat',
    'ExtensionInfo',
    'MessageStore',
    'RolesAndPermissions',
    { dep: 'ConversationLoggerOptions', optional: false }
  ]
})
export default class ConversationLogger extends LoggerBase {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {ConversationMatcher} params.conversationMatcher - conversationMatcher module instance
   * @param {DateTimeFormat} params.dateTimeFormat - dateTimeFormat module instance
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Storage} params.storage - storage module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {Function} params.isLoggedContact - get if contact is logged
   * @param {Function} params.formatDateTime - data time format
   */
  constructor({
    auth,
    contactMatcher,
    conversationMatcher,
    dateTimeFormat,
    extensionInfo,
    messageStore,
    rolesAndPermissions,
    storage,
    tabManager,
    isLoggedContact = () => false,
    isAutoUpdate = true,
    formatDateTime = (...args) => dateTimeFormat.formatDateTime(...args),
    ...options
  }) {
    super({
      ...options,
      name: 'conversationLogger',
      actionTypes,
      identityFunction: conversationLogIdentityFunction,
    });
    this._auth = this::ensureExist(auth, 'auth');
    this._contactMatcher = this::ensureExist(contactMatcher, 'contactMatcher');
    this._conversationMatcher = this::ensureExist(conversationMatcher, 'conversationMatcher');
    this._dateTimeFormat = this::ensureExist(dateTimeFormat, 'dateTimeFormat');
    this._extensionInfo = this::ensureExist(extensionInfo, 'extensionInfo');
    this._messageStore = this::ensureExist(messageStore, 'messageStore');
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._storage = this::ensureExist(storage, 'storage');
    this._tabManager = tabManager;
    this._isLoggedContact = isLoggedContact;
    this._formatDateTime = formatDateTime;
    this._isAutoUpdate = isAutoUpdate;
    this._storageKey = `${this._name}Data`;
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getDataReducer(this.actionTypes),
    });

    this.addSelector('conversationLogMap',
      () => Object
        .values(this._messageStore.conversationStore)
        .reduce((allMessages, messages) => [...allMessages, ...messages], []),
      () => this._extensionInfo.extensionNumber,
      () => this._conversationMatcher.dataMapping,
      (messages, extensionNumber, conversationLogMapping = {}) => {
        const mapping = {};
        messages.slice().sort(sortByDate)
          .forEach((message) => {
            const { conversationId } = message;
            const date = this._formatDateTime({
              type: 'date',
              utcTimestamp: message.creationTime,
            });
            if (!mapping[conversationId]) {
              mapping[conversationId] = {};
            }
            if (!mapping[conversationId][date]) {
              const conversationLogId = getLogId({ conversationId, date });
              mapping[conversationId][date] = {
                conversationLogId,
                conversationId,
                creationTime: message.createTime, // for sorting
                date,
                type: message.type,
                messages: [],
                conversationLogMatches: conversationLogMapping[conversationLogId] || [],
                ...getNumbersFromMessage({ extensionNumber, message }),
              };
            }
            mapping[conversationId][date].messages.push(message);
          });
        return mapping;
      },
    );

    this.addSelector('conversationLogIds',
      this._selectors.conversationLogMap,
      (conversationLogMap) => {
        const logIds = [];
        Object.keys(conversationLogMap).forEach((conversationId) => {
          Object.keys(conversationLogMap[conversationId]).forEach((date) => {
            logIds.push(conversationLogMap[conversationId][date].conversationLogId);
          });
        });
        return logIds;
      },
    );
    this.addSelector('uniqueNumbers',
      this._selectors.conversationLogMap,
      (conversationLogMap) => {
        const output = [];
        const numberMap = {};
        function addIfNotExist(contact) {
          const number = contact.phoneNumber || contact.extensionNumber;
          if (number && !numberMap[number]) {
            output.push(number);
            numberMap[number] = true;
          }
        }
        Object.keys(conversationLogMap).forEach((conversationId) => {
          Object.keys(conversationLogMap[conversationId]).forEach((date) => {
            const conversation = conversationLogMap[conversationId][date];
            addIfNotExist(conversation.self);
            conversation.correspondents.forEach(addIfNotExist);
          });
        });
        return output;
      },
    );

    this._contactMatcher.addQuerySource({
      getQueriesFn: this._selectors.uniqueNumbers,
      readyCheckFn: () => (
        this._messageStore.ready &&
        this._extensionInfo.ready
      ),
    });
    this._conversationMatcher.addQuerySource({
      getQueriesFn: this._selectors.conversationLogIds,
      readyCheckFn: () => (
        this._messageStore.ready &&
        this._extensionInfo.ready
      ),
    });

    this._lastProcessedConversationLogMap = null;
    this._autoLogQueue = [];
    this._autoLogPromise = null;
  }

  _shouldInit() {
    return this.pending &&
      this._contactMatcher.ready &&
      this._conversationMatcher.ready &&
      this._dateTimeFormat.ready &&
      this._extensionInfo.ready &&
      this._messageStore.ready &&
      this._rolesAndPermissions.ready &&
      this._storage.ready &&
      (!this._tabManager || this._tabManager.ready) &&
      this._readyCheckFunction();
  }
  _shouldReset() {
    return this.ready &&
      (
        !this._contactMatcher.ready ||
        !this._conversationMatcher.ready ||
        !this._dateTimeFormat.ready ||
        !this._extensionInfo.ready ||
        !this._messageStore.ready ||
        !this._rolesAndPermissions.ready ||
        !this._storage.ready ||
        (this._tabManager && !this._tabManager.ready) ||
        !this._readyCheckFunction()
      );
  }
  _onReset() {
    this._lastProcessedConversations = null;
    this._lastAutoLog = null;
    this._autoLogPromise = null;
    this._autoLogQueue = [];
  }

  async _processQueue() {
    const { ownerId } = this._auth;
    await sleep(300);
    if (ownerId !== this._auth.ownerId) return;
    await Promise.all(
      this._autoLogQueue.splice(0, 10)
        .map(conversation => this._processConversationLog({ conversation }))
    );
    if (
      ownerId === this._auth.ownerId &&
      this._autoLogQueue.length > 0
    ) {
      this._autoLogPromise = this._processQueue();
    } else {
      this._autoLogPromise = null;
    }
  }
  _queueAutoLogConversation({
    conversation,
  }) {
    this._autoLogQueue.push(conversation);
    if (!this._autoLogPromise) {
      this._autoLogPromise = this._processQueue();
    }
  }

  _getCorrespondentMatches(conversation) {
    return (conversation.correspondents &&
      conversation.correspondents.reduce((result, contact) => {
        const number = contact.phoneNumber || contact.extensionNumber;
        return number && this._contactMatcher.dataMapping[number] ?
          result.concat(this._contactMatcher.dataMapping[number]) :
          result;
      }, [])) || [];
  }
  getLastMatchedCorrespondentEntity(conversation) {
    const conversationLog = this.conversationLogMap[conversation.conversationId];
    if (!conversationLog) {
      return null;
    }
    const lastRecord = Object.keys(conversationLog)
      .map(date => (
        this.conversationLogMap[conversation.conversationId][date]
      )).sort(sortByDate).find(item => (
        item.conversationLogMatches.length > 0
      ));
    if (
      lastRecord &&
      this._conversationMatcher.dataMapping[lastRecord.conversationLogId] &&
      this._conversationMatcher.dataMapping[lastRecord.conversationLogId].length
    ) {
      const lastActivity = this._conversationMatcher.dataMapping[lastRecord.conversationLogId][0];
      const correspondentMatches = this._getCorrespondentMatches(lastRecord);
      return correspondentMatches.find(item => (
        this._isLoggedContact(conversation, lastActivity, item)
      ));
    }
    return null;
  }
  async _processConversationLog({
    conversation,
  }) {
    // await this._conversationMatcher.triggerMatch();
    await this._conversationMatcher.match({ queries: [conversation.conversationLogId] });
    if (
      this._isAutoUpdate &&
      this._conversationMatcher.dataMapping[conversation.conversationLogId] &&
      this._conversationMatcher.dataMapping[conversation.conversationLogId].length
    ) {
      // update conversation
      await this._autoLogConversation({
        conversation,
      });
    } else if (this.autoLog && conversation.type === messageTypes.sms) {
      // new entry
      const numbers = [];
      const numberMap = {};
      /* eslint { "no-inner-declarations": 0 } */
      function addIfNotExist(contact) {
        const number = contact.phoneNumber || contact.extensionNumber;
        if (number && !numberMap[number]) {
          numbers.push(number);
          numberMap[number] = true;
        }
      }
      addIfNotExist(conversation.self);
      conversation.correspondents.forEach(addIfNotExist);
      await this._contactMatcher.match({ queries: numbers });
      const selfNumber = conversation.self &&
        (conversation.self.phoneNumber || conversation.self.extensionNumber);
      const selfMatches = (selfNumber &&
        this._contactMatcher.dataMapping[conversation.self]) || [];
      const correspondentMatches = this._getCorrespondentMatches(conversation);

      const selfEntity = (selfMatches &&
        selfMatches.length === 1 &&
        selfMatches[0]) ||
        null;

      let correspondentEntity = this.getLastMatchedCorrespondentEntity(conversation);

      correspondentEntity = correspondentEntity ||
        (correspondentMatches &&
          correspondentMatches.length === 1 &&
          correspondentMatches[0]) ||
        null;
      await this._autoLogConversation({
        conversation,
        selfEntity,
        correspondentEntity,
      });
    }
  }

  _processConversationLogMap() {
    if (this.ready && this._lastAutoLog !== this.autoLog) {
      this._lastAutoLog = this.autoLog;
      if (this.autoLog) {
        // force conversation log checking when switch auto log to on
        this._lastProcessedConversations = null;
      }
    }
    if (this.ready && this._lastProcessedConversations !== this.conversationLogMap) {
      this._conversationMatcher.triggerMatch();
      this._contactMatcher.triggerMatch();
      const oldMap = this._lastProcessedConversations || {};
      this._lastProcessedConversations = this.conversationLogMap;
      if (!this._tabManager || this._tabManager.active) {
        Object.keys(this._lastProcessedConversations).forEach((conversationId) => {
          Object.keys(this._lastProcessedConversations[conversationId]).forEach((date) => {
            const conversation = this._lastProcessedConversations[conversationId][date];
            if (
              !oldMap[conversationId] ||
              !oldMap[conversationId][date] ||
              conversation.messages[0].id !== oldMap[conversationId][date].messages[0].id
            ) {
              this._queueAutoLogConversation({
                conversation,
              });
            }
          });
        });
      }
    }
  }

  async _onStateChange() {
    await super._onStateChange();
    this._processConversationLogMap();
  }

  async _autoLogConversation({ conversation, selfEntity, correspondentEntity }) {
    await this.log({
      conversation,
      selfEntity,
      correspondentEntity,
    });
  }

  @proxify
  async log({ conversation, ...options }) {
    super.log({ item: conversation, ...options });
  }

  @proxify
  async logConversation({
    conversationId, correspondentEntity, redirect, ...options
  }) {
    if (this.conversationLogMap[conversationId]) {
      await Promise.all(Object.keys(this.conversationLogMap[conversationId])
        .map(date => this.conversationLogMap[conversationId][date])
        .sort(sortByDate)
        .map((conversation, idx) => {
          const queueIndex = this._autoLogQueue
            .find(item => item.conversationLogId === conversation.conversationLogId);
          if (queueIndex > -1) {
            this._autoLogQueue.splice(queueIndex, 1);
          }
          return this.log({
            ...options,
            conversation,
            correspondentEntity,
            redirect: redirect && idx === 0, // only direct on the first item
          });
        }));
    }
  }

  get available() {
    const {
      SMSReceiving,
      PagerReceiving,
    } = this._rolesAndPermissions.serviceFeatures;
    return !!(
      (SMSReceiving && SMSReceiving.enabled) ||
      (PagerReceiving && PagerReceiving.enabled)
    );
  }

  get autoLog() {
    return this._storage.getItem(this._storageKey).autoLog;
  }

  @proxify
  async setAutoLog(autoLog) {
    if (this.ready && autoLog !== this.autoLog) {
      this.store.dispatch({
        type: this.actionTypes.setAutoLog,
        autoLog,
      });
    }
  }

  get conversationLogMap() {
    return this._selectors.conversationLogMap();
  }

  get conversationLogIds() {
    return this._selectors.conversationLogIds();
  }
  getConversationLogId(message) {
    const { conversationId } = message;
    const date = this._formatDateTime({
      type: 'date',
      utcTimestamp: message.creationTime,
    });
    return getLogId({
      conversationId,
      date,
    });
  }

  get dataMapping() {
    return this._conversationMatcher.dataMapping;
  }
}
