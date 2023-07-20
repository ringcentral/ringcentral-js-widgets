import type { PerformanceCallsCountersResponseOptions } from './PerformanceCallsCountersResponseOptions';
import type { PerformanceCallsTimersResponseOptions } from './PerformanceCallsTimersResponseOptions';

// Provides mapping of possible breakdown options for call aggregation time intervals
export interface PerformanceCallsResponseDataOptions {
  /**
   */
  counters: PerformanceCallsCountersResponseOptions;
  /**
   */
  timers: PerformanceCallsTimersResponseOptions;
}
