import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { Correspondent } from '@ringcentral-integration/commons/lib/messageHelper';
import {
  getNumbersFromMessage,
  sortByDate,
} from '@ringcentral-integration/commons/lib/messageHelper';
import {
  AppFeatures,
  Auth,
  ExtensionInfo,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  DateTimeFormat,
  LoggerBase,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  inject,
  injectable,
  optional,
  RouterPlugin,
  state,
  storage,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';

import { ConversationMatcher } from '../ConversationMatcher';
import { MessageStore } from '../MessageStore';

import type {
  ConversationLoggerOptions,
  ConversationLogItem,
  ConversationLogMap,
} from './ConversationLogger.interface';
import {
  conversationLogIdentityFunction,
  getLogId,
} from './conversationLoggerHelper';

@injectable({
  name: 'ConversationLogger',
})
export class ConversationLogger extends LoggerBase {
  _logFunction = this._conversationLoggerOptions.logFunction;

  _readyCheckFunction = this._conversationLoggerOptions.readyCheckFunction;

  protected _isLoggedContact =
    this._conversationLoggerOptions.isLoggedContact ?? (() => false);

  protected _formatDateTime =
    this._conversationLoggerOptions.formatDateTime ??
    ((...args) => this._dateTimeFormat.formatDateTime(...args));

  protected _isAutoUpdate =
    this._conversationLoggerOptions.isAutoUpdate ?? true;

  protected _accordWithLogRequirement =
    this._conversationLoggerOptions.accordWithLogRequirement;

  getIsInLoggedStatus =
    this._conversationLoggerOptions.getIsInLoggedStatus ?? (() => false);

  serverAutoLog = false;

  protected override _identityFunction = conversationLogIdentityFunction;

  protected _autoLogQueue: ConversationLogItem[] = [];

  protected _autoLogPromise: Promise<void> | null = null;

  protected _lastProcessedConversations: ConversationLogMap | null = null;

  protected _lastAutoLog: boolean | null = null;

  constructor(
    protected _auth: Auth,
    protected _storage: StoragePlugin,
    protected _contactMatcher: ContactMatcher,
    protected _conversationMatcher: ConversationMatcher,
    protected _dateTimeFormat: DateTimeFormat,
    protected _extensionInfo: ExtensionInfo,
    protected _messageStore: MessageStore,
    protected _appFeatures: AppFeatures,
    protected _router: RouterPlugin,
    @inject('ConversationLoggerOptions')
    protected _conversationLoggerOptions: ConversationLoggerOptions,
    @optional('TabManager') protected _tabManager?: any,
  ) {
    super();
    this._storage.enable(this);

    this._messageStore.onMessageUpdated((record) => {
      this._processConversationLogMap(record);
    });
    this._contactMatcher.addQuerySource({
      getQueriesFn: () => this.uniqueNumbers,
      readyCheckFn: () => this._messageStore.ready && this._extensionInfo.ready,
    });
    this._conversationMatcher.addQuerySource({
      getQueriesFn: () => this.conversationLogIds,
      readyCheckFn: () => this._messageStore.ready && this._extensionInfo.ready,
    });
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._readyCheckFunction());
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._readyCheckFunction())
    );
  }

  get autoLog() {
    return this._autoLog;
  }

  @storage
  @state
  protected _autoLog = false;

  @action
  protected _setAutoLog(autoLog: boolean) {
    this._autoLog = autoLog;
  }

  override onReset() {
    this._lastProcessedConversations = null;
    this._lastAutoLog = null;
    this._autoLogPromise = null;
    this._autoLogQueue = [];
  }

  async _processQueue() {
    const { ownerId } = this._auth;
    await sleep(300);
    if (ownerId !== this._auth.ownerId) return;
    await Promise.all(
      this._autoLogQueue
        .splice(0, 10)
        .map((conversation) => this._processConversationLog({ conversation })),
    );
    if (ownerId === this._auth.ownerId && this._autoLogQueue.length > 0) {
      this._autoLogPromise = this._processQueue();
    } else {
      this._autoLogPromise = null;
    }
  }

  _queueAutoLogConversation({
    conversation,
  }: {
    conversation: ConversationLogItem;
  }) {
    this._autoLogQueue.push(conversation);
    if (!this._autoLogPromise) {
      this._autoLogPromise = this._processQueue();
    }
  }

  _getCorrespondentMatches(conversation: ConversationLogItem) {
    return (
      (conversation.correspondents &&
        conversation.correspondents.reduce((result, contact) => {
          const number = contact.phoneNumber || contact.extensionNumber;
          return number && this._contactMatcher.dataMapping[number]
            ? result.concat(this._contactMatcher.dataMapping[number])
            : result;
        }, [] as Entity[])) ||
      []
    );
  }

  getLastMatchedCorrespondentEntity(conversation: ConversationLogItem) {
    const conversationLog =
      this.conversationLogMap[conversation.conversationId];
    if (!conversationLog) {
      return null;
    }
    const lastRecord = Object.keys(conversationLog)
      .map((date) => this.conversationLogMap[conversation.conversationId][date])
      .sort(sortByDate)
      .find((item) => item.conversationLogMatches.length > 0);
    if (
      lastRecord &&
      this._conversationMatcher.dataMapping[lastRecord.conversationLogId] &&
      this._conversationMatcher.dataMapping[lastRecord.conversationLogId].length
    ) {
      const lastActivity =
        this._conversationMatcher.dataMapping[lastRecord.conversationLogId][0];
      const correspondentMatches = this._getCorrespondentMatches(lastRecord);
      return correspondentMatches.find((item) =>
        this._isLoggedContact(conversation, lastActivity, item),
      );
    }
    return null;
  }

  /**
   * Define update or log new sms
   */
  async _processConversationLog({
    conversation,
  }: {
    conversation: ConversationLogItem;
  }) {
    // await this._conversationMatcher.triggerMatch();
    await this._conversationMatcher.match({
      queries: [conversation.conversationLogId],
    });
    if (
      this._isAutoUpdate &&
      this._conversationMatcher.dataMapping[conversation.conversationLogId] &&
      this._conversationMatcher.dataMapping[conversation.conversationLogId]
        .length
    ) {
      // update conversation
      await this._autoLogConversation({
        conversation,
      });
    } else if (this.autoLog && conversation.type === messageTypes.sms) {
      // new entry
      const numbers: string[] = [];
      const numberMap: Record<string, boolean> = {};
      /* eslint { "no-inner-declarations": 0 } */
      function addIfNotExist(contact: Correspondent) {
        const number = contact.phoneNumber || contact.extensionNumber;
        if (number && !numberMap[number]) {
          numbers.push(number);
          numberMap[number] = true;
        }
      }

      const self = conversation.self;
      if (self) addIfNotExist(self);

      conversation.correspondents!.forEach(addIfNotExist);
      await this._contactMatcher.match({ queries: numbers });
      const selfNumber =
        conversation.self &&
        (conversation.self.phoneNumber || conversation.self.extensionNumber);
      const selfMatches =
        (selfNumber && this._contactMatcher.dataMapping[selfNumber]) || [];
      const correspondentMatches = this._getCorrespondentMatches(conversation);

      const selfEntity =
        (selfMatches && selfMatches.length === 1 && selfMatches[0]) || null;

      let correspondentEntity =
        this.getLastMatchedCorrespondentEntity(conversation);

      correspondentEntity =
        correspondentEntity ||
        (correspondentMatches &&
          correspondentMatches.length === 1 &&
          correspondentMatches[0]) ||
        null;
      await this._autoLogConversation({
        conversation,
        selfEntity,
        correspondentEntity,
      });
    }
  }

  accordWithProcessLogRequirement(conversationLogItem: ConversationLogItem) {
    return !!this._accordWithLogRequirement?.(conversationLogItem);
  }

  /**
   * Auto log new message
   */
  _processConversationLogMap(
    /** use for outside extend module */
    record: Message,
  ) {
    if (this.ready && this._lastAutoLog !== this.autoLog) {
      this._lastAutoLog = this.autoLog;
      if (this.autoLog) {
        // force conversation log checking when switch auto log to on
        this._lastProcessedConversations = null;
      }
    }
    if (
      this.ready &&
      this._lastProcessedConversations !== this.conversationLogMap
    ) {
      this._conversationMatcher.triggerMatch();
      this._contactMatcher.triggerMatch();
      const oldMap = this._lastProcessedConversations || {};
      this._lastProcessedConversations = this.conversationLogMap;
      if (!this._tabManager || this._tabManager.active) {
        Object.keys(this._lastProcessedConversations).forEach(
          (conversationId) => {
            Object.keys(
              this._lastProcessedConversations![conversationId],
            ).forEach((date) => {
              const conversation =
                this._lastProcessedConversations![conversationId][date];
              if (
                !oldMap[conversationId] ||
                !oldMap[conversationId][date] ||
                conversation.messages[0].id !==
                  oldMap[conversationId][date].messages[0].id
              ) {
                if (this.accordWithProcessLogRequirement(conversation)) {
                  this._queueAutoLogConversation({
                    conversation,
                  });
                }
              }
            });
          },
        );
      }
    }
  }

  async _autoLogConversation({
    conversation,
    selfEntity,
    correspondentEntity,
  }: {
    conversation: ConversationLogItem;
    selfEntity?: Entity | null;
    correspondentEntity?: Entity | null;
  }) {
    await this.log({
      conversation,
      selfEntity,
      correspondentEntity,
    });
  }

  @delegate('server')
  override async log<T>({
    conversation,
    ...options
  }: {
    conversation: ConversationLogItem;
  } & T) {
    super.log({ item: conversation, ...options });
  }

  @delegate('server')
  async logConversation<T>({
    conversationId,
    correspondentEntity,
    redirect,
    ...options
  }: {
    conversationId: string;
    correspondentEntity: Entity;
    redirect: boolean;
  } & T) {
    if (this.conversationLogMap[conversationId]) {
      await Promise.all(
        Object.keys(this.conversationLogMap[conversationId])
          .map((date) => this.conversationLogMap[conversationId][date])
          .sort(sortByDate)
          .map((conversation, idx) => {
            const queueIndex = this._autoLogQueue.findIndex(
              (item) =>
                item.conversationLogId === conversation.conversationLogId,
            );
            if (queueIndex > -1) {
              this._autoLogQueue.splice(queueIndex, 1);
            }
            return this.log({
              ...options,
              conversation,
              correspondentEntity,
              redirect: redirect && idx === 0, // only direct on the first item
            });
          }),
      );
    }
  }

  get available() {
    return this._appFeatures.hasReadTextPermission;
  }

  @delegate('server')
  async setAutoLog(autoLog: boolean) {
    if (this.ready && autoLog !== this.autoLog) {
      this._setAutoLog(autoLog);
    }
  }

  @computed((that: ConversationLogger) => [
    that._messageStore.conversationStore,
    that._extensionInfo.extensionNumber,
    that._conversationMatcher.dataMapping,
  ])
  get conversationLogMap() {
    const { conversationStore } = this._messageStore;
    const extensionNumber = this._extensionInfo.extensionNumber!;
    const conversationLogMapping = this._conversationMatcher.dataMapping ?? {};
    const messages = Object.values(conversationStore).reduce(
      (allMessages, messages) => [...allMessages, ...messages],
      [],
    );
    const mapping: ConversationLogMap = {};
    messages
      .slice()
      .sort(sortByDate as any)
      .forEach((message) => {
        const conversationId = message.conversationId!;
        const date = this._formatDateTime({
          type: 'date',
          utcTimestamp: message.creationTime,
        })!;

        if (!mapping[conversationId]) {
          mapping[conversationId] = {};
        }

        if (!mapping[conversationId][date]) {
          const conversationLogId = this.getConversationLogId(message)!;

          mapping[conversationId][date] = {
            conversationLogId,
            conversationId,
            creationTime: message.creationTime!, // for sorting
            date,
            type: message.type,
            messages: [],
            conversationLogMatches:
              conversationLogMapping[conversationLogId] || [],
            // The reason for passing extensionNumber here is to filter the correspondence in the group conversation(type paper, and Only it has extensionNumber) that contains its own information.
            ...getNumbersFromMessage({ extensionNumber, message }),
          };
        }

        mapping[conversationId][date].messages.push(message);
      });
    return mapping;
  }

  @computed((that: ConversationLogger) => [that.conversationLogMap])
  get conversationLogIds() {
    const logIds: string[] = [];
    Object.keys(this.conversationLogMap).forEach((conversationId) => {
      Object.keys(this.conversationLogMap[conversationId]).forEach((date) => {
        logIds.push(
          this.conversationLogMap[conversationId][date].conversationLogId,
        );
      });
    });
    return logIds;
  }

  @computed((that: ConversationLogger) => [that.conversationLogMap])
  get uniqueNumbers() {
    const output: string[] = [];
    const numberMap: Record<string, boolean> = {};
    function addIfNotExist(contact: Correspondent) {
      const number = contact.phoneNumber || contact.extensionNumber;
      if (number && !numberMap[number]) {
        output.push(number);
        numberMap[number] = true;
      }
    }
    Object.keys(this.conversationLogMap).forEach((conversationId) => {
      Object.keys(this.conversationLogMap[conversationId]).forEach((date) => {
        const conversation = this.conversationLogMap[conversationId][date];

        const self = conversation.self;
        if (self) addIfNotExist(self);

        conversation.correspondents!.forEach(addIfNotExist);
      });
    });
    return output;
  }

  getConversationLogId(message: Message) {
    if (!message) {
      return;
    }
    const conversationId = message.conversationId!;
    const date = this._formatDateTime({
      type: 'date',
      utcTimestamp: message.creationTime,
    })!;

    return getLogId({
      conversationId,
      date,
    });
  }

  get dataMapping() {
    return this._conversationMatcher.dataMapping;
  }

  @track((that: ConversationLogger) => {
    if (that._router.currentPath === '/messages')
      return [trackEvents.logSMSFromHistoryPage];
    return [trackEvents.logSMSFromConversationPage];
  })
  async trackClickLogButton() {}

  @track(trackEvents.smsSaveLogManually)
  async trackSMSSaveLogManually() {}

  @track(trackEvents.smsSaveLogAutomatically)
  async trackSMSSaveLogAutomatically() {}
}
