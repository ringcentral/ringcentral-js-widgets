import messageDirection from '../../enums/messageDirection';
import messageTypes from '../../enums/messageTypes';
import cleanNumber from '../../lib/cleanNumber';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
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
  sortSearchResults,
} from '../../lib/messageHelper';
import normalizeNumber from '../../lib/normalizeNumber';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { selector } from '../../lib/selector';
import { messageSenderMessages } from '../MessageSender/messageSenderMessages';
import { actionTypes } from './actionTypes';
import getReducer from './getReducer';
import { status } from './status';

function mergeMessages(messages, oldMessages) {
  const tmp = {};
  const currentMessages = [];
  messages.forEach((element) => {
    currentMessages.push(element);
    tmp[element.id] = 1;
  });

  oldMessages.forEach((element) => {
    if (!tmp[element.id]) {
      currentMessages.push(element);
    }
  });
  return currentMessages;
}

function getEarliestTime(messages) {
  let newTime = Date.now();
  messages.forEach((message) => {
    const creationTime = new Date(message.creationTime).getTime();
    if (creationTime < newTime) {
      newTime = creationTime;
    }
  });
  return newTime;
}

function getUniqueNumbers(conversations) {
  const output = [];
  const numberMap = {};
  function addIfNotExist(number) {
    if (number && !numberMap[number]) {
      output.push(number);
      numberMap[number] = true;
    }
  }
  conversations.forEach((message) => {
    if (message.from && message.direction === messageDirection.inbound) {
      const fromNumber =
        message.from.phoneNumber || message.from.extensionNumber;
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
        addIfNotExist(toPhoneNumber);
      });
    }
  });
  return output;
}

