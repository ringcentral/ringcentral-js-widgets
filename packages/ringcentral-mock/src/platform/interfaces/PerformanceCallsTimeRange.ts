export interface PerformanceCallsTimeRange {
  /**
   * The start date-time for resulting records in RFC 3339 format including timezone, for example 2016-03-15T18:07:52.534Z
   * Required
   * Format: date-time
   */
  timeFrom: string;
  /**
   * The end date-time for resulting records in RFC 3339 format including timezone, for example 2016-03-15T18:07:52.534Z
   * Required
   * Format: date-time
   */
  timeTo: string;
}
