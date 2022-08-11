// Query parameters for operation searchViaGet2
export interface SearchViaGet2Parameters {
  /**
   * only support 'userName' or 'email' filter expressions for now
   */
  filter: string;
  /**
   * start index (1-based)
   * Format: int32
   * Default: 1
   */
  startIndex: number;
  /**
   * page size
   * Format: int32
   * Default: 100
   */
  count: number;
}
