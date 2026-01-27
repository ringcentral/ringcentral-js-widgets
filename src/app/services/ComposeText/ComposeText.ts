import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import {
  AppFeatures,
  Auth,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  ContactSearch,
  Entities,
  NumberValidate,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  injectable,
  logger,
  optional,
  PortalInstance,
  RcModule,
  RouterPlugin,
  state,
  StoragePlugin,
  userStorage,
  watch,
} from '@ringcentral-integration/next-core';
import { finalize, firstValueFrom, merge, NEVER, switchMap, timer } from 'rxjs';

import { FilteredConversation } from '../Conversations';
import type { Attachment } from '../MessageSender';
import { ATTACHMENT_SIZE_LIMITATION, MessageSender } from '../MessageSender';
import { SmsOptOut } from '../SmsOptOut';

import type { ComposeTextOptions, ToNumber } from './ComposeText.interface';
import { t } from './i18n';

const DEFAULT_MAX_RECIPIENTS = 10;

export const COMPOSE_TEXT_CONVERSATION = {
  conversationId: 'create',
} as FilteredConversation;

@injectable({
  name: 'ComposeText',
})
export class ComposeText extends RcModule {
  protected smsVerify?: ({
    toNumbers,
    typingToNumber,
  }: {
    toNumbers: ToNumber[];
    typingToNumber: string;
  }) => Promise<boolean>;

  constructor(
    protected _toast: Toast,
    protected _auth: Auth,
    protected _storage: StoragePlugin,
    protected _messageSender: MessageSender,
    protected _numberValidate: NumberValidate,
    protected _appFeatures: AppFeatures,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional() protected _smsOptOut?: SmsOptOut,
    @optional() protected _contactSearch?: ContactSearch,
    @optional('ComposeTextOptions')
    protected _composeTextOptions?: ComposeTextOptions,
    @optional() protected _router?: RouterPlugin,
  ) {
    super();
    this._storage.enable(this, {
      migrations: [['senderNumber', 'composeText-senderNumber']],
    });

    this._contactMatcher?.addQuerySource({
      getQueriesFn: () => this.toNumbersQuery,
      readyCheckFn: () => true,
    });
  }

  @userStorage
  @state
  senderNumber = '';

  @state
  typingToNumber = '';

  @state
  protected _toNumbers: ToNumber[] = [];

  @computed
  private get toNumbersQuery(): string[] {
    return this._toNumbers.map((number) => number.phoneNumber);
  }

  @computed
  get toNumbers() {
    return this._toNumbers.map((number) => {
      const isOptOut = Boolean(
        this._smsOptOut?.isOptOut(number.phoneNumber, this.senderNumber),
      );
      const error = number.error || isOptOut;
      const value: ToNumber = {
        ...number,
        error,
        errorReason: error
          ? isOptOut
            ? 'optOut'
            : 'invalidPhoneNumber'
          : undefined,
      };

      return this._composeTextOptions?.toNumbersProcessor?.(value) ?? value;
    });
  }

  @computed
  get hasInvalidToNumbers() {
    return this.toNumbers.some((toNumber) => toNumber.error);
  }

  @state
  messageText = '';

  @state
  toNumberEntity = '';

  @state
  attachments: Attachment[] = [];

  @state
  createGroupChecked = true;

  @action
  _setCreateGroupChecked(checked: boolean) {
    this.createGroupChecked = checked;
  }

  @delegate('server')
  async setCreateGroupChecked(checked: boolean) {
    this._setCreateGroupChecked(checked);
  }

  @action
  _setSenderNumber(number = '') {
    this.senderNumber = number;
  }

  @action
  _setTypingToNumber(number = '') {
    this.typingToNumber = number;
  }

  @action
  _setToNumberEntity(entityId: string) {
    this.toNumberEntity = entityId;
  }

  @action
  _addToNumber(number: ToNumber) {
    if (number.id) {
      const idx = this._toNumbers.findIndex(
        (item) =>
          number.id === item.id || number.phoneNumber === item.phoneNumber,
      );
      if (idx > -1) {
        // replace old one if found
        this._toNumbers[idx] = number;
        return;
      }
    } else {
      const oldNumber = this._toNumbers.find(
        (item) => number.phoneNumber === item.phoneNumber,
      );
      if (oldNumber) {
        return;
      }
    }
    this._toNumbers.push(number);
  }

