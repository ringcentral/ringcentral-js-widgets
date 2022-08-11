// Call queue information
export interface PresenceCallQueueInfo {
  /**
   * Internal identifier of a call queue
   */
  id: string;
  /**
   * Name of a call queue
   */
  name: string;
  /**
   * Extension number of a call queue
   */
  extensionNumber: string;
  /**
   * Flag allow members to change their queue status
   */
  editableMemberStatus: boolean;
}
