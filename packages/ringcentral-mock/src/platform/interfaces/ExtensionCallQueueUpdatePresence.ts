import { CallQueueId } from './CallQueueId';

export interface ExtensionCallQueueUpdatePresence {
  /**
   */
  callQueue: CallQueueId;
  /**
   * Call queue agent availability for calls of this queue
   */
  acceptCalls: boolean;
}
