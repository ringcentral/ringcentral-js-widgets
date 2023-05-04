// Query parameters for operation readGlipEvents
export interface ReadGlipEventsParameters {
  /**
   * Number of groups to be fetched by one request. The maximum value is 250, by default - 30.
   * Maximum: 250
   * Default: 30
   */
  recordCount: number;
  /**
   * Token of a page to be returned
   */
  pageToken: string;
}
