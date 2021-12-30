import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import isBlank from '../../lib/isBlank';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { messageSenderMessages } from '../MessageSender/messageSenderMessages';
import composeTextActionTypes from './actionTypes';
import getCacheReducer from './getCacheReducer';
import getComposeTextReducer from './getComposeTextReducer';

/**
 * @class
 * @description Compose text managing module
 */
@Module({
  deps: [
    'Alert',
    'Auth',
    'Storage',
    'MessageSender',
    'NumberValidate',
    'AppFeatures',
    // { dep: 'Conversations', optional: true },
    { dep: 'RouterInteraction', optional: true },
    { dep: 'ContactSearch', optional: true },
    { dep: 'ComposeTextOptions', optional: true },
  ],
})
export default class ComposeText extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   * @param {MessageSender} params.messageSender - messageSender module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {ContactSearch} params.contactSearch - contactSearch module instance
   */
  constructor({
    alert,
    auth,
    storage,
    messageSender,
    numberValidate,
    contactSearch,
    appFeatures,
    conversations,
    routerInteraction,
    ...options
  }) {
    super({
      ...options,
      actionTypes: composeTextActionTypes,
    });

    this._alert = alert;
    this._auth = auth;
    this._storage = storage;
    this._appFeatures = appFeatures;
    this._storageKey = 'composeText';
    this._reducer = getComposeTextReducer(this.actionTypes);
    this._cacheReducer = getCacheReducer(this.actionTypes);
    this._messageSender = messageSender;
    this._numberValidate = numberValidate;
    this._contactSearch = contactSearch;
    // this._conversations = conversations;
    this._routerInteraction = routerInteraction;
    this._lastContactSearchResult = [];
    this.senderNumbersList = [];
    storage.registerReducer({
      key: this._storageKey,
      reducer: this._cacheReducer,
    });
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this.senderNumbersList = this._messageSender.senderNumbersList;
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
      if (this._auth.isFreshLogin) {
        this.clean();
      }
      this._initSenderNumber();
    } else if (this._shouldHandleRecipient()) {
      this._handleRecipient();
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    }
    if (
      this.ready &&
      this._messageSender.senderNumbersList.length !==
        this.senderNumbersList.length
    ) {
      this.senderNumbersList = this._messageSender.senderNumbersList;
      this._initSenderNumber();
    }
  }

  _shouldInit() {
    return this._messageSender.ready && this._auth.ready && !this.ready;
  }

  _shouldReset() {
    return !this._messageSender.ready && this.ready;
  }

  _shouldHandleRecipient() {
    return (
      this.ready &&
      !!this._contactSearch &&
      this._contactSearch.ready &&
      this._contactSearch.searchResult.length > 0 &&
      this._contactSearch.searchResult !== this._lastContactSearchResult
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  _initSenderNumber() {
    const cachedPhoneNumber = this.cache && this.cache.senderNumber;
    if (cachedPhoneNumber) {
      this.updateSenderNumber(cachedPhoneNumber);
    } else {
      this.updateSenderNumber(
        this._messageSender.senderNumbersList[0] &&
          this._messageSender.senderNumbersList[0].phoneNumber,
      );
    }
  }

  _handleRecipient() {
    const dummy = this.toNumbers.find((toNumber) => !toNumber.entityType);
    if (dummy) {
      const recipient = this._contactSearch.searchResult.find(
        (item) => item.id === dummy.id,
      );
      if (recipient) {
        this.addToNumber(recipient);
        this._lastContactSearchResult =
          this._contactSearch.searchResult.slice();
      }
    }
  }

  _alertWarning(message) {
    if (message) {
      const ttlConfig =
        message !== messageSenderMessages.noAreaCode ? { ttl: 0 } : null;
      this._alert.warning({
        message,
        allowDuplicates: false,
        ...ttlConfig,
      });
      return true;
    }
    return false;
  }

  _validatePhoneNumber(phoneNumber) {
    if (this._validateIsOnlyPager(phoneNumber)) {
      return null;
    }
    const validateResult = this._numberValidate.validateFormat([phoneNumber]);
    if (!validateResult.result) {
      const error = validateResult.errors[0];
      if (error && this._alertWarning(messageSenderMessages[error.type])) {
        return false;
      }
      this._alertWarning(messageSenderMessages.recipientNumberInvalids);
      return false;
    }
    return true;
  }

  @proxify
  _validateIsOnlyPager(phoneNumber) {
    if (
      phoneNumber.length >= 7 &&
      !this._appFeatures.hasOutboundSMSPermission
    ) {
      this._alertWarning(messageSenderMessages.noSMSPermission);
      return true;
    }
    return false;
  }

  @proxify
  validatePhoneNumber(phoneNumber) {
    if (this._validateIsOnlyPager(phoneNumber)) {
      return false;
    }
    const validateResult = this._numberValidate.validateFormat([phoneNumber]);
    return !!validateResult.result;
  }

  @proxify
  async send(text) {
    const fromNumber = this.senderNumber;
    const toNumbers = this.toNumbers.map((number) => number.phoneNumber);
    const { typingToNumber } = this;
    if (!isBlank(typingToNumber)) {
      if (this._validatePhoneNumber(typingToNumber)) {
        toNumbers.push(typingToNumber);
      } else {
        return null;
      }
    }
    // this._conversations.addEntities(this.toNumbers);
    let timeoutID = setTimeout(() => {
      if (
        this._routerInteraction &&
        this._routerInteraction.currentPath === '/composeText'
      ) {
        this.alertMessageSending();
      }
      timeoutID = null;
    }, 10000);

    try {
      const responses = await this._messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });

      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }
      this.dismissMessageSending();
      return responses;
    } catch (err) {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }
      throw err;
    }
  }

  @proxify
  async updateSenderNumber(number) {
    this.store.dispatch({
      type: this.actionTypes.updateSenderNumber,
      number: number || '',
    });
  }

  @proxify
  async updateTypingToNumber(number) {
    if (number.length > 30) {
      this._alertWarning(messageSenderMessages.recipientNumberInvalids);
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.updateTypingToNumber,
      number,
    });
  }

  @proxify
  async onToNumberMatch({ entityId }) {
    this.store.dispatch({
      type: this.actionTypes.toNumberMatched,
      entityId,
    });
  }

  @proxify
  async addToRecipients(recipient, shouldClean = true) {
    const isAdded = await this.addToNumber(recipient);
    if (isAdded && shouldClean) {
      await this.cleanTypingToNumber();
    }
  }

  @proxify
  async cleanTypingToNumber() {
    this.store.dispatch({
      type: this.actionTypes.cleanTypingToNumber,
    });
  }

  @proxify
  async addToNumber(number) {
    if (isBlank(number.phoneNumber)) {
      return false;
    }
    if (!this._validatePhoneNumber(number.phoneNumber)) {
      return false;
    }
    this.store.dispatch({
      type: this.actionTypes.addToNumber,
      number,
    });
    return true;
  }

  @proxify
  async removeToNumber(number) {
    this.store.dispatch({
      type: this.actionTypes.removeToNumber,
      number,
    });
  }

  @proxify
  async updateMessageText(text) {
    if (text.length > 1000) {
      this._alertWarning(messageSenderMessages.textTooLong);
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.updateMessageText,
      text,
    });
  }

  @proxify
  async clean() {
    this.store.dispatch({
      type: this.actionTypes.clean,
    });
  }

  @proxify
  async alertMessageSending() {
    this._alert.warning({
      message: messageSenderMessages.sending,
      ttl: 0,
    });
  }

  @proxify
  async dismissMessageSending() {
    const alertMessage = this._alert.messages.find(
      (m) => m.message === messageSenderMessages.sending,
    );
    if (alertMessage && alertMessage.id) {
      this._alert.dismiss(alertMessage.id);
    }
  }

  get cache() {
    return this._storage.getItem(this._storageKey);
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get senderNumber() {
    return this.state.senderNumber;
  }

  get typingToNumber() {
    return this.state.typingToNumber;
  }

  get toNumbers() {
    return this.state.toNumbers;
  }

  get toNumberEntity() {
    return this.state.toNumberEntity;
  }

  get messageText() {
    return this.state.messageText;
  }
}
