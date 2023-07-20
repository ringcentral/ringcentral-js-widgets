import {
  action,
  computed,
  state,
  storage,
} from '@ringcentral-integration/core';
import { sleep } from '@ringcentral-integration/utils';

import { messageTypes } from '../../enums/messageTypes';
import type { Entity } from '../../interfaces/Entity.interface';
import type { Message } from '../../interfaces/MessageStore.model';
import { Module } from '../../lib/di';
import { LoggerBase } from '../../lib/LoggerBase';
import type { Correspondent } from '../../lib/messageHelper';
import { getNumbersFromMessage, sortByDate } from '../../lib/messageHelper';
import { proxify } from '../../lib/proxy/proxify';
import type {
  ConversationLogItem,
  ConversationLogMap,
  Deps,
} from './ConversationLogger.interface';
import {
  conversationLogIdentityFunction,
  getLogId,
} from './conversationLoggerHelper';

@Module({
  name: 'ConversationLogger',
  deps: [
    'Auth',
    'Storage',
    'ContactMatcher',
    'ConversationMatcher',
    'DateTimeFormat',
    'ExtensionInfo',
    'MessageStore',
    'AppFeatures',
    'ConversationLoggerOptions',
    { dep: 'TabManager', optional: true },
  ],
})
export class ConversationLogger<T extends Deps = Deps> extends LoggerBase<T> {
  _logFunction = this._deps.conversationLoggerOptions.logFunction;

  _readyCheckFunction = this._deps.conversationLoggerOptions.readyCheckFunction;

  protected _isLoggedContact =
    this._deps.conversationLoggerOptions.isLoggedContact ?? (() => false);

  protected _formatDateTime =
    this._deps.conversationLoggerOptions.formatDateTime ??
    ((...args) => this._deps.dateTimeFormat.formatDateTime(...args));

  protected _isAutoUpdate =
    this._deps.conversationLoggerOptions.isAutoUpdate ?? true;

  protected _accordWithLogRequirement =
    this._deps.conversationLoggerOptions.accordWithLogRequirement;

  protected override _identityFunction = conversationLogIdentityFunction;

  protected _autoLogQueue: ConversationLogItem[] = [];

  protected _autoLogPromise: Promise<void> | null = null;

  protected _lastProcessedConversations: ConversationLogMap | null = null;

  protected _lastAutoLog: boolean | null = null;

  constructor(deps: T) {
    super(deps, {
      enableCache: true,
      storageKey: 'ConversationLogger',
    });
    this._deps.messageStore.onMessageUpdated((record) => {
      this._processConversationLogMap(record);
    });
    this._deps.contactMatcher.addQuerySource({
      getQueriesFn: () => this.uniqueNumbers,
      readyCheckFn: () =>
        this._deps.messageStore.ready && this._deps.extensionInfo.ready,
    });
    this._deps.conversationMatcher.addQuerySource({
      getQueriesFn: () => this.conversationLogIds,
      readyCheckFn: () =>
        this._deps.messageStore.ready && this._deps.extensionInfo.ready,
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
    const { ownerId } = this._deps.auth;
    await sleep(300);
    if (ownerId !== this._deps.auth.ownerId) return;
    await Promise.all(
      this._autoLogQueue
        .splice(0, 10)
        .map((conversation) => this._processConversationLog({ conversation })),
    );
    if (ownerId === this._deps.auth.ownerId && this._autoLogQueue.length > 0) {
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
          return number && this._deps.contactMatcher.dataMapping[number]
            ? result.concat(this._deps.contactMatcher.dataMapping[number])
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
      this._deps.conversationMatcher.dataMapping[
        lastRecord.conversationLogId
      ] &&
      this._deps.conversationMatcher.dataMapping[lastRecord.conversationLogId]
        .length
    ) {
      const lastActivity =
        this._deps.conversationMatcher.dataMapping[
          lastRecord.conversationLogId
        ][0];
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
    // await this._deps.conversationMatcher.triggerMatch();
    await this._deps.conversationMatcher.match({
      queries: [conversation.conversationLogId],
    });
    if (
      this._isAutoUpdate &&
      this._deps.conversationMatcher.dataMapping[
        conversation.conversationLogId
      ] &&
      this._deps.conversationMatcher.dataMapping[conversation.conversationLogId]
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
      addIfNotExist(conversation.self!);
      conversation.correspondents!.forEach(addIfNotExist);
      await this._deps.contactMatcher.match({ queries: numbers });
      const selfNumber =
        conversation.self &&
        (conversation.self.phoneNumber || conversation.self.extensionNumber);
      const selfMatches =
        (selfNumber && this._deps.contactMatcher.dataMapping[selfNumber]) || [];
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
      this._deps.conversationMatcher.triggerMatch();
      this._deps.contactMatcher.triggerMatch();
      const oldMap = this._lastProcessedConversations || {};
      this._lastProcessedConversations = this.conversationLogMap;
      if (!this._deps.tabManager || this._deps.tabManager.active) {
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

  @proxify
  override async log<T>({
    conversation,
    ...options
  }: {
    conversation: ConversationLogItem;
  } & T) {
    super.log({ item: conversation, ...options });
  }

  @proxify
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
    return this._deps.appFeatures.hasReadTextPermission;
  }

  @proxify
  async setAutoLog(autoLog: boolean) {
    if (this.ready && autoLog !== this.autoLog) {
      this._setAutoLog(autoLog);
    }
  }

  @computed((that: ConversationLogger) => [
    that._deps.messageStore.conversationStore,
    that._deps.extensionInfo.extensionNumber,
    that._deps.conversationMatcher.dataMapping,
  ])
  get conversationLogMap() {
    const { conversationStore } = this._deps.messageStore;
    const extensionNumber = this._deps.extensionInfo.extensionNumber!;
    const conversationLogMapping =
      this._deps.conversationMatcher.dataMapping ?? {};
    const messages = Object.values(conversationStore).reduce(
      (allMessages, messages) => [...allMessages, ...messages],
      [],
    );
    const mapping: ConversationLogMap = {};
    messages
      .slice()
      .sort(sortByDate)
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
    function addIfNotExist(contact: Correspondent = {}) {
      const number = contact.phoneNumber || contact.extensionNumber;
      if (number && !numberMap[number]) {
        output.push(number);
        numberMap[number] = true;
      }
    }
    Object.keys(this.conversationLogMap).forEach((conversationId) => {
      Object.keys(this.conversationLogMap[conversationId]).forEach((date) => {
        const conversation = this.conversationLogMap[conversationId][date];
        addIfNotExist(conversation.self);
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
    return this._deps.conversationMatcher.dataMapping;
  }
}
