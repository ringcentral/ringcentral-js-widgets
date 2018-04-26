import { createSelector } from 'reselect';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import getter from '../../lib/getter';
import moduleStatuses from '../../enums/moduleStatuses';
import messageSenderMessages from '../MessageSender/messageSenderMessages';

import {
  getMyNumberFromMessage,
  getRecipientNumbersFromMessage,
} from '../../lib/messageHelper';

import actionTypes from './actionTypes';
import getConversationReducer from './getConversationReducer';

import conversationStatus from './conversationStatus';
import proxify from '../../lib/proxy/proxify';

/**
 * @class
 * @description Conversation managing module
 */
@Module({
  deps: ['Alert', 'MessageSender', 'ExtensionInfo', 'MessageStore'],
})
export default class Conversation extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {MessageSender} params.messageSender - messageSender module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {MessageStore} params.messageStore - messageStore module instance
   */
  constructor({
    alert,
    messageSender,
    extensionInfo,
    messageStore,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._alert = alert;
    this._reducer = getConversationReducer(this.actionTypes);
    this._messageSender = messageSender;
    this._extensionInfo = extensionInfo;
    this._messageStore = messageStore;
    this._promise = null;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._initModuleStatus();
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    } else if (this._shouldReloadConversation()) {
      this._loadConversation(this.id);
      this._messageStore.readMessages(this.id);
    }
  }

  _shouldInit() {
    return (
      this._extensionInfo.ready &&
      this._messageSender.ready &&
      this._messageStore.ready &&
      !this.ready
    );
  }

  _shouldReset() {
    return (
      (!this._extensionInfo.ready ||
        !this._messageSender.ready ||
        !this._messageStore.ready) &&
      this.ready
    );
  }

  _shouldReloadConversation() {
    return (
      this.ready &&
      !!this.id &&
      this.messageStoreUpdatedAt !== this._messageStore.updatedTimestamp
    );
  }

  _initModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async loadConversationById(id) {
    if (this.id !== id) {
      this._loadConversation(id);
      this._messageStore.readMessages(id);
    }
  }

  @proxify
  async unloadConversation() {
    if (this.id) {
      this.store.dispatch({
        type: this.actionTypes.unload,
      });
    }
  }

  @proxify
  async changeMatchedNames(matchedNames) {
    const recipients = this.recipients.slice();
    if (recipients.length !== 1) {
      return;
    }
    if (matchedNames) {
      recipients[0].matchedNames = matchedNames;
      this._updateConversationRecipients(recipients);
    }
  }

  @proxify
  async changeDefaultRecipient(phoneNumber) {
    if (this.recipients.length < 2) {
      return;
    }
    const recipients = this.recipients.slice();
    const defaultNumberIndex = recipients.findIndex(
      number =>
        number.extensionNumber === phoneNumber ||
        number.phoneNumber === phoneNumber,
    );
    if (defaultNumberIndex < 0) {
      return;
    }
    if (this.id) {
      const defaultNumber = recipients[defaultNumberIndex];
      recipients.splice(defaultNumberIndex, 1);
      const newRecipients = [defaultNumber].concat(recipients);
      this._updateConversationRecipients(newRecipients);
    }
  }

  _updateConversationRecipients(newRecipients) {
    if (!this.id) {
      return;
    }
    this._messageStore.updateConversationRecipientList(this.id, newRecipients);
    this._updateRecipients(newRecipients);
  }

  _updateRecipients(recipients) {
    this.store.dispatch({
      type: this.actionTypes.updateRecipients,
      recipients,
    });
  }

  _loadConversation(conversationId) {
    const conversation = this._messageStore.findConversationById(
      conversationId,
    );
    if (!conversation) {
      return;
    }
    const messages = this._messageStore.messages.filter(
      message => message.conversationId === conversationId,
    );
    const lastMessage = this._messageStore.allConversations[conversation.index];
    const senderNumber = this._getCurrentSenderNumber(lastMessage);
    let recipients = lastMessage && lastMessage.recipients;
    if (!recipients || recipients.length === 0) {
      recipients = this._getRecipients(lastMessage, senderNumber);
    }
    this.store.dispatch({
      type: this.actionTypes.load,
      conversationId,
      messages,
      conversationsTimestamp: this._messageStore.updatedTimestamp,
      senderNumber,
      recipients,
    });
  }

  _getCurrentSenderNumber(lastMessage) {
    if (!lastMessage) {
      return null;
    }
    return getMyNumberFromMessage({
      message: lastMessage,
      myExtensionNumber: this._extensionInfo.extensionNumber,
    });
  }

  _getRecipients(lastMessage, senderNumber) {
    if (!lastMessage || !senderNumber) {
      return [];
    }
    return getRecipientNumbersFromMessage({
      message: lastMessage,
      myNumber: senderNumber,
    });
  }

  _getReplyOnMessageId() {
    const lastMessage =
      this.messages &&
      this.messages.length > 0 &&
      this.messages[this.messages.length - 1];
    if (lastMessage && lastMessage.id) {
      return lastMessage.id;
    }
    return null;
  }

  _getFromNumber() {
    if (!this.senderNumber) {
      return null;
    }
    return this.senderNumber.extensionNumber || this.senderNumber.phoneNumber;
  }

  _getToNumbers() {
    return this.recipients.map(
      recipient => recipient.extensionNumber || recipient.phoneNumber,
    );
  }

  _alertWarning(message) {
    if (message) {
      const ttlConfig =
        message !== messageSenderMessages.noAreaCode ? { ttl: 0 } : null;
      this._alert.warning({
        message,
        ...ttlConfig,
      });
      return true;
    }
    return false;
  }

  @proxify
  async updateMessageText(text) {
    if (text.length > 1000) {
      return this._alertWarning(messageSenderMessages.textTooLong);
    }
    return this.store.dispatch({
      type: this.actionTypes.updateMessages,
      text,
      id: this.id,
    });
  }

  @proxify
  async replyToReceivers(text) {
    this.store.dispatch({
      type: this.actionTypes.reply,
    });
    try {
      const responses = await this._messageSender.send({
        fromNumber: this._getFromNumber(),
        toNumbers: this._getToNumbers(),
        text,
        replyOnMessageId: this._getReplyOnMessageId(),
      });
      if (responses && responses[0]) {
        this._messageStore.pushMessage(responses[0]);
        this.store.dispatch({
          type: this.actionTypes.replySuccess,
        });
        this.store.dispatch({
          type: this.actionTypes.removeMessage,
          id: this.id,
        });
        return responses[0];
      }
      this._onReplyError();
      return null;
    } catch (error) {
      this._onReplyError();
      throw error;
    }
  }

  _onReplyError() {
    this.store.dispatch({
      type: this.actionTypes.replyError,
    });
  }

  get status() {
    return this.state.status;
  }

  get conversationStatus() {
    return this.state.conversationStatus;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pushing() {
    return this.conversationStatus === conversationStatus.pushing;
  }

  get id() {
    return this.state.id;
  }

  get messages() {
    return this.state.messages;
  }

  get senderNumber() {
    return this.state.senderNumber;
  }

  get recipients() {
    return this.state.recipients;
  }

  get messageStoreUpdatedAt() {
    return this.state.messageStoreUpdatedAt;
  }

  get messageTexts() {
    return this.state.messageTexts;
  }

  @getter
  messageText = createSelector(
    () => this.messageTexts,
    () => this.id,
    (messageTexts, id) => {
      const res = messageTexts.find(
        msg => typeof msg === 'object' && msg.id === id,
      );
      return res ? res.text : '';
    },
  );
}
