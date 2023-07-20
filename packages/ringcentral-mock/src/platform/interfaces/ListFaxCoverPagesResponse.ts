import type { FaxCoverPageInfo } from './FaxCoverPageInfo';
import type { MessagingNavigationInfo } from './MessagingNavigationInfo';
import type { MessagingPagingInfo } from './MessagingPagingInfo';

export interface ListFaxCoverPagesResponse {
  /**
   */
  uri: string;
  /**
   */
  records: FaxCoverPageInfo[];
  /**
   */
  navigation: MessagingNavigationInfo;
  /**
   */
  paging: MessagingPagingInfo;
}
