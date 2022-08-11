// Pagination details
export interface PagingResource {
  /**
   * Page token of the current response list
   * Example: pgt1
   */
  pageToken: string;
  /**
   * Number of records per page
   * Format: int32
   * Example: 3
   */
  perPage: number;
  /**
   * First page token of the current filter criteria
   * Example: fpgt1
   */
  firstPageToken: string;
  /**
   * Previous page token of the current filter criteria
   * Example: lpgt1
   */
  previousPageToken: string;
  /**
   * Next page token of the current filter criteria
   * Example: npgt1
   */
  nextPageToken: string;
}
