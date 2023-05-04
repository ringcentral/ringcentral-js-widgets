export interface GlipTaskRecurrenceInfo {
  /**
   * Task recurrence settings. For non-periodic tasks the value is 'None'
   */
  schedule: 'None' | 'Daily' | 'Weekdays' | 'Weekly' | 'Monthly' | 'Yearly';
  /**
   * Task ending condition
   */
  endingCondition: 'None' | 'Count' | 'Date';
  /**
   * Count of iterations of periodic tasks
   * Maximum: 10
   * Minimum: 1
   */
  endingAfter: number;
  /**
   * End date of periodic task
   * Format: date-time
   */
  endingOn: string;
}
