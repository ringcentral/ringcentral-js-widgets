import type { Logger } from '@ringcentral/mfe-logger';

import type { Storage } from '../Storage';

export interface BrowserLoggerOptions {
  /**
   * logger name
   */
  name?: string;
  /**
   * enabled logger initial
   */
  enabled?: boolean;
  /**
   * logger
   */
  logger?: Logger;
}

export interface Deps {
  storage: Storage;
  prefix?: string;
  browserLoggerOptions?: BrowserLoggerOptions;
}
