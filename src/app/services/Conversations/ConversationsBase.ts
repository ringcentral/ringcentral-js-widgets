import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type GetMessageList from '@rc-ex/core/lib/definitions/GetMessageList';
import type ListMessagesParameters from '@rc-ex/core/lib/definitions/ListMessagesParameters';
import type MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';
import {
  messageTypes,
  type MessageTypes,
} from '@ringcentral-integration/commons/enums/messageTypes';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import cleanNumber from '@ringcentral-integration/commons/lib/cleanNumber';
import type { Correspondent } from '@ringcentral-integration/commons/lib/messageHelper';
import {
  getFaxAttachment,
  getMMSAttachments,
  getMyNumberFromMessage,
  getNumbersFromMessage,
  getRecipientNumbersFromMessage,
  getVoicemailAttachment,
  messageIsFax,
  messageIsTextMessage,
  messageIsUnread,
  messageIsVoicemail,
  messageReadStatusMatched,
  normalizeRecord,
  sortSearchResults,
} from '@ringcentral-integration/commons/lib/messageHelper';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  optional,
  RcModule,
  state,
  watch,
} from '@ringcentral-integration/next-core';

import { ConversationLogger } from '../ConversationLogger';
import type { Attachment } from '../MessageSender';
import { ATTACHMENT_SIZE_LIMITATION, MessageSender } from '../MessageSender';
import type { MessageStoreBase } from '../MessageStore/MessageStoreBase';
import { SmsOptOut } from '../SmsOptOut';

import type {
  ConversationsOptions,
  CorrespondentMatch,
  CorrespondentResponse,
  CurrentConversation,
  FilteredConversation,
  FormattedConversation,
  InputContent,
  ReadStatusFilter,
} from './Conversations.interface';
import { conversationsStatus } from './conversationsStatus';
import { buildConversationId } from './helper';
import { t } from './i18n';

function mergeMessages(messages: Message[], oldMessages: Message[]): Message[] {
  const tmp: { [key: string]: number } = {};
  const currentMessages: Message[] = [];
  messages.forEach((element) => {
    currentMessages.push(element);
    tmp[element.id!] = 1;
  });

  oldMessages.forEach((element) => {
    if (!tmp[element.id!]) {
      currentMessages.push(element);
    }
  });
  return currentMessages;
}

function getEarliestTime(messages: Message[]) {
  let newTime = Date.now();
  messages.forEach((message) => {
    const creationTime = new Date(message.creationTime!).getTime();
    if (creationTime < newTime) {
      newTime = creationTime;
    }
  });
  return newTime;
}

const addUniqueNumber = (message: Message, uniqueNumbers: Set<string>) => {
  if (message.from) {
    const fromNumber = message.from.phoneNumber || message.from.extensionNumber;
    if (fromNumber) {
      uniqueNumbers.add(fromNumber);
    }
  }

  message.to?.forEach((toNumber) => {
    if (!toNumber) {
      return;
    }
    const toPhoneNumber = toNumber.phoneNumber || toNumber.extensionNumber;
    if (toPhoneNumber) {
      uniqueNumbers.add(toPhoneNumber);
    }
  });
};

export function getUniqueNumbers(conversations: Message[]): string[] {
  const uniqueNumbers = new Set<string>();

  conversations.forEach((message) => {
    addUniqueNumber(message, uniqueNumbers);
  });

  return Array.from(uniqueNumbers);
}

export const DEFAULT_PER_PAGE = 20;
export const DEFAULT_DAY_SPAN = 90;

export abstract class ConversationsBase<
  TMessageStore extends MessageStoreBase,
