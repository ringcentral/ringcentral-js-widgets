import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { LoggerBase } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  inject,
  injectable,
  optional,
  state,
  StoragePlugin,
  userStorage,
} from '@ringcentral-integration/next-core';

import type { ConversationLogItem } from '../ConversationLogger/ConversationLogger.interface';
import { MessageThread } from '../MessageThread';

import type {
  MessageThreadLoggerOptions,
  ThreadMessageLogMap,
} from './MessageThreadLogger.interface';

function formatThreadLogDate(creationTime: number): string {
  const d = new Date(creationTime);
  return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
}

function messageThreadLogIdentityFunction(item: {
  conversationLogId?: string;
  threadId?: string;
  id?: string;
}): string {
  return item.conversationLogId ?? item.threadId ?? item.id ?? '';
}

@injectable({
  name: 'MessageThreadLogger',
})
export class MessageThreadLogger extends LoggerBase {
  _logFunction = this._messageThreadLoggerOptions.logFunction;

  _readyCheckFunction = this._messageThreadLoggerOptions.readyCheckFunction;

  protected override _identityFunction = messageThreadLogIdentityFunction;

  constructor(
    protected _messageThread: MessageThread,
    @inject('MessageThreadLoggerOptions')
    protected _messageThreadLoggerOptions: MessageThreadLoggerOptions,
    protected _storage: StoragePlugin,
    @optional() protected _contactMatcher?: ContactMatcher,
  ) {
    super();
    this._storage.enable(this);
    this._contactMatcher?.addQuerySource({
      getQueriesFn: () => this.threadUniqueNumbers,
      readyCheckFn: () => this._readyCheckFunction(),
    });
  }

  @userStorage
  @state
  sharedSmsLogReminderDismissed = false;

  get shouldShowSharedSmsLogReminder(): boolean {
    return !this.sharedSmsLogReminderDismissed;
  }

  @action
  dismissSharedSmsLogReminder(): void {
    this.sharedSmsLogReminderDismissed = true;
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

  @computed
  get threadMessageLogMap(): ThreadMessageLogMap {
    const conversations =
      this._messageThread?.threadConversationsInfo?.conversations;
    if (!conversations?.length) {
      return {};
    }
    const map: ThreadMessageLogMap = {};
    for (const c of conversations) {
      if (!c.conversationLogId) continue;
      const threadId = c.conversationLogId;
      const creationTime = c.creationTime ?? 0;
      const item: ConversationLogItem = {
        conversationLogId: threadId,
        conversationId: c.conversationId ?? threadId,
        creationTime,
        date:
          (c as { date?: string }).date ?? formatThreadLogDate(creationTime),
        type: c.type ?? 'Text',
        messages: this.getThreadLogMessages(threadId),
        conversationLogMatches: [],
        self: c.self,
        correspondents: c.correspondents,
      };
      map[threadId] = item;
    }
    return map;
  }

  get threadLogIds(): string[] {
    return this._messageThread?.conversationLogIds ?? [];
  }

  get threadUniqueNumbers(): string[] {
    return this._messageThread?.uniqueNumbers ?? [];
  }

  getThreadLogMessages(threadId: string): Message[] {
    return this._messageThread?.getThreadLogMessages(threadId) ?? [];
  }

  getThreadConversation(threadId: string): ConversationLogItem | undefined {
    return this.threadMessageLogMap[threadId];
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
    const conversation = this.getThreadConversation(conversationId);
    if (!conversation) return;
    await this.log({
      item: conversation,
      correspondentEntity,
      redirect,
      ...options,
    });
  }
}
