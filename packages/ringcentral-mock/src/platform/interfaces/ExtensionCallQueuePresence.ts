import { PresenceCallQueueInfo } from './PresenceCallQueueInfo';

export interface ExtensionCallQueuePresence {
  /**
   */
  callQueue: PresenceCallQueueInfo;
  /**
   * Call queue agent availability for calls of this queue
   */
  acceptCalls: boolean;
}
