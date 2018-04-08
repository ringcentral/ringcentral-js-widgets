import 'core-js/fn/array/find';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import isBlank from '../../lib/isBlank';
import moduleStatuses from '../../enums/moduleStatuses';

import messageSenderActionTypes from './messageSenderActionTypes';
import getMessageSenderReducer from './getMessageSenderReducer';

import messageSenderStatus from './messageSenderStatus';
import messageSenderMessages from './messageSenderMessages';
import proxify from '../../lib/proxy/proxify';
import chunkMessage from '../../lib/chunkMessage';

export const MessageMaxLength = 1000;
export const MultipartMessageMaxLength = MessageMaxLength * 5;

/**
 * @class
 * @description Message sender and validator module
 */
@Module({
  deps: ['Alert', 'Client', 'ExtensionInfo', 'ExtensionPhoneNumber', 'NumberValidate']
})
export default class MessageSender extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {ExtensionPhoneNumber} params.extensionPhoneNumber - extensionPhoneNumber module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   */
  constructor({
    alert,
    client,
    extensionInfo,
    extensionPhoneNumber,
    numberValidate,
    ...options
  }) {
    super({
      ...options,
      actionTypes: messageSenderActionTypes,
    });

    this._alert = alert;
    this._client = client;
    this._extensionPhoneNumber = extensionPhoneNumber;
    this._extensionInfo = extensionInfo;
    this._reducer = getMessageSenderReducer(this.actionTypes);
    this._numberValidate = numberValidate;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._initModuleStatus();
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    }
  }

  _shouldInit() {
    return (
      this._extensionPhoneNumber.ready &&
      this._extensionInfo.ready &&
      !this.ready
    );
  }

  _initModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  _shouldReset() {
    return (
      (
        !this._extensionPhoneNumber.ready ||
        !this._extensionInfo.ready
      ) &&
      this.ready
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  _alertWarning(message) {
    if (message) {
      this._alert.warning({
        message,
        ttl: 0,
      });
      return true;
    }
    return false;
  }

  _validateText(text, multipart) {
    if (isBlank(text)) {
      this._alertWarning(messageSenderMessages.textEmpty);
      return false;
    }

    if (!multipart && text.length > MessageMaxLength) {
      this._alertWarning(messageSenderMessages.textTooLong);
      return false;
    }

    if (multipart && text.length > MultipartMessageMaxLength) {
      this._alertWarning(messageSenderMessages.multipartTextTooLong);
      return false;
    }

    return true;
  }

  _validateToNumbersIsEmpty(toNumbers) {
    if (toNumbers.length === 0) {
      this._alertWarning(messageSenderMessages.recipientsEmpty);
      return true;
    }
    return false;
  }

  _validateSenderNumber(senderNumber) {
    let validateResult = true;
    if (isBlank(senderNumber)) {
      validateResult = false;
    }
    this.store.dispatch({ type: this.actionTypes.validate });
    if (validateResult) {
      const isMySenderNumber = this.senderNumbersList.find(number => (
        number.phoneNumber === senderNumber
      ));
      if (!isMySenderNumber) {
        validateResult = false;
      }
    }
    if (!validateResult) {
      this.store.dispatch({ type: this.actionTypes.validateError });
      this._alertWarning(messageSenderMessages.senderNumberInvalid);
    }
    return validateResult;
  }

  _alertInvalidRecipientErrors(errors) {
    errors.forEach((error) => {
      const message = messageSenderMessages[error.type];
      if (!this._alertWarning(message)) {
        this._alertWarning(messageSenderMessages.recipientNumberInvalids);
      }
    });
  }

  @proxify
  async _validateToNumbers(toNumbers) {
    const result = {
      result: false,
    };
    if (this._validateToNumbersIsEmpty(toNumbers)) {
      return result;
    }
    const recipientNumbers
      = toNumbers.filter((item, index, arr) => arr.indexOf(item) === index);
    this.store.dispatch({ type: this.actionTypes.validate });
    const numberValidateResult = await this._numberValidate.validateNumbers(recipientNumbers);
    if (!numberValidateResult.result) {
      this._alertInvalidRecipientErrors(numberValidateResult.errors);
      this.store.dispatch({ type: this.actionTypes.validateError });
      return result;
    }
    const numbers = [];
    for (const number of numberValidateResult.numbers) {
      if (number.subAddress && number.subAddress.length > 0) {
        if (
          !this._numberValidate.isCompanyExtension(number.e164, number.subAddress)
        ) {
          this._alertWarning(messageSenderMessages.notAnExtension);
          this.store.dispatch({ type: this.actionTypes.validateError });
          return result;
        }
        numbers.push(number.subAddress);
      } else {
        numbers.push(number.e164);
      }
    }
    result.result = true;
    result.numbers = numbers;
    return result;
  }

  @proxify
  async send({
    fromNumber, toNumbers, text, replyOnMessageId, multipart = false
  }) {
    if (!this._validateText(text, multipart)) {
      return null;
    }
    try {
      const validateToNumberResult = await this._validateToNumbers(toNumbers);
      if (!validateToNumberResult.result) {
        return null;
      }
      const recipientNumbers = validateToNumberResult.numbers;

      const extensionNumbers = recipientNumbers.filter(number => (number.length <= 6));
      const phoneNumbers = recipientNumbers.filter(number => (number.length > 6));

      // not validate sender number if recipient is only extension number
      if (phoneNumbers.length > 0) {
        if (!this._validateSenderNumber(fromNumber)) {
          return null;
        }
      }

      this.store.dispatch({
        type: this.actionTypes.send,
      });

      const responses = [];
      const chunks = multipart ? chunkMessage(text, MessageMaxLength) : [text];

      if (extensionNumbers.length > 0) {
        for (const chunk of chunks) {
          const pagerResponse = await this._sendPager({
            toNumbers: extensionNumbers,
            text: chunk,
            replyOnMessageId,
          });
          responses.push(pagerResponse);
        }
      }

      if (phoneNumbers.length > 0) {
        for (const phoneNumber of phoneNumbers) {
          for (const chunk of chunks) {
            const smsResponse = await this._sendSms({
              fromNumber,
              toNumber: phoneNumber,
              text: chunk,
            });
            responses.push(smsResponse);
          }
        }
      }

      this.store.dispatch({
        type: this.actionTypes.sendOver,
      });

      return responses;
    } catch (error) {
      this.store.dispatch({
        type: this.actionTypes.sendError,
        error: 'error'
      });
      this._onSendError(error);
      console.debug('sendComposeText e ', error);
      throw error;
    }
  }

  @proxify
  async _sendSms({ fromNumber, toNumber, text }) {
    const toUsers = [{ phoneNumber: toNumber }];
    const response = await this._client.account().extension().sms().post({
      from: { phoneNumber: fromNumber },
      to: toUsers,
      text,
    });
    return response;
  }

  @proxify
  async _sendPager({ toNumbers, text, replyOnMessageId }) {
    const from = { extensionNumber: this._extensionInfo.extensionNumber };
    const toUsers = toNumbers.map(number => ({ extensionNumber: number }));
    const params = { from, to: toUsers, text };
    if (replyOnMessageId) {
      params.replyOn = replyOnMessageId;
    }
    const response = await this._client.account().extension().companyPager().post(params);
    return response;
  }

  _onSendError(error) {
    const errResp = error.apiResponse;
    if (
      errResp && errResp.response &&
      !errResp.response.ok
      && (errResp._json.errorCode === 'InvalidParameter'
        || errResp._json.errorCode === 'InternationalProhibited'
        || errResp._json.errorCode === 'CMN-408')
    ) {
      errResp._json.errors.map((err) => {
        if (
          (
            err.errorCode === 'CMN-101' ||
            err.errorCode === 'CMN-102' ||
            err.errorCode === 'CMN-414'
          ) &&
          err.parameterName.startsWith('to')
        ) {
          // 101 : "Parameter [to.extensionNumber] value is invalid"
          // 101 : "Parameter [to.phoneNumber] value is invalid"
          // 102 : "Resource for parameter [to] is not found"
          this._alertWarning(messageSenderMessages.recipientNumberInvalids);
          return null;
        }
        if (err.errorCode === 'MSG-246') {
          // MSG-246 : "Sending SMS from/to extension numbers is not available"
          this._alertWarning(messageSenderMessages.notSmsToExtension);
        }
        if (err.errorCode === 'MSG-240') {
          // MSG-240 : "International SMS is not supported"
          this._alertWarning(messageSenderMessages.internationalSMSNotSupported);
        }
        if (err.errorCode === 'CMN-408') {
          // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
          this._alertWarning(messageSenderMessages.noInternalSMSPermission);
        }
        return null;
      });
      return;
    }
    this._alertWarning(messageSenderMessages.sendError);
  }

  get status() {
    return this.state.status;
  }

  get sendStatus() {
    return this.state.sendStatus;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get idle() {
    return this.sendStatus === messageSenderStatus.idle;
  }

  get senderNumbersList() {
    return this._extensionPhoneNumber.smsSenderNumbers;
  }
}
