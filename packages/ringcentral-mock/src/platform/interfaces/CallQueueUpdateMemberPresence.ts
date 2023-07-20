import type { CallQueueMemberId } from './CallQueueMemberId';

export interface CallQueueUpdateMemberPresence {
  /**
   */
  member: CallQueueMemberId;
  /**
   * Call queue member availability for calls of this queue
   */
  acceptCurrentQueueCalls: boolean;
}