  @action
  _removeToNumber(number: ToNumber) {
    const index = this._toNumbers.findIndex(
      (item) => item.phoneNumber === number.phoneNumber,
    );
    if (index !== -1) {
      this._toNumbers.splice(index, 1);
    }
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
    this._toNumbers = [];
    this.messageText = '';
    this.attachments = [];
    this.toNumberEntity = '';
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._auth.loggedIn);
  }

  override _shouldReset() {
    return !!(super._shouldReset() || (this.ready && !this._auth.loggedIn));
  }

  override async onInit() {
    if (this._auth.isFreshLogin) {
      await this.clean();
    }
    this._initSenderNumber();
  }

  override async onReset() {
    await this.clean();
  }

  override onInitOnce() {
    watch(
      this,
      () => this._messageSender.senderNumbersList,
      () => {
        if (this.ready) {
          this._initSenderNumber();
        }
      },
    );
    watch(
      this,
      () => this._contactSearch?.searchResult as Entities,
      (searchResult) => {
        if (
          this.ready &&
          this._contactSearch?.ready &&
          searchResult?.length > 0
        ) {
          this._handleRecipient();
        }
      },
    );

    const _contactMatcher = this._contactMatcher;
    if (_contactMatcher) {
      watch(
        this,
        () => [this.toNumbersQuery, this.ready] as const,
        () => {
          if (
            this.ready &&
            _contactMatcher.ready &&
            this.toNumbersQuery.length > 0
          ) {
            _contactMatcher.triggerMatch();
          }
        },
        {
          multiple: true,
        },
      );
    }
  }

  _initSenderNumber() {
    const cachedPhoneNumber = this.senderNumber;
    if (
      cachedPhoneNumber &&
      this._messageSender.senderNumbersList.find(
        (info) => info.phoneNumber === cachedPhoneNumber,
      )
    ) {
      return;
    }
    const userPhoneNumberInfo = this._messageSender.senderNumbersList[0];
    if (!userPhoneNumberInfo) {
      logger.warn('No sender number found');
      return;
    }

    this.updateSenderNumber(userPhoneNumberInfo?.phoneNumber);
  }

  _handleRecipient() {
    const dummy = this._toNumbers.find((toNumber) => !toNumber.entityType);
    if (dummy) {
      const recipient = this._contactSearch?.searchResult.find(
        (item: any) => item.id === dummy.id,
      );
      if (recipient) {
        this.addToNumber(recipient);
      }
    }
  }

  private _alertWarning(message: string, ttl?: number) {
    this._toast.warning({
      message,
      allowDuplicates: false,
      ttl,
    });
  }

  private _alertDanger(message: string) {
    this._toast.danger({
      message,
      allowDuplicates: false,
      ttl: 5000,
    });
  }

  private async _validatePhoneNumber<T extends string | string[] = string>(
    phoneNumbers: T,
  ): Promise<T extends string ? boolean : boolean[]> {
    const isList = Array.isArray(phoneNumbers);
    const phoneNumberArray: string[] = isList ? phoneNumbers : [phoneNumbers];
    const isOnlyPagerResults = await this._validateIsOnlyPager(
      phoneNumberArray,
    );
    const isOnlyPagerArray = Array.isArray(isOnlyPagerResults)
      ? isOnlyPagerResults
      : [isOnlyPagerResults];

    const isEDPEnabled = this._appFeatures?.isEDPEnabled;

    const validateResult = isEDPEnabled
      ? this._numberValidate.validate(phoneNumberArray)
      : this._numberValidate.validateFormat(phoneNumberArray);

    this._numberValidate.handleValidateToasts(validateResult);

    const results = phoneNumberArray.map((_, index) => {
      if (isOnlyPagerArray[index]) {
        return false;
      }
      return !!validateResult.result;
    });

    return (isList ? results : results[0]) as unknown as T extends string
      ? boolean
      : boolean[];
  }

  async _validateIsOnlyPager(phoneNumbers: string | string[]) {
    const phoneNumberArray = Array.isArray(phoneNumbers)
      ? phoneNumbers
      : [phoneNumbers];
    const validate = this._numberValidate.validate(phoneNumberArray);
    if (!validate.result) {
      return Array.isArray(phoneNumbers)
        ? phoneNumberArray.map(() => false)
        : false;
    }
    const parsedNumbers =
      (await this._numberValidate.parseNumbers(phoneNumberArray)) || [];

    const results = phoneNumberArray.map((phoneNumber, index) => {
      const { isAnExtension } = parsedNumbers[index] || {};
      if (
        phoneNumber.length >= 7 &&
        !isAnExtension &&
        !this._appFeatures.hasOutboundSMSPermission
      ) {
        this._alertWarning(t('noSMSPermission'));
        return true;
      }
      return false;
    });

    return Array.isArray(phoneNumbers) ? results : results[0];
  }

  @delegate('server')
  async resetCreateGroupChecked() {
    if (this.disabledGroupMessage) {
      // when disabledGroupMessage is true, always force individual messages, not need to reset createGroupChecked state
      return;
    }
    const recipients = this._toNumbers;
    // Reset createGroupChecked to default value if there're less than 1 recipients
    if (recipients.length <= 1) {
      this.setCreateGroupChecked(true);
    }
    if (!this._appFeatures.hasSendMMSPermission && recipients.length > 1) {
      // when can not create group, direct switch to individual message
      this.setCreateGroupChecked(false);
    }
  }

  @delegate('server')
  async validatePhoneNumber(phoneNumber: string) {
    if (await this._validateIsOnlyPager(phoneNumber)) {
      return false;
    }
    const validateResult = this._numberValidate.validateFormat([phoneNumber]);
    return !!validateResult.result;
  }

  @delegate('server')
  async send(text: string, attachments: Attachment[] = []) {
    const toNumbers = this._toNumbers.map((number) => number.phoneNumber);
    const { typingToNumber } = this;
    if (!isBlank(typingToNumber)) {
      if (await this._validatePhoneNumber(typingToNumber)) {
        toNumbers.push(typingToNumber);
      } else {
        return null;
      }
    }

    const continueSend = this.smsVerify
      ? await this.smsVerify({ toNumbers: this._toNumbers, typingToNumber })
      : true;
    if (!continueSend) return null;

    let toastPortalInstance: PortalInstance | undefined;
    const responses = await firstValueFrom(
      merge(
        // when sending takes too long, show a toast
        timer(10000).pipe(
          switchMap(() => {
            if (this._router?.currentPath === '/composeText') {
              toastPortalInstance = this._toast.warning({
                message: t('sending'),
                ttl: 0,
              });
            }
            return NEVER;
          }),
          finalize(() => {
            toastPortalInstance?.close();
          }),
        ),
        this.sendMessages(text, attachments, toNumbers),
      ),
    );

    return responses;
  }

  @delegate('server')
  async sendMessages(
    text: string,
    attachments: Attachment[] = [],
    toNumbers: string[],
  ) {
    this.logger.log('sendMessages', {
      disabledGroupMessage: this.disabledGroupMessage,
      createGroupChecked: this.createGroupChecked,
      toNumbersCount: toNumbers.length,
    });

    const grouped =
      // When disabledGroupMessage is true, always send individual messages, and only spring-ui support group sending
      process.env.THEME_SYSTEM === 'spring-ui' &&
      !this.disabledGroupMessage &&
      this.createGroupChecked;

    const messageText =
      this._smsOptOut?.attachOptOutHint(
        COMPOSE_TEXT_CONVERSATION.conversationId!,
        text,
      ) ?? text;

    const result = await this._messageSender.send({
      fromNumber: this.senderNumber,
      toNumbers,
      text: messageText,
      attachments,
      grouped,
    });
    if (result) {
      this._smsOptOut?.resetOptOut(COMPOSE_TEXT_CONVERSATION.conversationId!);
    }
    return result;
  }

  @delegate('server')
  async updateSenderNumber(number?: string) {
    this._setSenderNumber(number);
  }

  @delegate('server')
  async updateTypingToNumber(number: string) {
    if (number.length > 30) {
      this._alertWarning(t('recipientNumberInvalids'));
      return;
    }
    this._setTypingToNumber(number);
  }

  @delegate('server')
  async onToNumberMatch({ entityId }: { entityId: string }) {
    this._setToNumberEntity(entityId);
  }

  @delegate('server')
  async addToRecipients(recipient: ToNumber, shouldClean = true) {
    const isAdded = await this.addToNumber(recipient);
    if (isAdded && shouldClean) {
      this._setTypingToNumber('');
    }
  }

  @delegate('server')
  async cleanTypingToNumber() {
    this._setTypingToNumber('');
  }

  @delegate('server')
  async addToNumber(number: ToNumber) {
    if (isBlank(number.phoneNumber)) {
      return false;
    }
    const isValid = await this._validatePhoneNumber(number.phoneNumber);
    if (!isValid) {
      return false;
    }
    this._processAddToNumber(number);

    return true;
  }

  @delegate('server')
  async addToNumbers(numbers: ToNumber[]) {
    if (!numbers || numbers.length === 0) {
      return false;
    }

    const phoneNumbers = numbers.map((number) => number.phoneNumber);
    const validationResults = await this._validatePhoneNumber(phoneNumbers);

    // only add valid numbers
    const validNumbers = numbers.filter(
      (number, index) => validationResults[index] === true,
    );

    if (validNumbers.length === 0) {
      return false;
    }

    // batch add valid numbers
    this._processAddToNumbers(validNumbers);

    return true;
  }

  @action
  private _processAddToNumbers(validNumbers: ToNumber[]) {
    validNumbers.forEach((number) => {
      this._processAddToNumber(number);
    });
  }

  @action
  private _processAddToNumber(number: ToNumber) {
    this._addToNumber(number);
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const hasSenderNumbers = this._messageSender.senderNumbersList.length > 0;
      if (
        !hasSenderNumbers &&
        this._appFeatures.hasOutboundSMSPermission &&
        this._toNumbers.some((x) => x && x.type !== 'company')
      ) {
        this._alertWarning(t('senderNumberInvalid'), 0);
      }
      this.resetCreateGroupChecked();
    }
  }

  @delegate('server')
  async removeToNumber(number: ToNumber) {
    this._removeToNumber(number);
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      this.resetCreateGroupChecked();
    }
  }

  checkAttachmentOverLimit(attachments: Attachment[]) {
    const oldAttachments = this.attachments!;
    if (attachments.length + oldAttachments.length > 10) {
      this._alertDanger(t('attachmentCountLimitation'));
      return false;
    }

    const size = [...oldAttachments, ...attachments].reduce((prev, curr) => {
      return prev + curr.size;
    }, 0);
    if (size > ATTACHMENT_SIZE_LIMITATION) {
      this._alertDanger(t('attachmentSizeLimitation'));
      return false;
    }
    return true;
  }

  @delegate('server')
  async updateMessageText(text: string) {
    if (text.length > 1000) {
      this._alertWarning(t('textTooLong'));
      return;
    }
    this._setMessageText(text);
  }

  @delegate('server')
  async addAttachments(attachments: Attachment[]) {
    const isValid = this.checkAttachmentOverLimit(attachments);
    if (!isValid) {
      return;
    }
    for (const attachment of attachments) {
      this.addAttachment(attachment);
    }
  }

  @delegate('server')
  async addAttachment(attachment: Attachment) {
    this._addAttachment(attachment);
  }

  @delegate('server')
  async removeAttachment(attachment: Attachment) {
    this._removeAttachment(attachment);
  }

  @delegate('server')
  async clean() {
    this._clean();
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      this.resetCreateGroupChecked();
    }
  }

  get senderNumbersList() {
    return this._messageSender.senderNumbersList;
  }

  get maxRecipients() {
    return this._composeTextOptions?.maxRecipients ?? DEFAULT_MAX_RECIPIENTS;
  }

  get disabledGroupMessage() {
    return this._composeTextOptions?.disabledGroupMessage ?? false;
  }
}
