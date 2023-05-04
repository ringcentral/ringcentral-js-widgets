// Meeting recurrence information
export interface RecurrenceInfo {
  /**
   * Recurrence time frame
   */
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  /**
   * Reccurence interval. The supported ranges are: 1-90 for `Daily`; 1-12 for `Weekly`; 1-3 for `Monthly`
   */
  interval: number;
  /**
   * Supported together with `weeklyByDay`
   */
  monthlyByWeek: 'Last' | 'First' | 'Second' | 'Third' | 'Fourth';
  /**
   * This field is used only if you're scheduling a recurring meeting of type `3` to state which day in a month the meeting should recur. The value range is 1 - 31. For instance, if the meeting should recur each month on 23rd, provide `23` as the value of this field and `1` as the value of the recurrence `interval` field. And if the meeting should recur every three months, on 23rd of the month, change the value of the recurrence `interval` field to `3`.
   */
  weeklyByDay:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
  /**
   * This field is used only if you're scheduling a recurring meeting of type `2` to state which day(s) of the week the meeting should recur. The values are: 1 - Sunday; 2 - Monday; 3- Tuesday; 4 - Wednesday; 5 - Thursday; 6 - Friday; 7 - Saturday. Multiple values are supported, should be specified separated by comma
   */
  weeklyByDays:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
  /**
   * The supported range is 1-31
   */
  monthlyByDay: number;
  /**
   * This field is used only if you're scheduling a recurring meeting of type `3` to state a specific day in a week when the monthly meeting should recur; it works together with `MonthlyByWeek` field. The values are: 1 - Sunday; 2 - Monday; 3 - Tuesday; 4 - Wednesday; 5 - Thursday; 6 - Friday; 7- Saturday
   */
  monthlyByWeekDay: number;
  /**
   * Number of meeting occurrences
   */
  count: number;
  /**
   * Meeting expiration datetime
   */
  until: string;
}
