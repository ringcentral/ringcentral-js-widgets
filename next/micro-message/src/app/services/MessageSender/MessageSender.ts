import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import chunkMessage from '@ringcentral-integration/commons/lib/chunkMessage';
import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  AppFeatures,
  AvailabilityMonitor,
  Client,
  ExtensionInfo,
  ExtensionPhoneNumber,
  NumberFormatter,
  track,
  trackEvent,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  CompanyContacts,
  NumberValidate,
  ValidateParsingResult,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  Toast,
  ToastManager,
} from '@ringcentral-integration/micro-core/src/app/services';
import { type UserPhoneNumberInfo } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  RcModule,
  state,
} from '@ringcentral-integration/next-core';
import { base64ToFile, sleep } from '@ringcentral-integration/utils';
import type { ApiError } from '@ringcentral/sdk';
import { EventEmitter } from 'events';
import type CreatePagerMessageRequest from 'ringcentral-client/build/definitions/CreatePagerMessageRequest';
import type GetMessageInfoResponse from 'ringcentral-client/build/definitions/GetMessageInfoResponse';
import { v4 } from 'uuid';

import type { MessageThread } from '../MessageThread';

import { t } from './i18n';
import type {
  Attachment,
  EventParameter,
  MessageSenderOptions,
  SendErrorResponse,
  SmsPermissionReason,
} from './MessageSender.interface';
import { messageSenderEvents } from './messageSenderEvents';
import { messageSenderStatus } from './messageSenderStatus';

export const MESSAGE_MAX_LENGTH = 1000;
export const MULTIPART_MESSAGE_MAX_LENGTH = MESSAGE_MAX_LENGTH * 5;

const SENDING_THRESHOLD = 30;

export const ATTACHMENT_SIZE_LIMITATION = 1.5 * 1024 * 1024;

const SMS_SENDER_FEATURE = 'SmsSender';
const SMS_RECEIVER_FEATURE = 'SmsReceiver';

type SendSMSPayload = {
  fromNumber: string;
  toNumbers: string[];
  text: string;
};

type SendMMSPayload = SendSMSPayload & {
  attachments?: Attachment[];
};

export type SendPayload = SendMMSPayload & {
  replyOnMessageId?: number;
  multipart?: boolean;
  /**
   * Whether to send message to direct numbers by group
   * Default to send to all direct numbers at once
   */
  grouped?: boolean;
};

@injectable({
  name: 'MessageSender',
})
export class MessageSender extends RcModule {
  @dynamic('MessageThread')
  private _messageThread?: MessageThread;

  private _eventEmitter = new EventEmitter();
  uniqueManager = this._toastManager.createUniqueManager();

