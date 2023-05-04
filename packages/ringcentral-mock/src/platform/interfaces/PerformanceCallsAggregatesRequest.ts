import { AggregatePerformanceCallsGrouping } from './AggregatePerformanceCallsGrouping';
import { PerformanceCallsTimeSettings } from './PerformanceCallsTimeSettings';
import { PerformanceCallsFilters } from './PerformanceCallsFilters';
import { PerformanceCallsResponseDataOptions } from './PerformanceCallsResponseDataOptions';

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
