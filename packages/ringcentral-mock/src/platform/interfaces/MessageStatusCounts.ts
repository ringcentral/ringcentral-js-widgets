export interface MessageStatusCounts {
  /**
   * Format: int64
   */
  count: number;
  /**
   * Cost of a message
   * Format: double
   * Example: 0.007
   */
  cost: number;
  /**
   * Format: int64
   */
  errorCodeCounts: number;
}