> extends RcModule {
  protected _olderDataExisted = true;
  protected _olderMessagesExisted = true;
  protected _minSearchStringLength = 3;

  protected get _perPage() {
    return this._conversationsOptions?.perPage ?? DEFAULT_PER_PAGE;
  }

  protected get _daySpan() {
    return this._conversationsOptions?.daySpan ?? DEFAULT_DAY_SPAN;
  }

  protected get _enableLoadOldMessages() {
    return this._conversationsOptions?.enableLoadOldMessages ?? false;
  }

  protected get _showMMSAttachment() {
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      return true;
    }

    return this._conversationsOptions?.showMMSAttachment ?? false;
  }

  private get _enableContactMatch() {
    return this._conversationsOptions?.enableContactMatch ?? true;
  }

  constructor(
    protected _toast: Toast,
    protected _auth: Auth,
    protected _client: Client,
    protected _messageSender: MessageSender | null,
    protected _extensionInfo: ExtensionInfo,
    protected _messageStore: TMessageStore,
    protected _appFeatures: AppFeatures,
    protected _regionSettings: RegionSettings,
    protected _contactMatcher?: ContactMatcher,
    protected _conversationLogger?: ConversationLogger,
    protected _conversationsOptions?: ConversationsOptions,
    @optional() protected _smsOptOut?: SmsOptOut,
  ) {
    super();

    this._messageSender?.on(
      this._messageSender?.events?.send,
      ({ toNumbers }) => {
        this.addEntities(toNumbers.map((number) => ({ phoneNumber: number })));
      },
    );

    if (this._contactMatcher && this._enableContactMatch) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.allUniqueNumbers,
        readyCheckFn: () => this._messageStore.ready,
      });
    }
  }

  @state
  searchInput = '';

  @state
  typeFilter: MessageTypes = messageTypes.all;

  @state
  readStatusFilterMap: Record<MessageTypes, ReadStatusFilter> = {
    [messageTypes.all]: 'All',
    [messageTypes.text]: 'All',
    [messageTypes.voiceMail]: 'All',
    [messageTypes.fax]: 'All',
    [messageTypes.pager]: 'All',
    [messageTypes.sms]: 'All',
  };

  @state
  oldConversations: Message[] = [];

  @state
  currentPage = 1;

  @state
  fetchConversationsStatus: ObjectMapValue<typeof conversationsStatus> =
    conversationsStatus.idle;

  @state
  currentConversationId: string | null = null;

  @state
  oldMessages: Message[] = [];

  @state
  fetchMessagesStatus: ObjectMapValue<typeof conversationsStatus> =
    conversationsStatus.idle;

  @state
  inputContents: Record<string, InputContent> = {};

  @state
  conversationStatus: Record<
    string,
    ObjectMapValue<typeof conversationsStatus>
  > = {};

  @state
  correspondentMatch: CorrespondentMatch[] = [];

  @state
  correspondentResponse: CorrespondentResponse = {};

  @action
  _updateSearchInput(input = '') {
    this.searchInput = input;
  }

  @action
  _updateTypeFilter(typeFilter: MessageTypes) {
    this.typeFilter = typeFilter;
    this.currentPage = 1;
    this.oldConversations = [];
  }

  @action
  _updateReadStatusFilterMap(status: ReadStatusFilter, type: MessageTypes) {
    this.readStatusFilterMap[type] = status;
    this.currentPage = 1;
  }

  @action
  _updateFetchConversationsStatus(
    status: ObjectMapValue<typeof conversationsStatus>,
  ) {
    this.fetchConversationsStatus = status;
  }

  @action
  _fetchOldConversationsSuccess(
    records: GetMessageInfoResponse[],
    isIncreaseCurrentPage: boolean,
  ) {
    this.oldConversations.push(...records.map(normalizeRecord));
    this.fetchConversationsStatus = conversationsStatus.idle;
    if (isIncreaseCurrentPage) {
      this.currentPage += 1;
    }
  }

  @action
  _deleteOldConversation(conversationId: string) {
    this.oldConversations = this.oldConversations.filter(
      (c) => String(c.conversationId) !== String(conversationId),
    );
  }

  @action
  _cleanOldConversations() {
    this.oldConversations = [];
  }

  @action
  _increaseCurrentPage() {
    this.currentPage += 1;
  }

  @action
  _resetCurrentPage() {
    this.currentPage = 1;
  }

  @action
  _updateCurrentConversationId(conversationId: string | null) {
    this.currentConversationId = conversationId;
    this.oldMessages = [];
  }

  @action
  _updateFetchMessagesStatus(
    status: ObjectMapValue<typeof conversationsStatus>,
  ) {
    this.fetchMessagesStatus = status;
  }

  @action
  _fetchOldMessagesSuccess(records: GetMessageInfoResponse[]) {
    this.oldMessages.push(...records.map(normalizeRecord));
    this.fetchMessagesStatus = conversationsStatus.idle;
  }

  @action
  _updateMessageText(conversationId: string, text: string) {
    const existedContent = this.inputContents[conversationId];
    if (existedContent) {
      existedContent.text = text;
    } else {
      this.inputContents[conversationId] = {
        conversationId,
        text,
        attachments: [],
      };
    }
  }

  @action
  _addAttachment(conversationId: string, attachment: Attachment) {
    const existedContent = this.inputContents[conversationId];
    if (existedContent) {
      const attachments = (existedContent.attachments || []).filter(
        (f) => f.name !== attachment.name,
      );
      attachments.push(attachment);
      existedContent.attachments = attachments;
    } else {
      this.inputContents[conversationId] = {
        conversationId,
        text: '',
        attachments: [attachment],
      };
    }
  }

  @action
  _removeAttachment(conversationId: string, attachment: Attachment) {
    const existedContent = this.inputContents[conversationId];

    if (existedContent) {
      existedContent.attachments = existedContent.attachments!.filter(
        (f) => f.name !== attachment.name,
      );
    }
  }

  @action
  _removeInputContent(conversationId: string) {
    delete this.inputContents[conversationId];
  }

  @action
  _updateConversationStatus(
    conversationId: string,
    status: ObjectMapValue<typeof conversationsStatus>,
  ) {
    this.conversationStatus[conversationId] = status;
  }

  @action
  _addCorrespondentMatchEntities(entities: CorrespondentMatch[]) {
    this.correspondentMatch = [...entities];
  }

  @action
  _removeCorrespondentMatchEntity(entity: CorrespondentMatch) {
    this.correspondentMatch = this.correspondentMatch.filter(
      (item) => item.rawId !== entity.id && item.id !== entity.id,
    );
  }

  @action
  _addCorrespondentResponses(responses: Message[] = [], phoneNumber = '') {
    this.correspondentResponse = responses.reduce(
      (accumulator: any, response: any) => {
        const {
          to,
          from,
          direction,
          conversation: { id },
        } = response;
        const number = direction === 'Inbound' ? from : to[0];
        phoneNumber = number.phoneNumber || number.extensionNumber;
        return {
          ...accumulator,
          [phoneNumber]: id,
        };
      },
      {},
    );
  }

  @action
  _removeCorrespondentResponses(phoneNumber: string) {
    delete this.correspondentResponse[phoneNumber];
  }

  @action
  _resetAllStatus() {
    this.searchInput = '';
    this.typeFilter = messageTypes.all;
    this.oldConversations = [];
    this.currentPage = 1;
    this.fetchConversationsStatus = conversationsStatus.idle;
    this.currentConversationId = null;
    this.oldMessages = [];
    this.fetchMessagesStatus = conversationsStatus.idle;
    this.inputContents = {};
    this.conversationStatus = {};
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._auth.loggedIn);
  }

  override _shouldReset() {
    return !!(super._shouldReset() || (this.ready && !this._auth.loggedIn));
  }

  override onInit() {
    if (this._contactMatcher) {
      this._contactMatcher.triggerMatch({
        ignoreCache: !!this._conversationsOptions?.contactMatchIgnoreCache,
      });
    }
  }

  override onInitSuccess() {
    if (
      this.allConversations.length <= this._perPage &&
      this._enableLoadOldMessages &&
      this._hasPermission
    ) {
      this.fetchOldConversations();
    }
  }

  override onReset() {
    this._olderDataExisted = true;
    this._olderMessagesExisted = true;
    this._resetAllStatus();
  }

  override onInitOnce() {
    watch(
      this,
      () => this.shouldTriggerMatchConditions,
      () => {
        if (this._contactMatcher && this.ready) {
          this._contactMatcher.triggerMatch();
        }
      },
    );
    watch(
      this,
      () => this._messageStore.allConversations,
      (newValue = [], oldValue = []) => {
        if (newValue.length < oldValue.length) {
          if (this.oldConversations.length > 0) {
            this._cleanOldConversations();
            this._olderDataExisted = true;
          }
        }
      },
    );
  }

  @computed
  get shouldTriggerMatchConditions(): any[] {
    return [
      this.uniqueNumbers,
      this.currentPage,
      this.typeFilter,
      this.effectiveSearchString,
    ];
  }

  @delegate('server')
  async updateSearchInput(input: string) {
    this._updateSearchInput(input);
  }

  @delegate('server')
  async updateTypeFilter(type: MessageTypes) {
    if (this.typeFilter === type) {
      return;
    }
    this._updateTypeFilter(type);
    this._olderDataExisted = true;
    this._olderMessagesExisted = true;
    if (this.pagingConversations.length <= this._perPage) {
      this.loadNextPage();
    }
  }

  @delegate('server')
  async updateReadStatusFilterMap(
    readStatus: ReadStatusFilter,
    type: MessageTypes,
  ) {
    if (this.readStatusFilterMap[type] === readStatus) {
      return;
    }
    this._updateReadStatusFilterMap(readStatus, type);
  }

  @delegate('server')
  async fetchOldConversations() {
    if (!this._olderDataExisted) {
      return;
    }
    if (this.loadingOldConversations) {
      return;
    }
    this._updateFetchConversationsStatus(conversationsStatus.fetching);
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - this._daySpan);
    const dateTo = new Date(this.earliestTime);
    if (dateTo.getTime() < dateFrom.getTime()) {
      dateFrom = new Date(dateTo.getTime() - 1000 * 3600 * 24);
    }
    const typeFilter = this.typeFilter;
    const currentPage = this.currentPage;
    const params: ListMessagesParameters = {
      distinctConversations: true,
      perPage: this._perPage,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    };
    if (typeFilter === messageTypes.text) {
      params.messageType = [messageTypes.sms, messageTypes.pager];
    } else if (typeFilter !== messageTypes.all) {
      params.messageType = [typeFilter];
    }
    try {
      // TODO: fix type
      const result = await this._client
        .account()
        .extension()
        .messageStore()
        .list(params as any);

      const records = result.records as GetMessageList[];
      const recordsLength = records!.length;
      this._olderDataExisted = recordsLength === this._perPage;
      if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
        const isIncreaseCurrentPage =
          recordsLength &&
          this._perPage * this.currentPage <
            recordsLength + this.filteredConversations.length;
        this._fetchOldConversationsSuccess(records, !!isIncreaseCurrentPage);
      }
    } catch (e) {
      if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
        this._updateFetchConversationsStatus(conversationsStatus.idle);
      }
    }
  }

  @delegate('server')
  async loadNextPage() {
    const currentPage = this.currentPage;
    if (currentPage * this._perPage < this.filteredConversations.length) {
      this._increaseCurrentPage();
      return;
    }
    if (this.effectiveSearchString !== '') {
      return;
    }
    if (!this._enableLoadOldMessages || !this._hasPermission) {
      return;
    }
    await this.fetchOldConversations();
  }

  @delegate('server')
  async resetCurrentPage() {
    this._resetCurrentPage();
  }

  @delegate('server')
  async loadConversation(conversationId: string) {
    this._loadConversation(conversationId);
  }

  async _loadConversation(conversationId: string) {
    if (conversationId === this.currentConversationId) {
      return;
    }
    this._updateCurrentConversationId(conversationId);
  }

  @delegate('server')
  async unloadConversation() {
    this._updateCurrentConversationId(null);
    this._olderMessagesExisted = true;
  }

  @delegate('server')
  async fetchOldMessages(perPage = this._perPage) {
    if (!this._enableLoadOldMessages) {
      return;
    }
    if (!this._hasPermission) {
      return;
    }
    if (!this._olderMessagesExisted) {
      return;
    }
    if (this.loadingOldMessages) {
      return;
    }
    if (!this.currentConversationId) {
      return;
    }
    this._updateFetchMessagesStatus(conversationsStatus.fetching);
    const conversationId = this.currentConversationId;
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - this._daySpan);
    const earliestTime = getEarliestTime(this.currentConversation.messages);
    const dateTo = new Date(earliestTime);
    if (dateTo.getTime() < dateFrom.getTime()) {
      dateFrom.setDate(dateFrom.getDate() - 1);
    }

    try {
      const result = await this._client
        .account()
        .extension()
        .messageStore()
        .list({
          conversationId: +conversationId,
          perPage,
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
        });
      const records = result.records as GetMessageList[];
      this._olderMessagesExisted = records.length === perPage;
      if (conversationId === this.currentConversationId) {
        this._fetchOldMessagesSuccess(records);
      }
    } catch (e) {
      if (conversationId === this.currentConversationId) {
        this._updateFetchMessagesStatus(conversationsStatus.idle);
      }
    }
  }

  @delegate('server')
  async updateMessageText(text: string) {
    if (text.length > 1000) {
      this._toast.warning({
        message: t('textTooLong'),
        ttl: 0,
      });

      return true;
    }
    this._updateMessageText(this.currentConversationId!, text);
  }

  checkAttachmentOverLimit(attachments: Attachment[]) {
    const oldAttachments = this.attachments!;
    if (attachments.length + oldAttachments.length > 10) {
      this._toast.danger({
        message: t('attachmentCountLimitation'),
        ttl: 5000,
      });

      return false;
    }
    const size = [...attachments, ...oldAttachments].reduce((prev, curr) => {
      return prev + curr.size;
    }, 0);
    if (size > ATTACHMENT_SIZE_LIMITATION) {
      this._toast.danger({
        message: t('attachmentSizeLimitation'),
        ttl: 5000,
      });
      return false;
    }
    return true;
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
    this._addAttachment(this.currentConversationId!, attachment);
  }

  @delegate('server')
  async removeAttachment(attachment: Attachment) {
    this._removeAttachment(this.currentConversationId!, attachment);
  }

  @delegate('server')
  async replyToReceivers(text: string, attachments: Attachment[] = []) {
    const conversationId = this.currentConversationId!;
    this._updateConversationStatus(conversationId, conversationsStatus.pushing);
    try {
      const messageText =
        this._smsOptOut?.attachOptOutHint(conversationId, text) ?? text;

      const responses = await this._messageSender?.send({
        fromNumber: this._getFromNumber()!,
        toNumbers: this._getToNumbers(),
        text: messageText,
        attachments,
        replyOnMessageId: this._getReplyOnMessageId()!,
      });
      if (responses && responses[0]) {
        // TODO: check type
        this._messageStore.pushMessage(responses[0] as any);
        this._updateConversationStatus(
          conversationId,
          conversationsStatus.idle,
        );
        this._removeInputContent(conversationId);
        this._smsOptOut?.resetOptOut(conversationId);
        return responses[0];
      }
      return null;
    } finally {
      this._updateConversationStatus(conversationId, conversationsStatus.idle);
    }
  }

  private _getReplyOnMessageId() {
    const messageList = this.currentConversation.messages;
    const lastMessage =
      messageList &&
      messageList.length > 0 &&
      messageList[messageList.length - 1];
    if (lastMessage && lastMessage.id) {
      return lastMessage.id;
    }
    return null;
  }

  private _getFromNumber() {
    const senderNumber = this.currentConversation.senderNumber;
    if (!senderNumber) {
      return null;
    }
    return senderNumber.extensionNumber || senderNumber.phoneNumber;
  }

  private _getToNumbers() {
    const recipients = this.currentConversation.recipients;
    return recipients.map(
      (recipient) => (recipient.extensionNumber || recipient.phoneNumber)!,
    );
  }

  @delegate('server')
  async deleteConversation(conversationId: string) {
    if (!conversationId) {
      return;
    }
    if (this._messageStore.conversationStore[conversationId]) {
      await this._messageStore.deleteConversationMessages(conversationId);
      return;
    }
    const conversation = this.allConversationsMap.get(conversationId);
    if (!conversation) {
      return;
    }
    if (messageIsTextMessage(conversation)) {
      await this._messageStore.deleteConversation(conversationId);
      return;
    }
    try {
      await this._messageStore.deleteMessageApi(conversationId);
      this._deleteOldConversation(conversationId);
    } catch (e) {
      console.error(e);
    }
  }

  @computed
  get allConversations(): Message[] {
    const conversations = this._messageStore.allConversations;
    const oldConversations = this.oldConversations;
    if (oldConversations.length === 0) {
      return conversations;
    }
    const newConversations: Message[] = [];
    const conversationMap: { [key: string]: number } = {};
    const pushConversation = (c: Message) => {
      // use conversationId when available, use id for VoiceMail/Fax/etc..
      const cid = (c.conversationId || c.id)!;
      if (conversationMap[cid]) {
        return;
      }
      newConversations.push(c);
      conversationMap[cid] = 1;
    };
    conversations.forEach(pushConversation);
    oldConversations.forEach(pushConversation);
    return newConversations;
  }

  @computed
  get uniqueNumbers() {
    return getUniqueNumbers(this.pagingConversations);
  }

  @computed
  get allConversationsInfo() {
    const uniqueNumbers = new Set<string>();
    const uniqueConversationMap = new Map<string, Message>();

    const map = new Map(
      this.allConversations.map((item) => {
        addUniqueNumber(item, uniqueNumbers);

        try {
          const uniqueConversationId = buildConversationId(
            item.to?.map((item) => item.phoneNumber!) ?? [],
            item.from!.phoneNumber!,
          );

          uniqueConversationMap.set(uniqueConversationId, item);
        } catch (error) {
          // just avoid the server have wrong data, normally it will not happen
          // eslint-disable-next-line no-console
          this.logger.error('buildConversationId error', error);
        }

        return [item.conversationId, item];
      }),
    );

    return {
      map,
      uniqueNumbers: Array.from(uniqueNumbers),
      uniqueConversationMap,
    };
  }

  get allConversationsMap() {
    return this.allConversationsInfo.map;
  }

  get allUniqueNumbers() {
    return this.allConversationsInfo.uniqueNumbers;
  }

  @computed
  get effectiveSearchString() {
    if (this.searchInput.length >= this._minSearchStringLength) {
      return this.searchInput;
    }
    return '';
  }

  @computed
  get typeFilteredConversations() {
    const typeFilter = this.typeFilter;
    const allConversations = this.allConversations;
    switch (typeFilter) {
      case messageTypes.text:
        return allConversations.filter(messageIsTextMessage);
      case messageTypes.voiceMail:
        return allConversations.filter(messageIsVoicemail);
      case messageTypes.fax:
        return allConversations.filter(messageIsFax);
      default:
        return allConversations.filter(
          (conversation) =>
            (this._appFeatures.hasReadTextPermission ||
              !messageIsTextMessage(conversation)) &&
            (this._appFeatures.hasVoicemailPermission ||
              !messageIsVoicemail(conversation)) &&
            (this._appFeatures.hasReadFaxPermission ||
              !messageIsFax(conversation)),
        );
    }
  }

  @computed
  get typeFilteredConversationsMap() {
    return this.filteredConversations.reduce(
      (acc, conversation) => {
        if (messageIsTextMessage(conversation)) {
          // only push when has read text permission
          if (
            this._appFeatures.hasReadTextPermission &&
            messageReadStatusMatched(
              this.readStatusFilterMap[messageTypes.text],
              conversation,
            )
          ) {
            acc[messageTypes.text].push(conversation);
          }
        } else if (messageIsVoicemail(conversation)) {
          if (
            this._appFeatures.hasVoicemailPermission &&
            messageReadStatusMatched(
              this.readStatusFilterMap[messageTypes.voiceMail],
              conversation,
            )
          ) {
            acc[messageTypes.voiceMail].push(conversation);
          }
        } else if (messageIsFax(conversation)) {
          if (
            this._appFeatures.hasReadFaxPermission &&
            messageReadStatusMatched(
              this.readStatusFilterMap[messageTypes.fax],
              conversation,
            )
          ) {
            acc[messageTypes.fax].push(conversation);
          }
        }

        return acc;
      },
      {
        [messageTypes.text]: [] as FilteredConversation[],
        [messageTypes.voiceMail]: [] as FilteredConversation[],
        [messageTypes.fax]: [] as FilteredConversation[],
      },
    );
  }

  @computed
  get formattedConversations() {
    const conversations = this.typeFilteredConversations;
    const extensionNumber = this._extensionInfo.extensionNumber!;
    const contactMapping =
      (this._contactMatcher && this._contactMatcher.dataMapping) || {};
    const loggingMap =
      (this._conversationLogger && this._conversationLogger.loggingMap) || {};
    const conversationLogMapping =
      (this._conversationLogger && this._conversationLogger.dataMapping) || {};
    const accessToken = this._auth.accessToken!;
    return conversations.map((message) => {
      const result = getNumbersFromMessage({
        extensionNumber,
        message,
      });

      const correspondents = result.correspondents || [];
      const self = result.self;

      const selfNumber = self && (self.phoneNumber || self.extensionNumber);
      const selfMatches = (selfNumber && contactMapping[selfNumber]) || [];
      const correspondentMatchesList: CorrespondentMatch[][] = [];
      const correspondentMatches = correspondents.reduce((acc, curr) => {
        const phoneNumber = curr.phoneNumber || curr.extensionNumber;

        // in new version correspondentMatchesList also same index as correspondents list one by one for easily to know the correspondent's matches
        if (process.env.THEME_SYSTEM === 'spring-ui') {
          correspondentMatchesList.push(contactMapping[phoneNumber] || []);
        }

        return phoneNumber &&
          contactMapping[phoneNumber] &&
          contactMapping[phoneNumber].length
          ? acc.concat(contactMapping[phoneNumber])
          : acc;
      }, [] as CorrespondentMatch[]);
      const conversationLogId = this._conversationLogger
        ? this._conversationLogger.getConversationLogId(message)
        : null;
      const isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
      const conversationMatches =
        conversationLogMapping[conversationLogId!] || [];
      let voicemailAttachment = null;
      if (messageIsVoicemail(message)) {
        voicemailAttachment = getVoicemailAttachment(message, accessToken);
      }
      let faxAttachment = null;
      if (messageIsFax(message)) {
        faxAttachment = getFaxAttachment(message, accessToken);
      }
      let unreadCounts = message.unreadCounts;
      if (typeof unreadCounts === 'undefined') {
        unreadCounts = messageIsUnread(message) ? 1 : 0;
      }
      let mmsAttachments: MessageAttachmentInfo[] = [];
      if (messageIsTextMessage(message) && this._showMMSAttachment) {
        mmsAttachments = getMMSAttachments(message, accessToken);
      }
      return {
        ...message,
        unreadCounts,
        self,
        selfMatches,
        correspondents,
        correspondentMatches,
        correspondentMatchesList,
        conversationLogId,
        isLogging,
        conversationMatches,
        voicemailAttachment,
        faxAttachment,
        mmsAttachments,
        lastMatchedCorrespondentEntity:
          (this._conversationLogger &&
            this._conversationLogger.getLastMatchedCorrespondentEntity(
              message as any,
            )) ||
          null,
      } as FormattedConversation;
    });
  }

  @computed
  get formattedConversationsMap() {
    return new Map(
      this.formattedConversations.map((conversation) => [
        conversation.conversationId,
        conversation,
      ]),
    );
  }

  @computed
  get filteredConversations(): FilteredConversation[] {
    const conversations = this.formattedConversations;
    const effectiveSearchString = this.effectiveSearchString;
    if (effectiveSearchString === '') {
      return conversations;
    }
    const searchResults: FilteredConversation[] = [];
    const cleanRegex = /[^\d*+#\s]/g;
    const searchString = effectiveSearchString.toLowerCase();
    const searchNumber = effectiveSearchString.replace(cleanRegex, '');
    conversations.forEach((message) => {
      if (searchNumber === effectiveSearchString) {
        const cleanedNumber = cleanNumber(effectiveSearchString);
        if (
          message.correspondents.find(
            (contact) =>
              cleanNumber(
                contact.phoneNumber || contact.extensionNumber || '',
              ).indexOf(cleanedNumber) > -1,
          )
        ) {
          // match by phoneNumber or extensionNumber
          searchResults.push({
            ...message,
            matchOrder: 0,
          });
          return;
        }
      }
      if (message.correspondentMatches.length) {
        if (
          message.correspondentMatches.find(
            (entity) =>
              (entity.name || '').toLowerCase().indexOf(searchString) > -1,
          )
        ) {
          // match by entity's name
          searchResults.push({
            ...message,
            matchOrder: 0,
          });
          return;
        }
      } else if (
        message.correspondents.find(
          (contact) =>
            (contact.name || '').toLowerCase().indexOf(searchString) > -1,
        )
      ) {
        searchResults.push({
          ...message,
          matchOrder: 0,
        });
        return;
      }

      // try match messages of the same conversation
      if ((message.subject || '').toLowerCase().indexOf(searchString) > -1) {
        searchResults.push({
          ...message,
          matchOrder: 1,
        });
        return;
      }
      const messageList: Message[] =
        this._messageStore.conversationStore[message.conversationId!] || [];
      const matchedMessage = messageList.find(
        (item) => (item.subject || '').toLowerCase().indexOf(searchString) > -1,
      ) as Message;
      if (matchedMessage) {
        searchResults.push({
          ...message,
          matchedMessage,
          matchOrder: 1,
        });
      }
    });
    return searchResults.sort(sortSearchResults as any);
  }

  @computed
  get pagingConversations() {
    const pageNumber = this.currentPage;
    const lastIndex = pageNumber * this._perPage;
    return this.filteredConversations.slice(0, lastIndex);
  }

  @computed
  get earliestTime() {
    return getEarliestTime(this.typeFilteredConversations);
  }

  @computed
  get currentConversation(): CurrentConversation {
    const conversationId = this.currentConversationId!;
    return this.getConversationFullInfo(conversationId);
  }

  getConversationFullInfo(conversationId: string) {
    const extensionNumber = this._extensionInfo.extensionNumber!;
    const contactMapping =
      (this._contactMatcher && this._contactMatcher.dataMapping) || {};
    const conversationLogMapping =
      (this._conversationLogger && this._conversationLogger.dataMapping) || {};
    const loggingMap =
      (this._conversationLogger && this._conversationLogger.loggingMap) || {};
    const conversation = this.allConversationsMap.get(conversationId)!;

    const currentConversation = {
      ...conversation,
    } as CurrentConversation;
    const result = getNumbersFromMessage({
      extensionNumber,
      message: conversation,
    });

    const correspondents =
      (result.correspondents as CorrespondentMatch[]) ?? [];
    const correspondentMatches = correspondents.reduce(
      (matches: CorrespondentMatch[], contact: Correspondent) => {
        const number =
          contact && (contact.phoneNumber || contact.extensionNumber);
        return number && contactMapping[number] && contactMapping[number].length
          ? matches.concat(contactMapping[number])
          : matches;
      },
      [] as CorrespondentMatch[],
    );
    const conversationLogId = this._conversationLogger
      ? this._conversationLogger.getConversationLogId(conversation)
      : null;
    const conversationMatches =
      conversationLogMapping[conversationLogId!] || [];
    currentConversation.conversationLogId = conversationLogId!;
    currentConversation.correspondents = correspondents;
    currentConversation.correspondentMatches = correspondentMatches;
    currentConversation.conversationMatches = conversationMatches;
    const allMessages = this.getMessages(conversationId, true);
    currentConversation.messages = allMessages.reverse();
    currentConversation.senderNumber = getMyNumberFromMessage({
      message: conversation,
      myExtensionNumber: this._extensionInfo.extensionNumber!,
    }) as any;
    currentConversation.recipients = getRecipientNumbersFromMessage({
      message: conversation,
      myNumber: currentConversation.senderNumber,
    })!;
    currentConversation.isLogging = !!(
      conversationLogId && loggingMap[conversationLogId]
    );
    currentConversation.lastMatchedCorrespondentEntity =
      (this._conversationLogger &&
        conversation &&
        this._conversationLogger.getLastMatchedCorrespondentEntity(
          conversation as any,
        )) ||
      null;
    return currentConversation;
  }

  getMessages(conversationId: string, withOldMessages = false) {
    const messages = this._messageStore.conversationStore[conversationId] || [];
    const oldMessages = withOldMessages ? this.oldMessages : [];
    const accessToken = this._auth.accessToken!;

    return mergeMessages(messages, oldMessages).map((m) => {
      if (!this._showMMSAttachment) {
        return m;
      }
      const mmsAttachments = getMMSAttachments(m, accessToken);
      return {
        ...m,
        mmsAttachments,
      };
    });
  }

  @computed
  get messageText() {
    const conversationId = this.currentConversationId;
    if (!conversationId) {
      return '';
    }
    const res = this.inputContents[conversationId];
    return res ? res.text : '';
  }

  @computed
  get attachments() {
    const conversationId = this.currentConversationId;
    if (!conversationId) {
      return [];
    }
    const res = this.inputContents[conversationId];
    return res ? res.attachments : [];
  }

  get loadingOldConversations() {
    return this.fetchConversationsStatus === conversationsStatus.fetching;
  }

  get loadingOldMessages() {
    return this.fetchMessagesStatus === conversationsStatus.fetching;
  }

  get pushing() {
    const conversationId = this.currentConversationId;
    if (!conversationId) {
      return false;
    }
    return (
      this.conversationStatus[conversationId] === conversationsStatus.pushing
    );
  }

  get _hasPermission() {
    return this._appFeatures.hasReadMessagesPermission;
  }

  addEntities(entities: CorrespondentMatch[]) {
    this._addCorrespondentMatchEntities(entities);
  }

  removeEntity(entity: CorrespondentMatch) {
    this._removeCorrespondentMatchEntity(entity);
  }

  addResponses(responses: Message[]) {
    this._addCorrespondentResponses(responses);
  }

  removeResponse(phoneNumber: string) {
    this._removeCorrespondentResponses(phoneNumber);
  }

  relateCorrespondentEntity(responses: Message[]) {
    if (
      !this._contactMatcher ||
      !this._conversationLogger ||
      !this.correspondentMatch.length
    ) {
      return;
    }
    this.addResponses(responses);
    const { countryCode, areaCode } = this._regionSettings;
    const formattedCorrespondentMatch = this.correspondentMatch.map((item) => {
      const formatted = normalizeNumber({
        phoneNumber: item.phoneNumber!,
        countryCode,
        areaCode,
        removeExtension: false,
      });
      return {
        phoneNumber: formatted,
        id: item.rawId,
      };
    });
    formattedCorrespondentMatch.forEach((item) => {
      const { phoneNumber } = item;
      const conversationId = this.correspondentResponse[phoneNumber];
      const conversationLogger = this._conversationLogger;
      if (conversationLogger) {
        if (conversationLogger.autoLog) {
          conversationLogger.logConversation({
            entity: item,
            conversationId,
          } as any);
        }
      }
      this.removeEntity(item);
      this.removeResponse(phoneNumber);
    });
  }

  /**
   * use phone number and current all senderNumbersList to find all matching conversations
   */
  getConversationByPhoneNumbers(
    phoneNumbers: string[],
    senderNumbersList = this._messageSender?.senderNumbersList || [],
  ) {
    const matchingConversations = [];
    let latestConversation = undefined;
    let latestTime = 0;

    for (const senderNumber of senderNumbersList) {
      const currentUniqueId = buildConversationId(
        phoneNumbers,
        senderNumber.phoneNumber!,
      );

      const conversation =
        this.allConversationsInfo.uniqueConversationMap.get(currentUniqueId);
      if (conversation) {
        matchingConversations.push(conversation);

        const conversationTime = conversation.lastModifiedTime || 0;
        if (conversationTime > latestTime) {
          latestTime = conversationTime;
          latestConversation = conversation;
        }
      }
    }

    return {
      conversations: matchingConversations,
      latest: latestConversation,
    };
  }
}
