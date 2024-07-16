import type { KeyInfo } from './KeyInfo';
import type { PerformanceCallsCounters } from './PerformanceCallsCounters';
import type { PerformanceCallsTimers } from './PerformanceCallsTimers';

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
