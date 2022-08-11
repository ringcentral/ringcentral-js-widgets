// Query parameters for operation deleteMessage
export interface DeleteMessageParameters {
  /**
   * If the value is 'True', then the message is purged immediately with all the attachments
   */
  purge: boolean;
  /**
   * Internal identifier of a message thread
   * Format: int64
   */
  conversationId: number;
}
