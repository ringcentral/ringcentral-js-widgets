import type { GetMessageInfoResponse } from './GetMessageInfoResponse';
import type { MessagingNavigationInfo } from './MessagingNavigationInfo';
import type { MessagingPagingInfo } from './MessagingPagingInfo';

export interface GetMessageList {
  /**
   * Link to the list of user messages
   */
  uri: string;
  /**
   * List of records with message information
   * Required
   */
  records: GetMessageInfoResponse[];
  /**
   * Required
   */
  navigation: MessagingNavigationInfo;
  /**
   * Required
   */
  paging: MessagingPagingInfo;
}
