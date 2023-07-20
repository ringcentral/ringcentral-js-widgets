import type { KeyInfo } from './KeyInfo';
import type { PerformanceCallsTimers } from './PerformanceCallsTimers';
import type { PerformanceCallsCounters } from './PerformanceCallsCounters';

export interface PerformanceCallsData {
  /**
   * Grouping key.
   * Required
   */
  key: string;
  /**
   */
  keyInfo: KeyInfo;
  /**
   */
  timers: PerformanceCallsTimers;
  /**
   */
  counters: PerformanceCallsCounters;
}
