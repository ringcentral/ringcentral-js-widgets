import { Auth } from '../AuthV2';
import { Storage } from '../StorageV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { ConversationMatcher } from '../ConversationMatcherV2';
import { DateTimeFormat, FormatDateTimeOptions } from '../DateTimeFormatV2';
import { LogOptions as BaseLogOptions } from '../../lib/LoggerBaseV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { MessageStore } from '../MessageStoreV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import { TabManager } from '../TabManagerV2';
import { Message } from '../../interfaces/MessageStore.model';
import { Entity } from '../../interfaces/Entity.interface';
import { Correspondent } from '../../lib/messageHelper';

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
  rolesAndPermissions: RolesAndPermissions;
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
