import type { PerformanceCallsCounters } from './PerformanceCallsCounters';
import type { PerformanceCallsTimers } from './PerformanceCallsTimers';

export interface TimelineDataPoint {
  /**
   * Required
   * Format: date-time
   */
  time: string;
  /**
   */
  timers: PerformanceCallsTimers;
  /**
   */
  counters: PerformanceCallsCounters;
}
