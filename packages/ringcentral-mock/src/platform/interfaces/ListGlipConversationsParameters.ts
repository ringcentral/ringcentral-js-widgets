// Query parameters for operation listGlipConversations
export interface ListGlipConversationsParameters {
  /**
   * Number of conversations to be fetched by one request. The maximum value is 250, by default - 30
   * Maximum: 250
   * Default: 30
   */
  recordCount: number;
  /**
   * Pagination token.
   */
  pageToken: string;
}
