import { PerformanceCallsTimeInterval } from './PerformanceCallsTimeInterval';

// Allows more granular control over time included in the report
export interface PerformanceCallsAdvancedTimeSettings {
  /**
   * IANA-compatible time zone name, for example 'America/Los_Angeles', 'Europe/Moscow'. See also *[Time Zones](https://www.iana.org/time-zones)*
   */
  timeZone: string;
  /**
   * Days of the week for which the report is calculated
   */
  includeDays: (
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
  )[];
  /**
   * Hours of the day for which the report is calculated
   */
  includeHours: PerformanceCallsTimeInterval[];
}
