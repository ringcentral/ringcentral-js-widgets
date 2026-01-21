import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { Correspondent } from '@ringcentral-integration/commons/lib/messageHelper';
import type {
  FormatDateTimeOptions,
  LogOptions as BaseLogOptions,
} from '@ringcentral-integration/micro-core/src/app/services';

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
  getIsInLoggedStatus?: (conversationId: string) => boolean;
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
