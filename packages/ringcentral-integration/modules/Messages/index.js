import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import moduleStatuses from '../../enums/moduleStatuses';
import ensureExist from '../../lib/ensureExist';
import actionTypes from './actionTypes';
import getMessagesReducer from './getMessagesReducer';
import {
  getNumbersFromMessage,
  sortSearchResults,
  messageIsTextMessage,
  messageIsVoicemail,
  getVoicemailAttachment,
  getFaxAttachment,
  messageIsFax,
} from '../../lib/messageHelper';
import cleanNumber from '../../lib/cleanNumber';
import proxify from '../../lib/proxy/proxify';
import messageTypes from '../../enums/messageTypes';

/**
 * @class
 * @description Conversation list managing module
 */
@Module({
  deps: [
    'MessageStore',
    'ExtensionInfo',
    'Auth',
    'RolesAndPermissions',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ConversationLogger', optional: true },
    { dep: 'MessagesOptions', optional: true },
    { dep: 'TabManager', optional: true},
  ]
})
export default class Messages extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {ConversationLogger} params.conversationLogger - conversationLogger module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Number} params.defaultPerPage - default numbers of perPage, default 20
   */
  constructor({
    auth,
    messageStore,
    extensionInfo,
    defaultPerPage = 20,
    contactMatcher,
    conversationLogger,
    rolesAndPermissions,
    tabManager,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._contactMatcher = contactMatcher;
    this._conversationLogger = conversationLogger;
    this._tabManager = tabManager;
    this._auth = this::ensureExist(auth, 'auth');
    this._messageStore = this::ensureExist(messageStore, 'messageStore');
    this._extensionInfo = this::ensureExist(extensionInfo, 'extensionInfo');
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._reducer = getMessagesReducer(this.actionTypes, defaultPerPage);

    this.addSelector('uniqueNumbers',
      () => this._messageStore.conversations,
      (messages) => {
        const output = [];
        const numberMap = {};
        function addIfNotExist(number) {
          if (!numberMap[number]) {
            output.push(number);
            numberMap[number] = true;
          }
        }
        messages.forEach((message) => {
          if (message.from && message.from.phoneNumber) {
            addIfNotExist(message.from.phoneNumber);
          } else if (message.from && message.from.extensionNumber) {
            addIfNotExist(message.from.extensionNumber);
          }
          if (message.to && message.to.length > 0) {
            message.to.forEach((toUser) => {
              if (toUser && toUser.phoneNumber) {
                addIfNotExist(toUser.phoneNumber);
              } else if (toUser && toUser.extensionNumber) {
                addIfNotExist(toUser.extensionNumber);
              }
            });
          }
        });
        return output;
      },
    );
    this.addSelector('effectiveSearchString',
      () => this.state.searchInput,
      (input) => {
        if (input.length >= 3) return input;
        return '';
      }
    );

    this.addSelector('allConversations',
      () => this._messageStore.conversations,
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
      ) => (
        conversations.map((message) => {
          const {
            self,
            correspondents,
          } = getNumbersFromMessage({ extensionNumber, message });
          const selfNumber = self && (self.phoneNumber || self.extensionNumber);
          const selfMatches = (selfNumber && contactMapping[selfNumber]) || [];
          const correspondentMatches = correspondents.reduce((matches, contact) => {
            const number = contact && (contact.phoneNumber || contact.extensionNumber);
            return number && contactMapping[number] && contactMapping[number].length ?
              matches.concat(contactMapping[number]) :
              matches;
          }, []);
          const conversationLogId = this._conversationLogger ?
            this._conversationLogger.getConversationLogId(message) :
            null;
          const isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
          const conversationMatches = conversationLogMapping[conversationLogId] || [];
          let voicemailAttachment = null;
          if (messageIsVoicemail(message)) {
            voicemailAttachment = getVoicemailAttachment(message, accessToken);
          }
          let faxAttachment = null;
          if (messageIsFax(message)) {
            faxAttachment = getFaxAttachment(message, accessToken);
          }
          return {
            ...message,
            self,
            selfMatches,
            correspondents,
            correspondentMatches,
            conversationLogId,
            isLogging,
            conversationMatches,
            voicemailAttachment,
            faxAttachment,
            lastMatchedCorrespondentEntity: (
              this._conversationLogger &&
                this._conversationLogger.getLastMatchedCorrespondentEntity(message)
            ) || null,
          };
        })
      ),
    );

    this.addSelector('typeFilteredConversations',
      () => this.allConversations,
      () => this.typeFilter,
      (allConversations, typeFilter) => {
        switch (typeFilter) {
          case messageTypes.all: {
            return allConversations.filter(
              conversation => (
                (
                  this._rolesAndPermissions.readTextPermissions ||
                  !messageIsTextMessage(conversation)
                )
                &&
                (
                  this._rolesAndPermissions.voicemailPermissions ||
                  !messageIsVoicemail(conversation)
                )
                &&
                (
                  this._rolesAndPermissions.readFaxPermissions ||
                  !messageIsFax(conversation)
                )
              )
            );
          }
          case messageTypes.text:
            return allConversations.filter(
              conversation => messageIsTextMessage(conversation)
            );
          case messageTypes.voiceMail:
            return allConversations.filter(
              conversation => messageIsVoicemail(conversation)
            );
          case messageTypes.fax:
            return allConversations.filter(
              conversation => messageIsFax(conversation)
            );
          default:
            return allConversations;
        }
      }
    );

    this.addSelector('filteredConversations',
      this._selectors.typeFilteredConversations,
      () => this._selectors.effectiveSearchString(),
      (allConversations, effectiveSearchString) => {
        if (effectiveSearchString !== '') {
          const searchResults = [];
          const cleanRegex = /[^\d*+#\s]/g;
          const searchString = effectiveSearchString.toLowerCase();
          const searchNumber = effectiveSearchString.replace(cleanRegex, '');
          allConversations.forEach((message) => {
            if (searchNumber === effectiveSearchString) {
              const cleanedNumber = cleanNumber(effectiveSearchString);
              if (
                message.correspondents.find(
                  contact => (
                    cleanNumber(contact.phoneNumber || contact.extensionNumber || '')
                      .indexOf(cleanedNumber) > -1
                  )
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
                message.correspondentMatches.find(entity => (
                  (entity.name || '').toLowerCase().indexOf(searchString) > -1
                ))
              ) {
                // match by entity's name
                searchResults.push({
                  ...message,
                  matchOrder: 0,
                });
                return;
              }
            } else if (message.correspondents.find(contact => (
              (contact.name || '').toLowerCase().indexOf(searchString) > -1
            ))) {
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
            const matchedMessage = this._messageStore.messages.find(item => (
              item.conversationId === message.conversationId &&
              (item.subject || '').toLowerCase().indexOf(searchString) > -1
            ));
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
        return allConversations.sort(sortSearchResults);
      },
    );

    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: this._selectors.uniqueNumbers,
        readyCheckFn: () => (
          this._messageStore.ready &&
          (!this._tabManager || this._tabManager.ready)
        ),
      });
    }

    this._lastProcessedNumbers = null;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this._init();
    } else if (this._shouldReset()) {
      this._reset();
    } else if (this._lastProcessedNumbers !== this.uniqueNumbers) {
      this._lastProcessedNumbers = this.uniqueNumbers;
      if (
        this._contactMatcher &&
        (!this._tabManager || this._tabManager.active)
      ) {
        this._contactMatcher.triggerMatch();
      }
    }
  }

  _shouldInit() {
    return !!(
      this._auth.loggedIn &&
      this._messageStore.ready &&
      this._extensionInfo.ready &&
      this._rolesAndPermissions.ready &&
      (!this._contactMatcher || this._contactMatcher.ready) &&
      (!this._conversationLogger || this._conversationLogger.ready) &&
      this.pending
    );
  }
  _init() {
    this.store.dispatch({
      type: this.actionTypes.init,
    });
    if (
      this._contactMatcher &&
      (!this._tabManager || this._tabManager.active)
    ) {
      this._contactMatcher.triggerMatch();
    }
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  _shouldReset() {
    return !!(
      (
        !this._auth.loggedIn ||
        !this._messageStore.ready ||
        !this._extensionInfo.ready ||
        !this._rolesAndPermissions ||
        (this._contactMatcher && !this._contactMatcher.ready) ||
        (this._conversationLogger && !this._conversationLogger.ready)
      ) &&
      this.ready
    );
  }
  _reset() {
    this.store.dispatch({
      type: this.actionTypes.reset,
    });
    this._lastProcessedNumbers = null;
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async _getCurrentPageMessages(page) {
    this.store.dispatch({
      type: this.actionTypes.setPage,
      page,
    });
  }

  @proxify
  async loadNextPageMessages() {
    this.store.dispatch({
      type: this.actionTypes.nextPage,
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
    this.store.dispatch({
      type: this.actionTypes.updateTypeFilter,
      typeFilter: type,
    });
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.status === moduleStatuses.pending;
  }

  get searchInput() {
    return this.state.searchInput;
  }

  get typeFilter() {
    return this.state.typeFilter;
  }

  get allConversations() {
    return this._selectors.allConversations();
  }

  get filteredConversations() {
    return this._selectors.filteredConversations();
  }

  get uniqueNumbers() {
    return this._selectors.uniqueNumbers();
  }
}
