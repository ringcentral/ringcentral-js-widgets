import type { PerformanceCallsFilters } from './PerformanceCallsFilters';
import type { PerformanceCallsTimeSettings } from './PerformanceCallsTimeSettings';
import type { TimelinePerformanceCallsGrouping } from './TimelinePerformanceCallsGrouping';
import type { TimelineResponseDataOptions } from './TimelineResponseDataOptions';

export interface PerformanceCallsTimelineRequest {
  /**
   * Required
   */
  grouping: TimelinePerformanceCallsGrouping;
  /**
   * Required
   */
  timeSettings: PerformanceCallsTimeSettings;
  /**
   */
  additionalFilters: PerformanceCallsFilters;
  /**
   * Required
   */
  responseOptions: TimelineResponseDataOptions;
}
