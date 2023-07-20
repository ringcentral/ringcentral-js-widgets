import type { AggregatePerformanceCallsGrouping } from './AggregatePerformanceCallsGrouping';
import type { PerformanceCallsTimeSettings } from './PerformanceCallsTimeSettings';
import type { PerformanceCallsFilters } from './PerformanceCallsFilters';
import type { PerformanceCallsResponseDataOptions } from './PerformanceCallsResponseDataOptions';

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
