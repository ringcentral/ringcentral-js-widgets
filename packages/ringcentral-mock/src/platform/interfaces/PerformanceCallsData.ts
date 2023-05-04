import { KeyInfo } from './KeyInfo';
import { PerformanceCallsTimers } from './PerformanceCallsTimers';
import { PerformanceCallsCounters } from './PerformanceCallsCounters';

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
