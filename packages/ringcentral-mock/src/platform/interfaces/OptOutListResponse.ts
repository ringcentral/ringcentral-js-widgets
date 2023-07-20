import type { OptOutResponse } from './OptOutResponse';
import type { PagingResource } from './PagingResource';

// Opt-out phone numbers information
export interface OptOutListResponse {
  /**
   * List of individual opt-out number records
   */
  records: OptOutResponse[];
  /**
   */
  paging: PagingResource;
}