const DEFAULT_PER_PAGE = 20;
const DEFAULT_DAY_SPAN = 90;
@Module({
  deps: [
    'Alert',
    'Auth',
    'Client',
    'MessageSender',
    'ExtensionInfo',
    'MessageStore',
    'AppFeatures',
    { dep: 'RegionSettings', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ConversationLogger', optional: true },
    { dep: 'ConversationsOptions', optional: true },
  ],
})
export default class Conversations extends RcModule {
  constructor({
    alert,
    auth,
    client,
    messageSender,
    extensionInfo,
    messageStore,
    appFeatures,
    contactMatcher,
    conversationLogger,
    regionSettings,
    perPage = DEFAULT_PER_PAGE,
    daySpan = DEFAULT_DAY_SPAN,
    enableLoadOldMessages = false, // disable old message by default
    showMMSAttachment = false,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = ensureExist.call(this, auth, 'auth');
    this._alert = ensureExist.call(this, alert, 'alert');
    this._client = ensureExist.call(this, client, 'client');
    this._messageSender = ensureExist.call(
      this,
      messageSender,
      'messageSender',
    );
    this._extensionInfo = ensureExist.call(
      this,
      extensionInfo,
      'extensionInfo',
    );
    this._messageStore = ensureExist.call(this, messageStore, 'messageStore');
    this._appFeatures = appFeatures;
    this._contactMatcher = contactMatcher;
    this._conversationLogger = conversationLogger;
    this._regionSettings = regionSettings;

    this._reducer = getReducer(this.actionTypes);

    this._promise = null;
    this._lastProcessedNumbers = null;
    this._perPage = perPage;
    this._daySpan = daySpan;
    this._olderDataExsited = true;
    this._olderMessagesExsited = true;
    this._enableLoadOldMessages = enableLoadOldMessages;
    this._showMMSAttachment = showMMSAttachment;
    this._lastConversaionList = [];

    this._messageSender.on(this._messageSender.events.send, ({ toNumbers }) => {
      this.addEntities(toNumbers);
    });

    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () => this._messageStore.ready,
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._init();
    } else if (this._shouldReset()) {
      this._reset();
    } else if (
      this._lastProcessedNumbers !== this.allUniqueNumbers ||
      this._lastProcessedPage !== this.currentPage ||
      this._lastTypeFilter !== this.typeFilter ||
      this._lastSearchString !== this.effectiveSearchString
    ) {
      this._lastProcessedNumbers = this.allUniqueNumbers;
      this._lastProcessedPage = this.currentPage;
      this._lastTypeFilter = this.typeFilter;
      this._lastSearchString = this.effectiveSearchString;
      if (this._contactMatcher) {
        this._contactMatcher.triggerMatch();
      }
    } else if (
      this._lastConversaionList.length >
      this._messageStore.allConversations.length
    ) {
      this._lastConversaionList = this._messageStore.allConversations;
      if (this.oldConversations.length) {
        this.store.dispatch({
          type: this.actionTypes.cleanOldConversations,
        });
        this._olderDataExsited = true;
      }
    } else if (
      this._lastConversaionList.length <
      this._messageStore.allConversations.length
    ) {
      this._lastConversaionList = this._messageStore.allConversations;
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._extensionInfo.ready &&
      this._messageSender.ready &&
      this._messageStore.ready &&
      this._appFeatures.ready &&
      (!this._contactMatcher || this._contactMatcher.ready) &&
      (!this._conversationLogger || this._conversationLogger.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        !this._extensionInfo.ready ||
        !this._messageSender.ready ||
        !this._appFeatures.ready ||
        !this._messageStore.ready ||
        (this._contactMatcher && !this._contactMatcher.ready) ||
        (this._conversationLogger && !this._conversationLogger.ready)) &&
      this.ready
    );
  }

  _init() {
    this.store.dispatch({
      type: this.actionTypes.init,
    });
    if (this._contactMatcher) {
      this._contactMatcher.triggerMatch();
    }
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
    this._lastConversaionList = this._messageStore.allConversations;
    if (
      this.allConversations.length <= this._perPage &&
      this._enableLoadOldMessages &&
      this._hasPermission
    ) {
      this.fetchOldConversations();
    }
  }

  _reset() {
    this._lastProcessedNumbers = null;
    this._olderDataExsited = true;
    this._olderMessagesExsited = true;
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async updateSearchInput(input) {
    this.store.dispatch({
      type: this.actionTypes.updateSearchInput,
      input,
    });
  }

  @proxify
  async updateTypeFilter(type) {
    if (this.typeFilter === type) {
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.updateTypeFilter,
      typeFilter: type,
    });
    this._olderDataExsited = true;
    this._olderMessagesExsited = true;
    if (this.pagingConversations.length <= this._perPage) {
      this.loadNextPage();
    }
  }

  @proxify
  async fetchOldConversations() {
    if (!this._olderDataExsited) {
      return;
    }
    if (this.loadingOldConversations) {
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.fetchOldConversations,
    });
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - this._daySpan);
    const dateTo = new Date(this.earliestTime);
    if (dateTo.getTime() < dateFrom.getTime()) {
      dateFrom = new Date(dateTo.getTime() - 1000 * 3600 * 24);
    }
    const typeFilter = this.typeFilter;
    const currentPage = this.currentPage;
    const params = {
      distinctConversations: true,
      perPage: this._perPage,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    };
    if (typeFilter === messageTypes.text) {
      params.messageType = [messageTypes.sms, messageTypes.pager];
    } else if (
      typeFilter &&
      typeFilter !== '' &&
      typeFilter !== messageTypes.all
    ) {
      params.messageType = typeFilter;
    }
    try {
      const { records } = await this._client
        .account()
        .extension()
        .messageStore()
        .list(params);
      const recordsLength = records.length;
      this._olderDataExsited = recordsLength === this._perPage;
      if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
        const isIncreaseCurrentPage =
          recordsLength &&
          this._perPage * this.currentPage <
            recordsLength + this.filteredConversations.length;
        this.store.dispatch({
          type: this.actionTypes.fetchOldConversationsSuccess,
          records,
          isIncreaseCurrentPage,
        });
      }
    } catch (e) {
      if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
        this.store.dispatch({
          type: this.actionTypes.fetchOldConversationsError,
        });
      }
    }
  }

  @proxify
  async loadNextPage() {
    const currentPage = this.currentPage;
    if (currentPage * this._perPage < this.filteredConversations.length) {
      this.store.dispatch({
        type: this.actionTypes.increaseCurrentPage,
      });
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
    this.store.dispatch({
      type: this.actionTypes.resetCurrentPage,
    });
  }

  @proxify
  async loadConversation(conversationId) {
    if (conversationId === this.currentConversationId) {
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.updateCurrentConversationId,
      conversationId,
    });
  }

  @proxify
  async unloadConversation() {
    this.store.dispatch({
      type: this.actionTypes.updateCurrentConversationId,
      conversationId: null,
    });
    this._olderMessagesExsited = true;
  }

  @proxify
  async fetchOldMessages(perPage = this._perPage) {
    if (!this._enableLoadOldMessages) {
      return;
    }
    if (!this._hasPermission) {
      return;
    }
    if (!this._olderMessagesExsited) {
      return;
    }
    if (this.loadingOldMessages) {
      return;
    }
    if (!this.currentConversationId) {
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.fetchOldMessages,
    });
    const conversationId = this.currentConversationId;
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - this._daySpan);
    const earliestTime = getEarliestTime(this.currentConversation.messages);
    const dateTo = new Date(earliestTime);
    if (dateTo.getTime() < dateFrom.getTime()) {
      dateFrom.setDate(dateFrom.getDate() - 1);
    }
    const params = {
      conversationId,
      perPage,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    };
    try {
      const { records } = await this._client
        .account()
        .extension()
        .messageStore()
        .list(params);
      this._olderMessagesExsited = records.length === perPage;
      if (conversationId === this.currentConversationId) {
        this.store.dispatch({
          type: this.actionTypes.fetchOldMessagesSuccess,
          records,
        });
      }
    } catch (e) {
      if (conversationId === this.currentConversationId) {
        this.store.dispatch({
          type: this.actionTypes.fetchOldMessagesError,
        });
      }
    }
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
      type: this.actionTypes.updateMessageText,
      text,
      conversationId: this.currentConversationId,
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
          type: this.actionTypes.removeMessageText,
          conversationId: this.currentConversationId,
        });
        return responses[0];
      }
      this._onReplyError();
      return null;
    } catch (error) {
      this._onReplyError(error);
      throw error;
    }
  }

  _onReplyError(error) {
    this.store.dispatch({
      type: this.actionTypes.replyError,
      error,
    });
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
  async deleteConversation(conversationId) {
    if (!conversationId) {
      return;
    }
    if (this._messageStore.conversationStore[conversationId]) {
      await this._messageStore.deleteConversationMessages(conversationId);
      return;
    }
    const conversation = this.allConversations.find(
      (c) => c.conversationId === conversationId,
    );
    if (!conversation) {
      return;
    }
    if (messageIsTextMessage(conversation)) {
      await this._messageStore.deleteConversation(conversationId);
      return;
    }
    try {
      await this._messageStore.deleteMessageApi(conversationId);
      this.store.dispatch({
        type: this.actionTypes.deleteConversation,
        conversationId,
      });
    } catch (e) {
      console.error(e);
    }
  }

  @selector
  allConversations = [
    () => this._messageStore.allConversations,
    () => this.oldConversations,
    (conversations, oldConversations) => {
      if (oldConversations.length === 0) {
        return conversations;
      }
      const newConversations = [];
      const conversationMap = {};
      const pushConversation = (c) => {
        // use conversationId when available, use id for VoiceMail/Fax/etc..
        const cid = c.conversationId || c.id;
        if (conversationMap[cid]) {
          return;
        }
        newConversations.push(c);
        conversationMap[cid] = 1;
      };
      conversations.forEach(pushConversation);
      oldConversations.forEach(pushConversation);
      return newConversations;
    },
  ];

  @selector
  uniqueNumbers = [() => this.pagingConversations, getUniqueNumbers];

  @selector
  allUniqueNumbers = [() => this.allConversations, getUniqueNumbers];

  @selector
  effectiveSearchString = [
    () => this.state.searchInput,
    (input) => {
      if (input.length >= 3) return input;
      return '';
    },
  ];

  @selector
  typeFilteredConversations = [
    () => this.allConversations,
    () => this.typeFilter,
    (allConversations, typeFilter) => {
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
              (this._appFeatures.hasReadMessagesPermission ||
                !messageIsTextMessage(conversation)) &&
              (this._appFeatures.hasVoicemailPermission ||
                !messageIsVoicemail(conversation)) &&
              (this._appFeatures.hasReadFaxPermission ||
                !messageIsFax(conversation)),
          );
      }
    },
  ];

  @selector
  formattedConversations = [
    () => this.typeFilteredConversations,
    () => this._extensionInfo.extensionNumber,
    () => this._contactMatcher && this._contactMatcher.dataMapping,
    () => this._conversationLogger && this._conversationLogger.loggingMap,
    () => this._conversationLogger && this._conversationLogger.dataMapping,
    () => this._auth.accessToken,
    (
      conversations,
      extensionNumber,
      contactMapping = {},
      loggingMap = {},
      conversationLogMapping = {},
      accessToken,
    ) =>
      conversations.map((message) => {
        const { self, correspondents } = getNumbersFromMessage({
          extensionNumber,
          message,
        });
        const selfNumber = self && (self.phoneNumber || self.extensionNumber);
        const selfMatches = (selfNumber && contactMapping[selfNumber]) || [];
        const correspondentMatches = correspondents.reduce(
          (matches, contact) => {
            const number =
              contact && (contact.phoneNumber || contact.extensionNumber);
            return number &&
              contactMapping[number] &&
              contactMapping[number].length
              ? matches.concat(contactMapping[number])
              : matches;
          },
          [],
        );
        const conversationLogId = this._conversationLogger
          ? this._conversationLogger.getConversationLogId(message)
          : null;
        const isLogging = !!(
          conversationLogId && loggingMap[conversationLogId]
        );
        const conversationMatches =
          conversationLogMapping[conversationLogId] || [];
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
        let mmsAttachments = [];
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
          conversationLogId,
          isLogging,
          conversationMatches,
          voicemailAttachment,
          faxAttachment,
          mmsAttachments,
          lastMatchedCorrespondentEntity:
            (this._conversationLogger &&
              this._conversationLogger.getLastMatchedCorrespondentEntity(
                message,
              )) ||
            null,
        };
      }),
  ];

  @selector
  filteredConversations = [
    () => this.formattedConversations,
    () => this.effectiveSearchString,
    (conversations, effectiveSearchString) => {
      if (effectiveSearchString === '') {
        return conversations;
      }
      const searchResults = [];
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
        const messageList =
          this._messageStore.conversationStore[message.conversationId] || [];
        const matchedMessage = messageList.find(
          (item) =>
            (item.subject || '').toLowerCase().indexOf(searchString) > -1,
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
    },
  ];

  @selector
  pagingConversations = [
    () => this.filteredConversations,
    () => this.currentPage,
    (conversations, pageNumber) => {
      const lastIndex = pageNumber * this._perPage;
      return conversations.slice(0, lastIndex);
    },
  ];

  @selector
  earliestTime = [() => this.typeFilteredConversations, getEarliestTime];

  @selector
  currentConversation = [
    () => this.currentConversationId,
    () => this._extensionInfo.extensionNumber,
    () => this._contactMatcher && this._contactMatcher.dataMapping,
    () => this.oldMessages,
    () => this._messageStore.conversationStore,
    () => this.allConversations,
    () => this._auth.accessToken,
    () => this._conversationLogger && this._conversationLogger.dataMapping,
    () => this._conversationLogger && this._conversationLogger.loggingMap,
    (
      conversationId,
      extensionNumber,
      contactMapping,
      oldMessages,
      conversationStore,
      conversations,
      accessToken,
      conversationLogMapping = {},
      loggingMap,
    ) => {
      const conversation = conversations.find(
        (c) => c.conversationId === conversationId,
      );
      const messages = [].concat(conversationStore[conversationId] || []);
      const currentConversation = {
        ...conversation,
      };
      const allMessages = mergeMessages(messages, oldMessages).map((m) => {
        if (!this._showMMSAttachment) {
          return m;
        }
        const mmsAttachments = getMMSAttachments(m, accessToken);
        return {
          ...m,
          mmsAttachments,
        };
      });
      const { correspondents = [] } = getNumbersFromMessage({
        extensionNumber,
        message: conversation,
      });
      const correspondentMatches = correspondents.reduce((matches, contact) => {
        const number =
          contact && (contact.phoneNumber || contact.extensionNumber);
        return number && contactMapping[number] && contactMapping[number].length
          ? matches.concat(contactMapping[number])
          : matches;
      }, []);
      const conversationLogId = this._conversationLogger
        ? this._conversationLogger.getConversationLogId(conversation)
        : null;
      const conversationMatches =
        conversationLogMapping[conversationLogId] || [];
      currentConversation.correspondents = correspondents;
      currentConversation.correspondentMatches = correspondentMatches;
      currentConversation.conversationMatches = conversationMatches;
      currentConversation.messages = allMessages.reverse();
      currentConversation.senderNumber = getMyNumberFromMessage({
        message: conversation,
        myExtensionNumber: this._extensionInfo.extensionNumber,
      });
      currentConversation.recipients = getRecipientNumbersFromMessage({
        message: conversation,
        myNumber: currentConversation.senderNumber,
      });
      currentConversation.isLogging = !!(
        conversationLogId && loggingMap[conversationLogId]
      );
      return currentConversation;
    },
  ];

  @selector
  messageText = [
    () => this.state.messageTexts,
    () => this.currentConversationId,
    (messageTexts, conversationId) => {
      const res = messageTexts.find(
        (msg) =>
          typeof msg === 'object' && msg.conversationId === conversationId,
      );
      return res ? res.text : '';
    },
  ];

  get status() {
    return this.state.status;
  }

  get searchInput() {
    return this.state.searchInput;
  }

  get typeFilter() {
    return this.state.typeFilter;
  }

  get currentPage() {
    return this.state.currentPage;
  }

  get oldConversations() {
    return this.state.oldConversations;
  }

  get fetchConversationsStatus() {
    return this.state.fetchConversationsStatus;
  }

  get currentConversationId() {
    return this.state.currentConversationId;
  }

  get fetchMessagesStatus() {
    return this.state.fetchMessagesStatus;
  }

  get oldMessages() {
    return this.state.oldMessages;
  }

  get loadingOldConversations() {
    return this.fetchConversationsStatus === status.fetching;
  }

  get loadingOldMessages() {
    return this.fetchMessagesStatus === status.fetching;
  }

  get pushing() {
    return this.state.conversationStatus === status.pushing;
  }

  get _hasPermission() {
    return this._appFeatures.hasReadMessagesPermission;
  }

  get correspondentMatch() {
    return this.state.correspondentMatch;
  }

  get correspondentResponse() {
    return this.state.correspondentResponse;
  }

  addEntities(entities) {
    this.store.dispatch({
      type: this.actionTypes.addEntities,
      entities,
    });
  }

  removeEntity(entity) {
    this.store.dispatch({
      type: this.actionTypes.removeEntity,
      entity,
    });
  }

  addResponses(responses) {
    this.store.dispatch({
      type: this.actionTypes.addResponses,
      responses,
    });
  }

  removeResponse(phoneNumber) {
    this.store.dispatch({
      type: this.actionTypes.removeResponse,
      phoneNumber,
    });
  }

  relateCorrespondentEntity(responses) {
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
        phoneNumber: item.phoneNumber,
        countryCode,
        areaCode,
      });
      return {
        phoneNumber: formatted,
        id: item.rawId,
      };
    });
    formattedCorrespondentMatch.forEach((item) => {
      const { phoneNumber } = item;
      const conversationId = this.correspondentResponse[phoneNumber];
      this._conversationLogger.logConversation({
        entity: item,
        conversationId,
      });
      this.removeEntity(item);
      this.removeResponse(phoneNumber);
    });
  }
}
