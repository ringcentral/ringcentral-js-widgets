import { Entity } from '../../interfaces/Entity.interface';
import { Message } from '../../interfaces/MessageStore.model';
import { LogOptions as BaseLogOptions } from '../../lib/LoggerBaseV2';
import { Correspondent } from '../../lib/messageHelper';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../AuthV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { ConversationMatcher } from '../ConversationMatcherV2';
import { DateTimeFormat, FormatDateTimeOptions } from '../DateTimeFormatV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { MessageStore } from '../MessageStoreV2';
import { Storage } from '../StorageV2';
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
