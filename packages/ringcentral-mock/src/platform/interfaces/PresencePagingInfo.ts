// Information on paging
export interface PresencePagingInfo {
  /**
   * The current page number. 1-indexed, so the first page is 1 by default. May be omitted if result is empty (because non-existent page was specified or perPage=0 was requested)
   */
  page: number;
  /**
   * Current page size, describes how many items are in each page. Default value is 100. Maximum value is 1000. If perPage value in the request is greater than 1000, the maximum value (1000) is applied
   */
  perPage: number;
  /**
   * The zero-based number of the first element on the current page. Omitted if the page is omitted or result is empty
   */
  pageStart: number;
  /**
   * The zero-based index of the last element on the current page. Omitted if the page is omitted or result is empty
   */
  pageEnd: number;
  /**
   * The total number of pages in a dataset. May be omitted for some resources due to performance reasons
   */
  totalPages: number;
  /**
   * The total number of elements in a dataset. May be omitted for some resource due to performance reasons
   */
  totalElements: number;
}
