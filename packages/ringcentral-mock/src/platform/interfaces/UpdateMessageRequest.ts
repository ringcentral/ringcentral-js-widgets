export interface UpdateMessageRequest {
  /**
   * Read status of a message to be changed. Multiple values are accepted
   */
  readStatus: 'Read' | 'Unread';
}
