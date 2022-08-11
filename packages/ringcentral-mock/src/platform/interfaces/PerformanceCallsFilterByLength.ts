// Conditional aggregation of calls based on the overall call length
export interface PerformanceCallsFilterByLength {
  /**
   * Format: int64
   */
  minValueSeconds: number;
  /**
   * Format: int64
   */
  maxValueSeconds: number;
}
