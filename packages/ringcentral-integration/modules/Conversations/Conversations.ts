import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type GetMessageList from '@rc-ex/core/lib/definitions/GetMessageList';
import type ListMessagesParameters from '@rc-ex/core/lib/definitions/ListMessagesParameters';
import type MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';
import {
  action,
  computed,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import { messageDirection } from '../../enums/messageDirection';
import { messageTypes } from '../../enums/messageTypes';
import type { Message } from '../../interfaces/MessageStore.model';
import cleanNumber from '../../lib/cleanNumber';
import { Module } from '../../lib/di';
import type { Correspondent } from '../../lib/messageHelper';
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
  normalizeRecord,
  sortSearchResults,
} from '../../lib/messageHelper';
import { normalizeNumber } from '../../lib/normalizeNumber';
import { proxify } from '../../lib/proxy/proxify';
import type { Attachment } from '../MessageSender';
import {
  ATTACHMENT_SIZE_LIMITATION,
  messageSenderMessages,
} from '../MessageSender';

import type {
  CorrespondentMatch,
  CorrespondentResponse,
  CurrentConversation,
  Deps,
  FilteredConversation,
  FormattedConversation,
  InputContent,
} from './Conversations.interface';
import { conversationsStatus } from './conversationsStatus';

function mergeMessages(messages: Message[], oldMessages: Message[]): Message[] {
  const tmp: { [key: string]: number } = {};
  const currentMessages: Message[] = [];
  messages.forEach((element) => {
    currentMessages.push(element);
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    tmp[element.id] = 1;
  });

  oldMessages.forEach((element) => {
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    if (!tmp[element.id]) {
      currentMessages.push(element);
    }
  });
  return currentMessages;
}

function getEarliestTime(messages: Message[]) {
  let newTime = Date.now();
  messages.forEach((message) => {
    // @ts-expect-error TS(2769): No overload matches this call.
    const creationTime = new Date(message.creationTime).getTime();
    if (creationTime < newTime) {
      newTime = creationTime;
    }
  });
  return newTime;
}

export function getUniqueNumbers(conversations: Message[]): string[] {
  const output: string[] = [];
  const numberMap: { [key: string]: boolean } = {};
  function addIfNotExist(number: string) {
    if (number && !numberMap[number]) {
      output.push(number);
      numberMap[number] = true;
    }
  }
  conversations.forEach((message) => {
    if (message.from && message.direction === messageDirection.inbound) {
      const fromNumber =
        message.from.phoneNumber || message.from.extensionNumber;
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      addIfNotExist(fromNumber);
    }
    if (
      message.to &&
      message.to.length > 0 &&
      message.direction === messageDirection.outbound
    ) {
      message.to.forEach((toNumber) => {
        if (!toNumber) {
          return;
        }
        const toPhoneNumber = toNumber.phoneNumber || toNumber.extensionNumber;
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        addIfNotExist(toPhoneNumber);
      });
    }
  });
  return output;
}

export const DEFAULT_PER_PAGE = 20;
export const DEFAULT_DAY_SPAN = 90;

@Module({
  name: 'Conversations',
  deps: [
    'Alert',
    'Auth',
    'Client',
    'MessageSender',
    'ExtensionInfo',
    'MessageStore',
    'AppFeatures',
    'RegionSettings',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ConversationLogger', optional: true },
    { dep: 'ConversationsOptions', optional: true },
  ],
})
export class Conversations extends RcModuleV2<Deps> {
  protected _olderDataExisted = true;
  protected _olderMessagesExisted = true;

  protected _perPage: number;
  protected _daySpan: number;
  protected _enableLoadOldMessages: boolean;
  protected _showMMSAttachment: boolean;
  private _enableContactMatch: boolean;

