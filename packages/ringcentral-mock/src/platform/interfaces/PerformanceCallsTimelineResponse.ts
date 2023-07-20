import type { TimelineData } from './TimelineData';

export interface PerformanceCallsTimelineResponse {
  /**
   * A list of time-value points of call aggregations as per the grouping and filtering options specified in the request
   */
  data: TimelineData[];
}
