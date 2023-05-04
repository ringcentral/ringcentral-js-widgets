import { PerformanceCallsTimeRange } from './PerformanceCallsTimeRange';
import { PerformanceCallsAdvancedTimeSettings } from './PerformanceCallsAdvancedTimeSettings';

// Date-time range for which the calls are aggregated. The call is considered to be within time range if it started within time range. Both borders are inclusive
export interface PerformanceCallsTimeSettings {
  /**
   * Required
   */
  timeRange: PerformanceCallsTimeRange;
  /**
   */
  advancedTimeSettings: PerformanceCallsAdvancedTimeSettings;
}
