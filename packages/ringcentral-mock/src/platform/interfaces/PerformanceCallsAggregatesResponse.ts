import type { PerformanceCallsData } from './PerformanceCallsData';
import type { ResponsePaging } from './ResponsePaging';

export interface PerformanceCallsAggregatesResponse {
  /**
   * Required
   */
  paging: ResponsePaging;
  /**
   * A list of call aggregations as per the grouping and filtering options specified in the request
   */
  data: PerformanceCallsData[];
}