  constructor(
    private _brand: Brand,
    private _toast: Toast,
    private _toastManager: ToastManager,
    private _client: Client,
    private _extensionInfo: ExtensionInfo,
    private _extensionPhoneNumber: ExtensionPhoneNumber,
    private _numberValidate: NumberValidate,
    private _appFeatures: AppFeatures,
    private _numberFormatter: NumberFormatter,
    @optional() private _companyContacts?: CompanyContacts,
    @optional()
    private _availabilityMonitor?: AvailabilityMonitor,
    @optional('MessageSenderOptions')
    private _messageSenderOptions?: MessageSenderOptions,
  ) {
    super();
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
  private _smsAttempt(_isBulkMessage: boolean, _isPage: boolean) {
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

  validateContent(text: string, attachments: Attachment[], multipart: boolean) {
    if (isBlank(text) && attachments.length === 0) {
      this.uniqueManager.unique(() =>
        this._toast.warning({
          message: t('textEmpty'),
          ttl: 0,
        }),
      );
      return false;
    }

    if (!multipart && text && text.length > MESSAGE_MAX_LENGTH) {
      this.uniqueManager.unique(() =>
        this._toast.warning({
          message: t('textTooLong'),
          ttl: 0,
        }),
      );
      return false;
    }

    if (multipart && text && text.length > MULTIPART_MESSAGE_MAX_LENGTH) {
      this.uniqueManager.unique(() =>
        this._toast.warning({
          message: t('multipartTextTooLong'),
          ttl: 0,
        }),
      );
      return false;
    }

    return true;
  }

  _validateToNumbersIsEmpty(toNumbers: string[]) {
    if (toNumbers.length === 0) {
      this.uniqueManager.unique(() =>
        this._toast.warning({
          message: t('recipientsEmpty'),
          ttl: 0,
        }),
      );
      return true;
    }
    return false;
  }

  @delegate('server')
  async _validateToNumbers(toNumbers: string[]) {
    const result: {
      result: boolean;
      extNumbers: string[];
      noExtNumbers: string[];
    } = {
      result: false,
      extNumbers: [],
      noExtNumbers: [],
    };
    if (this._validateToNumbersIsEmpty(toNumbers)) {
      return result;
    }
    const recipientNumbers = toNumbers.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );
    this.setSendStatus(messageSenderStatus.validating);
    const isEDPEnabled = this._appFeatures?.isEDPEnabled;
    const numberValidateResult = isEDPEnabled
      ? this._numberValidate.validate(recipientNumbers)
      : await this._numberValidate.validateNumbers(recipientNumbers);

    this._numberValidate.handleValidateToasts(numberValidateResult);

    if (!numberValidateResult.result) {
      this.setSendStatus(messageSenderStatus.idle);
      return result;
    }
    if (isEDPEnabled) {
      const parsedNumbers =
        await this._numberValidate.parseNumbers(recipientNumbers);
      if (parsedNumbers) {
        result.result = true;
        parsedNumbers.forEach((item) => {
          if (item.isAnExtension) {
            result.extNumbers.push(
              (item.availableExtension ?? item.parsedNumber)!,
            );
          } else {
            result.noExtNumbers.push(item.parsedNumber!);
          }
        });
      }
    } else {
      for (const number of (numberValidateResult as ValidateParsingResult)
        .numbers!) {
        if (number.subAddress && number.subAddress.length > 0) {
          // remove extension number check when use company contact public api
          if (
            !this._companyContacts?.enableCompanyPublicApi &&
            !this._numberValidate.isCompanyExtension(
              number.e164!,
              number.subAddress,
            )
          ) {
            this.uniqueManager.unique(() =>
              this._toast.warning({
                message: t('notAnExtension'),
                ttl: 0,
              }),
            );
            this.setSendStatus(messageSenderStatus.idle);
            return result;
          }
          result.extNumbers.push(number.subAddress);
        } else {
          if (number.isAnExtension) {
            result.extNumbers.push((number.availableExtension || number.e164)!);
          } else {
            result.noExtNumbers.push(number.e164!);
          }
        }
      }
      result.result = true;
    }
    return result;
  }

  @delegate('server')
  async send({
    fromNumber,
    toNumbers,
    text,
    replyOnMessageId,
    multipart = false,
    attachments = [],
    grouped = false,
  }: SendPayload) {
    await this.uniqueManager.dismissAll();

    const eventId = v4();
    if (!this.validateContent(text, attachments, multipart)) {
      return null;
    }
    try {
      const validateToNumberResult = await this._validateToNumbers(toNumbers);
      if (!validateToNumberResult.result) {
        return null;
      }
      const extensionNumbers = validateToNumberResult.extNumbers;
      const recipientPhoneNumbers = validateToNumberResult.noExtNumbers;
      const hasAttachments = attachments.length > 0;
      const shouldSendMessageThread = this._shouldSendMessageThread(fromNumber);

      if (extensionNumbers.length > 0 && hasAttachments) {
        this.uniqueManager.unique(() =>
          this._toast.warning({
            message: t('noAttachmentToExtension'),
            ttl: 3000,
          }),
        );
        this.setSendStatus(messageSenderStatus.idle);
        return null;
      }

      const _validateSenderNumber = (senderNumber: string) => {
        let validateResult = true;
        if (isBlank(senderNumber)) {
          validateResult = false;
        }
        this.setSendStatus(messageSenderStatus.validating);
        if (validateResult) {
          const isMySenderNumber = this.senderNumbersList.find(
            (number) => number.phoneNumber === senderNumber,
          );
          if (!isMySenderNumber) {
            validateResult = false;
          }
        }

        if (!validateResult) {
          this.setSendStatus(messageSenderStatus.idle);

          // non spring-ui only, non spring-ui not able to go into here, due to the sending button be disabled with the hasSmsPermission
          if (process.env.THEME_SYSTEM !== 'spring-ui') {
            this.uniqueManager.unique(() =>
              this._toast.warning({
                message: t('senderNumberInvalid'),
                ttl: 0,
              }),
            );
          }
        }
        return validateResult;
      };

      // not validate sender number if recipient is only extension number
      if (
        recipientPhoneNumbers.length > 0 &&
        !_validateSenderNumber(fromNumber)
      ) {
        this.logger.error('Sender number is invalid', fromNumber);
        this.setSendStatus(messageSenderStatus.idle);
        return null;
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
      const total = (recipientPhoneNumbers.length + 1) * chunks.length;
      const shouldSleep = total > SENDING_THRESHOLD;

      /**
       * TODO: when support grouped in CRM or some projects should consider enable that and fix the logic.
       *
       * for pager we not support non group currently, this ignore the grouped option and send to all extension numbers at once
       */
      if (extensionNumbers.length > 0) {
        for (const chunk of chunks) {
          if (shouldSleep) await sleep(2000);
          const pagerResponse = await this._sendPager({
            toNumbers: extensionNumbers,
            text: chunk,
            replyOnMessageId: replyOnMessageId!,
          });
          responses.push(pagerResponse);
        }
      }

      if (recipientPhoneNumbers.length > 0) {
        for (const chunk of chunks) {
          const toNumberSections = grouped
            ? [recipientPhoneNumbers] // send all at once:
            : recipientPhoneNumbers.map((number) => [number]); // send one by one

          for (const toNumbers of toNumberSections) {
            let smsResponse;
            const smsBody: SendMMSPayload = {
              fromNumber,
              toNumbers,
              text: chunk,
              attachments,
            };
            if (shouldSleep) await sleep(2000);

            if (this._messageThread && shouldSendMessageThread) {
              smsResponse = await this._messageThread.sendNewThreadMessage({
                fromNumber,
                toNumbers,
                text: chunk,
                attachments,
              });
            } else if (hasAttachments) {
              smsResponse = await this._sendMMS(smsBody);
            } else {
              smsResponse = await this._sendSMS(smsBody);
            }

            trackEvent('Int_Text_textSent', {
              textSentType: replyOnMessageId ? 'Reply' : 'Create',
              textType: hasAttachments ? 'MMS' : 'SMS',
              isGroupText: toNumbers.length > 1,
              isPager: false,
            });

            responses.push(smsResponse);
          }
        }
      }
      this._smsSentOver();
      return responses;
    } catch (error) {
      this._eventEmitter.emit(messageSenderEvents.sendError, {
        eventId,
        fromNumber,
        toNumbers,
        text,
        replyOnMessageId,
        multipart,
      });
      this._smsSentError();
      await this._onSendError(error as any);
      throw error;
    }
  }

  private _shouldSendMessageThread(fromNumber: string) {
    return !!(
      this._messageThread &&
      this._messageThread.hasPermission &&
      this._messageThread.isSharedSmsSenderNumber(fromNumber)
    );
  }

  @delegate('server')
  async _sendSMS({
    fromNumber,
    toNumbers,
    text,
  }: SendSMSPayload): Promise<GetMessageInfoResponse> {
    const response = await this._client
      .account()
      .extension()
      .sms()
      .post({
        from: { phoneNumber: fromNumber },
        to: toNumbers.map((number) => ({ phoneNumber: number })),
        text,
      });
    return response;
  }

  @delegate('server')
  async _sendMMS({
    fromNumber,
    toNumbers,
    text,
    attachments = [],
  }: SendMMSPayload): Promise<GetMessageInfoResponse> {
    const body = {
      from: { phoneNumber: fromNumber },
      to: toNumbers.map((number) => ({ phoneNumber: number })),
      text,
    };
    // in some device, the file instance is broken, so we use base64 first
    const attachment = attachments.map((attachment) =>
      attachment.base64Url
        ? base64ToFile(attachment.base64Url, attachment.name)
        : attachment.file,
    );
    const responseData = await this._client.multipart.post(
      '/restapi/v1.0/account/~/extension/~/mms',
      {
        fields: {
          json: body,
        },
        files: {
          attachment,
        },
        // mms api need ASCII file name, so check all files name not have ASCII characters before sending
        checkAllFilesNameNotHaveASCII: true,
      },
    );

    return responseData;
  }

  @delegate('server')
  async _sendPager({
    toNumbers,
    text,
    replyOnMessageId,
  }: {
    toNumbers: string[];
    text: string;
    replyOnMessageId: number;
  }): Promise<GetMessageInfoResponse> {
    const from = { extensionNumber: this._extensionInfo.extensionNumber };
    const toUsers = toNumbers.map((number) => ({ extensionNumber: number }));
    const params: CreatePagerMessageRequest = {
      from,
      to: toUsers,
      text,
    };
    if (replyOnMessageId) {
      params.replyOn = replyOnMessageId;
    }

    const response = await this._client
      .account()
      .extension()
      .companyPager()
      .post(params);

    trackEvent('Int_Text_textSent', {
      textSentType: replyOnMessageId ? 'Reply' : 'Create',
      textType: 'SMS',
      isGroupText: toNumbers.length > 1,
      isPager: true,
    });

    return response;
  }

  async _onSendError(error: ApiError): Promise<void> {
    const errResp = error.response;
    let errorJson: SendErrorResponse;
    if (errResp) {
      errorJson = await errResp.clone().json();
    }

    const getToast = async () => {
      if (
        errResp &&
        !errResp.ok &&
        errorJson! &&
        (errorJson.errorCode === 'InvalidParameter' ||
          errorJson.errorCode === 'InternationalProhibited' ||
          errorJson.errorCode === 'CMN-408')
      ) {
        errorJson.errors!.forEach((err) => {
          if (
            (err.errorCode === 'CMN-101' ||
              err.errorCode === 'CMN-102' ||
              err.errorCode === 'CMN-414') &&
            err.parameterName.startsWith('to')
          ) {
            // 101 : "Parameter [to.extensionNumber] value is invalid"
            // 101 : "Parameter [to.phoneNumber] value is invalid"
            // 102 : "Resource for parameter [to] is not found"
            return this._toast.warning({
              message: t('recipientNumberInvalids'),
              ttl: 0,
            });
          }
          if (err.errorCode === 'MSG-246') {
            // MSG-246 : "Sending SMS from/to extension numbers is not available"
            return this._toast.warning({
              message: t('notSmsToExtension'),
              ttl: 0,
            });
          }
          if (err.errorCode === 'MSG-247') {
            // MSG-247 : "Sending SMS to short numbers is not available"
            return this._toast.warning({
              message: t('shortNumbersNotAvailable'),
              ttl: 0,
            });
          }
          if (err.errorCode === 'MSG-240') {
            // MSG-240 : "International SMS is not supported"
            return this._toast.warning({
              message: t('internationalSMSNotSupported'),
              ttl: 0,
            });
          }
          if (err.errorCode === 'CMN-408') {
            // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
            return this._toast.warning({
              message: t('noInternalSMSPermission', {
                brand: this._brand.name,
              }),
              ttl: 0,
            });
          }
          if (err.errorCode === 'MSG-383') {
            // International MMS feature is not available
            // use common error temporarily
            return this._toast.warning({
              message: t('sendError'),
              ttl: 0,
            });
          }
          return;
        });
        return;
      }

      if (
        this._availabilityMonitor &&
        (await this._availabilityMonitor.checkIfHAError(error))
      ) {
        return;
      }

      return this._toast.warning({
        message: t('sendError'),
        ttl: 0,
      });
    };

    const toast = await getToast();

    if (toast) {
      this.uniqueManager.unique(() => toast);
    }
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

  private _hasPhoneNumberFeature(number: UserPhoneNumberInfo, feature: string) {
    return !!(number.features as string[] | undefined)?.includes(feature);
  }

  get numbers() {
    return this._extensionPhoneNumber.numbers;
  }

  // numbers can receive & send sms
  get senderNumbersList() {
    return this._extensionPhoneNumber.smsSenderNumbers;
  }

  // numbers can only receive sms
  @computed
  get receiveOnlyNumbers() {
    return this.numbers.filter(
      (number) =>
        this._hasPhoneNumberFeature(number, SMS_RECEIVER_FEATURE) &&
        !this._hasPhoneNumberFeature(number, SMS_SENDER_FEATURE),
    );
  }

  // numbers can neither send nor receive sms
  @computed
  get registerableNumbers() {
    return this.numbers.filter(
      (number) =>
        !this._hasPhoneNumberFeature(number, SMS_SENDER_FEATURE) &&
        !this._hasPhoneNumberFeature(number, SMS_RECEIVER_FEATURE),
    );
  }

  // sms permission limited reasons
  @computed
  get smsPermissionReason(): SmsPermissionReason | null {
    // account level sms permission off
    if (!this._appFeatures.hasComposeTextPermission) {
      return 'noComposePermission';
    }

    if (
      this.senderNumbersList.length === 0 &&
      (this.receiveOnlyNumbers.length > 0 ||
        this.registerableNumbers.length > 0)
    ) {
      if (this.receiveOnlyNumbers.length > 0) {
        return 'receiveOnlyNumber';
      }

      return 'noNumberAvailable';
    }

    return null;
  }

  @computed
  get hasSmsPermission() {
    return (
      this._appFeatures.hasComposeTextPermission &&
      (process.env.THEME_SYSTEM === 'spring-ui'
        ? this.senderNumbersList.length > 0
        : // in non spring-ui always have sms permission, event not have any sender number, that use alert to prevent user not able to send invalid from numbers
          true)
    );
  }

  @computed
  get senderNumberMap() {
    return this.senderNumbersList.reduce((acc, number) => {
      const key = this._numberFormatter.formatNumber(number.phoneNumber);
      acc.set(key, number);
      return acc;
    }, new Map<string, UserPhoneNumberInfo>());
  }

  get events() {
    return messageSenderEvents;
  }
}