  constructor(deps: Deps) {
    super({
      deps,
    });

    this._perPage =
      this._deps.conversationsOptions?.perPage ?? DEFAULT_PER_PAGE;
    this._daySpan =
      this._deps.conversationsOptions?.daySpan ?? DEFAULT_DAY_SPAN;
    this._enableLoadOldMessages =
      this._deps.conversationsOptions?.enableLoadOldMessages ?? false;
    this._showMMSAttachment =
      this._deps.conversationsOptions?.showMMSAttachment ?? false;
    this._enableContactMatch =
      this._deps.conversationsOptions?.enableContactMatch ?? true;

    this._deps.messageSender.on(
      this._deps.messageSender.events.send,
      ({ toNumbers }) => {
        this.addEntities(toNumbers.map((number) => ({ phoneNumber: number })));
      },
    );

    if (this._deps.contactMatcher && this._enableContactMatch) {
      this._deps.contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () => this._deps.messageStore.ready,
      });
    }
  }

  @state
  searchInput = '';

  @state
  typeFilter: ObjectMapValue<typeof messageTypes> = messageTypes.all;

  @state
  oldConversations: Message[] = [];

  @state
  currentPage = 1;

  @state
  fetchConversationsStatus: ObjectMapValue<typeof conversationsStatus> =
    conversationsStatus.idle;

  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  currentConversationId?: string = null;

  @state
  oldMessages: Message[] = [];

  @state
  fetchMessagesStatus: ObjectMapValue<typeof conversationsStatus> =
    conversationsStatus.idle;

  @state
  inputContents: InputContent[] = [];

  @state
  conversationStatus: ObjectMapValue<typeof conversationsStatus> =
    conversationsStatus.idle;

  @state
  correspondentMatch: CorrespondentMatch[] = [];

  @state
  correspondentResponse: CorrespondentResponse = {};

  @action
  _updateSearchInput(input = '') {
    this.searchInput = input;
  }

  @action
  _updateTypeFilter(typeFilter: ObjectMapValue<typeof messageTypes>) {
    this.typeFilter = typeFilter;
    this.currentPage = 1;
    this.oldConversations = [];
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
  _updateCurrentConversationId(conversationId?: string) {
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
    const existedContent = this.inputContents.find(
      (content) => content.conversationId === conversationId,
    );
    if (existedContent) {
      existedContent.text = text;
    } else {
      this.inputContents.push({ conversationId, text, attachments: [] });
    }
  }

  @action
  _addAttachment(conversationId: string, attachment: Attachment) {
    const existedContent = this.inputContents.find(
      (content) => content.conversationId === conversationId,
    );
    if (existedContent) {
      const attachments = (existedContent.attachments || []).filter(
        (f) => f.name !== attachment.name,
      );
      attachments.push(attachment);
      existedContent.attachments = attachments;
    } else {
      this.inputContents.push({
        conversationId,
        text: '',
        attachments: [attachment],
      });
    }
  }

  @action
  _removeAttachment(conversationId: string, attachment: Attachment) {
    const existedContent = this.inputContents.find(
      (content) => content.conversationId === conversationId,
    );
    if (existedContent) {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      existedContent.attachments = existedContent.attachments.filter(
        (f) => f.name !== attachment.name,
      );
    }
  }

  @action
  _removeInputContent(conversationId: string) {
    this.inputContents = this.inputContents.filter(
      (msg) => typeof msg === 'object' && msg.conversationId !== conversationId,
    );
  }

  @action
  _updateConversationStatus(
    status: ObjectMapValue<typeof conversationsStatus>,
  ) {
    this.conversationStatus = status;
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
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    this.currentConversationId = null;
    this.oldMessages = [];
    this.fetchMessagesStatus = conversationsStatus.idle;
    this.inputContents = [];
    this.conversationStatus = conversationsStatus.idle;
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._deps.auth.loggedIn);
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._deps.auth.loggedIn)
    );
  }

  override onInit() {
    if (this._deps.contactMatcher) {
      this._deps.contactMatcher.triggerMatch();
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
        if (this._deps.contactMatcher && this.ready) {
          this._deps.contactMatcher.triggerMatch();
        }
      },
    );
    watch(
      this,
      () => this._deps.messageStore.allConversations,
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

  @computed(
    ({
      allUniqueNumbers,
      currentPage,
      typeFilter,
      effectiveSearchString,
    }: Conversations) => [
      allUniqueNumbers,
      currentPage,
      typeFilter,
      effectiveSearchString,
    ],
  )
  get shouldTriggerMatchConditions(): any[] {
    return [
      this.allUniqueNumbers,
      this.currentPage,
      this.typeFilter,
      this.effectiveSearchString,
    ];
  }

  @proxify
  async updateSearchInput(input: string) {
    this._updateSearchInput(input);
  }

  @proxify
  async updateTypeFilter(type: ObjectMapValue<typeof messageTypes>) {
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

  @proxify
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
      // @ts-expect-error TS(2322): Type 'import("/Users/declan.zou/Projects/rc/integr... Remove this comment to see the full error message
      const { records }: GetMessageList = await this._deps.client
        .account()
        .extension()
        .messageStore()
        // @ts-expect-error TS(2345): Argument of type 'ListMessagesParameters' is not a... Remove this comment to see the full error message
        .list(params);
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      const recordsLength = records.length;
      this._olderDataExisted = recordsLength === this._perPage;
      if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
        const isIncreaseCurrentPage =
          recordsLength &&
          this._perPage * this.currentPage <
            recordsLength + this.filteredConversations.length;
        // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[] | undef... Remove this comment to see the full error message
        this._fetchOldConversationsSuccess(records, isIncreaseCurrentPage);
      }
    } catch (e: any /** TODO: confirm with instanceof */) {
      if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
        this._updateFetchConversationsStatus(conversationsStatus.idle);
      }
    }
  }

  @proxify
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

  @proxify
  async resetCurrentPage() {
    this._resetCurrentPage();
  }

  @proxify
  async loadConversation(conversationId: string) {
    if (conversationId === this.currentConversationId) {
      return;
    }
    this._updateCurrentConversationId(conversationId);
  }

  @proxify
  async unloadConversation() {
    // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    this._updateCurrentConversationId(null);
    this._olderMessagesExisted = true;
  }

  @proxify
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
    const params: ListMessagesParameters = {
      conversationId,
      perPage,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    };
    try {
      // @ts-expect-error TS(2322): Type 'import("/Users/declan.zou/Projects/rc/integr... Remove this comment to see the full error message
      const { records }: GetMessageList = await this._deps.client
        .account()
        .extension()
        .messageStore()
        // @ts-expect-error TS(2345): Argument of type 'ListMessagesParameters' is not a... Remove this comment to see the full error message
        .list(params);
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._olderMessagesExisted = records.length === perPage;
      if (conversationId === this.currentConversationId) {
        // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[] | undef... Remove this comment to see the full error message
        this._fetchOldMessagesSuccess(records);
      }
    } catch (e: any /** TODO: confirm with instanceof */) {
      if (conversationId === this.currentConversationId) {
        this._updateFetchMessagesStatus(conversationsStatus.idle);
      }
    }
  }

  _alertWarning(message: string) {
    if (message) {
      const ttlConfig =
        message !== messageSenderMessages.noAreaCode ? { ttl: 0 } : null;
      this._deps.alert.warning({
        message,
        ...ttlConfig,
      });
      return true;
    }
    return false;
  }

  @proxify
  async updateMessageText(text: string) {
    if (text.length > 1000) {
      return this._alertWarning(messageSenderMessages.textTooLong);
    }
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    this._updateMessageText(this.currentConversationId, text);
  }

  @proxify
  async addAttachment(attachment: Attachment) {
    const attachments = this.attachments;
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (attachments.length >= 10) {
      this._alertWarning(messageSenderMessages.attachmentCountLimitation);
      return;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const size = attachments.reduce((prev, curr) => {
      return prev + curr.size;
    }, 0);
    if (size + attachment.size > ATTACHMENT_SIZE_LIMITATION) {
      this._alertWarning(messageSenderMessages.attachmentSizeLimitation);
      return;
    }
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    this._addAttachment(this.currentConversationId, attachment);
  }

  @proxify
  async removeAttachment(attachment: Attachment) {
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    this._removeAttachment(this.currentConversationId, attachment);
  }

  @proxify
  async replyToReceivers(text: string, attachments: Attachment[] = []) {
    this._updateConversationStatus(conversationsStatus.pushing);
    try {
      const responses = await this._deps.messageSender.send({
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        fromNumber: this._getFromNumber(),
        // @ts-expect-error TS(2322): Type '(string | undefined)[]' is not assignable to... Remove this comment to see the full error message
        toNumbers: this._getToNumbers(),
        text,
        attachments,
        // @ts-expect-error TS(2322): Type 'number | null' is not assignable to type 'nu... Remove this comment to see the full error message
        replyOnMessageId: this._getReplyOnMessageId(),
      });
      if (responses && responses[0]) {
        // @ts-expect-error TS(2345): Argument of type 'import("/Users/declan.zou/Projec... Remove this comment to see the full error message
        this._deps.messageStore.pushMessage(responses[0]);
        this._updateConversationStatus(conversationsStatus.idle);
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        this._removeInputContent(this.currentConversationId);
        return responses[0];
      }
      this._onReplyError();
      return null;
    } catch (error: any /** TODO: confirm with instanceof */) {
      this._onReplyError();
      throw error;
    }
  }

  _onReplyError() {
    this._updateConversationStatus(conversationsStatus.idle);
  }

  _getReplyOnMessageId() {
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

  _getFromNumber() {
    const senderNumber = this.currentConversation.senderNumber;
    if (!senderNumber) {
      return null;
    }
    return senderNumber.extensionNumber || senderNumber.phoneNumber;
  }

  _getToNumbers() {
    const recipients = this.currentConversation.recipients;
    return recipients.map(
      (recipient) => recipient.extensionNumber || recipient.phoneNumber,
    );
  }

  @proxify
  async deleteConversation(conversationId: string) {
    if (!conversationId) {
      return;
    }
    if (this._deps.messageStore.conversationStore[conversationId]) {
      await this._deps.messageStore.deleteConversationMessages(conversationId);
      return;
    }
    const conversation = this.allConversations.find(
      (c) => c.conversationId === conversationId,
    );
    if (!conversation) {
      return;
    }
    if (messageIsTextMessage(conversation)) {
      await this._deps.messageStore.deleteConversation(conversationId);
      return;
    }
    try {
      await this._deps.messageStore.deleteMessageApi(conversationId);
      this._deleteOldConversation(conversationId);
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error(e);
    }
  }

  @computed((that: Conversations) => [
    that._deps.messageStore.allConversations,
    that.oldConversations,
  ])
  get allConversations(): Message[] {
    const conversations = this._deps.messageStore.allConversations;
    const oldConversations = this.oldConversations;
    if (oldConversations.length === 0) {
      return conversations;
    }
    const newConversations: Message[] = [];
    const conversationMap: { [key: string]: number } = {};
    const pushConversation = (c: Message) => {
      // use conversationId when available, use id for VoiceMail/Fax/etc..
      const cid = c.conversationId || c.id;
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      if (conversationMap[cid]) {
        return;
      }
      newConversations.push(c);
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      conversationMap[cid] = 1;
    };
    conversations.forEach(pushConversation);
    oldConversations.forEach(pushConversation);
    return newConversations;
  }

  @computed(({ pagingConversations }: Conversations) => [pagingConversations])
  get uniqueNumbers() {
    return getUniqueNumbers(this.pagingConversations);
  }

  @computed(({ pagingConversations }: Conversations) => [pagingConversations])
  get allUniqueNumbers() {
    return getUniqueNumbers(this.allConversations);
  }

  @computed(({ searchInput }: Conversations) => [searchInput])
  get effectiveSearchString() {
    if (this.searchInput.length >= 3) {
      return this.searchInput;
    }
    return '';
  }

  @computed(({ allConversations, typeFilter }: Conversations) => [
    allConversations,
    typeFilter,
  ])
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
            (this._deps.appFeatures.hasReadTextPermission ||
              !messageIsTextMessage(conversation)) &&
            (this._deps.appFeatures.hasVoicemailPermission ||
              !messageIsVoicemail(conversation)) &&
            (this._deps.appFeatures.hasReadFaxPermission ||
              !messageIsFax(conversation)),
        );
    }
  }

  @computed((that: Conversations) => [
    that.typeFilteredConversations,
    that._deps.extensionInfo.extensionNumber,
    that._deps.contactMatcher?.dataMapping,
    that._deps.conversationLogger?.loggingMap,
    that._deps.conversationLogger?.dataMapping,
    that._deps.auth.accessToken,
  ])
  get formattedConversations(): FormattedConversation[] {
    const conversations = this.typeFilteredConversations;
    const extensionNumber = this._deps.extensionInfo.extensionNumber;
    const contactMapping =
      (this._deps.contactMatcher && this._deps.contactMatcher.dataMapping) ||
      {};
    const loggingMap =
      (this._deps.conversationLogger &&
        this._deps.conversationLogger.loggingMap) ||
      {};
    const conversationLogMapping =
      (this._deps.conversationLogger &&
        this._deps.conversationLogger.dataMapping) ||
      {};
    const accessToken = this._deps.auth.accessToken;
    // @ts-expect-error TS(2322): Type '{ unreadCounts: number; self: any; selfMatch... Remove this comment to see the full error message
    return conversations.map((message) => {
      const { self, correspondents } = getNumbersFromMessage({
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        extensionNumber,
        message,
      });
      const selfNumber = self && (self.phoneNumber || self.extensionNumber);
      const selfMatches = (selfNumber && contactMapping[selfNumber]) || [];
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      const correspondentMatches: CorrespondentMatch[] = correspondents.reduce(
        (matches: CorrespondentMatch[], contact: Correspondent) => {
          const number =
            contact && (contact.phoneNumber || contact.extensionNumber);
          return number &&
            contactMapping[number] &&
            contactMapping[number].length
            ? matches.concat(contactMapping[number])
            : matches;
        },
        [] as CorrespondentMatch[],
      );
      const conversationLogId = this._deps.conversationLogger
        ? this._deps.conversationLogger.getConversationLogId(message)
        : null;
      const isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
      const conversationMatches =
        // @ts-expect-error TS(2538): Type 'null' cannot be used as an index type.
        conversationLogMapping[conversationLogId] || [];
      let voicemailAttachment = null;
      if (messageIsVoicemail(message)) {
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        voicemailAttachment = getVoicemailAttachment(message, accessToken);
      }
      let faxAttachment = null;
      if (messageIsFax(message)) {
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        faxAttachment = getFaxAttachment(message, accessToken);
      }
      let unreadCounts = message.unreadCounts;
      if (typeof unreadCounts === 'undefined') {
        unreadCounts = messageIsUnread(message) ? 1 : 0;
      }
      let mmsAttachments: MessageAttachmentInfo[] = [];
      if (messageIsTextMessage(message) && this._showMMSAttachment) {
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        mmsAttachments = getMMSAttachments(message, accessToken);
      }
      return {
        ...message,
        unreadCounts,
        self,
        selfMatches,
        correspondents,
        correspondentMatches,
        conversationLogId,
        isLogging,
        conversationMatches,
        voicemailAttachment,
        faxAttachment,
        mmsAttachments,
        lastMatchedCorrespondentEntity:
          (this._deps.conversationLogger &&
            this._deps.conversationLogger.getLastMatchedCorrespondentEntity(
              // @ts-expect-error TS(2345): Argument of type 'Message' is not assignable to pa... Remove this comment to see the full error message
              message,
            )) ||
          null,
      };
    });
  }

  @computed((that: Conversations) => [
    that.formattedConversations,
    that.effectiveSearchString,
    that._deps.messageStore.conversationStore,
  ])
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
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        this._deps.messageStore.conversationStore[message.conversationId] || [];
      // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
      const matchedMessage: Message = messageList.find(
        (item) => (item.subject || '').toLowerCase().indexOf(searchString) > -1,
      );
      if (matchedMessage) {
        searchResults.push({
          ...message,
          matchedMessage,
          matchOrder: 1,
        });
      }
    });
    return searchResults.sort(sortSearchResults);
  }

  @computed(({ filteredConversations, currentPage }: Conversations) => [
    filteredConversations,
    currentPage,
  ])
  get pagingConversations() {
    const pageNumber = this.currentPage;
    const lastIndex = pageNumber * this._perPage;
    return this.filteredConversations.slice(0, lastIndex);
  }

  @computed(({ typeFilteredConversations }: Conversations) => [
    typeFilteredConversations,
  ])
  get earliestTime() {
    return getEarliestTime(this.typeFilteredConversations);
  }

  @computed((that: Conversations) => [
    that.currentConversationId,
    that._deps.extensionInfo.extensionNumber,
    that._deps.contactMatcher?.dataMapping,
    that.oldMessages,
    that._deps.messageStore.conversationStore,
    that.allConversations,
    that._deps.auth.accessToken,
    that._deps.conversationLogger?.dataMapping,
    that._deps.conversationLogger?.loggingMap,
  ])
  get currentConversation(): CurrentConversation {
    const conversationId = this.currentConversationId;
    const extensionNumber = this._deps.extensionInfo.extensionNumber;
    const contactMapping =
      (this._deps.contactMatcher && this._deps.contactMatcher.dataMapping) ||
      {};
    const oldMessages = this.oldMessages;
    const conversationStore = this._deps.messageStore.conversationStore;
    const conversations = this.allConversations;
    const accessToken = this._deps.auth.accessToken;
    const conversationLogMapping =
      (this._deps.conversationLogger &&
        this._deps.conversationLogger.dataMapping) ||
      {};
    const loggingMap =
      (this._deps.conversationLogger &&
        this._deps.conversationLogger.loggingMap) ||
      {};
    const conversation = conversations.find(
      (c) => c.conversationId === conversationId,
    );
    const messages: Message[] = [].concat(
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      conversationStore[conversationId] || [],
    );
    const currentConversation = {
      ...conversation,
    } as CurrentConversation;
    const allMessages = mergeMessages(messages, oldMessages).map((m) => {
      if (!this._showMMSAttachment) {
        return m;
      }
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      const mmsAttachments = getMMSAttachments(m, accessToken);
      return {
        ...m,
        mmsAttachments,
      };
    });
    const { correspondents = [] } = getNumbersFromMessage({
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      extensionNumber,
      // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
      message: conversation,
    });
    const correspondentMatches: CorrespondentMatch[] = correspondents.reduce(
      (matches: CorrespondentMatch[], contact: Correspondent) => {
        const number =
          contact && (contact.phoneNumber || contact.extensionNumber);
        return number && contactMapping[number] && contactMapping[number].length
          ? matches.concat(contactMapping[number])
          : matches;
      },
      [] as CorrespondentMatch[],
    );
    const conversationLogId = this._deps.conversationLogger
      ? // @ts-expect-error TS(2345): Argument of type 'Message | undefined' is not assi... Remove this comment to see the full error message
        this._deps.conversationLogger.getConversationLogId(conversation)
      : null;
    // @ts-expect-error TS(2538): Type 'null' cannot be used as an index type.
    const conversationMatches = conversationLogMapping[conversationLogId] || [];
    // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
    currentConversation.conversationLogId = conversationLogId;
    currentConversation.correspondents = correspondents;
    currentConversation.correspondentMatches = correspondentMatches;
    currentConversation.conversationMatches = conversationMatches;
    currentConversation.messages = allMessages.reverse();
    // @ts-expect-error TS(2322): Type 'MessageStoreCallerInfoResponseFrom | null | ... Remove this comment to see the full error message
    currentConversation.senderNumber = getMyNumberFromMessage({
      // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
      message: conversation,
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      myExtensionNumber: this._deps.extensionInfo.extensionNumber,
    });
    currentConversation.recipients = getRecipientNumbersFromMessage({
      // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
      message: conversation,
      myNumber: currentConversation.senderNumber,
    });
    currentConversation.isLogging = !!(
      conversationLogId && loggingMap[conversationLogId]
    );
    // @ts-expect-error TS(2322): Type 'Entity | null' is not assignable to type 'La... Remove this comment to see the full error message
    currentConversation.lastMatchedCorrespondentEntity =
      (this._deps.conversationLogger &&
        conversation &&
        this._deps.conversationLogger.getLastMatchedCorrespondentEntity(
          // @ts-expect-error TS(2345): Argument of type 'Message' is not assignable to pa... Remove this comment to see the full error message
          conversation,
        )) ||
      null;
    return currentConversation;
  }

  @computed(({ inputContents, currentConversationId }: Conversations) => [
    inputContents,
    currentConversationId,
  ])
  get messageText() {
    const conversationId = this.currentConversationId;
    const res = this.inputContents.find(
      (msg) => typeof msg === 'object' && msg.conversationId === conversationId,
    );
    return res ? res.text : '';
  }

  @computed(({ inputContents, currentConversationId }: Conversations) => [
    inputContents,
    currentConversationId,
  ])
  get attachments() {
    const conversationId = this.currentConversationId;
    const res = this.inputContents.find(
      (msg) => typeof msg === 'object' && msg.conversationId === conversationId,
    );
    return res ? res.attachments : [];
  }

  get loadingOldConversations() {
    return this.fetchConversationsStatus === conversationsStatus.fetching;
  }

  get loadingOldMessages() {
    return this.fetchMessagesStatus === conversationsStatus.fetching;
  }

  get pushing() {
    return this.conversationStatus === conversationsStatus.pushing;
  }

  get _hasPermission() {
    return this._deps.appFeatures.hasReadMessagesPermission;
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
      !this._deps.contactMatcher ||
      !this._deps.conversationLogger ||
      !this.correspondentMatch.length
    ) {
      return;
    }
    this.addResponses(responses);
    const { countryCode, areaCode } = this._deps.regionSettings;
    const formattedCorrespondentMatch = this.correspondentMatch.map((item) => {
      const formatted = normalizeNumber({
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        phoneNumber: item.phoneNumber,
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
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (this._deps.conversationLogger.autoLog) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.conversationLogger.logConversation({
          entity: item,
          conversationId,
        });
      }
      this.removeEntity(item);
      this.removeResponse(phoneNumber);
    });
  }
}
