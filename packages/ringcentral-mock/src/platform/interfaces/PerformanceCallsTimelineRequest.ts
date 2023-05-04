import { TimelinePerformanceCallsGrouping } from './TimelinePerformanceCallsGrouping';
import { PerformanceCallsTimeSettings } from './PerformanceCallsTimeSettings';
import { PerformanceCallsFilters } from './PerformanceCallsFilters';
import { TimelineResponseDataOptions } from './TimelineResponseDataOptions';

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
