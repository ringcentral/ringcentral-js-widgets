// Query parameters for operation listRecentChats
export interface ListRecentChatsParameters {
  /**
   * Type of chats to be fetched. By default all chat types are returned
   */
  type: ('Everyone' | 'Group' | 'Personal' | 'Direct' | 'Team')[];
  /**
   * Max number of chats to be fetched by one request (Not more than 250).
   * Maximum: 250
   * Default: 30
   */
  recordCount: number;
}
