import type { MessageBatchInfo } from './MessageBatchInfo';
import type { PagingResource } from './PagingResource';

export interface MessageBatchListResponse {
  /**
   */
  records: MessageBatchInfo[];
  /**
   */
  paging: PagingResource;
}
