import type { LogOptions as BaseLogOptions } from '@ringcentral-integration/micro-core/src/app/services';

import type { ConversationLogItem } from '../ConversationLogger/ConversationLogger.interface';

export interface MessageThreadLoggerOptions {
  logFunction: <P, S>(options: BaseLogOptions<P, S>) => Promise<void>;
  readyCheckFunction: () => boolean;
}

export type ThreadLogItem = ConversationLogItem;

export type ThreadMessageLogMap = Record<string, ThreadLogItem>;
