import { EventEmitter } from 'events';
import { find } from 'ramda';
import CreatePagerMessageRequest from 'ringcentral-client/build/definitions/CreatePagerMessageRequest';
import GetMessageInfoResponse from 'ringcentral-client/build/definitions/GetMessageInfoResponse';
import * as uuid from 'uuid';

import {
  action,
  RcModuleV2,
  state,
  track,
} from '@ringcentral-integration/core';
import {
  ObjectMapKey,
  ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';
import { sleep } from '@ringcentral-integration/utils';
import { ApiError } from '@ringcentral/sdk';

import chunkMessage from '../../lib/chunkMessage';
import { Module } from '../../lib/di';
import { isBlank } from '../../lib/isBlank';
import proxify from '../../lib/proxy/proxify';
import { trackEvents } from '../../enums/trackEvents';
import {
  Attachment,
  Deps,
  EventParameter,
  SenderNumber,
  SendErrorResponse,
} from './MessageSender.interface';
import { messageSenderEvents } from './messageSenderEvents';
import { messageSenderMessages } from './messageSenderMessages';
import { messageSenderStatus } from './messageSenderStatus';

export const MESSAGE_MAX_LENGTH = 1000;
export const MULTIPART_MESSAGE_MAX_LENGTH = MESSAGE_MAX_LENGTH * 5;

const SENDING_THRESHOLD = 30;

export const ATTACHMENT_SIZE_LIMITATION = 1500000;

/**
 * @class
 * @description Message sender and validator module
 */
@Module({
  name: 'MessageSender',
  deps: [
    'Alert',
    'Client',
    'ExtensionInfo',
    'ExtensionPhoneNumber',
    'NumberValidate',
    'AccountInfo',
    'AppFeatures',
    { dep: 'CompanyContacts', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'MessageSenderOptions', optional: true },
  ],
})
export class MessageSender extends RcModuleV2<Deps> {
  protected _eventEmitter = new EventEmitter();

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  sendStatus = messageSenderStatus.idle;

  @action
  setSendStatus(status: string) {
    this.sendStatus = status;
  }

  @track((_: MessageSender, isGroupMessage: boolean, isPager: boolean) => [
    trackEvents.smsAttempt,
    { isGroupMessage, isPager },
  ])
  private _smsAttempt(isBulkMessage: boolean, isPage: boolean) {
    this.setSendStatus(messageSenderStatus.sending);
  }

  @track(trackEvents.smsSentSuccessfully)
  _smsSentOver() {
    this.setSendStatus(messageSenderStatus.idle);
  }

  @track(trackEvents.smsSentFailed)
  _smsSentError() {
    this.setSendStatus(messageSenderStatus.idle);
  }

  _alertWarning(message: string) {
    if (message) {
      this._deps.alert.warning({
        message,
        ttl: 0,
      });
      return true;
    }
    return false;
  }

  _validateContent(
    text: string,
    attachments: Attachment[],
    multipart: boolean,
  ) {
    if (isBlank(text) && attachments.length === 0) {
      this._alertWarning(messageSenderMessages.textEmpty);
      return false;
    }

    if (!multipart && text && text.length > MESSAGE_MAX_LENGTH) {
      this._alertWarning(messageSenderMessages.textTooLong);
      return false;
    }

    if (multipart && text && text.length > MULTIPART_MESSAGE_MAX_LENGTH) {
      this._alertWarning(messageSenderMessages.multipartTextTooLong);
      return false;
    }

    return true;
  }

  _validateToNumbersIsEmpty(toNumbers: string[]) {
    if (toNumbers.length === 0) {
      this._alertWarning(messageSenderMessages.recipientsEmpty);
      return true;
    }
    return false;
  }

  _validateSenderNumber(senderNumber: string) {
    let validateResult = true;
    if (isBlank(senderNumber)) {
      validateResult = false;
    }
    this.setSendStatus(messageSenderStatus.validating);
    if (validateResult) {
      const isMySenderNumber = find(
        (number: { phoneNumber: string }) =>
          number.phoneNumber === senderNumber,
        this.senderNumbersList,
      );
      if (!isMySenderNumber) {
        validateResult = false;
      }
    }
    if (!validateResult) {
      this.setSendStatus(messageSenderStatus.idle);
      this._alertWarning(messageSenderMessages.senderNumberInvalid);
    }
    return validateResult;
  }

  _alertInvalidRecipientErrors(
    errors: { type: ObjectMapKey<typeof messageSenderMessages> }[],
  ) {
    errors.forEach((error) => {
      const message = messageSenderMessages[error.type];
      if (!this._alertWarning(message)) {
        this._alertWarning(messageSenderMessages.recipientNumberInvalids);
      }
    });
  }

  @proxify
  async _validateToNumbers(toNumbers: string[]) {
    const result: {
      result: boolean;
      numbers?: any[];
    } = {
      result: false,
      numbers: [],
    };
    if (this._validateToNumbersIsEmpty(toNumbers)) {
      return result;
    }
    const recipientNumbers = toNumbers.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );
    this.setSendStatus(messageSenderStatus.validating);
    const isEDPEnabled = this._deps.appFeatures?.isEDPEnabled;
    const numberValidateResult = isEDPEnabled
      ? this._deps.numberValidate.validate(recipientNumbers)
      : await this._deps.numberValidate.validateNumbers(recipientNumbers);
    if (!numberValidateResult.result) {
      this._alertInvalidRecipientErrors(numberValidateResult.errors);
      this.setSendStatus(messageSenderStatus.idle);
      return result;
    }
    if (isEDPEnabled) {
      const parsedNumbers = await this._deps.numberValidate.parseNumbers(
        recipientNumbers,
      );
      if (parsedNumbers) {
        result.result = true;
        result.numbers = parsedNumbers?.map(
          (item) => item.availableExtension ?? item.parsedNumber,
        );
      }
    } else {
      // @ts-expect-error
      for (const number of numberValidateResult.numbers) {
        if (number.subAddress && number.subAddress.length > 0) {
          // remove extension number check when use company contact public api
          if (
            !this._deps.companyContacts?.enableCompanyPublicApi &&
            !this._deps.numberValidate.isCompanyExtension(
              number.e164,
              number.subAddress,
            )
          ) {
            this._alertWarning(messageSenderMessages.notAnExtension);
            this.setSendStatus(messageSenderStatus.idle);
            return result;
          }
          // @ts-expect-error
          result.numbers.push(number.subAddress);
        } else {
          // @ts-expect-error
          result.numbers.push(number.availableExtension || number.e164);
        }
      }
      result.result = true;
    }
    return result;
  }

  @proxify
  async send({
    fromNumber,
    toNumbers,
    text,
    replyOnMessageId,
    multipart = false,
    attachments = [],
  }: {
    fromNumber: string;
    toNumbers: string[];
    text: string;
    replyOnMessageId?: number;
    multipart?: boolean;
    attachments?: Attachment[];
  }) {
    const eventId = uuid.v4();
    if (!this._validateContent(text, attachments, multipart)) {
      return null;
    }
    try {
      const validateToNumberResult = await this._validateToNumbers(toNumbers);
      if (!validateToNumberResult.result) {
        return null;
      }
      const recipientNumbers = validateToNumberResult.numbers;
      const maxExtensionLength =
        // @ts-expect-error
        this._deps.accountInfo.maxExtensionNumberLength;

      // @ts-expect-error
      const extensionNumbers = recipientNumbers.filter(
        (number) => number.length <= maxExtensionLength,
      );
      // @ts-expect-error
      const phoneNumbers = recipientNumbers.filter(
        (number) => number.length > maxExtensionLength,
      );

      if (extensionNumbers.length > 0 && attachments.length > 0) {
        this._alertWarning(messageSenderMessages.noAttachmentToExtension);
        return null;
      }

      // not validate sender number if recipient is only extension number
      if (phoneNumbers.length > 0) {
        if (!this._validateSenderNumber(fromNumber)) {
          return null;
        }
      }
      this._eventEmitter.emit(messageSenderEvents.send, {
        eventId,
        fromNumber,
        toNumbers,
        text,
        replyOnMessageId,
        multipart,
      });
      const isBulkMessage = Array.isArray(toNumbers) && toNumbers.length > 1;
      const isPager = extensionNumbers.length > 0;
      this._smsAttempt(isBulkMessage, isPager);
      const responses = [];
      const chunks = multipart
        ? chunkMessage(text, MESSAGE_MAX_LENGTH)
        : [text];
      const total = (phoneNumbers.length + 1) * chunks.length;
      const shouldSleep = total > SENDING_THRESHOLD;
      if (extensionNumbers.length > 0) {
        for (const chunk of chunks) {
          if (shouldSleep) await sleep(2000);
          const pagerResponse = await this._sendPager({
            toNumbers: extensionNumbers,
            text: chunk,
            // @ts-expect-error
            replyOnMessageId,
          });
          responses.push(pagerResponse);
        }
      }

      if (phoneNumbers.length > 0) {
        for (const phoneNumber of phoneNumbers) {
          for (const chunk of chunks) {
            if (shouldSleep) await sleep(2000);
            let smsResponse;
            const smsBody = {
              fromNumber,
              toNumber: phoneNumber,
              text: chunk,
              attachments,
            };
            if (attachments.length > 0) {
              smsResponse = await this._sendMMS(smsBody);
            } else {
              smsResponse = await this._sendSMS(smsBody);
            }
            responses.push(smsResponse);
          }
        }
      }
      this._smsSentOver();
      return responses;
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.debug('sendComposeText e ', error);
      this._eventEmitter.emit(messageSenderEvents.sendError, {
        eventId,
        fromNumber,
        toNumbers,
        text,
        replyOnMessageId,
        multipart,
      });
      this._smsSentError();
      await this._onSendError(error);
      throw error;
    }
  }

  @proxify
  async _sendSMS({
    fromNumber,
    toNumber,
    text,
  }: {
    fromNumber: string;
    toNumber: string;
    text: string;
  }): Promise<GetMessageInfoResponse> {
    const toUsers = [{ phoneNumber: toNumber }];
    const response = await this._deps.client
      .account()
      .extension()
      .sms()
      .post({
        from: { phoneNumber: fromNumber },
        to: toUsers,
        text,
      });
    return response;
  }

  async _sendMMS({
    fromNumber,
    toNumber,
    text,
    attachments = [],
  }: {
    fromNumber: string;
    toNumber: string;
    text: string;
    attachments?: Attachment[];
  }): Promise<GetMessageInfoResponse> {
    const formData = new FormData();
    const body = {
      from: { phoneNumber: fromNumber },
      to: [{ phoneNumber: toNumber }],
      text,
    };
    formData.append(
      'json',
      new Blob([JSON.stringify(body, null, 2)], { type: 'application/json' }),
    );
    attachments.forEach((attachment) => {
      formData.append('attachment', attachment.file);
    });

    const response = await this._deps.client.service
      .platform()
      .post('/restapi/v1.0/account/~/extension/~/sms', formData);
    return response.json();
  }

  @proxify
  async _sendPager({
    toNumbers,
    text,
    replyOnMessageId,
  }: {
    toNumbers: string[];
    text: string;
    replyOnMessageId: number;
  }): Promise<GetMessageInfoResponse> {
    const from = { extensionNumber: this._deps.extensionInfo.extensionNumber };
    const toUsers = toNumbers.map((number) => ({ extensionNumber: number }));
    const params: CreatePagerMessageRequest = {
      from,
      to: toUsers,
      text,
    };
    if (replyOnMessageId) {
      params.replyOn = replyOnMessageId;
    }
    const response = await this._deps.client
      .account()
      .extension()
      .companyPager()
      .post(params);
    return response;
  }

  async _onSendError(error: ApiError): Promise<void> {
    const errResp = error.response;
    let errorJson: SendErrorResponse;
    if (errResp) {
      errorJson = await errResp.clone().json();
    }
    if (
      errResp &&
      !errResp.ok &&
      // @ts-expect-error
      errorJson &&
      (errorJson.errorCode === 'InvalidParameter' ||
        errorJson.errorCode === 'InternationalProhibited' ||
        errorJson.errorCode === 'CMN-408')
    ) {
      // @ts-expect-error
      errorJson.errors.map((err) => {
        if (
          (err.errorCode === 'CMN-101' ||
            err.errorCode === 'CMN-102' ||
            err.errorCode === 'CMN-414') &&
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
          this._alertWarning(
            messageSenderMessages.internationalSMSNotSupported,
          );
        }
        if (err.errorCode === 'CMN-408') {
          // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
          this._alertWarning(messageSenderMessages.noInternalSMSPermission);
        }
        return null;
      });
      return;
    }

    if (
      this._deps.availabilityMonitor &&
      (await this._deps.availabilityMonitor.checkIfHAError(error))
    ) {
      return;
    }

    this._alertWarning(messageSenderMessages.sendError);
  }

  on(
    event: ObjectMapValue<typeof messageSenderEvents>,
    handler: (event: EventParameter) => void,
  ) {
    this._eventEmitter.on(event, handler);
  }

  get idle() {
    return this.sendStatus === messageSenderStatus.idle;
  }

  get senderNumbersList(): SenderNumber[] {
    // @ts-expect-error
    return this._deps.extensionPhoneNumber.smsSenderNumbers;
  }

  get events() {
    return messageSenderEvents;
  }
}
