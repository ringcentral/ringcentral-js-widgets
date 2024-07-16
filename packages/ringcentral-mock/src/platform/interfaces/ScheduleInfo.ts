import type { RangesInfo } from './RangesInfo';
import type { WeeklyScheduleInfo } from './WeeklyScheduleInfo';

// Schedule when an answering rule should be applied
export interface ScheduleInfo {
  /**
   */
  weeklyRanges: WeeklyScheduleInfo;
  /**
   * Specific data ranges
   */
  ranges: RangesInfo[];
  /**
   * The user's schedule specified for business hours or after hours; it can also be set/retrieved calling the corresponding method
   */
  ref: 'BusinessHours' | 'AfterHours';
}
