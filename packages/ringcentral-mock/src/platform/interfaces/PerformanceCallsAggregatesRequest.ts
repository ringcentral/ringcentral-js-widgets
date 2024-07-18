import type { AggregatePerformanceCallsGrouping } from './AggregatePerformanceCallsGrouping';
import type { PerformanceCallsFilters } from './PerformanceCallsFilters';
import type { PerformanceCallsResponseDataOptions } from './PerformanceCallsResponseDataOptions';
import type { PerformanceCallsTimeSettings } from './PerformanceCallsTimeSettings';

export interface PerformanceCallsAggregatesRequest {
  /**
   * Required
   */
  grouping: AggregatePerformanceCallsGrouping;
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
  responseOptions: PerformanceCallsResponseDataOptions;
}
