export interface ResponsePaging {
  /**
   * The current page number
   * Required
   * Format: int64
   */
  page: number;
  /**
   * How many items are displayed on the page
   * Required
   * Format: int64
   */
  perPage: number;
  /**
   * The total number of pages
   * Required
   * Format: int64
   */
  totalPages: number;
  /**
   * The total number of items in the dataset
   * Required
   * Format: int64
   */
  totalElements: number;
}
