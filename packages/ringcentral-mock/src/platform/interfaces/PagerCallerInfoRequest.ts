// Sender of a pager message.
export interface PagerCallerInfoRequest {
  /**
   * Extension identifier
   * Example: 123456789
   */
  extensionId: string;
  /**
   * Extension number
   * Example: 105
   */
  extensionNumber: string;
}
