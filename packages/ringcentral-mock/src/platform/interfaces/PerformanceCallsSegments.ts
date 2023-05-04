import { CallsSegments } from './CallsSegments';

export interface PerformanceCallsSegments {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsSegments;
}
