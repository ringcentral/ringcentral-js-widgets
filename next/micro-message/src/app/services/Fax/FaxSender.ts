import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import {
  AccountInfo,
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ExtensionPhoneNumber,
  trackEvent,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Locale,
  Toast,
  ToastManager,
} from '@ringcentral-integration/micro-core/src/app/services';
import { CallerId } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
  StoragePlugin,
  userStorage,
  watch,
} from '@ringcentral-integration/next-core';
import FormData from 'form-data';
import type GetMessageInfoResponse from 'ringcentral-client/build/definitions/GetMessageInfoResponse';

import { MessageStore } from '../MessageStore';

import { type CoverInfo, COVER_US_LIST, COVER_NOT_US_LIST } from './FaxCover';
import type {
  FaxEditingInfo,
  FaxMessagePayload,
  FaxSenderOptions,
  FileItem,
  Recipient,
} from './FaxSender.interface';
import { FAX_CONTENT_LIMIT, FAX_COVER_NONE_VALUE } from './constant';
import { t } from './i18n';
import { isSupportedFaxFile } from './utils/isSupportedFaxFile';

const DEFAULT_MAX_RECIPIENTS = 10;

@injectable({
  name: 'FaxSender',
})
export class FaxSender extends RcModule {
  constructor(
    private _client: Client,
    private _storage: StoragePlugin,
    protected _auth: Auth,
    protected _locale: Locale,
    protected _toast: Toast,
    protected _accountInfo: AccountInfo,
    protected _appFeatures: AppFeatures,
    protected _toastManager: ToastManager,
    protected _messageStore: MessageStore,
    protected _numberValidate: NumberValidate,
    protected _extensionPhoneNumber: ExtensionPhoneNumber,
    protected _callerId: CallerId,
    @optional()
    protected _availabilityMonitor?: AvailabilityMonitor,
    @optional('FaxSenderOptions')
    protected _faxSenderOptions?: FaxSenderOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  @userStorage
  @state
  senderNumber = '';

  @state
  typingToNumber = '';

  @state
  toNumbers: Recipient[] = [];

  @state
  coverIndex = FAX_COVER_NONE_VALUE;

  @state
  coverNotes = '';

  @state
  attachments: FileItem[] = [];

  @state
  attachmentsTotalSize = 0;

  @action
  _setCoverIndex(index: number) {
    this.coverIndex = index;
  }

  @action
  _setCoverNotes(notes: string) {
    this.coverNotes = notes;
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
  _addToNumber(number: Recipient) {
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
  _removeToNumber(number: Recipient) {
    this.toNumbers = this.toNumbers.filter(
      (item) => item.phoneNumber !== number.phoneNumber,
    );
  }

  @action
  _addAttachment(attachment: FileItem) {
    const newAttachments = this.attachments.filter(
      (f) => f.name !== attachment.name,
    );
    newAttachments.push(attachment);
    this.attachments = newAttachments;
  }

  @action
  _removeAttachment(id: string) {
    const index = this.attachments.findIndex((it) => it.id === id);
    if (index > -1) {
      const fileSize = this.attachmentsTotalSize - this.attachments[index].size;
      this.attachments.splice(index, 1);
      this._setAttachmentsTotalSize(fileSize);
    }
  }

  @action
  _setAttachmentsTotalSize(size: number) {
    this.attachmentsTotalSize = size;
  }

  @action
  _clean() {
    const firstCover = this.getFirstCover();
    this.typingToNumber = '';
    this.toNumbers = [];
    this.coverIndex = firstCover?.id || FAX_COVER_NONE_VALUE;
    this.coverNotes = '';
    this.attachments = [];
    this.attachmentsTotalSize = 0;
  }

  override async onInit() {
    if (this._auth.isFreshLogin) {
      await this.clean();
    }
    await this._initSenderNumber();
    this._setCoverIndex(this.getFirstCover()?.id || FAX_COVER_NONE_VALUE);
  }

  override async onReset() {
    await this.clean();
  }

  override onInitOnce() {
    watch(
      this,
      () => this.senderNumbersList,
      async () => {
        if (this.ready) {
          await this._initSenderNumber();
        }
      },
    );
  }

  async _initSenderNumber() {
    const cachedPhoneNumber = this.senderNumber;
    if (
      cachedPhoneNumber &&
      cachedPhoneNumber === this._callerId.faxNumber &&
      this.senderNumbersList.find(
        (info) => info.phoneNumber === cachedPhoneNumber,
      )
    ) {
      return;
    }
    const userPhoneNumberInfo = this.senderNumbersList[0];
    if (!userPhoneNumberInfo) {
      this.logger.log('Not have any sender number');
      return;
    }

    if (userPhoneNumberInfo.id) {
      this.updateSenderNumber(userPhoneNumberInfo?.phoneNumber);
      const success = await this.setFaxCallerId(`${userPhoneNumberInfo.id}`);
      if (!success) {
        // if failed, rollback to empty
        this.updateSenderNumber('');
      }
    }
  }

  @delegate('server')
  async clean() {
    this._clean();
  }

  @delegate('server')
  async addAttachments(files: FileItem[]) {
    if (!files?.length) {
      return;
    }
    const newList = files.filter((file) => isSupportedFaxFile(file.file));

    const isValid = this.checkAttachmentOverLimit(newList);
    if (!isValid) {
      return;
    }
    for (const attachment of newList) {
      this.addAttachment(attachment);
    }
  }

  @delegate('server')
  async addAttachment(attachment: FileItem) {
    this._addAttachment(attachment);
  }

  @delegate('server')
  async removeAttachment(id: string) {
    this._removeAttachment(id);
  }

  @delegate('server')
  async updateSenderNumber(number?: string) {
    this._setSenderNumber(number);
  }

  @delegate('server')
  async cleanTypingToNumber() {
    this._setTypingToNumber('');
  }

  @delegate('server')
  async removeToNumber(number: Recipient) {
    this._removeToNumber(number);
  }

  @delegate('server')
  async addToNumbers(numbers: Recipient[]) {
    let isValid = false;
    for (const number of numbers) {
      const result = this.addToNumber(number);
      isValid = isValid || result;
    }

    return isValid;
  }

  addToNumber(number: Recipient) {
    if (isBlank(number.phoneNumber)) {
      return false;
    }
    const isValid = this.isPhoneNumberValid(number.phoneNumber);
    this._addToNumber({ ...number, error: !isValid });

    return isValid;
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
  async updateCoverIndex(index: number) {
    this._setCoverIndex(index);
  }

  @delegate('server')
  async updateCoverNotes(notes: string) {
    this._setCoverNotes(notes);
  }

  private _alertSuccess(message: string, ttl?: number) {
    this._toast.success({
      message,
      allowDuplicates: false,
      ttl,
    });
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

  @delegate('server')
  async setFaxCallerId(callerId: string) {
    try {
      await this._callerId.setDefaultCallerId(callerId, 'FaxNumber');
      return true;
    } catch (e) {
      this.logger.log('setFaxCallerId failed', e);
      return false;
    }
  }

  @delegate('server')
  async send(
    payload: FaxMessagePayload,
    opts?: { preInsert?: boolean },
  ): Promise<GetMessageInfoResponse | void> {
    try {
      const formData = this.buildFaxFormData(payload);

      const response = await this._client.service
        .platform()
        .post('/restapi/v1.0/account/~/extension/~/fax', formData);
      const data = await response.json();

      if (data) {
        // push data to faxMessageStore directly before ISync
        // get better experience
        if (opts?.preInsert ?? true) {
          this._messageStore.preInsertData(data);
        }

        trackEvent('Int_Fax_faxSent', {
          faxAttachmentCount: payload.attachments.length,
        });

        this._alertSuccess(t('faxSuccessSubmitted'));
      }

      return data;
    } catch (err) {
      console.error('send fax error', err);
      this._alertDanger(t('faxSubmitFailed'));
    }
  }

  @delegate('server')
  async resend(
    originalMessageId: string,
    opts?: { preInsert?: boolean },
  ): Promise<GetMessageInfoResponse> {
    const response = await this._client.service
      .platform()
      .post('/restapi/v1.0/account/~/extension/~/fax', { originalMessageId });
    const data = await response.json();

    // push data to faxMessageStore directly before ISync
    // get better experience
    if (data && (opts?.preInsert ?? true)) {
      this._messageStore.preInsertData(data);
    }
    return data;
  }

  @delegate('server')
  async downloadAttachment(id: number) {
    const res = await this._toastManager.catchError(
      this._client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/extension/~/message-store/${id}/content/${id}`,
        ),
      {
        network: t('downloadFaxNetworkIssue'),
        server: t('downloadFaxBackendError'),
      },
      { throwError: true },
    );
    const fileBuffer = await (res as Blob).arrayBuffer();
    return fileBuffer;
  }

  protected buildFaxFormData({
    to,
    faxResolution,
    attachments,
    coverIndex,
    coverPageText,
    sendTime,
  }: FaxMessagePayload): FormData {
    const body = {
      to,
      faxResolution: faxResolution || 'High',
      coverIndex,
      coverPageText,
      sendTime,
    };

    const formData = new FormData();
    // This is the mandatory part, the name and type should always be as follows
    formData.append(
      'json',
      new File([JSON.stringify(body)], 'request.json', {
        type: 'application/json',
      }),
    );
    // Iterate through all currently selected files
    attachments.forEach((attachment, idx) => {
      formData.append('attachment_' + idx, attachment); // you can also use file.name instead of 'attachment'
    });

    return formData;
  }

  isPhoneNumberValid(phoneNumber: string) {
    if (!phoneNumber) {
      return false;
    }

    const purePhoneNumber = phoneNumber.trim();

    const validResult = this._appFeatures.isEDPEnabled
      ? this._numberValidate.validate([purePhoneNumber])
      : this._numberValidate.validateFormat([purePhoneNumber]);

    const valid =
      validResult.result &&
      !this._numberValidate.isAnExtensionNumber(purePhoneNumber) &&
      !this._numberValidate.isAvailableExtension(purePhoneNumber);
    return valid;
  }

  checkAttachmentOverLimit(files: FileItem[]) {
    const oldAttachments = this.attachments!;

    const size = [...oldAttachments, ...files].reduce((prev, curr) => {
      return prev + curr.size;
    }, 0);
    if (size > FAX_CONTENT_LIMIT.MAX_ATTACHMENT_STORAGE_SIZE) {
      this._alertDanger(
        t(
          files.length > 1
            ? 'maxAttachmentsSizeReached'
            : 'maxAttachmentSizeReached',
          {
            maxAllowedSize: FAX_CONTENT_LIMIT.MAX_ATTACHMENT_STORAGE_SIZE_IN_MB,
          },
        ),
      );
      return false;
    }
    this._setAttachmentsTotalSize(size);
    return true;
  }

  get senderNumbersList() {
    return this._extensionPhoneNumber.faxSenderNumbers;
  }

  get maxRecipients() {
    return this._faxSenderOptions?.maxRecipients ?? DEFAULT_MAX_RECIPIENTS;
  }

  private _checkLanguageIsUS() {
    return this._locale.currentLocale.toLowerCase() === 'en-us';
  }

  getFirstCover(): CoverInfo {
    if (this._checkLanguageIsUS()) {
      return COVER_US_LIST[1];
    }
    return COVER_NOT_US_LIST[1];
  }

  getAllFaxCoverInfos() {
    const result: CoverInfo[] = [];
    if (this._checkLanguageIsUS()) {
      result.push(...COVER_US_LIST);
    } else {
      result.push(...COVER_NOT_US_LIST);
    }
    return result;
  }

  @computed((that: FaxSender) => [that._locale.currentLocale])
  get allCovers() {
    return this.getAllFaxCoverInfos();
  }

  get faxEditingInfo(): FaxEditingInfo {
    return {
      senderNumber: this.senderNumber,
      recipients: this.toNumbers,
      coverIndex: this.coverIndex,
      coverNotes: this.coverNotes,
      attachments: this.attachments,
    };
  }
}
