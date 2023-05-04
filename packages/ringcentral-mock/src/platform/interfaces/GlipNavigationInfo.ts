export interface GlipNavigationInfo {
  /**
   * Previous page token. To get previous page, user should pass one of returned token in next request and, in turn, required page will be returned with new tokens
   */
  prevPageToken: string;
  /**
   * Next page token. To get next page, user should pass one of returned token in next request and, in turn, required page will be returned with new tokens
   */
  nextPageToken: string;
}
