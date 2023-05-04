// Conditional aggregation of calls based on the time spent by specified mailbox(es) on call
export interface PerformanceCallsFilterTimeSpentByMailbox {
  /**
   * Format: int64
   */
  minValueSeconds: number;
  /**
   * Format: int64
   */
  maxValueSeconds: number;
}
