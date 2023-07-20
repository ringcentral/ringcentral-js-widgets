import type { QueueShortInfoResource } from './QueueShortInfoResource';

export interface UserCallQueues {
  /**
   * List of the queues where the extension is an agent
   */
  records: QueueShortInfoResource[];
}
