import concurrentExecute from '../../lib/concurrentExecute';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import getDateFrom from '../../lib/getDateFrom';
import { sortByDate } from '../../lib/messageHelper';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { selector } from '../../lib/selector';
import actionTypes from './actionTypes';
import getRecentMessagesReducer from './getRecentMessagesReducer';
import messageStatus from './messageStatus';

/**
 * @class
 * @description Retrieve all recent messages related to a specified contact.
 */
@Module({
  deps: ['Client', 'MessageStore'],
})
export default class RecentMessages extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {Client} params.client - client module instance
   */
  constructor({ client, messageStore, ...options }) {
    super({
      actionTypes,
      ...options,
    });
    this._client = ensureExist.call(this, client, 'client');
    this._messageStore = ensureExist.call(this, messageStore, 'messageStore');
    this._reducer = getRecentMessagesReducer(this.actionTypes);
    this._prevMessageStoreTimestamp = null;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this.pending && this._messageStore.ready) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this.ready && !this._messageStore.ready) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    } else if (Object.keys(this.messages).length > 0) {
      // Listen to messageStore state changes
      if (this._messageStore.timestamp !== this._prevMessageStoreTimestamp) {
        this._prevMessageStoreTimestamp = this._messageStore.timestamp;
        // for (const contact of Object.values(this.contacts)) {
        //   this.getMessages(contact, false, true);
        // }
        for (const key of Object.keys(this.contacts)) {
          this.getMessages({
            currentContact: this.contacts[key],
            sessionId: key.indexOf('-') > -1 ? key.split('-')[1] : null,
            fromLocale: false,
            forceUpdate: true,
          });
        }
      }
    }
  }

  get contacts() {
    return this.state.contacts;
  }

  get messages() {
    return this.state.messages;
  }

  @selector
  unreadMessageCounts = [
    () => this.messages,
    (messages) =>
      Object.keys(messages).reduce((unreadCounts, contactId) => {
        unreadCounts[contactId] = messages[contactId].reduce(
          (acc, cur) => acc + (cur.readStatus !== 'Read' ? 1 : 0),
          0,
        );
        return unreadCounts;
      }, {}),
  ];

  get isMessagesLoaded() {
    return this.state.messageStatus === messageStatus.loaded;
  }

  @proxify
  async getMessages({
    currentContact,
    sessionId = null,
    fromLocal = false,
    forceUpdate = false,
  }) {
    // No need to calculate recent messages of the same contact repeatly
    if (!currentContact) {
      return;
    }
    const contactId = currentContact.id;
    if (
      !forceUpdate &&
      !!this.messages[sessionId ? `${contactId}-${sessionId}` : contactId]
    ) {
      return;
    }
    this._prevMessageStoreTimestamp = this._messageStore.timestamp;
    this.store.dispatch({
      type: this.actionTypes.initLoad,
    });
    const messages = await this._getRecentMessages(
      currentContact,
      this._messageStore.textConversations,
      fromLocal,
    );
    this.store.dispatch({
      type: this.actionTypes.loadSuccess,
      messages,
      contact: currentContact,
      sessionId,
    });
  }

  cleanUpMessages({ contact, sessionId = null }) {
    this.store.dispatch({
      type: this.actionTypes.loadReset,
      contact,
      sessionId,
    });
  }

  get status() {
    return this.state.status;
  }

  /**
   * Searching for recent messages of specific contact.
   * @param {Object} currentContact - Current contact
   * @param {Array} messages - Messages in messageStore
   * @param {Boolean} fromLocal - Only get recent messages locally
   * @param {Number} daySpan - Find messages within certain days
   * @param {Number} length - Maximum length of recent messages
   * @return {Array}
   * @private
   */
  async _getRecentMessages(
    currentContact,
    conversations = [],
    fromLocal,
    daySpan = 60,
    length = 5,
  ) {
    const dateFrom = getDateFrom(daySpan);
    let recentMessages = this._getLocalRecentMessages(
      currentContact,
      conversations,
      dateFrom,
      length,
    );

    // If we could not find enough recent messages,
    // we need to search for messages on server.
    if (!fromLocal && recentMessages.length < length) {
      const dateTo =
        recentMessages.length > 0
          ? new Date(recentMessages[recentMessages.length - 1].creationTime)
          : undefined;

      try {
        // This will always be sorted
        recentMessages = recentMessages.concat(
          await this._fetchRemoteRecentMessages(
            currentContact,
            dateFrom.toISOString(),
            dateTo && dateTo.toISOString(),
            length,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    }

    recentMessages = this._dedup(recentMessages);
    return recentMessages.length > length
      ? recentMessages.slice(0, length)
      : recentMessages;
  }

  /**
   * Get recent messages from messageStore.
   * @param {Object} currentContact
   * @param {Array} messages
   * @param {Date} dateFrom
   * @param {Number} length
   */
  _getLocalRecentMessages({ phoneNumbers }, conversations, dateFrom, length) {
    // Get all messages related to this contact
    let recentMessages = [];
    let matches;
    for (let i = conversations.length - 1; i >= 0; i -= 1) {
      const conversation = conversations[i];
      const messageList =
        this._messageStore.conversationStore[conversation.conversationId] || [];
      matches = phoneNumbers.find(this._filterPhoneNumber(conversation));
      // Check if message is within certain days
      if (!!matches && new Date(conversation.creationTime) > dateFrom) {
        recentMessages = recentMessages.concat(messageList);
      }
      if (recentMessages.length >= length) break;
    }
    return recentMessages.sort(sortByDate).slice(0, length);
  }

  _filterPhoneNumber(message) {
    return ({ phoneNumber }) =>
      phoneNumber === message.from.phoneNumber ||
      !!message.to.find((to) => to.phoneNumber === phoneNumber) ||
      phoneNumber === message.from.extensionNumber ||
      !!message.to.find((to) => to.extensionNumber === phoneNumber);
  }

  /**
   * Fetch recent messages from server by given current contact.
   * @param {Object} currentContact
   * @param {String} dateFrom
   * @param {String} dateTo
   * @param {Number} length The number of messages
   * @return {Array}
   */
  _fetchRemoteRecentMessages(
    { phoneNumbers },
    dateFrom,
    dateTo = new Date().toISOString(),
    length,
  ) {
    const params = {
      dateTo,
      dateFrom,
      messageType: ['SMS', 'Text', 'Pager'],
      perPage: length,
    };
    const recentMessagesPromise = phoneNumbers.reduce(
      (acc, { phoneNumber }) => {
        if (phoneNumber) {
          const promise = this._fetchMessageList({
            ...params,
            phoneNumber,
          });
          return acc.concat(promise);
        }
        return acc;
      },
      [],
    );

    // TODO: Because we need to navigate to the message page,
    // So we may need to push new messages to messageStore
    return concurrentExecute(recentMessagesPromise, 5, 500)
      .then(this._flattenToMessageRecords)
      .then(this._markAsRemoteMessage)
      .then((messages) => this._sortMessages(messages));
  }

  _fetchMessageList(params) {
    return () => this._client.account().extension().messageStore().list(params);
  }

  _countUnreadMessages(messages) {
    return messages.reduce(
      (acc, cur) => acc + (cur.readStatus !== 'Read' ? 1 : 0),
      0,
    );
  }

  _flattenToMessageRecords(allMessages) {
    return allMessages.reduce((acc, { records }) => acc.concat(records), []);
  }

  _sortMessages(recentMessages) {
    // Sort by time in descending order
    return recentMessages.sort(
      (a, b) => new Date(b.creationTime) - new Date(a.creationTime),
    );
  }

  _markAsRemoteMessage(messages) {
    return messages.map((message) => {
      message.fromRemote = true;
      return message;
    });
  }

  _dedup(messages) {
    const hash = {};
    return messages.reduce((acc, cur) => {
      if (hash[cur.id]) return acc;
      hash[cur.id] = true;
      return acc.concat(cur);
    }, []);
  }
}
