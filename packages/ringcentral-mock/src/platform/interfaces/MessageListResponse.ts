import { MessageListMessageResponse } from './MessageListMessageResponse';
import { PagingResource } from './PagingResource';

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
