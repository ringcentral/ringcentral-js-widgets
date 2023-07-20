import type { MessageListMessageResponse } from './MessageListMessageResponse';
import type { PagingResource } from './PagingResource';

// List of messages retrieved for an account and other filter criteria such as `batchId` and `fromPhoneNumber` specified in the request
export interface MessageListResponse {
  /**
   * An array containing individual messages
   */
  records: MessageListMessageResponse[];
  /**
   */
  paging: PagingResource;
}
