import { PerformanceCallsTimers } from './PerformanceCallsTimers';
import { PerformanceCallsCounters } from './PerformanceCallsCounters';

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
