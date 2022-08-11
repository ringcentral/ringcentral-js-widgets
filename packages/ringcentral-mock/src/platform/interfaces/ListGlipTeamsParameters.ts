// Query parameters for operation listGlipTeams
export interface ListGlipTeamsParameters {
  /**
   * Number of teams to be fetched by one request. The maximum value is 250, by default - 30
   * Maximum: 250
   * Default: 30
   */
  recordCount: number;
  /**
   * Pagination token.
   */
  pageToken: string;
}
