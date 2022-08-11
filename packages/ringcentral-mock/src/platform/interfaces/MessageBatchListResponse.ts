import { MessageBatchInfo } from './MessageBatchInfo';
import { PagingResource } from './PagingResource';

export interface MessageBatchListResponse {
  /**
   */
  records: MessageBatchInfo[];
  /**
   */
  paging: PagingResource;
}
