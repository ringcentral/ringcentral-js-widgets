import type { Logger } from '@ringcentral/mfe-logger';

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
  /**
   * worker
   */
  worker?: SharedWorker;
}
