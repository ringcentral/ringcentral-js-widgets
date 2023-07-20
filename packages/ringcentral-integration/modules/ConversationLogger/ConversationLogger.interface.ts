import type { Entity } from '../../interfaces/Entity.interface';
import type { Message } from '../../interfaces/MessageStore.model';
import type { LogOptions as BaseLogOptions } from '../../lib/LoggerBase';
import type { Correspondent } from '../../lib/messageHelper';
import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { ContactMatcher } from '../ContactMatcher';
import type { ConversationMatcher } from '../ConversationMatcher';
import type { DateTimeFormat, FormatDateTimeOptions } from '../DateTimeFormat';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { MessageStore } from '../MessageStore';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';

export interface ConversationLoggerOptions {
  isLoggedContact?: (
    conversation: ConversationLogItem,
    lastActivity: Entity,
    item: Entity,
  ) => boolean;
  isAutoUpdate?: boolean;
  formatDateTime?: (options: Partial<FormatDateTimeOptions>) => string;
  accordWithLogRequirement: (conversation: ConversationLogItem) => boolean;
  logFunction: <P, S>(options: BaseLogOptions<P, S>) => Promise<void>;
  readyCheckFunction: () => boolean;
}

export interface Deps {
  auth: Auth;
  storage: Storage;
  contactMatcher: ContactMatcher;
  conversationMatcher: ConversationMatcher;
  dateTimeFormat: DateTimeFormat;
  extensionInfo: ExtensionInfo;
  messageStore: MessageStore;
  appFeatures: AppFeatures;
  tabManager?: TabManager;
  conversationLoggerOptions: ConversationLoggerOptions;
}

export interface ConversationLogItem {
  conversationLogId: string;
  conversationId: string;
  creationTime: number;
  date: string;
  type: Message['type'];
  messages: Message[];
  conversationLogMatches: Entity[];
  self?: Correspondent;
  // self?: {
  //   extensionNumber?: string;
  // };
  correspondents?: Correspondent[];
}

export type ConversationLogMap = Record<
  string,
  Record<string, ConversationLogItem>
>;
