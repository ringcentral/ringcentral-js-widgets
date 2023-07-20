import type { PerformanceCallsTimers } from './PerformanceCallsTimers';
import type { PerformanceCallsCounters } from './PerformanceCallsCounters';

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
