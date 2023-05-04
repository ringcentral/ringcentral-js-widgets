import { PerformanceCallsCountersResponseOptions } from './PerformanceCallsCountersResponseOptions';
import { PerformanceCallsTimersResponseOptions } from './PerformanceCallsTimersResponseOptions';

// Provides mapping of possible breakdown options for call aggregation time intervals
export interface PerformanceCallsResponseDataOptions {
  /**
   */
  counters: PerformanceCallsCountersResponseOptions;
  /**
   */
  timers: PerformanceCallsTimersResponseOptions;
}
