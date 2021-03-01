import {
  state,
  action,
  computed,
  watch,
  RcModuleV2,
} from '@ringcentral-integration/core';
import { GetMessageList } from '@rc-ex/core/definitions';
import { proxify } from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import { MessageStatus } from './messageStatus';
import getDateFrom from '../../lib/getDateFrom';
import concurrentExecute from '../../lib/concurrentExecute';
import { sortByDate } from '../../lib/messageHelper';
import {
  CleanUpMessagesOptions,
  Deps,
  FetchMessageListOptions,
  GetMessagesOptions,
  LoadResetOptions,
  LoadSuccessOptions,
  RecentMessage,
} from './RecentMessages.interface';
import { MessageStoreConversations } from '../MessageStoreV2';
import { Message, Messages } from '../../interfaces/MessageStore.model';
import { Entity } from '../../interfaces/Entity.interface';
import {
  dedup,
  filterPhoneNumber,
  flattenToMessageRecords,
  markAsRemoteMessage,
  sortMessages,
} from './recentMessagesHelper';

/**
 * Retrieve all recent messages related to a specified contact.
 */
@Module({
  name: 'RecentMessages',
  deps: ['Client', 'MessageStore'],
})
export class RecentMessages extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  onInitOnce() {
    watch(
      this,
      () => this._deps.messageStore.timestamp,
      () => {
        if (this.ready && Object.keys(this.messages).length > 0) {
          for (const key of Object.keys(this.contacts)) {
            this.getMessages({
              currentContact: this.contacts[key],
              sessionId: key.indexOf('-') > -1 ? key.split('-')[1] : null,
              fromLocal: false,
              forceUpdate: true,
            });
          }
        }
      },
    );
  }

  @state
  contacts: Record<string, Entity> = {};

  @state
  messages: Record<string, (Message | RecentMessage)[]> = {};

  @state
  messageStatus: MessageStatus = null;

  @action
  initLoad() {
    this.messageStatus = MessageStatus.loading;
  }

  @action
  loadSuccess({ contact, messages, sessionId }: LoadSuccessOptions) {
    this.messageStatus = MessageStatus.loaded;
    const contactId = String(contact && contact.id);
    const id = sessionId ? `${contactId}-${sessionId}` : contactId;
    this.contacts[id] = contact;
    this.messages[id] = messages;
  }

  @action
  loadReset({ contact, sessionId }: LoadResetOptions) {
    const contactId = String(contact && contact.id);
    const id = sessionId ? `${contactId}-${sessionId}` : contactId;
    delete this.contacts[id];
    delete this.messages[id];
  }

  @computed<RecentMessages>((that) => [that.messages])
  get unreadMessageCounts() {
    return Object.keys(this.messages).reduce((unreadCounts, contactId) => {
      unreadCounts[contactId] = this.messages[contactId].reduce(
        (acc, cur) => acc + (cur.readStatus !== 'Read' ? 1 : 0),
        0,
      );
      return unreadCounts;
    }, {} as Record<string, number>);
  }

  get isMessagesLoaded() {
    return this.messageStatus === MessageStatus.loaded;
  }

  @proxify
  async getMessages({
    currentContact,
    sessionId = null,
    fromLocal = false,
    forceUpdate = false,
  }: GetMessagesOptions) {
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
    this.initLoad();
    const messages = await this._getRecentMessages(
      currentContact,
      this._deps.messageStore.textConversations,
      fromLocal,
    );
    this.loadSuccess({
      messages,
      contact: currentContact,
      sessionId,
    });
  }

  cleanUpMessages({ contact, sessionId = null }: CleanUpMessagesOptions) {
    this.loadReset({
      contact,
      sessionId,
    });
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
    currentContact: Entity,
    conversations: MessageStoreConversations = [],
    fromLocal: boolean,
    daySpan = 60,
    length = 5,
  ) {
    const dateFrom = getDateFrom(daySpan);
    let recentMessages: (
      | Message
      | RecentMessage
    )[] = this._getLocalRecentMessages(
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

    recentMessages = dedup(recentMessages);
    return recentMessages.length > length
      ? recentMessages.slice(0, length)
      : recentMessages;
  }

  /**
   * Get recent messages from messageStore.
   */
  _getLocalRecentMessages(
    { phoneNumbers }: Entity,
    conversations: MessageStoreConversations,
    dateFrom: Date,
    length: number,
  ) {
    // Get all messages related to this contact
    let recentMessages: Messages = [];
    let matches;
    for (let i = conversations.length - 1; i >= 0; i -= 1) {
      const conversation = conversations[i];
      const messageList =
        this._deps.messageStore.conversationStore[
          conversation.conversationId
        ] || [];
      matches = phoneNumbers.find(filterPhoneNumber(conversation));
      // Check if message is within certain days
      if (!!matches && new Date(conversation.creationTime) > dateFrom) {
        recentMessages = recentMessages.concat(messageList);
      }
      if (recentMessages.length >= length) break;
    }
    return recentMessages.sort(sortByDate).slice(0, length);
  }

  /**
   * Fetch recent messages from server by given current contact.
   */
  _fetchRemoteRecentMessages(
    { phoneNumbers }: Entity,
    dateFrom: string,
    dateTo = new Date().toISOString(),
    length: number,
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
      [] as (() => Promise<GetMessageList>)[],
    );

    // TODO: Because we need to navigate to the message page,
    // So we may need to push new messages to messageStore
    return concurrentExecute(recentMessagesPromise, 5, 500)
      .then(flattenToMessageRecords)
      .then(markAsRemoteMessage)
      .then((messages) => sortMessages(messages));
  }

  _fetchMessageList(params: FetchMessageListOptions) {
    return () =>
      this._deps.client
        .account()
        .extension()
        .messageStore()
        .list(params) as Promise<GetMessageList>;
  }
}
