export interface CallQueueMemberInfo {
  /**
   * Link to a call queue member
   */
  uri: string;
  /**
   * Internal identifier of a call queue member
   * Format: int64
   */
  id: number;
  /**
   * Extension number of a call queue member
   */
  extensionNumber: string;
}
