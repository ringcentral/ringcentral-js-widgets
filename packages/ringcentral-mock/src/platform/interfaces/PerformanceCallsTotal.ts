export interface PerformanceCallsTotal {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   * Format: double
   */
  values: number;
}
