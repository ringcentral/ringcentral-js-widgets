import {
  RcModuleV2,
  state,
  action,
  storage,
  watch,
} from '@ringcentral-integration/core';
import { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap';

import { Module } from '../../lib/di';
import isBlank from '../../lib/isBlank';
import { proxify } from '../../lib/proxy/proxify';

import {
  messageSenderMessages,
  ATTACHMENT_SIZE_LIMITATION,
  Attachment,
} from '../MessageSenderV2';

import { Deps, ToNumber } from './ComposeText.interface';

/**
 * @class
 * @description Compose text managing module
 */
@Module({
  name: 'ComposeText',
  deps: [
    'Alert',
    'Auth',
    'Storage',
    'MessageSender',
    'NumberValidate',
    'ExtensionFeatures',
    { dep: 'ContactSearch', optional: true },
    { dep: 'ComposeTextOptions', optional: true },
    { dep: 'RouterInteraction', optional: true },
  ],
})
export class ComposeText<T = {}> extends RcModuleV2<Deps & T> {
  protected _lastContactSearchResult: any = null;
  protected smsVerify?: ({
    toNumbers,
    typingToNumber,
  }: {
    toNumbers: ToNumber[];
    typingToNumber: string;
  }) => Promise<Boolean>;

  constructor(deps: Deps & T) {
    super({
      deps,
      enableCache: true,
      storageKey: 'composeText',
    });
  }

  @storage
  @state
  senderNumber = '';

  @state
  typingToNumber = '';

  @state
  toNumbers: ToNumber[] = [];

  @state
  messageText = '';

  @state
  toNumberEntity = '';

  @state
  attachments: Attachment[] = [];

  @action
  _setSenderNumber(number: string = '') {
    this.senderNumber = number;
  }

  @action
  _setTypingToNumber(number?: string) {
    this.typingToNumber = number;
  }

  @action
  _setToNumberEntity(entityId: string) {
    this.toNumberEntity = entityId;
  }

  @action
  _addToNumber(number: ToNumber) {
    if (number.id) {
      const idx = this.toNumbers.findIndex(
        (item) =>
          number.id === item.id || number.phoneNumber === item.phoneNumber,
      );
      if (idx > -1) {
        // replace old one if found
        this.toNumbers[idx] = number;
        return;
      }
    } else {
      const oldNumber = this.toNumbers.find(
        (item) => number.phoneNumber === item.phoneNumber,
      );
      if (oldNumber) {
        return;
      }
    }
    this.toNumbers.push(number);
  }

  @action
  _removeToNumber(number: ToNumber) {
    this.toNumbers = this.toNumbers.filter(
      (item) => item.phoneNumber !== number.phoneNumber,
    );
  }

  @action
  _setMessageText(text: string) {
    this.messageText = text;
  }

  @action
  _addAttachment(attachment: Attachment) {
    const newAttachments = this.attachments.filter(
      (f) => f.name !== attachment.name,
    );
    newAttachments.push(attachment);
    this.attachments = newAttachments;
  }

  @action
  _removeAttachment(attachment: Attachment) {
    this.attachments = this.attachments.filter(
      (f) => f.name !== attachment.name,
    );
  }

  @action
  _clean() {
    this.typingToNumber = '';
    this.toNumbers = [];
    this.messageText = '';
    this.attachments = [];
    this.toNumberEntity = '';
  }

  onStateChange() {
    if (this._shouldHandleRecipient()) {
      this._handleRecipient();
    }
  }

  _shouldInit() {
    return !!(super._shouldInit() && this._deps.auth.loggedIn);
  }

  _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._deps.auth.loggedIn)
    );
  }

  async onInit() {
    if (this._deps.auth.isFreshLogin) {
      await this.clean();
    }
    this._initSenderNumber();
  }

  async onReset() {
    await this.clean();
  }

  onInitOnce() {
    watch(
      this,
      () => this._deps.messageSender.senderNumbersList,
      () => {
        if (this.ready) {
          this._initSenderNumber();
        }
      },
    );
  }

  _shouldHandleRecipient() {
    return (
      this.ready &&
      !!this._deps.contactSearch &&
      this._deps.contactSearch.ready &&
      this._deps.contactSearch.searchResult.length > 0 &&
      this._deps.contactSearch.searchResult !== this._lastContactSearchResult
    );
  }

  _initSenderNumber() {
    const cachedPhoneNumber = this.senderNumber;
    if (
      cachedPhoneNumber &&
      this._deps.messageSender.senderNumbersList.find(
        (number) => (number as any).phoneNumber === cachedPhoneNumber,
      )
    ) {
      return;
    }
    this.updateSenderNumber(
      this._deps.messageSender.senderNumbersList[0] &&
        (this._deps.messageSender.senderNumbersList[0] as any).phoneNumber,
    );
  }

  _handleRecipient() {
    const dummy = this.toNumbers.find((toNumber) => !toNumber.entityType);
    if (dummy) {
      const recipient = this._deps.contactSearch.searchResult.find(
        (item: any) => item.id === dummy.id,
      );
      if (recipient) {
        this.addToNumber(recipient);
        this._lastContactSearchResult = this._deps.contactSearch.searchResult.slice();
      }
    }
  }

  _alertWarning(message: string) {
    if (message) {
      const ttlConfig =
        message !== messageSenderMessages.noAreaCode ? { ttl: 0 } : null;
      this._deps.alert.warning({
        message,
        allowDuplicates: false,
        ...ttlConfig,
      });
      return true;
    }
    return false;
  }

  _validatePhoneNumber(phoneNumber: string) {
    if (this._validateIsOnlyPager(phoneNumber)) {
      return null;
    }
    const validateResult = this._deps.numberValidate.validateFormat([
      phoneNumber,
    ]);
    if (!validateResult.result) {
      const error = validateResult.errors[0];
      if (
        error &&
        this._alertWarning(
          messageSenderMessages[
            error.type as ObjectMapKey<typeof messageSenderMessages>
          ],
        )
      ) {
        return false;
      }
      this._alertWarning(messageSenderMessages.recipientNumberInvalids);
      return false;
    }
    return true;
  }

  _validateIsOnlyPager(phoneNumber: string) {
    if (
      phoneNumber.length >= 7 &&
      !this._deps.extensionFeatures.hasOutboundSMSPermission
    ) {
      this._alertWarning(messageSenderMessages.noSMSPermission);
      return true;
    }
    return false;
  }

  @proxify
  async validatePhoneNumber(phoneNumber: string) {
    if (this._validateIsOnlyPager(phoneNumber)) {
      return false;
    }
    const validateResult = this._deps.numberValidate.validateFormat([
      phoneNumber,
    ]);
    return !!validateResult.result;
  }

  @proxify
  async send(text: string, attachments: Attachment[] = []) {
    const toNumbers = this.toNumbers.map((number) => number.phoneNumber);
    const { typingToNumber } = this;
    if (!isBlank(typingToNumber)) {
      if (this._validatePhoneNumber(typingToNumber)) {
        toNumbers.push(typingToNumber);
      } else {
        return null;
      }
    }

    const continueSend = this.smsVerify
      ? await this.smsVerify({ toNumbers: this.toNumbers, typingToNumber })
      : true;
    if (!continueSend) return null;

    let timeoutID = setTimeout(() => {
      if (this._deps.routerInteraction?.currentPath === '/composeText') {
        this.alertMessageSending();
      }
      timeoutID = null;
    }, 10000);

    try {
      const responses = await this._deps.messageSender.send({
        fromNumber: this.senderNumber,
        toNumbers,
        text,
        attachments,
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
  async updateSenderNumber(number?: string) {
    this._setSenderNumber(number);
  }

  @proxify
  async updateTypingToNumber(number: string) {
    if (number.length > 30) {
      this._alertWarning(messageSenderMessages.recipientNumberInvalids);
      return;
    }
    this._setTypingToNumber(number);
  }

  @proxify
  async onToNumberMatch({ entityId }: { entityId: string }) {
    this._setToNumberEntity(entityId);
  }

  @proxify
  async addToRecipients(recipient: ToNumber, shouldClean = true) {
    const isAdded = await this.addToNumber(recipient);
    if (isAdded && shouldClean) {
      this._setTypingToNumber('');
    }
  }

  @proxify
  async cleanTypingToNumber() {
    this._setTypingToNumber('');
  }

  @proxify
  async addToNumber(number: ToNumber) {
    if (isBlank(number.phoneNumber)) {
      return false;
    }
    if (!this._validatePhoneNumber(number.phoneNumber)) {
      return false;
    }
    this._addToNumber(number);
    return true;
  }

  @proxify
  async removeToNumber(number: ToNumber) {
    this._removeToNumber(number);
  }

  @proxify
  async updateMessageText(text: string) {
    if (text.length > 1000) {
      this._alertWarning(messageSenderMessages.textTooLong);
      return;
    }
    this._setMessageText(text);
  }

  @proxify
  async addAttachment(attachment: Attachment) {
    if (this.attachments.length >= 10) {
      this._alertWarning(messageSenderMessages.attachmentCountLimitation);
      return;
    }
    const size = this.attachments.reduce((prev, curr) => {
      return prev + curr.size;
    }, 0);
    if (size + attachment.size > ATTACHMENT_SIZE_LIMITATION) {
      this._alertWarning(messageSenderMessages.attachmentSizeLimitation);
      return;
    }
    this._addAttachment(attachment);
  }

  @proxify
  async removeAttachment(attachment: Attachment) {
    this._removeAttachment(attachment);
  }

  @proxify
  async clean() {
    this._clean();
  }

  @proxify
  async alertMessageSending() {
    this._deps.alert.warning({
      message: messageSenderMessages.sending,
      ttl: 0,
    });
  }

  @proxify
  async dismissMessageSending() {
    const alertMessage = this._deps.alert.messages.find(
      (m) => m.message === messageSenderMessages.sending,
    );
    if (alertMessage && alertMessage.id) {
      this._deps.alert.dismiss(alertMessage.id);
    }
  }

  get senderNumbersList() {
    return this._deps.messageSender.senderNumbersList;
  }
}
