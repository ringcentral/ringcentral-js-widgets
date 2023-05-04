// Query parameters for operation listChatNotes
export interface ListChatNotesParameters {
  /**
   * The end datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2019-03-10T18:23:45. The default value is Now.
   */
  creationTimeTo: string;
  /**
   * The start datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone
   */
  creationTimeFrom: string;
  /**
   * Internal identifier of the user that created the note. Multiple values are supported
   */
  creatorId: string;
  /**
   * Status of notes to be fetched; if not specified all notes are fetched by default.
   */
  status: 'Active' | 'Draft';
  /**
   * Pagination token
   */
  pageToken: string;
  /**
   * Max number of notes to be fetched by one request; the value range is 1-250.
   * Maximum: 250
   * Default: 30
   */
  recordCount: number;
}
