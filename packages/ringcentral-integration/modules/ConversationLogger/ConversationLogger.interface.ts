import { Entity } from '../../interfaces/Entity.interface';
import { Message } from '../../interfaces/MessageStore.model';
import { LogOptions as BaseLogOptions } from '../../lib/LoggerBase';
import { Correspondent } from '../../lib/messageHelper';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../Auth';
import { ContactMatcher } from '../ContactMatcher';
import { ConversationMatcher } from '../ConversationMatcher';
import { DateTimeFormat, FormatDateTimeOptions } from '../DateTimeFormat';
import { ExtensionInfo } from '../ExtensionInfo';
import { MessageStore } from '../MessageStore';
import { Storage } from '../Storage';
import { TabManager } from '../TabManager';

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
